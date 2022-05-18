import React from 'react';
import './index.css';
import {App} from './App';
import {Provider} from 'react-redux';
import {store} from './state/store';
import {createRoot} from 'react-dom/client';
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);


root.render(
    <Provider store={store}>
        <App />
    </Provider>)






