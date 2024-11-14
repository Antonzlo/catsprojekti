// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cats from './pages/cats';
import Size from './pages/Size';
import Colours from './pages/Colours';
import Character from './pages/Character';

import './App.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="cats" element={<Cats />} />
      <Route path="colours" element={<Colours />} />
      <Route path="size" element={<Size />} />
      <Route path="character" element={<Character />} />

    </Routes>
  </BrowserRouter>
);

export default App;
