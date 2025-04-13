import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Paper
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import API from '../api';

const ProfileForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    'Education',
    'Experience',
    'Skills & Interests',
    'Career Goals & Links'
  ];

  const [profileData, setProfileData] = useState({
    education: [{ degree: "", institution: "", startYear: "", endYear: ""}],
    experience: [{
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: ""
    }],
    skills: [""],
    interests: [""],
    careerGoals: "",
    resumeUrl: "",
    profilePicUrl: ""
  });

  const handleChange = (section, index, field, value) => {
    const newSection = [...profileData[section]];
    newSection[index][field] = value;
    setProfileData({ ...profileData, [section]: newSection });
  };

  const handleAddField = (section, defaultObj) => {
    setProfileData({
      ...profileData,
      [section]: [...profileData[section], defaultObj],
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    if (!token) {
      setErrorMessage("You need to be logged in to update your profile.");
      return;
    }
  
    try {
      const res = await API.put('/profile', profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Profile updated successfully:", res.data);
      setErrorMessage("Profile updated successfully!");
    } catch (error) {
      // Inspect the full error response to understand the issue
      console.error("Error response:", error.response);
      setErrorMessage(error.response ? error.response.data.message : "Error updating profile");
    }
  };
  

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Typography variant="h6" mt={2}>Education</Typography>
            {profileData.education.map((edu, index) => (
              <Box key={index} display="flex" flexDirection="column" gap={2} mb={4} p={2} sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                <TextField
                  label="Degree"
                  value={edu.degree}
                  onChange={(e) => handleChange("education", index, "degree", e.target.value)}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  label="Institution"
                  value={edu.institution}
                  onChange={(e) => handleChange("education", index, "institution", e.target.value)}
                  fullWidth
                  margin="dense"
                />
                <Box display="flex" gap={2}>
                  <TextField
                    label="Start Year"
                    type="number"
                    value={edu.startYear}
                    onChange={(e) => handleChange("education", index, "startYear", e.target.value)}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="End Year"
                    type="number"
                    value={edu.endYear}
                    onChange={(e) => handleChange("education", index, "endYear", e.target.value)}
                    fullWidth
                    margin="dense"
                  />
                </Box>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={() =>
                handleAddField("education", {
                  degree: "",
                  institution: "",
                  startYear: "",
                  endYear: "",
                })
              }
              sx={{ mb: 3 }}
              variant="outlined"
            >
              Add Education
            </Button>
          </>
        );
      case 1:
        return (
          <>
            <Typography variant="h6" mt={2}>Experience</Typography>
            {profileData.experience.map((exp, index) => (
              <Box key={index} display="flex" flexDirection="column" gap={2} mb={4} p={2} sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                <TextField
                  label="Job Title"
                  value={exp.jobTitle}
                  onChange={(e) => handleChange("experience", index, "jobTitle", e.target.value)}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  label="Company"
                  value={exp.company}
                  onChange={(e) => handleChange("experience", index, "company", e.target.value)}
                  fullWidth
                  margin="dense"
                />
                <Box display="flex" gap={2}>
                  <TextField
                    label="Start Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={exp.startDate}
                    onChange={(e) => handleChange("experience", index, "startDate", e.target.value)}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="End Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={exp.endDate}
                    onChange={(e) => handleChange("experience", index, "endDate", e.target.value)}
                    fullWidth
                    margin="dense"
                  />
                </Box>
                <TextField
                  label="Description"
                  multiline
                  rows={3}
                  value={exp.description}
                  onChange={(e) => handleChange("experience", index, "description", e.target.value)}
                  fullWidth
                  margin="dense"
                />
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={() =>
                handleAddField("experience", {
                  jobTitle: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
              sx={{ mb: 3 }}
              variant="outlined"
            >
              Add Experience
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h6" mt={2}>Skills & Interests</Typography>
            <TextField
              label="Skills (comma separated)"
              fullWidth
              margin="normal"
              value={profileData.skills.join(", ")}
              onChange={(e) =>
                setProfileData({ ...profileData, skills: e.target.value.split(",").map(s => s.trim()) })
              }
            />
            <TextField
              label="Interests (comma separated)"
              fullWidth
              margin="normal"
              value={profileData.interests.join(", ")}
              onChange={(e) =>
                setProfileData({ ...profileData, interests: e.target.value.split(",").map(i => i.trim()) })
              }
            />
          </>
        );
      case 3:
        return (
          <>
            <Typography variant="h6" mt={2}>Career Goals & Links</Typography>
            <TextField
              label="Career Goals"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={profileData.careerGoals}
              onChange={(e) => setProfileData({ ...profileData, careerGoals: e.target.value })}
            />
            <TextField
              label="Resume URL"
              fullWidth
              margin="normal"
              value={profileData.resumeUrl}
              onChange={(e) => setProfileData({ ...profileData, resumeUrl: e.target.value })}
            />
            <TextField
              label="Profile Picture URL"
              fullWidth
              margin="normal"
              value={profileData.profilePicUrl}
              onChange={(e) => setProfileData({ ...profileData, profilePicUrl: e.target.value })}
            />
          </>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 3 }}>
      <Typography variant="h4" mb={4} textAlign="center">Complete Your Profile</Typography>
      
      {errorMessage && (
        <Box sx={{ mb: 2, p: 2, bgcolor: errorMessage.includes("successfully") ? "success.light" : "error.light", borderRadius: 1 }}>
          <Typography>{errorMessage}</Typography>
        </Box>
      )}

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="contained"
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Profile
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileForm;