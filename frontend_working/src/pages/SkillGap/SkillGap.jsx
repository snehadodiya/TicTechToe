import React, { useState, useEffect } from 'react';
import './SkillGap.css'

// Main App Component
function SkillGap() {
  // Career data (in a real app, this would come from an API)
  const careerData = {
    "Software Developer": {
      requiredSkills: ["JavaScript", "HTML", "CSS", "React", "Node.js", "Git", "Data Structures", "Algorithms"],
      description: "Designs, builds, and maintains software applications and systems."
    },
    "Data Scientist": {
      requiredSkills: ["Python", "R", "SQL", "Statistics", "Machine Learning", "Data Visualization", "Pandas", "NumPy"],
      description: "Analyzes and interprets complex data to help guide business decisions."
    },
    "UX Designer": {
      requiredSkills: ["UI Design", "User Research", "Wireframing", "Prototyping", "Figma", "Adobe XD", "Typography", "Color Theory"],
      description: "Creates meaningful and relevant experiences for users interacting with products."
    },
    "Digital Marketer": {
      requiredSkills: ["SEO", "Content Marketing", "Social Media", "Email Marketing", "Analytics", "PPC", "CRM", "Copywriting"],
      description: "Promotes brands, products or services using digital channels."
    },
    "Product Manager": {
      requiredSkills: ["Product Strategy", "User Stories", "Market Research", "Roadmapping", "Agile Methodologies", "Data Analysis", "Stakeholder Management", "Presentation Skills"],
      description: "Oversees the development and marketing of products throughout the product lifecycle."
    }
  };

  // Course recommendations database (in a real app, this would come from an API)
  const courseDatabase = {
    "JavaScript": [
      { title: "Modern JavaScript from The Beginning", url: "https://www.youtube.com/watch?v=hdI2bqOjy3c" },
      { title: "JavaScript Crash Course For Beginners", url: "https://www.youtube.com/watch?v=hdI2bqOjy3c" }
    ],
    "React": [
      { title: "React JS Crash Course", url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8" },
      { title: "Full React Tutorial", url: "https://www.youtube.com/watch?v=PL1NUl7fQ2I" }
    ],
    "Python": [
      { title: "Python for Beginners - Learn Python in 1 Hour", url: "https://www.youtube.com/watch?v=kqtD5dpn9C8" },
      { title: "Python Tutorial - Python Full Course for Beginners", url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc" }
    ],
    "Machine Learning": [
      { title: "Machine Learning Course for Beginners", url: "https://www.youtube.com/watch?v=NWONeJKn6kc" },
      { title: "Machine Learning with Python", url: "https://www.youtube.com/watch?v=7eh4d6sabA0" }
    ],
    "UI Design": [
      { title: "UI Design Tutorial for Beginners", url: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU" },
      { title: "UI/UX Design Tutorial", url: "https://www.youtube.com/watch?v=68w2VwalD5w" }
    ],
    "SEO": [
      { title: "SEO Full Course - Learn SEO", url: "https://www.youtube.com/watch?v=xsVTqzratPs" },
      { title: "SEO Tutorial For Beginners", url: "https://www.youtube.com/watch?v=OYZKnMK4Id4" }
    ],
    "Product Strategy": [
      { title: "Product Strategy: The Missing Link", url: "https://www.youtube.com/watch?v=ebyw8UXxAIo" },
      { title: "Building a Product Roadmap", url: "https://www.youtube.com/watch?v=9A9qXcPOmdo" }
    ],
    // Default courses for any skill not specifically listed
    "default": [
      { title: "Introduction to the skill", url: "https://www.youtube.com/results?search_query=learn+" },
      { title: "Beginner's guide", url: "https://www.youtube.com/results?search_query=beginner+" }
    ]
  };

  const [userSkills, setUserSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [skillGaps, setSkillGaps] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Add a new skill to user skills list
  const addSkill = () => {
    if (inputSkill.trim() !== '' && !userSkills.includes(inputSkill.trim())) {
      setUserSkills([...userSkills, inputSkill.trim()]);
      setInputSkill('');
    }
  };

  // Remove a skill from user skills list
  const removeSkill = (skillToRemove) => {
    setUserSkills(userSkills.filter(skill => skill !== skillToRemove));
  };

  // Find skill gaps and recommend courses
  const analyzeSkills = () => {
    if (!selectedCareer) return;

    setIsAnalyzing(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const requiredSkills = careerData[selectedCareer].requiredSkills;
      const missingSkills = requiredSkills.filter(skill => !userSkills.includes(skill));
      
      setSkillGaps(missingSkills);
      
      // Generate course recommendations for missing skills
      const newRecommendations = missingSkills.map(skill => {
        const courses = courseDatabase[skill] || courseDatabase.default.map(course => ({
          ...course,
          url: course.url + skill.toLowerCase().replace(' ', '+')
        }));
        
        return {
          skill,
          courses
        };
      });
      
      setRecommendations(newRecommendations);
      setIsAnalyzing(false);
    }, 1500);
  };

  // Reset the analysis
  const resetAnalysis = () => {
    setSkillGaps([]);
    setRecommendations([]);
  };

  // Run analysis when career changes
  useEffect(() => {
    if (selectedCareer) {
      resetAnalysis();
    }
  }, [selectedCareer]);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Career Skills Gap Analyzer</h1>
        <p className="text-gray-600">Find missing skills for your dream career and get course recommendations</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Information</h2>
          
          {/* User Skills Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Your Skills</label>
            <div className="flex mb-2">
              <input
                type="text"
                value={inputSkill}
                onChange={(e) => setInputSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none"
                placeholder="Enter a skill"
              />
              <button 
                onClick={addSkill}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
              >
                Add
              </button>
            </div>
            
            {/* Skills Display */}
            <div className="flex flex-wrap gap-2 mt-3">
              {userSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                >
                  <span>{skill}</span>
                  <button 
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </div>
              ))}
              {userSkills.length === 0 && (
                <p className="text-gray-500 italic">No skills added yet</p>
              )}
            </div>
          </div>
          
          {/* Career Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Target Career</label>
            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select a career path</option>
              {Object.keys(careerData).map((career) => (
                <option key={career} value={career}>{career}</option>
              ))}
            </select>
            
            {selectedCareer && (
              <p className="mt-2 text-gray-600 text-sm">
                {careerData[selectedCareer].description}
              </p>
            )}
          </div>
          
          {/* Analysis Button */}
          <button 
            onClick={analyzeSkills}
            disabled={!selectedCareer || userSkills.length === 0 || isAnalyzing}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
              !selectedCareer || userSkills.length === 0 || isAnalyzing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Skill Gaps'}
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Results & Recommendations</h2>
          
          {skillGaps.length === 0 && !isAnalyzing ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {selectedCareer 
                  ? 'Click "Analyze Skill Gaps" to see recommendations' 
                  : 'Select a career path and add your skills to get started'}
              </p>
            </div>
          ) : isAnalyzing ? (
            <div className="text-center py-12">
              <p className="text-blue-500 animate-pulse">Analyzing your skills...</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">
                  Skills Required for {selectedCareer}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {careerData[selectedCareer].requiredSkills.map((skill, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        userSkills.includes(skill) 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {skillGaps.length > 0 ? (
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">
                    Skills to Develop:
                  </h3>
                  <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="border-b pb-4">
                        <h4 className="font-medium text-blue-600">{rec.skill}</h4>
                        <p className="text-sm text-gray-600 mb-2">Recommended Courses:</p>
                        <ul className="space-y-2">
                          {rec.courses.map((course, i) => (
                            <li key={i}>
                              <a 
                                href={course.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline flex items-center"
                              >
                                <span className="mr-2">📺</span>
                                {course.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 bg-green-50 rounded-lg">
                  <p className="text-green-600 font-medium">
                    Congratulations! You already have all the required skills for this career path.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SkillGap;