import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Graph from './Graph';
import Input from './Input';

ReactDOM.render(<Input />, document.getElementById('root'));
registerServiceWorker();
