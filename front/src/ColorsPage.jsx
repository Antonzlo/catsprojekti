import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./pages.css";

const ColoursPage = () => {
    const [cats, setCats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const response = await fetch('http://localhost:3005/colours');
                const data = await response.json();
                setCats(data);
            } catch (error) {
                console.error('Error fetching colors:', error);
            }
        };

        fetchCats();
    }, []);

    const handleColorClick = (color) => {
        navigate(`/cats/color/${color}`); // Navigate to the filtered list by color
    };

    return (
        <div>
            <h2>Colors</h2>
            <ul className="Colours-Page">
                {cats.map((cat, index) => (
                    <li key={index} onClick={() => handleColorClick(cat.color)}>
                        {cat.color}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ColoursPage;
