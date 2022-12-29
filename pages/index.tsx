import React from 'react';

import { client } from '../lib/client';

import { IBanner, IProduct } from '../types';
import { HeroBanner, FooterBanner, Product } from '../components';

interface HomeProps {
  products: IProduct[];
  bannerData: IBanner[];
}

const Home = ({ products, bannerData }: HomeProps) => {
  return (
    <div>
      {bannerData.length > 0 ? <HeroBanner heroBanner={bannerData[0]} /> : null}
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>There are many cool products/p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      {bannerData.length > 0 ? <FooterBanner footerBanner={bannerData[0]} /> : null}
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
