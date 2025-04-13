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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Check if API key is available
const API_KEY = "AIzaSyAk_upSq3MJCeNYgGa52bBq6dwnvF1mAPA";
if (!API_KEY) {
  console.error('Gemini API key is not set. Please add REACT_APP_GEMINI_API_KEY to your .env file');
}

const genAI = new GoogleGenerativeAI(API_KEY);

const steps = ['Skill Selection', 'Assessment', 'Results'];

const SkillAssessment = () => {
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
    } else {
      // List available models
      const listModels = async () => {
        try {
          const models = await genAI.listModels();
          console.log('Available models:', models);
        } catch (error) {
          console.error('Error listing models:', error);
        }
      };
      listModels();
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
      console.log('Generating questions for skill:', skill);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const prompt = `Generate 5 multiple choice questions about ${skill} with 4 options each. Format the response as a JSON array with each question having 'question', 'options' array, and 'correctAnswer' fields. Example format: [{"question": "What is...", "options": ["A", "B", "C", "D"], "correctAnswer": "A"}]`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      // Remove Markdown formatting if present
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
      const prompt = `Based on the following answers for ${selectedSkill} questions, provide a score and improvement tips. 
        Questions: ${JSON.stringify(questions)}
        Answers: ${JSON.stringify(answers)}
        Format the response as JSON with 'score' (percentage), 'feedback', and 'improvementTips' (array) fields.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      // Remove Markdown formatting if present
      if (text.startsWith('```')) {
      text = text.replace(/```json\s*|```/g, '').trim();
      }
      console.log('Raw results from Gemini:', text);
      
      try {
        const parsedResults = JSON.parse(text);
        if (parsedResults.score && parsedResults.feedback && parsedResults.improvementTips) {
          setResults(parsedResults);
          setActiveStep(2);
        } else {
          throw new Error('Invalid results format received');
        }
      } catch (parseError) {
        console.error('Error parsing results:', parseError);
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
        Select a Skill to Assess
      </Typography>
      {!API_KEY && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Gemini API key is not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file.
        </Alert>
      )}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
        {['JavaScript', 'React', 'Python', 'Java', 'SQL'].map((skill) => (
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
            <FormControl component="fieldset">
              <RadioGroup
                value={answers[currentQuestion] || ''}
                onChange={(e) => handleAnswer(currentQuestion, e.target.value)}
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
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
            Improvement Tips:
          </Typography>
          <ul>
            {results?.improvementTips?.map((tip, index) => (
              <li key={index}>
                <Typography variant="body1">{tip}</Typography>
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

export default SkillAssessment; 