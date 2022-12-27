import React from 'react';

import { client } from '../lib/client';

import FooterBanner from '../components/FooterBanner';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import { IBanner, IProduct } from '../types';

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
        <p>speaker There are many variations passages</p>
      </div>

      <FooterBanner />
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
