import React from 'react';
//  import Header from './Header'; 
// import HomePage from './Homepage';
import './App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cats from './pages/cats';
import Home from './pages/Home';
import Colours from './ColorsPage';
// import AllCats from './AllCats';

// const App = () => {
//     return (
//         <div>
//             <Header />
//             <HomePage/>
//             <AllCats/>
//             {/* Other components*/}
//         </div>
//     );
// };


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="cats" element={<Cats />} />
        <Route path="colours" element={<Colours />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
