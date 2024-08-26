import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import DietarySelection from './pages/DietarySelection';
import PrintRecipes from './pages/PrintPreview.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<DietarySelection />} />
                <Route path="/print" element={<PrintRecipes />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
