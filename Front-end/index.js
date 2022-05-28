//Importing react
//npm install react
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
//Need App.jsx component
import App from './Components/App.jsx';
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <App/>
  </Provider>);