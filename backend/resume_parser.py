import re

def extract_skills(resume_text):
    skill_keywords = [
    'python', 'java', 'c++', 'c', 'c#', 'sql', 'excel', 'selenium', 'aws',
    'gcp', 'azure', 'linux', 'javascript', 'html', 'css', 'flask', 'django',
    'postman', 'docker', 'kubernetes', 'react', 'node', 'pandas', 'numpy',
    'scikit-learn', 'matplotlib', 'seaborn', 'tensorflow', 'keras', 'pytorch',
    'nlp', 'huggingface', 'transformers', 'powerbi', 'tableau', 'mongodb',
    'firebase', 'rest api', 'soap', 'git', 'github', 'jira', 'spring',
    'spring boot', 'kafka', 'spark', 'hadoop', 'sql server', 'mysql',
    'postgresql', 'oracle', 'redis', 'prometheus', 'grafana', 'jenkins',
    'ci/cd', 'bash', 'shell scripting', 'webpack', 'three.js', 'unity',
    'unreal engine', 'ros', 'qt', 'vhdl', 'verilog', 'matlab', 'sas',
    'blockchain', 'solidity', 'web3', 'figma', 'adobe xd', 'photoshop',
    'after effects', 'illustrator', 'firebase', 'xcode', 'android studio',
    'rest', 'graphql', 'vite', 'next.js', 'nestjs', 'fastapi', 'supabase',
    'tornado', 'sanic', 'bitbucket', 'jira', 'notion', 'airflow', 'mlops',
    'data pipelines', 'data visualization', 'data analysis', 'machine learning',
    'deep learning', 'data engineering', 'big data', 'cloud computing',
    'cybersecurity', 'penetration testing', 'ethical hacking', 'iot',
    'computer vision', 'image processing', 'game development',
    'quantum computing', 'biotech', 'bioinformatics'
    ]

    
    resume_text = resume_text.lower()
    found_skills = [skill for skill in skill_keywords if skill in resume_text]
    
    return list(set(found_skills))
