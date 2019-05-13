import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';

const webSocket = new WebSocket("ws://localhost:5999");
webSocket.onopen = function () {
    webSocket.send('');
    setInterval(() => {
        webSocket.send('');
    }, 5000);
};

let prevData = null;
webSocket.onmessage = function (event) {
    if (event.data !== prevData) {
        prevData = event.data;
        console.log(JSON.parse(event.data));
        store.dispatch({ type: 'SET_STORE', state: JSON.parse(event.data) });
    }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));