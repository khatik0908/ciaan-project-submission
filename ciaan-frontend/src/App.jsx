import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const Navigation = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
      // We can force a refresh to ensure all components reset their state
      window.location.reload();
    };

    return (
      <header className="bg-gray-800/80 backdrop-blur-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            Mini-LinkedIn
          </Link>
          <div className="flex items-center space-x-4">
            {token ? (
              <button onClick={handleLogout} className="text-lg font-medium text-gray-300 hover:text-white transition-colors">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">Login</Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-gray-100">
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;