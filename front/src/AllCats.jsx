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

    return (
        <div>
            <h2>All Cats</h2>
            <div className='allcatsdiv'>
                {cats.map(cat => (
                    <div key={cat.id} className="cat-item">
                        <button className="breed-button">{cat.breed}</button> <br />
                        <div className="cat-image">Pics</div>
                        <button className="read-more">Read more</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCats;
