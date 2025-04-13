// ResumeUpload.js
import React, { useState } from 'react';

function ResumeUpload() {
  const [results, setResults] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/upload_resume", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <h2>Upload Resume</h2>
      <input type="file" accept="application/pdf" onChange={handleUpload} />
      {results && (
        <>
          <h3>Skills:</h3>
          <ul>{results.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>

          <h3>Job Matches:</h3>
          <ul>
            {results.jobs.map((job, i) => (
              <li key={i}>
                <strong>{job.title}</strong> at {job.company} ({job.location})<br/>
                Estimated Salary: {job.salary}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ResumeUpload;
