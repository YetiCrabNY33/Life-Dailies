//Importing react
//npm install react
import React from 'react';

//Need App.jsx component
import App from './Components/App.jsx';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);