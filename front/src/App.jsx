import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cats from './pages/cats';
import Size from './pages/Size';
import Colours from './pages/Colours';
import Character from './pages/Character';
import CatBreed from './pages/Breed';
import './App.css';

const App = () => {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="cats" element={<Cats />} />
        <Route path="colours" element={<Colours />} />
        <Route path="size" element={<Size />} />
        <Route path="character" element={<Character />} />
        <Route path="cats/:breed" element={<CatBreed />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
