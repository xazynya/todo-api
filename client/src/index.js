import React from 'react';
import ReactDOM from 'react-dom/client';
//import Signup from './components/Signup';
import Router from './Router';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <BrowserRouter>
        <Router />
    </BrowserRouter>

);

reportWebVitals();
