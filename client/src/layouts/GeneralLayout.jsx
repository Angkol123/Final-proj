import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const GeneralLayout = ({ children }) => {
  const location = useLocation();

  // Define the routes where the Navbar should be hidden
  const gameRoutes = ['/MemoryGames', '/MathGames', '/WordGames'];

  return (
    <div>
      {/* Conditionally render Navbar */}
      {!gameRoutes.includes(location.pathname) && <Navbar />}
      
      {/* Main content */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default GeneralLayout;
