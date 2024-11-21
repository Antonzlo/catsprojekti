import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./pages.css";

const BreedPage = () => {
    const { breed } = useParams(); 
    const [cat, setCat] = useState(null);

    useEffect(() => {
        const fetchCat = async () => {
            try {
                const response = await fetch(`http://localhost:3005/cats/${breed}`);
                const data = await response.json();

                if (data.length > 0) {
                    setCat(data[0]); 
                } else {
                    setCat(null);
                }
            } catch (error) {
                console.error('Error fetching cat:', error);
            }
        };

        fetchCat();
    }, [breed]); 

    if (!cat) {
        return <p>No cat found for this breed.</p>;
    }

    return (
        <div>
            <h2>{cat.breed} Cat</h2>
            <img className='breed-image' src={`/images/cats/${cat.photo}`} alt={cat.breed} />

            <div className="cat-details">
                <strong>Breed:</strong> {cat.breed} <br />
                <strong>Color:</strong> {cat.color} <br />
                <strong>Personality:</strong> {cat.personality} <br />
                <strong>Size:</strong> {cat.size} <br />
                <strong>Facts:</strong> {cat.breed_facts} <br />
            </div>
        </div>
    );
};

export default BreedPage;
