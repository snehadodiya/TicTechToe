import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import HomePage from './pages/Homepage.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ResumeBuilder from './components/Body/Body.jsx'
import WordToCV from './pages/WordToCV/WordToCV.jsx'
import TechSkills from './pages/ChoicesGame/ChoicesGame.jsx'
import SoftSkills from './pages/ChoicesGame/SoftSkillsAssessment.js'
import CodingAss from './pages/ChoicesGame/CodingAssessment.js'
import SkillGap from './pages/SkillGap/SkillGap.jsx'
import Community from './pages/Community/Community.jsx'
import ProfileDetailsForm from './pages/Profileform.jsx'
import ProtectedRoute from './components/ProtectedRoutes.js'
import CareerExplorer from './pages/CareerExplorer/CareerExplorer.jsx'
import CareerRecommandations from './pages/CareerRecommandations/CareerRecommandations.jsx'
import './App.css'

function App() {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/login" || location.pathname === "/register";

  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullname: '',
    title: '',
    experience: '',
    education: '',
    personal_website: '',
  });

  // Fetch existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        return;
      }
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData({
            fullname: data.fullname || '',
            title: data.title || '',
            experience: data.experience || '',
            education: data.education || '',
            personal_website: data.personal_website || '',
            role: data.role || ''
          });
          console.log(profileData)
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [navigate]);


  return (
    <div className="app-container">
      {!hideNavbarFooter && <Navbar />}
      
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route index path="/homepage" element={<HomePage />}></Route>
          <Route index path="/resume-builder" element={<ResumeBuilder />}></Route>
          <Route index path="/enhance-resume" element={<WordToCV />}></Route>
          <Route index path="/Tech-Skills" element={<TechSkills />}></Route>
          <Route index path="/Soft-Skills" element={<SoftSkills />}></Route>
          <Route index path="/Coding-Ass" element={<CodingAss />}></Route>
          <Route index path="/skill-gap" element={<SkillGap />}></Route>
          <Route index path="/career-path" element={<CareerExplorer />}></Route>
          <Route index path="/community" element={<Community />}></Route>
          <Route index path="/career-recommendations" element={<CareerRecommandations />}></Route>
          <Route 
            path="/profile" 
            element={<ProtectedRoute><ProfileDetailsForm /></ProtectedRoute>} 
          />
        </Routes>
      </main>

      {!hideNavbarFooter && <Footer />}
    </div>
  )
}

export default App;
