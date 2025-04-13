import React, { useState } from 'react';

// Career data
const careerData = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    description: "Design, develop, and maintain software systems and applications",
    futureProspect: "bright",
    salaryRange: {
      entry: "$70,000 - $90,000",
      mid: "$90,000 - $130,000",
      senior: "$130,000 - $180,000+"
    },
    growthRate: "22% (Much faster than average)",
    demandLevel: 5,
    workLifeBalance: 3,
    whatTheyDo: "Software engineers design, develop, test, and maintain software systems. They collaborate with cross-functional teams to create solutions that meet business requirements and user needs.",
    onTheJob: [
      "Write clean, efficient code in languages like JavaScript, Python, or Java",
      "Design and implement software architecture",
      "Debug and fix software issues",
      "Optimize application performance",
      "Collaborate with designers, product managers, and other engineers"
    ],
    education: "Bachelor's degree in Computer Science, Software Engineering, or related field. Some positions may accept equivalent experience or coding bootcamp certifications.",
    knowledge: [
      "Data Structures & Algorithms",
      "Software Design Patterns",
      "Computer Science Fundamentals",
      "Software Development Lifecycle"
    ],
    skills: [
      "Problem Solving",
      "Logical Thinking",
      "Attention to Detail",
      "Teamwork",
      "Communication"
    ],
    technology: [
      "Programming Languages (JavaScript, Python, Java, etc.)",
      "Web Frameworks (React, Angular, Node.js, etc.)",
      "Version Control (Git)",
      "Cloud Services (AWS, Azure, GCP)",
      "Databases (SQL, NoSQL)"
    ],
    industryTrends: [
      "Increased adoption of AI and machine learning in software development",
      "Growing demand for cloud-native development skills",
      "Rise of remote work and distributed teams",
      "Emphasis on cybersecurity in all applications"
    ]
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Analyze and interpret complex data to help guide business decisions",
    futureProspect: "bright",
    salaryRange: {
      entry: "$85,000 - $110,000",
      mid: "$110,000 - $150,000",
      senior: "$150,000 - $200,000+"
    },
    growthRate: "36% (Much faster than average)",
    demandLevel: 5,
    workLifeBalance: 4,
    whatTheyDo: "Data scientists extract insights from large datasets using statistical methods, machine learning, and data visualization. They help organizations make data-driven decisions and develop predictive models.",
    onTheJob: [
      "Collect, clean, and preprocess large datasets",
      "Develop machine learning models and algorithms",
      "Create data visualizations and reports",
      "Present findings to stakeholders",
      "Collaborate with engineers to implement models in production"
    ],
    education: "Master's or PhD in Data Science, Statistics, Computer Science, or related field. Some positions accept Bachelor's degree with relevant experience.",
    knowledge: [
      "Statistics and Probability",
      "Machine Learning Algorithms",
      "Data Modeling",
      "Experimental Design",
      "Big Data Technologies"
    ],
    skills: [
      "Analytical Thinking",
      "Problem Solving",
      "Data Visualization",
      "Communication",
      "Critical Thinking"
    ],
    technology: [
      "Python, R, or Julia",
      "SQL and NoSQL Databases",
      "Data Visualization Tools (Tableau, Power BI)",
      "Machine Learning Libraries (TensorFlow, PyTorch, scikit-learn)",
      "Big Data Platforms (Hadoop, Spark)"
    ],
    industryTrends: [
      "Integration of AI/ML in nearly every industry",
      "Growing importance of explainable AI and model transparency",
      "Increased demand for real-time data processing",
      "Focus on ethical use of data and privacy concerns"
    ]
  },
  {
    id: "business-analyst",
    title: "Business Analyst",
    description: "Bridge the gap between business needs and technology solutions",
    futureProspect: "stable",
    salaryRange: {
      entry: "$60,000 - $80,000",
      mid: "$80,000 - $110,000",
      senior: "$110,000 - $140,000+"
    },
    growthRate: "14% (Faster than average)",
    demandLevel: 4,
    workLifeBalance: 4,
    whatTheyDo: "Business analysts identify and analyze business problems and opportunities, define requirements, and recommend solutions that enable organizations to achieve their goals.",
    onTheJob: [
      "Gather and document business requirements",
      "Create process models and workflow diagrams",
      "Facilitate meetings with stakeholders",
      "Perform cost-benefit analyses",
      "Write detailed functional specifications"
    ],
    education: "Bachelor's degree in Business Administration, Finance, Information Systems, or related field.",
    knowledge: [
      "Business Process Modeling",
      "Requirements Engineering",
      "Project Management",
      "Enterprise Architecture",
      "Change Management"
    ],
    skills: [
      "Critical Thinking",
      "Communication",
      "Problem Solving",
      "Negotiation",
      "Stakeholder Management"
    ],
    technology: [
      "Microsoft Office Suite (especially Excel)",
      "Business Intelligence Tools (Tableau, Power BI)",
      "Project Management Software",
      "Process Modeling Tools (Visio, Lucidchart)",
      "Basic SQL and Data Analysis Tools"
    ],
    industryTrends: [
      "Increasing integration of data analysis skills",
      "Growing focus on Agile methodologies",
      "Rise of business analysis in digital transformation initiatives",
      "More emphasis on product-oriented approach"
    ]
  }
];

