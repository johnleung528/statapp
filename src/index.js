import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DemoTabs from './Swipe';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<DemoTabs />, document.getElementById('root'));
registerServiceWorker();
