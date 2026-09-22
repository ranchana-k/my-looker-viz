// A single cell value from Looker
export interface Cell {
  value: string | number | boolean | null  // raw value for calculation
  rendered?: string                            // formatted string for display e.g. "4,215" or "$138,540"
  html?: string                            // raw HTML string e.g. "<a href='...'>text</a>"
  links?: Array<{ label: string; url: string }> // drill links from looker
}

// A single row: field name → Cell
// e.g. { "orders.status": { value: "complete" }, "orders.count": { value: 4215, rendered: "4,215" } }
export type Row = Record<string, Cell>

// Field metadata from queryResponse
export interface Field {
  name: string  // Looker field name e.g. "orders.status"
  label: string  // display name e.g. "Orders Status"
  label_short?: string // optional shorter display name e.g. "Status"
  type: string  // field type e.g. "string", "count", "sum"
}

// The queryResponse object Looker provides
export interface QueryResponse {
  fields: {
    dimensions: Field[]  // non-aggregated fields e.g. status, category
    measures: Field[]  // aggregated fields e.g. count, revenue
  }
  pivots: unknown[]      // pivot fields if any, empty array if none
}

// The value types allowed for config options
export type ConfigValue = string | number | boolean | string[];
export type DisplaySize = "full" | "half" | "third";

// The Config object Looker provides based on the options defined
export interface Config {
  [key: string]: ConfigValue;
};

// The shape of the options object we will use to define our visualization options
export interface Option {
	type: "string" | "number" | "boolean" | "array";
	label: string;
	section?: string;
	order?: number;
	display?:
		| "text"
		| "number"
		| "color"
		| "select"
		| "radio"
		| "range"
		| "divider";
	display_size?: DisplaySize;
	default?: ConfigValue;
	placeholder?: string;
	min?: number;
	max?: number;
	values?: Array<string | number | { [key: string]: string | number }>;
}