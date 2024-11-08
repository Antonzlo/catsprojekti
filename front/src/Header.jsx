import React, { useState, useEffect } from 'react';
import './Header.css'

const Header = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

<<<<<<< HEAD
    //toggle theme
=======
>>>>>>> aedb2ee2e25eaf4bfa010426af3995f9fd9c2b18
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <header>
            <a href="/">
                <p>Mewtopia</p>
            </a>
            <nav>
                <a href="http://localhost:5173/cats">Cats</a>
                <a href="Search">Search</a>
                <img
                    id="themeToggle"
                    src={theme === 'light' ? '/images/moon.png' : '/images/sun.png'}
                    className="theme-icon"
                    alt="Toggle theme"
                    onClick={toggleTheme}
                />
            </nav>
        </header>
    );
};

export default Header;
