import { useEffect, useState } from 'react';
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
<<<<<<< HEAD
        <>
        <h2>Colors</h2>
        <div className="colordiv">
        <ul>
            {colors.length > 0 ? (
                colors.map((color, index) => (
                    <div key={index} className="color-item">
                        <li onClick={() => handleColorClick(color)}>
                            {color}
                        </li>
                    </div>
                ))
            ) : (
                <p>No colors available.</p>
            )}
        </ul>
        <h1>kissat on kivoja</h1>
    </div>
    </>
    
=======
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
>>>>>>> fbc2d5016a4ef2c38c086f2dd1d5e622e5104a3b
    );
};

export default ColoursPage;
