---

When DE assigned to develop Looker Custom Visualization - Part 2 Project Structure

Now that we understand the high-level workflow, it's time to build the foundation. While I could just give you a repository to clone, I strongly recommend building it from scratch using yarn create vite. This approach ensures you understand how each piece of the puzzle fits together, which is crucial for troubleshooting complex visuals later on.
Why Vite?
As a Data Engineer, efficiency is everything. Vite offers a lightning-fast development cycle compared to older bundlers, making the "Code-Bundle-Test" loop much smoother.
1. Initializing the Project
Start by running the following command in your terminal:
yarn create vite my-looker-viz --template react-ts
(Note: I recommend TypeScript for better type safety when handling Looker's complex JSON data).
To test how it works on local, you can run the following command.
yarn dev
You will see the initial UI from the project.
The initial index.html template on localhost2. The Recommended Project Structure
To keep your project scalable (especially when you start adding more metrics or complex logic), I suggest the following organization:
my-looker-viz/
src/
├── common/                # Utility และ Types for all Visualization
│   ├── types.ts           # Shared TypeScript interfaces
│   └── theme.ts           # Shared colors หรือ constants
├── visualizations/        # Main folder for each visualization
│   └── my-table/          # A specific folder for your viz 
│       ├── components/    # UI Components for only this viz
│       ├── App.tsx        # React local Entry Point 
│       ├── data-transformer.ts # Logic for transforming Looker data into needed format
│       ├── mockData.ts    # Mockup data for running test on local
│       └── looker-viz.ts  # Used for Looker API
│   
├── index.tsx              # รวมทุก Viz เข้าด้วยกัน (if use monorepo style)
└── setupTests.ts
├── index.html            # Template for Rendering on local host
├── vite.config.ts        # Setting for Build (bundling)
├── package.json
└── ... (config files อื่นๆ)
Exclaimer: I centralized all visualizations within one repository. You can consider appropriate way for your team or organization.

---

3. The Secret Sauce: Configuring Library Mode
This is the most critical step. Looker doesn't want a full website; it wants a single .umd.js file. You'll need to modify your vite.config.ts to enable Library Mode:
TypeScript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

---

4. Playing with your data