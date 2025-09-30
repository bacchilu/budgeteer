# Budgeteer

Budgeteer is an evolving sandbox for testing personal budgeting strategies. The app is built with React, TypeScript, and Vite, pairing hands-on UI experiments with in-progress ideas around tracking budgets, logging expenses, and visualizing what's left. Bootstrap handles layout polish while `decimal.js` keeps the math reliable.

## Features

- ✅ Fixed starting budget with real-time remaining/spent totals
- ✅ Cost entry form with basic validation and helpful messaging
- ✅ Bootstrap-based layout for responsive cards and forms
- ✅ Currency formatting via the browser's locale-aware `Intl.NumberFormat`

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for fast dev server and builds
- [Bootstrap 5](https://getbootstrap.com/) for UI components and utility classes
- [decimal.js](https://mikemcl.github.io/decimal.js/) for precise arithmetic
- [ESLint](https://eslint.org/) for linting

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the dev server**
   ```bash
   npm run dev
   ```
   Vite will print a local URL (default `http://localhost:5173`).

## Useful Scripts

- `npm run dev` – start the Vite dev server
- `npm run build` – type-check and build the production bundle
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint over the project
- `npm run update` – check and update dependencies with `npm-check-updates`

## Project Structure

```
src/
  app.tsx       # Bootstrap-based budgeting panel
  app.css       # Component-specific styles
  main.tsx      # React entry point
```

## Roadmap Ideas

- Persist budgets and transactions
- Add categories and history views
- Surface charts and insights
- Integrate authentication for multi-user budgets

## License

This project is provided as-is without a specific license. Adapt it freely for your own budgeting experiments.
