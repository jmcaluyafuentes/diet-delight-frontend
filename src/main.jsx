import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import Home from './pages/Home.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <Home />
    <App />
  </BrowserRouter>
  // </StrictMode>,
)
