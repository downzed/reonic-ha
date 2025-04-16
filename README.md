# Reonic HA - EV Charging System

An electric vehicle charging monitoring system consisting of a simulator and a dashboard UI.

## Project Overview

This repository contains two main components:

1. **EV Charge Simulator** (`/ev-charge-sim`): A TypeScript-based simulator that generates EV charging station data
2. **EV Charge UI** (`/ev-charge-ui`): A React-based dashboard for visualizing the charging data

## System Architecture

```
reonic-ha/
├── ev-charge-sim/    # Simulator logic
│   ├── src/          # TypeScript source files
│   └── dist/         # Compiled output
│
└── ev-charge-ui/     # Dashboard frontend
    ├── src/          # React components
    └── dist/         # Production build
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (v10.7.0 or higher)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/downzed/reonic-ha.git
cd reonic-ha
```

2. Install dependencies for both projects:
```bash
cd ev-charge-sim && pnpm install
cd ../ev-charge-ui && pnpm install
```

3. Run the simulator:
```bash
cd ev-charge-sim
pnpm compile
node ./dist/index.js
```

4. In a new terminal, start the UI:
```bash
cd ev-charge-ui
pnpm dev
```

## Development Workflow

1. **Simulator Development**
   - Use `pnpm watch` in the simulator directory for auto-recompilation
   - Run `pnpm lint` to check code quality

2. **UI Development**
   - Use `pnpm dev` for hot-reloading development
   - Use Biome for code formatting and linting

## License

This project is private.
