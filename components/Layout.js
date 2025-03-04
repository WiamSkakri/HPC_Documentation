import React from 'react';
import Head from 'next/head';

const Layout = ({ children, title = 'HPC Guide' }) => {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Guide for setting up a virtual environment in HPC" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className="content">
          {children}
        </div>
      </main>

      <footer className="footer">
        <p>HPC Documentation - Deployed with Vercel</p>
      </footer>
    </div>
  );
};

export default Layout;