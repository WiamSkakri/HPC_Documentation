import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = ({ pages = [] }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? '✕' : '☰'}
      </button>
      <style jsx>{`
        .sidebar-toggle {
          display: none;
          position: fixed;
          top: 10px;
          left: 10px;
          z-index: 20;
          padding: 8px 12px;
          background-color: #333;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1.2rem;
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .sidebar-toggle {
            display: block;
          }
        }
      `}</style>
      
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-inner">
          <h3 className="sidebar-title">HPC Guide</h3>
          <nav className="sidebar-nav">
            <ul>
              {pages && pages.map((page) => (
                <li key={page.slug || 'unknown'} className="sidebar-item">
                  <Link 
                    href={page.slug === 'hpc-environment' ? '/' : `/${page.slug}`}
                    className={`sidebar-link ${
                      (router.pathname === '/' && page.slug === 'hpc-environment') || 
                      router.pathname === `/${page.slug}` ||
                      router.pathname.startsWith(`/${page.slug}/`)
                        ? 'active' 
                        : ''
                    }`}
                  >
                    {page.title || page.slug || 'Untitled'}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      <style jsx>{`
        .sidebar {
          width: 250px;
          background-color: #1a1a1a;
          border-right: 1px solid var(--border-color);
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 10;
          transition: transform 0.3s ease;
          overflow-y: auto;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        }
        
        .sidebar-inner {
          padding: 1.5rem 1rem;
          height: 100%;
          overflow-y: auto;
        }
        
        .sidebar-title {
          color: #fff;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .sidebar-nav {
          margin-top: 1rem;
        }
        
        .sidebar-item {
          margin-bottom: 0.5rem;
        }
        
        .sidebar-link {
          display: block;
          padding: 0.5rem 0.75rem;
          color: #ccc;
          border-radius: 4px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .sidebar-link:hover {
          color: #fff;
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .sidebar-link.active {
          color: #fff;
          background-color: rgba(255, 255, 255, 0.15);
          font-weight: 500;
          border-left: 3px solid #0070f3;
        }
        
        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(0);
            width: 240px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
          }
          
          .sidebar.closed {
            transform: translateX(-100%);
          }
          
          .sidebar-inner {
            padding-top: 3.5rem;
          }
        }
        
        @media (min-width: 769px) {
          .sidebar {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;