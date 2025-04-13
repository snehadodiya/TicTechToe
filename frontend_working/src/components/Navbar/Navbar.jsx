import React, { useState, useEffect } from 'react';
import "./Navbar.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/fetchWithAuth';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showResumeDropdown, setShowResumeDropdown] = useState(false);
  const [showResumDropdown, setShowResumDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetchWithAuth('http://localhost:8000/logout/', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      localStorage.removeItem('access_token');
      localStorage.removeItem('refreshtoken');
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='header-div'>
      <nav className='top-div'>
        <div className="nav-links">
          <ul type="none">
            <NavLink to="/homepage" className="nav-link">Home</NavLink>
            <NavLink to="/career-recommendations" className="nav-link">Find Career</NavLink>
            <NavLink to="/advisor" className="nav-link">Ai Career Advisor</NavLink>
            <div 
              className="resume-dropdown"
              onMouseEnter={() => setShowResumeDropdown(true)}
              onMouseLeave={() => setShowResumeDropdown(false)}
            >
              <span className="nav-link">Resume</span>
              {showResumeDropdown && (
                <div className="dropdown-content">
                  <NavLink to="/resume-builder" className="dropdown-item">Resume Builder</NavLink>
                  <NavLink to="/enhance-resume" className="dropdown-item">Enhance Resume</NavLink>
                </div>
              )}
            </div>

            <div 
              className="resum-dropdown"
              onMouseEnter={() => setShowResumDropdown(true)}
              onMouseLeave={() => setShowResumDropdown(false)}
            >
              <span className="nav-link">Skill Assesment</span>
              {showResumDropdown && (
                <div className="dropdown-content">
                  <NavLink to="/Tech-Skills" className="dropdown-item">Tech-Skills</NavLink>
                  <NavLink to="/Soft-Skills" className="dropdown-item">Soft-Skills</NavLink>
                  <NavLink to="/Coding-Ass" className="dropdown-item">Coding-Ass</NavLink>
                </div>
              )}
            </div>
            <NavLink to="/skill-gap" className="nav-link">Course Reccomendations</NavLink>
            <NavLink to="/career-path" className="nav-link">Explore Career Path</NavLink>
            <NavLink to="/community" className="nav-link">Community</NavLink>
          </ul>
        </div>
        
        <div 
          className="profile-dropdown"
          onMouseEnter={() => setShowProfileDropdown(true)}
          onMouseLeave={() => setShowProfileDropdown(false)}
        >
          <div className="profile-icon">
            <i className="fas fa-user-circle"></i>
          </div>
          {showProfileDropdown && (
            <div className="dropdown-content">
              <NavLink to="/profile" className="dropdown-item">Profile</NavLink>
              <div className="dropdown-item" onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </nav>

     
    </div>
  );
};

export default Navbar;