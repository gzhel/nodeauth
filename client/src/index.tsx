import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { default as App } from './main';
import { default as Store } from './store';
import './styles/reset.css';
import './styles/theme.css';

const store = new Store();

export const Context = createContext<{ store: Store }>({ store });

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Context.Provider value={{ store }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
