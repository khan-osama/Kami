import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

import.meta.webpackHot?.accept();
import.meta.webpackHot?.dispose(() => root.unmount());

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(<App />);
