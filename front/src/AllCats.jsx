import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./pages.css";

const AllCats = () => {
    const { color } = useParams();  // Get the color parameter from the URL if available
    const [cats, setCats] = useState([]);
    
    useEffect(() => {
        const fetchCats = async () => {
            let url = 'http://localhost:3005/cats';  // Default URL to get all cats

            if (color) {
                url = `http://localhost:3005/cats?color=${color}`;  // Fetch filtered cats if color is provided
            }

            try {
                const response = await fetch(url);
                const data = await response.json();
                setCats(data);
            } catch (error) {
                console.error('Error fetching cats:', error);
            }
        };

        fetchCats();
    }, [color]);  // Run the effect when the color changes (dynamic routing)

    const handleReadMore = (breed) => {
        window.location.href = `/cats/${breed}`;  // Navigate to the breed's detail page
    };

    return (
        <div>
            <h2>{color ? `Cats of color: ${color}` : 'All Cats'}</h2> {/* Display dynamic title based on color */}
            <div className="allcatsdiv">
                {cats.length > 0 ? (
                    cats.map((cat) => (
                        <div key={cat.id} className="cat-item">
                            <p className="breed-button">{cat.breed}</p> <br />
                            <img className="cat-image" src={`/images/cats/${cat.photo}`} alt={cat.breed} />
                            <button
                                className="read-more"
                                onClick={() => handleReadMore(cat.breed)}>
                                Read more
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No cats found for this color.</p> 
                )}
            </div>
        </div>
    );
};

export default AllCats;
