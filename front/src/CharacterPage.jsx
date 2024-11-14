import React, { useEffect, useState } from 'react';

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
            {cats.map(cat => (
                    <li key={cat.id}>
                        {/* <strong>Breed:</strong> {cat.breed} <br /> */}
                         {/* <strong>Color:</strong> {cat.color} <br /> */}
                         <strong>Personality:</strong> {cat.personality} 
                        {/*<strong>Size:</strong> {cat.size} <br />
                        <strong>Facts:</strong> {cat.breed_facts} <br /> */} 
                    </li>
                ))}
              
            </ul>
        </div>
    );
};

export default Character;
