const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  gender: String,
  dob: Date,
  education: [{
    degree: String,
    institution: String,
    startYear: Number,
    endYear: Number
  }],
  experience: [{
    jobTitle: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  skills: [String],
  interests: [String],
  careerGoals: String,
  resumeUrl: String,
  profilePicUrl: String
});

module.exports = mongoose.model('User', userSchema);