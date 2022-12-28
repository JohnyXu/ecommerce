import React, { PropsWithChildren } from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="layout">
      <Head>
        <title>Johny Ecommerce Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
