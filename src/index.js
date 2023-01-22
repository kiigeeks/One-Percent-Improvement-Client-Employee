import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import id from 'javascript-time-ago/locale/id.json'
import 'animate.css';

axios.defaults.withCredentials = true;
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(id)

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);

