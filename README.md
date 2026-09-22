# My Looker Custom Visualization

A simple Looker custom visualization built with React, TypeScript, and Vite.

This repository accompanies the Medium series **“When DE assigned to develop Looker Custom Visualization”**, where I walk through the process of building a custom visualization from local development to running it in Looker.

## What this project covers

- Setting up a React + TypeScript project for Looker custom visualizations
- Building a configurable table visualization
- Connecting the visualization to Looker's Visualization API
- Bundling the visualization into a UMD file
- Registering and running the visualization in Looker

## Project Structure

```text
src/
└── visualizations/
    └── my-table/
        ├── components/
        │   └── MyTable.tsx      # Visualization component
        ├── looker-viz.tsx       # Looker Visualization API entry point
        ├── data-transformer.ts  # Transforms Looker query data for the component
        ├── mockData.ts          # Mock data for local development
        ├── options.ts           # Visualization configuration options
        └── types.ts             # Shared TypeScript types
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- Yarn

```bash
npm install --global yarn
```

Install dependencies:

```bash
yarn install
```

Run the project locally:

```bash
yarn dev
```

Build the Looker visualization bundle:

```bash
yarn build
```

The bundled visualization will be generated in the `dist/` directory.

## Medium Series

Read the full series:

1. Part 1 — [Setting Up the Project](https://medium.com/@jb.ranchana/when-de-assigned-to-develop-looker-custom-visualization-part-1-how-it-works-cd5fc2579151)
2. Part 2 — [Building the Foundation](https://medium.com/@jb.ranchana/when-de-assigned-to-develop-looker-custom-visualization-part-2-project-structure-19ad7ee17dc7)
3. Part 3 — [Building the Real Visualization](https://medium.com/@jb.ranchana/when-de-assigned-to-develop-looker-custom-visualization-part-3-building-the-real-visualization-575c5cb7b7d7)
4. Part 4 — [Connecting to Looker](https://medium.com/@jb.ranchana/when-de-assigned-to-develop-looker-custom-visualization-part-4-connecting-to-looker-9d9c2ccc6725)

## Note

This repository is intentionally kept simple to make the concepts in the series easier to follow. It is a learning example rather than a production-ready visualization framework.