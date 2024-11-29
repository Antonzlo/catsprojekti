import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <header>
            <a href="/">
                <p>Mewtopia</p>
            </a>
            <nav>
               
                <div className="nav-center">
                    <input type="text" placeholder="Search..." className="search-input" />
                </div>
                <div className="nav-right">
                <Link to="/cats">Cats</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/profile">Profile</Link>
                    <img
                        id="themeToggle"
                        src={theme === 'light' ? '/images/moon.png' : '/images/sun.png'}
                        className="theme-icon"
                        alt="Toggle theme"
                        onClick={toggleTheme}
                    />
                </div>
            </nav>
        </header>
    );
};

export default Header;
