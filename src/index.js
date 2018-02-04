import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
