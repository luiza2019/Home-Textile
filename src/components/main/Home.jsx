import React from 'react';
import Products from '../products/Products';
import Announcement from './Announcement';
import Footer from './Footer';
import Navbar from './Navbar';
import Slider from './Slider'

const Home = () => {
    return (
        <div>
            <Announcement />
            <Navbar />
            <Slider />
            <Products />
            <Footer />
        </div>
    );
};

export default Home;