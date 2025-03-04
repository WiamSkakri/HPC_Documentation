import React from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';

const Layout = ({ children, title = 'HPC Guide', pages = [] }) => {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Guide for setting up and using HPC" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Add Sidebar */}
      <Sidebar pages={pages} />

      <main className="main">
        <div className="content">
          {children}
        </div>
      </main>

      <footer className="footer">
        <p>HPC Documentation - Deployed with Vercel</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          width: 100%;
          position: relative;
        }

        .main {
          flex: 1;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          margin-left: 250px;
          width: calc(100% - 250px);
          min-height: 100vh;
          box-sizing: border-box;
        }

        .footer {
          margin-left: 250px;
          width: calc(100% - 250px);
        }

        @media (max-width: 768px) {
          .main, .footer {
            margin-left: 0;
            width: 100%;
            padding-top: 3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;