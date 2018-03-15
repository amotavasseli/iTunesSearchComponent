import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Search from './SearchiTunes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Search />, document.getElementById("albums-container"));
registerServiceWorker();
