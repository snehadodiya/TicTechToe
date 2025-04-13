import React, { useState } from 'react';
import axios from 'axios';

const TextResumeForm = () => {
  const [resumeText, setResumeText] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/submit_text_resume', {
        resume_text: resumeText
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to submit resume text.");
    }
  };

  return (
    <div className="text-form">
      <h2>📝 Paste Your Resume or Skills</h2>
      <textarea
        rows={10}
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Paste your resume text here..."
      />
      <button onClick={handleSubmit}>Submit</button>

      {result && (
        <div>
          <h3>✅ Skills Found:</h3>
          <ul>{result.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>

          <h3>💼 Job Matches:</h3>
          <ul>
            {result.jobs.map((job, i) => (
              <li key={i}>
                <b>{job.title}</b> at {job.company} – {job.location} – {job.salary}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TextResumeForm;
