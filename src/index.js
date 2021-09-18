import React from 'react'; 
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import './Assets/css/style.css';
import "./Assets/css/responsive.css";
import "./Assets/js/script.js";


// import "./Assets/js/jquery.min.js"
// import "./Assets/js/script";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
