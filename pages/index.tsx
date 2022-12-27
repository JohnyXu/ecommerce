import React from 'react';
import FooterBanner from '../components/FooterBanner';
import HeroBanner from '../components/HeroBanner';

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>speaker There are many variations passages</p>
      </div>

      <FooterBanner />
    </div>
  );
};

export default Home;
