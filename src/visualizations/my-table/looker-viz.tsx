import { createRoot, type Root } from "react-dom/client";
import MyTable from "./components/MyTable";
import type { Config, Option, QueryResponse, Row } from "./types";
import { buildDynamicOptions, staticOptions } from "./options";

// Everything our viz object carries: our own state, the lifecycle hooks we
// implement, and the helpers Looker injects onto the object at runtime.
interface LookerCustomViz {
  // Our own state, persisted across updateAsync calls.
  root?: Root;
  container?: HTMLElement;
  _lastDynamicOptions?: string | null;

  // Injected by Looker at runtime — declare them so TypeScript knows they exist.
  trigger?: (event: string, args: unknown) => void;
  addError?: (error: { title: string; message: string }) => void;

  // Lifecycle hooks we implement.
  create: (element: HTMLElement, settings?: unknown) => void;
  destroy?: () => void;
  updateAsync: (
    data: Row[],
    element: HTMLElement,
    config: Config,
    queryResponse: QueryResponse,
    details: unknown,
    done: () => void,
  ) => void;
}

interface LookerVisualizationPlugin {
  add: (
    viz: LookerCustomViz & {
      id: string;
      label: string;
      options: Record<string, Option>;
    },
  ) => void;
}

interface LookerGlobal {
  plugins?: { visualizations?: LookerVisualizationPlugin };
}

// Tell TypeScript that `looker` will exist at runtime, injected by the host page.
declare global {
  var looker: LookerGlobal | undefined;
}

const MyTableViz: LookerCustomViz = {
  create(element: HTMLElement) {
    // Guard against a second mount on the same element — calling createRoot()
    // twice on one node makes React warn and leaks the previous tree.
    this.root?.unmount();

    element.style.position = "relative";
    this.container = element;
    this.root = createRoot(element);
  },

  destroy() {
    this.root?.unmount();
    this.root = undefined;
  },

  updateAsync(
    data: Row[],
    _element: HTMLElement,
    config: Config,
    queryResponse: QueryResponse,
    _details: unknown,
    done: () => void,
  ) {
    try {
      // Re-register the options panel only when it actually changed —
      // firing this on every render makes the Admin panel flicker.
      const dynamicOptions = buildDynamicOptions(config);
      const fingerprint = JSON.stringify(dynamicOptions);

      if (this._lastDynamicOptions !== fingerprint) {
        this.trigger?.("registerOptions", dynamicOptions);
        this._lastDynamicOptions = fingerprint;
      }

      // Looker can call updateAsync before the query has resolved.
      if (!queryResponse.fields) {
        done();
        return;
      }

      this.root?.render(
        <MyTable data={data} config={config} queryResponse={queryResponse} />,
      );

      done();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);

      // Surfaces the error inside the tile instead of failing silently.
      this.addError?.({
        title: "Visualization failed to render",
        message,
      });
      done();
    }
  },
};

// Spread the WHOLE object — see the note on `this` binding below.
// The optional chaining keeps this a no-op in Storybook, where `looker`
// doesn't exist.
globalThis.looker?.plugins?.visualizations?.add?.({
  ...MyTableViz,
  id: "my_table",
  label: "My Table",
  options: staticOptions,
});
