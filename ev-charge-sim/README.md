# EV Charge Simulator

A TypeScript-based simulator for generating and managing electric vehicle charging station data.

## Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (v10.7.0 or higher)

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Build the project:
```bash
pnpm compile
```

3. Run the sim:
```bash
node ./dist/index.js
```

## Development

For development with auto-recompilation:
```bash
pnpm watch
```

## Available Scripts

- `pnpm compile` - Clean and compile the project
- `pnpm watch` - Watch mode for development
- `pnpm clean` - Clean compiled files
- `pnpm lint` - Run GTS linting
- `pnpm fix` - Auto-fix linting issues
- `pnpm prepare` - Prepare the project (runs during install)

## Project Structure

```
ev-charge-sim/
├── src/           # Source files
├── dist/          # Compiled output
└── package.json   # Project configuration
```

## Tech Stack

- TypeScript
- Google TypeScript Style (GTS)
- Node.js

## Code Style

This project follows the Google TypeScript Style Guide using GTS. To maintain code quality:

1. Run linting: `pnpm lint`
2. Auto-fix issues: `pnpm fix`
