import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SimulationProvider } from './context/SimulationContext';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <SimulationProvider>
        <App />
      </SimulationProvider>
    </React.StrictMode>,
  );
}
