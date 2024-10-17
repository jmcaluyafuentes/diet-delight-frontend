import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import DietarySelection from './pages/DietarySelection';
import PrintPreview from './pages/PrintPreview';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer';
import './App.css';

const App = () => {
    return (
        <div id="page">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<DietarySelection />} />
                <Route path="/print" element={<PrintPreview />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
