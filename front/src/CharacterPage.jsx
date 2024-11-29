import React, { useEffect, useState } from 'react';
import "./pages.css";

const Character = () => {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const response = await fetch('http://localhost:3005/character');
                const data = await response.json();
                setCats(data);
            } catch (error) {
                console.error('Error fetching cats:', error);
            }
        };

        fetchCats();
    }, []);

    return (
        <div>
            <ul>
                {personalities.map((personality, index) => (
                    <li key={index} onClick={() => handlePersonalityClick(personality)}>
                        {personality} 
                        
                    </li>
                ))}
              
            </ul>
        </div>
    );
};
 
export default Character;