// Simple Career List Item Component
const CareerListItem = ({ career, onClick }) => {
  // Define colors based on future prospect
  const getProspectColor = (prospect) => {
    switch (prospect) {
      case 'bright': return '#e6f7e6'; // Light green background
      case 'stable': return '#e6f0ff'; // Light blue background
      case 'competitive': return '#fff2e6'; // Light orange background
      case 'emerging': return '#f3e6ff'; // Light purple background
      default: return '#f5f5f5'; // Light gray background
    }
  };

  return (
    <div 
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
      onClick={() => onClick(career)}
    >
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>{career.title}</h3>
      <p style={{ color: '#666666', marginBottom: '16px' }}>{career.description}</p>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ color: '#666666', fontSize: '0.875rem', marginRight: '8px' }}>Entry Salary:</span>
        <span style={{ fontWeight: 'medium' }}>{career.salaryRange.entry}</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ color: '#666666', fontSize: '0.875rem', marginRight: '8px' }}>Growth:</span>
        <span style={{ fontWeight: 'medium' }}>{career.growthRate}</span>
      </div>
      
      <div 
        style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: '16px',
          backgroundColor: getProspectColor(career.futureProspect),
          fontSize: '0.875rem',
          fontWeight: '500'
        }}
      >
        {career.futureProspect.charAt(0).toUpperCase() + career.futureProspect.slice(1)} Future
      </div>
    </div>
  );
};

