import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def recommend_jobs(user_skills, job_data_path="data/full_cs_job_data.csv"):
    jobs_df = pd.read_csv(job_data_path)
    
    jobs_df['skills_text'] = jobs_df['skills'].fillna('').str.lower()
    user_profile = ' '.join(user_skills)
    
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(jobs_df['skills_text'].tolist() + [user_profile])
    
    similarities = cosine_similarity(tfidf_matrix[-1:], tfidf_matrix[:-1]).flatten()
    jobs_df['similarity'] = similarities
    
    recommended = jobs_df.sort_values(by='similarity', ascending=False).head(10)
    
    return recommended[['title', 'skills', 'similarity']]
