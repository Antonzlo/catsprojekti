import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
const HomePage = () => {
    return (
        <div className="home-page">
            <section className="about-section">
                <h2>About the site</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor mattis blandit. 
                    Pellentesque porta ac ligula eu faucibus. Cras gravida tincidunt consectetur. Mauris quis 
                    malesuada augue, ut tincidunt magna. Phasellus sed hendrerit est. Quisque aliquam finibus 
                    neque ut vulputate. Donec non mauris diam. Cras urna nunc, varius id gravida quis, luctus ac tortor.
                </p>
            </section>
            
            <section className="categories-section">
                <div className="category">
                    <h3>All Cats</h3>
                    <img className='photo' src="/public/images/templates.png" alt="aaa" />
                    <Link to="/cats" className='links'>Read more</Link>
                    </div>
                <div className="category">
                    <h3>Colours</h3>
                    <img className='photo' src="/public/images/templates.png" alt="aaa" />
                    <Link to="/colours" className="links">Read more</Link>
                </div>
                <div className="category">
                    <h3>Size</h3>
                    <img className='photo' src="/public/images/templates.png" alt="aaa" />
                    <Link to="/size" className="links">Read more</Link>
                </div>
                <div className="category">
                    <h3>Character</h3>
                    <img className='photo' src="/public/images/templates.png" alt="aaa" />
                    <Link to="/character" className="links">Read more</Link>
                </div>
            </section>
            
        </div>
    );
};

export default HomePage;