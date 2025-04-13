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
  Card,
  CardContent,
  Alert,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import Editor from '@monaco-editor/react';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = '28847d5062msh7765000cb39f01cp14c5f4jsna69c60657620'; // You'll need to get this from RapidAPI

const steps = ['Problem Selection', 'Coding', 'Results'];

const CodingAssessment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const problems = [
    {
      id: 1,
      title: 'Two Sum',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      difficulty: 'Easy',
      testCases: [
        { input: '[2,7,11,15]\n9', output: '[0,1]' },
        { input: '[3,2,4]\n6', output: '[1,2]' },
      ],
      starterCode: {
        javascript: 'function twoSum(nums, target) {\n    // Your code here\n}',
        python: 'def twoSum(nums, target):\n    # Your code here',
      },
    },
    {
      id: 2,
      title: 'Palindrome Number',
      description: 'Given an integer x, return true if x is a palindrome, and false otherwise.',
      difficulty: 'Easy',
      testCases: [
        { input: '121', output: 'true' },
        { input: '-121', output: 'false' },
      ],
      starterCode: {
        javascript: 'function isPalindrome(x) {\n    // Your code here\n}',
        python: 'def isPalindrome(x):\n    # Your code here',
      },
    },
  ];

  const languages = [
    { id: 63, name: 'JavaScript', value: 'javascript' },
    { id: 71, name: 'Python', value: 'python' },
  ];

  useEffect(() => {
    if (selectedProblem && language) {
      setCode(selectedProblem.starterCode[language] || '');
    }
  }, [selectedProblem, language]);

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    setActiveStep(1);
  };

  const handleSubmit = async () => {
    if (!JUDGE0_API_KEY) {
      setError('Judge0 API key is not configured. Please add your RapidAPI key.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const selectedLanguage = languages.find(l => l.value === language);
      if (!selectedLanguage) {
        throw new Error('Invalid language selected');
      }

      // Submit code to Judge0
      const submissionResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
        body: JSON.stringify({
          source_code: code,
          language_id: selectedLanguage.id,
          stdin: selectedProblem.testCases.map(tc => tc.input).join('\n'),
          expected_output: selectedProblem.testCases.map(tc => tc.output).join('\n'),
          cpu_time_limit: 5,
          memory_limit: 512000,
        }),
      });

      if (!submissionResponse.ok) {
        const errorData = await submissionResponse.json();
        throw new Error(`HTTP error! status: ${submissionResponse.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      const result = await submissionResponse.json();

      if (!result || !result.status) {
        throw new Error('Invalid response from Judge0 API');
      }

      const testResults = result.stdout ? result.stdout.split('\n') : [];
      const passedTests = testResults.filter((output, index) => 
        output.trim() === selectedProblem.testCases[index].output.trim()
      ).length;

      const score = Math.round((passedTests / selectedProblem.testCases.length) * 100);
      
      setResults({
        score,
        passedTests,
        totalTests: selectedProblem.testCases.length,
        status: result.status.description || 'Unknown status',
        output: result.stdout || '',
        error: result.stderr || '',
        time: result.time || 'N/A',
        memory: result.memory || 'N/A',
      });
      setActiveStep(2);
    } catch (error) {
      console.error('Error submitting code:', error);
      setError(`Failed to evaluate code. Please try again. Error: ${error.message}`);
    }
    setLoading(false);
  };

  const renderProblemSelection = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Select a Coding Problem
      </Typography>
      {!JUDGE0_API_KEY && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Judge0 API key is not configured. Please add your RapidAPI key.
        </Alert>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        {problems.map((problem) => (
          <Card key={problem.id}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {problem.title}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Difficulty: {problem.difficulty}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {problem.description}
              </Typography>
              <Button
                variant="contained"
                onClick={() => handleProblemSelect(problem)}
                disabled={!JUDGE0_API_KEY}
                sx={{ mt: 2 }}
              >
                Start Coding
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );

  const renderCoding = () => (
    <Box sx={{ mt: 2 }}>
      {selectedProblem && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {selectedProblem.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {selectedProblem.description}
            </Typography>
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                label="Language"
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.id} value={lang.value}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ height: '400px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
              <Editor
                height="100%"
                defaultLanguage={language}
                value={code}
                onChange={(value) => setCode(value)}
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || !code}
              sx={{ mt: 2 }}
            >
              Submit Code
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
            Passed {results?.passedTests} out of {results?.totalTests} test cases
          </Typography>
          <Typography variant="body1" gutterBottom>
            Status: {results?.status}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Time: {results?.time} seconds
          </Typography>
          <Typography variant="body1" gutterBottom>
            Memory: {results?.memory} bytes
          </Typography>
          {results?.error && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
                Error:
              </Typography>
              <Typography variant="body1" color="error" gutterBottom>
                {results.error}
              </Typography>
            </>
          )}
          {results?.output && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
                Output:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {results.output}
              </Typography>
            </>
          )}
          <Button
            variant="outlined"
            onClick={() => {
              setActiveStep(0);
              setSelectedProblem(null);
              setCode('');
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
    <Paper sx={{ p: 3 }}>
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
          {activeStep === 0 && renderProblemSelection()}
          {activeStep === 1 && renderCoding()}
          {activeStep === 2 && renderResults()}
        </>
      )}
    </Paper>
  );
};

export default CodingAssessment; 