import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './comments';  // Ensure Comments component is correctly imported
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
        <>
                        <h2>{cat.breed} Cat</h2>
        <div className="breed-page-container">

            <img className="breed-image" src={`/images/cats/${cat.photo}`} alt={cat.breed} />
            <div className="cat-details">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin eget ligula vel facilisis. Duis placerat massa mattis nulla laoreet hendrerit. Curabitur sed sodales purus, nec bibendum dolor. Donec porta velit sapien, vitae ullamcorper mi eleifend eget. Curabitur consectetur turpis orci, vitae tempor enim euismod nec. Phasellus ac massa vel enim efficitur blandit eu varius risus. Integer leo felis, venenatis nec lacinia eget, cursus at odio. Pellentesque euismod, ligula a maximus mattis, dolor est lobortis leo, non dapibus ante odio id odio. Nam diam lacus, congue id orci sed, fringilla sollicitudin ante. Quisque sed finibus ipsum, at elementum urna.</p>
                <strong>Color:</strong> {cat.color} <br />
                <strong>Personality:</strong> {cat.personality} <br />
                <strong>Size:</strong> {cat.size} <br />
                <strong>Facts:</strong> {cat.breed_facts} <br />
            </div>
            
        </div>
            <Comments breed={breed} />
        </>
    );
    
};

export default BreedPage;
