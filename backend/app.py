from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import fitz  # PyMuPDF
from resume_parser import extract_skills
from matcher import recommend_jobs
from salary_predictor import predict_salary

app = Flask(__name__)
CORS(app)  # Allow frontend to connect

UPLOAD_FOLDER = 'data/resumes'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text()
    return text

@app.route("/", methods=["GET"])
def test():
    return "✅ Flask server is live and ready!"

@app.route('/upload_resume', methods=['POST'])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    # Save the uploaded PDF
    save_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(save_path)

    # Extract and process
    resume_text = extract_text_from_pdf(save_path)
    skills = extract_skills(resume_text)
    jobs = recommend_jobs(skills)

    results = []
    for _, row in jobs.iterrows():
        salary = predict_salary(row['title'])
        results.append({
            "title": row['title'],
            "company": row.get('company', ''),
            "location": row.get('location', ''),
            "salary": f"₹{int(salary):,}/year"
        })

    return jsonify({
        "skills": skills,
        "jobs": results
    })

@app.route('/submit_text_resume', methods=['POST'])
def submit_text_resume():
    data = request.get_json()
    resume_text = data.get("resume_text", "")

    if not resume_text.strip():
        return jsonify({"error": "Resume text is empty"}), 400

    skills = extract_skills(resume_text)
    jobs = recommend_jobs(skills)

    results = []
    for _, row in jobs.iterrows():
        salary = predict_salary(row['title'])
        results.append({
            "title": row['title'],
            "company": row.get('company', ''),
            "location": row.get('location', ''),
            "salary": f"₹{int(salary):,}/year"
        })

    return jsonify({
        "skills": skills,
        "jobs": results
    })

if __name__ == '__main__':
    app.run(debug=True)
