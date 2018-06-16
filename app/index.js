import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import FormStuff from './src/FormStuff.js';

ReactDOM.render(<App><FormStuff/> </App>, document.getElementById('root'));
registerServiceWorker();
