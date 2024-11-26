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
<<<<<<< HEAD
            <ul className="Colours-Page">
                {cats.map((cat, index) => (
                    <li key={index} onClick={() => handleColorClick(cat.color)}>
                        {cat.color}
=======
            <ul>
                {colors.map((color, index) => (
                    <li key={index} onClick={() => handleColorClick(color)}>
                        {color}
>>>>>>> f4cc4904e64e57f3ecaae73b0b8cb8f11d631aca
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ColoursPage;
