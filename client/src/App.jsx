// src/App.js
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import AdminLayout from './layouts/AdminLayout';
import GeneralLayout from './layouts/GeneralLayout';
import Loader from './components/Loader'; // Loader component
import Services from './pages/general/Services';
import GameSection from './pages/general/GameSection';
import GameSect from './pages/general/GameSect';
import MemoryGame from './pages/Games/MemoryGames';
import MathGame from './pages/Games/MathGame';
import WordMatch from './pages/Games/WordMatch';
import User from './pages/admin/User';
import ScoreTracking from './pages/admin/ScoreTracking';
import UploadVideos from './pages/admin/UploadVideos';
import AnimalGame from './pages/Games/AnimalGames';
import PrivateRoute from "./components/PrivateRoute"; // Import the private route component
import FAQs from './pages/general/FAQs';
import ForgotPassword from './pages/general/ForgotPassword';
import OurTeam from './pages/general/OurTeam';

// Lazy load the pages
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Games = lazy(() => import('./pages/admin/User'));
const Videos = lazy(() => import('./pages/admin/ScoreTracking'));
const LandingPage = lazy(() => import('./pages/general/LandingPage'));
const AboutUs = lazy(() => import('./pages/general/AboutUs'));
const Login = lazy(() => import('./pages/general/Login'));
const Register = lazy(() => import('./pages/general/Register'));

// Custom hook to track page changes and trigger loader
const usePageLoader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Trigger loader on route change
    setLoading(true);

    // Ensure loader stays for at least 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1-second duration

    return () => clearTimeout(timer); // Cleanup timeout on unmount or route change
  }, [location]);

  return loading;
};

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
};

// Separated component to handle routes and the loader logic
const AppRoutes = () => {
  const isLoading = usePageLoader(); // Check if loading state is active

  return isLoading ? (
    <Loader />
  ) : (
    <Routes>
      {/* General Pages */}
      <Route path="/" element={<GeneralLayout><LandingPage /></GeneralLayout>} />
      <Route path="/about" element={<GeneralLayout><AboutUs /></GeneralLayout>} />
      <Route path="/login" element={<GeneralLayout><Login /></GeneralLayout>} />
      <Route path="/register" element={<GeneralLayout><Register /></GeneralLayout>} />
      <Route path="/services" element={<GeneralLayout><Services /></GeneralLayout>} />
      <Route path="/VideoSection" element={<GeneralLayout><GameSection /></GeneralLayout>} />
      <Route path="/GamesSection" element={<GeneralLayout><GameSect /></GeneralLayout>} />
      <Route path="/Faqs" element={<GeneralLayout><FAQs /></GeneralLayout>}/>
      <Route path="/forgot-password" element={<GeneralLayout><ForgotPassword /></GeneralLayout>}/>
      <Route path="/ourteam" element={<GeneralLayout><OurTeam /></GeneralLayout>}/>

      {/* Admin Pages - Protected Routes */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" />} /> {/* Default to dashboard */}
      <Route path="/admin/dashboard" element={<PrivateRoute><AdminLayout><Dashboard /></AdminLayout></PrivateRoute>} />
      <Route path="/admin/user" element={<PrivateRoute><AdminLayout><User /></AdminLayout></PrivateRoute>} />
      <Route path="/admin/tracking" element={<PrivateRoute><AdminLayout><ScoreTracking /></AdminLayout></PrivateRoute>} />
      <Route path="/admin/upload" element={<PrivateRoute><AdminLayout><UploadVideos /></AdminLayout></PrivateRoute>} />

      {/* Game Pages */}
      <Route path="/MemoryGames" element={<MemoryGame />} />
      <Route path="/MathGames" element={<MathGame />} />
      <Route path="/WordGames" element={<WordMatch />} />
      <Route path="/AnimalGames" element={<AnimalGame />} />
    </Routes>
  );
};

export default App;
