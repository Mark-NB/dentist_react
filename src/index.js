import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App/App.js";
import { store } from './App/store';
import { Provider } from 'react-redux';

ReactDOM.render(

    <Provider store={store}>
      <App />
    </Provider>
,
  document.getElementById("root")
);
