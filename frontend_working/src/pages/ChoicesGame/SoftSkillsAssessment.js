import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyAk_upSq3MJCeNYgGa52bBq6dwnvF1mAPA";
if (!API_KEY) {
  console.error('Gemini API key is not set. Please add REACT_APP_GEMINI_API_KEY to your .env file');
}

const genAI = new GoogleGenerativeAI(API_KEY);

const steps = ['Skill Selection', 'Assessment', 'Results'];

const SoftSkillsAssessment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!API_KEY) {
      setError('Gemini API key is not configured. Please check your .env file.');
    }
  }, []);

  const handleSkillSelect = async (skill) => {
    if (!API_KEY) {
      setError('Gemini API key is not configured. Please check your .env file.');
      return;
    }

    setSelectedSkill(skill);
    setLoading(true);
    setError(null);
    try {
      console.log('Generating questions for soft skill:', skill);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const prompt = `Generate 5 descriptive questions about ${skill} soft skill. Each question should be scenario-based and require a detailed response. Format the response as a JSON array with each question having 'question' and 'evaluationCriteria' fields. Example format: [{"question": "Describe a situation where...", "evaluationCriteria": ["Communication", "Problem Solving", "Teamwork"]}]`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      if (text.startsWith('```')) {
        text = text.replace(/```json\s*|```/g, '').trim();
      }

      console.log('Raw response from Gemini:', text);
      
      try {
        const parsedQuestions = JSON.parse(text);
        if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
          setQuestions(parsedQuestions);
          setActiveStep(1);
        } else {
          throw new Error('Invalid question format received');
        }
      } catch (parseError) {
        console.error('Error parsing questions:', parseError);
        setError('Failed to parse questions. Please try again. Error: ' + parseError.message);
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      setError('Failed to generate questions. Please check your API key and try again. Error: ' + error.message);
    }
    setLoading(false);
  };

  const handleAnswer = (questionIndex, answer) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = async () => {
    if (!API_KEY) {
      setError('Gemini API key is not configured. Please check your .env file.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log('Calculating results for:', { selectedSkill, questions, answers });
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const prompt = `Evaluate the following answers for ${selectedSkill} soft skill questions and provide a detailed assessment. 
        Questions: ${JSON.stringify(questions)}
        Answers: ${JSON.stringify(answers)}
        Provide the response in the following exact JSON format:
        {
          "score": 85,
          "feedback": "Your responses demonstrate strong communication skills...",
          "strengths": ["Clear articulation", "Good problem-solving approach"],
          "improvementAreas": ["Could provide more specific examples", "Consider more diverse perspectives"]
        }`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      // Remove Markdown formatting if present
      if (text.startsWith('```')) {
        text = text.replace(/```json\s*|```/g, '').trim();
      }

      // Ensure the response is properly formatted as JSON
      try {
        const parsedResults = JSON.parse(text);
        
        // Validate the required fields
        if (typeof parsedResults.score !== 'number' || 
            typeof parsedResults.feedback !== 'string' || 
            !Array.isArray(parsedResults.strengths) || 
            !Array.isArray(parsedResults.improvementAreas)) {
          throw new Error('Response missing required fields');
        }

        // Ensure score is between 0 and 100
        parsedResults.score = Math.min(100, Math.max(0, parsedResults.score));
        
        setResults(parsedResults);
        setActiveStep(2);
      } catch (parseError) {
        console.error('Error parsing results:', parseError);
        console.error('Raw response:', text);
        setError('Failed to parse results. Please try again. Error: ' + parseError.message);
      }
    } catch (error) {
      console.error('Error calculating results:', error);
      setError('Failed to calculate results. Please check your API key and try again. Error: ' + error.message);
    }
    setLoading(false);
  };

  const renderSkillSelection = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Select a Soft Skill to Assess
      </Typography>
      {!API_KEY && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Gemini API key is not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file.
        </Alert>
      )}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
        {['Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Time Management'].map((skill) => (
          <Button
            key={skill}
            variant={selectedSkill === skill ? 'contained' : 'outlined'}
            onClick={() => handleSkillSelect(skill)}
            disabled={loading || !API_KEY}
          >
            {skill}
          </Button>
        ))}
      </Box>
    </Box>
  );

  const renderAssessment = () => (
    <Box sx={{ mt: 2 }}>
      {questions.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Question {currentQuestion + 1} of {questions.length}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {questions[currentQuestion].question}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Evaluation Criteria: {questions[currentQuestion].evaluationCriteria.join(', ')}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={answers[currentQuestion] || ''}
              onChange={(e) => handleAnswer(currentQuestion, e.target.value)}
              placeholder="Type your answer here..."
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 2 }}
              disabled={!answers[currentQuestion] || loading}
            >
              {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );

  const renderResults = () => (
    <Box sx={{ mt: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Assessment Results
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            Score: {results?.score}%
          </Typography>
          <Typography variant="body1" gutterBottom>
            {results?.feedback}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
            Your Strengths:
          </Typography>
          <ul>
            {results?.strengths?.map((strength, index) => (
              <li key={index}>
                <Typography variant="body1">{strength}</Typography>
              </li>
            ))}
          </ul>
          <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
            Areas for Improvement:
          </Typography>
          <ul>
            {results?.improvementAreas?.map((area, index) => (
              <li key={index}>
                <Typography variant="body1">{area}</Typography>
              </li>
            ))}
          </ul>
          <Button
            variant="outlined"
            onClick={() => {
              setActiveStep(0);
              setSelectedSkill('');
              setQuestions([]);
              setCurrentQuestion(0);
              setAnswers({});
              setResults(null);
            }}
            sx={{ mt: 2 }}
          >
            Start New Assessment
          </Button>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {activeStep === 0 && renderSkillSelection()}
          {activeStep === 1 && renderAssessment()}
          {activeStep === 2 && renderResults()}
        </>
      )}
    </Paper>
  );
};

export default SoftSkillsAssessment; 