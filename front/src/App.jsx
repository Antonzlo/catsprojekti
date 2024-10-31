import React from 'react';
import Header from './Header'; 
import HomePage from './Homepage';
import './App.css'

const App = () => {
    return (
        <div>
            <Header />
            <HomePage/>
            {/* Other components can go here */}
        </div>
    );
};

export default App;
