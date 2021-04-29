import React from 'react';
import ReactDOM from 'react-dom';
import RSP from "./components/RSP_hooks";
import {hot} from "react-hot-loader/root";
const Hot = hot(RSP);
ReactDOM.render(
  <Hot />,
  document.getElementById('root')
)
