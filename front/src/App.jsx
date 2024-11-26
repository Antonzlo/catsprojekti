import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cats from './pages/cats';
import Size from './pages/Size';
import Color from './pages/Colours'
import Character from './pages/Character';
import CatBreed from './pages/Breed';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="cats" element={<Cats />} />
        <Route path="colours" element={<Color />} />
        <Route path="size" element={<Size />} />
        <Route path="character" element={<Character />} />
        <Route path="cats/:breed" element={<CatBreed />} />
        <Route path="cats/color/:color" element={<Cats />} /> 
        <Route path="/cats/size/:size" element={<Cats />} /> 
        <Route path="/cats/character/:character" element={<Cats />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
