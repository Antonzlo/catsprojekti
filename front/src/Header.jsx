import React, { useState, useEffect } from 'react';
import './Header.css'

const Header = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Function to toggle theme
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <header>
            <a href="/">
                <p>Mewtopia</p>
            </a>
            <nav>
                <a href="http://localhost:3005/cats">Cats</a>
                <a href="Search">Search</a>
                <img
                    id="themeToggle"
                    src={theme === 'light' ? '/public/images/moon.png' : '/public/images/sun.png'}
                    className="theme-icon"
                    alt="Toggle theme"
                    onClick={toggleTheme}
                />
            </nav>
        </header>
    );
};

export default Header;
