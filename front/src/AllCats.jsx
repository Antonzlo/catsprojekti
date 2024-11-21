import React, { useEffect, useState } from 'react';
import "./pages.css";

const AllCats = () => {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const response = await fetch('http://localhost:3005/cats');
                const data = await response.json();
                setCats(data);
            } catch (error) {
                console.error('Error fetching cats:', error);
            }
        };

        fetchCats();
    }, []);

    const handleReadMore = (breed) => {
        window.location.href = `/cats/${breed}`; 
    };

    return (
        <div>
            <h2>All Cats</h2>
            <div className='allcatsdiv'>
                {cats.map(cat => (
                    <div key={cat.id} className="cat-item">
                        <p className="breed-button">{cat.breed}</p> <br />
                        <img className='cat-image' src={`/images/cats/${cat.photo}`} alt={cat.breed} />
                        <button 
                            className="read-more" 
                            onClick={() => handleReadMore(cat.breed)}>
                            Read more
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCats;
