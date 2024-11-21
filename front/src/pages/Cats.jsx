import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AllCats from "../AllCats";
import Header from '../Header';

const Cats = () => {
  const { color } = useParams();
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCatsByColor = async () => {
      let url = 'http://localhost:3005/cats';  

      if (color) {
        url = `http://localhost:3005/cats?color=${color}`;  
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setCats(data);
      } catch (error) {
        console.error('Error fetching cats by color:', error);
      }
    };

    fetchCatsByColor();
  }, [color]);

  return (
    <div>
      <Header />
      <AllCats cats={cats} /> 
    </div>
  );
};

export default Cats;