// Simple Career Detail Component
const CareerDetail = ({ career, onBack }) => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: '#3366cc',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px',
          padding: '0',
          fontSize: '1rem'
        }}
      >
        ← Back to Career Selection
      </button>
      
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '16px' }}>{career.title}</h1>
      <p style={{ color: '#666666', marginBottom: '32px', fontSize: '1.125rem' }}>{career.description}</p>
      
      {/* Salary and Demand Info */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '16px', 
        marginBottom: '32px' 
      }}>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Salary Range</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#666666', fontSize: '0.875rem' }}>Entry Level:</span>
            <span style={{ fontWeight: '500' }}>{career.salaryRange.entry}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#666666', fontSize: '0.875rem' }}>Mid-Career:</span>
            <span style={{ fontWeight: '500' }}>{career.salaryRange.mid}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666666', fontSize: '0.875rem' }}>Senior Level:</span>
            <span style={{ fontWeight: '500' }}>{career.salaryRange.senior}</span>
          </div>
        </div>
        
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Market Demand</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#666666', fontSize: '0.875rem' }}>Growth Rate:</span>
            <span style={{ fontWeight: '500' }}>{career.growthRate}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666666', fontSize: '0.875rem' }}>Demand Level:</span>
            <div>
              {Array(5).fill(0).map((_, i) => (
                <span key={i} style={{ 
                  color: i < career.demandLevel ? '#FFD700' : '#e0e0e0',
                  marginLeft: '2px'
                }}>★</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* What They Do Section */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>What They Do</h2>
        <p style={{ marginBottom: '16px' }}>{career.whatTheyDo}</p>
        
        <h3 style={{ fontWeight: 'medium', marginBottom: '12px' }}>On the Job:</h3>
        <ul style={{ 
          listStyle: 'disc',
          paddingLeft: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '8px'
        }}>
          {career.onTheJob.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      
      {/* Education Section */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>Education & Knowledge</h2>
        <h3 style={{ fontWeight: 'medium', marginBottom: '8px' }}>Typical Education:</h3>
        <p style={{ marginBottom: '16px' }}>{career.education}</p>
        
        <h3 style={{ fontWeight: 'medium', marginBottom: '8px' }}>Required Knowledge:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {career.knowledge.map((item, index) => (
            <span key={index} style={{
              display: 'inline-block',
              padding: '4px 12px',
              backgroundColor: '#f0f7ff',
              borderRadius: '16px',
              fontSize: '0.875rem',
              border: '1px solid #d0e0ff'
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>
      
      {/* Skills Section */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>Skills & Abilities</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {career.skills.map((skill, index) => (
            <span key={index} style={{
              display: 'inline-block',
              padding: '4px 12px',
              backgroundColor: '#e6f7e6',
              borderRadius: '16px',
              fontSize: '0.875rem',
              border: '1px solid #c6e7c6'
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      {/* Technology Section */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>Technology Used</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {career.technology.map((item, index) => (
            <span key={index} style={{
              display: 'inline-block',
              padding: '4px 12px',
              backgroundColor: '#f5f5f5',
              borderRadius: '16px',
              fontSize: '0.875rem',
              border: '1px solid #e0e0e0'
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>
      
      {/* Industry Trends Section */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>Industry Trends</h2>
        <ul style={{ paddingLeft: '24px' }}>
          {career.industryTrends.map((trend, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>{trend}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Main Career Explorer Component
const CareerExplorer = () => {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [prospectFilter, setProspectFilter] = useState('all');

  // Filter careers based on search term and prospect filter
  const filteredCareers = careerData.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         career.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProspect = prospectFilter === 'all' || career.futureProspect === prospectFilter;
    return matchesSearch && matchesProspect;
  });

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '32px 16px',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {selectedCareer ? (
        <CareerDetail 
          career={selectedCareer} 
          onBack={() => setSelectedCareer(null)} 
        />
      ) : (
        <>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px' }}>Career Explorer</h1>
            <p style={{ fontSize: '1.25rem', color: '#666666', maxWidth: '800px', margin: '0 auto' }}>
              Discover detailed information about various career paths, including salary ranges, 
              required skills, education, and future prospects.
            </p>
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Search careers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div>
              <select
                value={prospectFilter}
                onChange={(e) => setProspectFilter(e.target.value)}
                style={{
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  width: '100%',
                  maxWidth: '300px'
                }}
              >
                <option value="all">All Prospects</option>
                <option value="bright">Bright Future</option>
                <option value="stable">Stable Future</option>
                <option value="competitive">Competitive Future</option>
                <option value="emerging">Emerging Future</option>
              </select>
            </div>
          </div>
          
          <div>
            {filteredCareers.length > 0 ? (
              filteredCareers.map(career => (
                <CareerListItem 
                  key={career.id} 
                  career={career} 
                  onClick={setSelectedCareer} 
                />
              ))
            ) : (
              <p style={{ textAlign: 'center', padding: '32px', color: '#666666' }}>
                No careers match your search criteria. Try adjusting your filters.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CareerExplorer;