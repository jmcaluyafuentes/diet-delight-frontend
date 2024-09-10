import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import DietarySelection from './pages/DietarySelection';
import PrintPreview from './pages/PrintPreview.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import './App.css';

const App = () => {
    return (
        <div id="whole-page">
            <NavBar />
            <div id="page">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<DietarySelection />} />
                    <Route path="/print" element={<PrintPreview />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default App;
