import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./pages.css";

const ColoursPage = () => {
    const [colors, setColors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const response = await fetch('http://localhost:3005/colours');
                const data = await response.json();

                const uniqueColors = Array.from(
                    new Set(
                        data
                            .flatMap((item) => item.color.split(',')) 
                            .map((color) => color.trim()) 
                    )
                ).sort(); 

                setColors(uniqueColors);
            } catch (error) {
                console.error('Error fetching colors:', error);
            }
        };

        fetchCats();
    }, []);

    const handleColorClick = (color) => {
        navigate(`/cats/color/${color}`); 
    };

    return (
        <div>
            <h2>Colors</h2>
            <ul className="Colours-Page">

                {colors.map((color, index) => (
                    <li key={index} onClick={() => handleColorClick(color)}>
                        {color}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ColoursPage;
