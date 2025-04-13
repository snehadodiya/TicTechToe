import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import theme from './theme.js';
import './CareerRecommandaions.css'

function CareerRecommandations() {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showCompanies, setShowCompanies] = useState(false);

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
      setError('');
    } else {
      setError('Please upload a PDF file');
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!file && !resumeText.trim()) {
      setError('Please upload a resume or enter resume text');
      return;
    }
  
    setLoading(true);
    setError('');
    
    try {
      let response;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        response = await fetch('http://localhost:5000/upload_resume', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('http://localhost:5000/submit_text_resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resume_text: resumeText }),
        });
      }
  
      // Clone the response before reading it
      const clonedResponse = response.clone();
      
      // First, check if the response is OK
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }
      
      // If response is OK, read from the cloned response
      const data = await clonedResponse.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowCompanies(true);
  };

  const handleBackToJobs = () => {
    setShowCompanies(false);
    setSelectedJob(null);
  };

  // Mock company data - in a real app, this would come from an API
  const getCompaniesForJob = (jobTitle) => {
    // This function returns companies that match the job title
    // In a real app, this would be an API call
    const allCompanies = [
      {
        name: 'TechCorp',
        logo: 'https://images.unsplash.com/photo-1549082984-1323b94df9a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80',
        description: 'TechCorp is a leading technology company specializing in software development and AI solutions.',
        location: 'San Francisco, CA',
        website: 'www.techcorp.com',
        salary: '$120,000 - $150,000',
        rating: 4.5,
        reviews: 128,
        benefits: ['Health Insurance', '401(k) Matching', 'Remote Work Options'],
        requirements: ['3+ years of experience', 'Bachelor\'s degree in Computer Science'],
        culture: 'TechCorp fosters a collaborative environment where innovation is encouraged.'
      },
      {
        name: 'DataFlow Systems',
        logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80',
        description: 'DataFlow Systems is a data analytics company that helps businesses make sense of their data.',
        location: 'New York, NY',
        website: 'www.dataflowsystems.com',
        salary: '$130,000 - $160,000',
        rating: 4.2,
        reviews: 95,
        benefits: ['Competitive Salary', 'Stock Options', 'Flexible Hours'],
        requirements: ['5+ years of experience', 'Master\'s degree preferred'],
        culture: 'At DataFlow, we value creativity and innovation.'
      },
      {
        name: 'InnovateAI',
        logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80',
        description: 'InnovateAI is at the forefront of artificial intelligence research and development.',
        location: 'Seattle, WA',
        website: 'www.innovateai.com',
        salary: '$140,000 - $170,000',
        rating: 4.7,
        reviews: 112,
        benefits: ['Comprehensive Health Coverage', 'Unlimited PTO', 'Home Office Setup'],
        requirements: ['PhD in AI, ML, or related field', 'Published research papers'],
        culture: 'InnovateAI is a research-driven company that encourages experimentation.'
      },
      {
        name: 'CloudTech Solutions',
        logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80',
        description: 'CloudTech Solutions provides cloud infrastructure and services for enterprises worldwide.',
        location: 'Austin, TX',
        website: 'www.cloudtechsolutions.com',
        salary: '$125,000 - $155,000',
        rating: 4.3,
        reviews: 87,
        benefits: ['Health Insurance', '401(k)', 'Remote Work', 'Learning Budget'],
        requirements: ['4+ years of cloud experience', 'AWS/Azure certification'],
        culture: 'CloudTech promotes a culture of continuous learning and innovation.'
      },
      {
        name: 'SecureNet Systems',
        logo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80',
        description: 'SecureNet Systems specializes in cybersecurity solutions for businesses of all sizes.',
        location: 'Boston, MA',
        website: 'www.securenetsystems.com',
        salary: '$135,000 - $165,000',
        rating: 4.4,
        reviews: 76,
        benefits: ['Health Insurance', '401(k)', 'Gym Membership', 'Professional Development'],
        requirements: ['5+ years of security experience', 'CISSP certification preferred'],
        culture: 'SecureNet values integrity, innovation, and collaboration.'
      },
      {
        name: 'MobileFirst Technologies',
        logo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80',
        description: 'MobileFirst Technologies develops cutting-edge mobile applications and solutions.',
        location: 'Chicago, IL',
        website: 'www.mobilefirsttech.com',
        salary: '$115,000 - $145,000',
        rating: 4.1,
        reviews: 64,
        benefits: ['Health Insurance', '401(k)', 'Flexible Hours', 'Team Events'],
        requirements: ['3+ years of mobile development', 'iOS/Android experience'],
        culture: 'MobileFirst fosters a creative and collaborative environment.'
      },
      {
        name: 'Quantum Computing Labs',
        logo: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80',
        description: 'Quantum Computing Labs is pioneering the future of quantum computing technology.',
        location: 'Boulder, CO',
        website: 'www.quantumcomputinglabs.com',
        salary: '$150,000 - $180,000',
        rating: 4.6,
        reviews: 42,
        benefits: ['Health Insurance', '401(k)', 'Research Budget', 'Conference Attendance'],
        requirements: ['PhD in Physics or related field', 'Quantum computing experience'],
        culture: 'Quantum Computing Labs encourages groundbreaking research and innovation.'
      },
      {
        name: 'GreenTech Innovations',
        logo: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80',
        description: 'GreenTech Innovations develops sustainable technology solutions for a better future.',
        location: 'Portland, OR',
        website: 'www.greentechinnovations.com',
        salary: '$110,000 - $140,000',
        rating: 4.3,
        reviews: 53,
        benefits: ['Health Insurance', '401(k)', 'Remote Work', 'Environmental Initiatives'],
        requirements: ['3+ years of experience', 'Passion for sustainability'],
        culture: 'GreenTech is committed to environmental sustainability and innovation.'
      }
    ];

    // Filter companies based on job title (in a real app, this would be more sophisticated)
    return allCompanies;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static" elevation={0} sx={{ backgroundColor: 'background.paper' }}>
          <Toolbar>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              AI Resume Analyzer
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Container component="main" sx={{ mt: 4, mb: 4, flex: 1, width: '100%', maxWidth: '100%', px: 0 }}>
          <Paper
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              borderRadius: 2,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              width: '100%',
              mx: 0,
            }}
          >
            {!showCompanies ? (
              <>
                <Typography variant="h4" color="text.primary" gutterBottom>
                  Upload Your Resume
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadFileIcon />}
                    sx={{ 
                      alignSelf: 'flex-start',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                      },
                    }}
                  >
                    Upload PDF Resume
                    <input
                      type="file"
                      hidden
                      accept=".pdf"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  {file && (
                    <Typography variant="body2" color="text.secondary">
                      Selected file: {file.name}
                    </Typography>
                  )}

                  <Typography variant="h6" color="text.primary">
                    Or Paste Resume Text
                  </Typography>
                  <TextField
                    multiline
                    rows={4}
                    placeholder="Paste your resume text here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading || (!file && !resumeText.trim())}
                    sx={{ 
                      alignSelf: 'flex-start',
                      borderRadius: 2,
                      px: 4,
                      py: 1,
                    }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Analyze Resume'}
                  </Button>

                  {error && (
                    <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                      {error}
                    </Alert>
                  )}
                </Box>

                {results && (
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" color="text.primary" gutterBottom>
                      Extracted Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                      {results.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          color="primary"
                          variant="outlined"
                          sx={{ 
                            borderRadius: 2,
                            '&:hover': {
                              backgroundColor: 'primary.main',
                              color: 'white',
                            },
                          }}
                        />
                      ))}
                    </Box>

                    <Typography variant="h5" color="text.primary" gutterBottom>
                      Recommended Jobs
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 3,
                      justifyContent: 'flex-start',
                    }}>
                      {results.jobs.map((job, index) => (
                        <Box 
                          key={index}
                          sx={{ 
                            width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' },
                            minHeight: '100%',
                          }}
                        >
                          <Card 
                            sx={{ 
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              borderRadius: 3,
                              border: '1px solid',
                              borderColor: 'primary.light',
                              transition: 'transform 0.2s, box-shadow 0.2s',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 8px 16px rgba(10, 101, 204, 0.15)',
                              },
                            }}
                          >
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                              <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                mb: 2,
                                pb: 1,
                                borderBottom: '1px solid',
                                borderColor: 'primary.light',
                              }}>
                                <WorkIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6" color="primary" component="div">
                                  {job.title}
                                </Typography>
                              </Box>
                              
                              {job.company && (
                                <Box sx={{ mb: 2 }}>
                                  <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500 }}>
                                    {job.company}
                                  </Typography>
                                </Box>
                              )}
                              
                              {job.location && (
                                <Box sx={{ mb: 2 }}>
                                  <Typography variant="body2" color="text.secondary">
                                    {job.location}
                                  </Typography>
                                </Box>
                              )}
                              
                              <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                backgroundColor: 'rgba(10, 101, 204, 0.1)',
                                color: 'primary.main',
                                p: 1.5,
                                borderRadius: 2,
                                width: 'fit-content',
                                mt: 2,
                              }}>
                                <Typography variant="h6" component="div">
                                  {job.salary}
                                </Typography>
                              </Box>
                            </CardContent>
                            
                            <CardActions sx={{ p: 2, pt: 0 }}>
                              <Button 
                                variant="contained" 
                                fullWidth
                                onClick={() => handleApplyNow(job)}
                                sx={{ 
                                  borderRadius: 2,
                                  textTransform: 'none',
                                  py: 1,
                                }}
                              >
                                Apply Now
                              </Button>
                            </CardActions>
                          </Card>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </>
            ) : (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Button 
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBackToJobs}
                    sx={{ 
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'rgba(10, 101, 204, 0.1)',
                      },
                    }}
                  >
                    Back to Jobs
                  </Button>
                </Box>
                
                <Typography variant="h4" color="text.primary" gutterBottom>
                  Companies Hiring for {selectedJob.title}
                </Typography>
                
                <Typography variant="body1" color="text.secondary" paragraph>
                  Here are companies currently hiring for this position. Click on a company to learn more and apply.
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 3,
                  pb: 2,
                  justifyContent: 'center',
                }}>
                  {getCompaniesForJob(selectedJob.title).map((company, index) => (
                    <Card 
                      key={index}
                      sx={{ 
                        width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' },
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'primary.light',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 16px rgba(10, 101, 204, 0.15)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 2,
                        }}>
                          <Box 
                            component="img" 
                            src={company.logo} 
                            alt={company.name}
                            sx={{ 
                              width: 60, 
                              height: 60, 
                              borderRadius: 2,
                              mr: 2,
                              objectFit: 'cover',
                            }}
                          />
                          <Box>
                            <Typography variant="h6" color="primary" component="div">
                              {company.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {company.location}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {company.description}
                        </Typography>
                        
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          backgroundColor: 'rgba(10, 101, 204, 0.1)',
                          color: 'primary.main',
                          p: 1.5,
                          borderRadius: 2,
                          width: 'fit-content',
                          mb: 2,
                        }}>
                          <Typography variant="h6" component="div">
                            {company.salary}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                            Rating:
                          </Typography>
                          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                            {company.rating} ({company.reviews} reviews)
                          </Typography>
                        </Box>
                      </CardContent>
                      
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button 
                          variant="contained" 
                          fullWidth
                          onClick={() => alert(`Application submitted to ${company.name}`)}
                          sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                            py: 1,
                          }}
                        >
                          Apply Now
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Container>
        
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: 'background.paper',
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CareerRecommandations;
