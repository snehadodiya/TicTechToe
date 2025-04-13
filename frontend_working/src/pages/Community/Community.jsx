import React, { useState, useEffect } from 'react';
import { User, MessageCircle, Bell, Search, Settings, Home, Users, Briefcase, BookOpen } from 'lucide-react';
import './Community.css'

// Mock data for demonstration
const MOCK_USERS = [
  { id: 1, name: 'Alex Johnson', title: 'Software Engineer', avatar: '/api/placeholder/40/40' },
  { id: 2, name: 'Maria Garcia', title: 'UX Designer', avatar: '/api/placeholder/40/40' },
  { id: 3, name: 'Jamal Williams', title: 'Data Scientist', avatar: '/api/placeholder/40/40' },
  { id: 4, name: 'Sarah Kim', title: 'Product Manager', avatar: '/api/placeholder/40/40' },
];

const MOCK_POSTS = [
  {
    id: 1,
    userId: 1,
    content: "Just completed my AWS certification! It was challenging but totally worth it.",
    timestamp: "2h ago",
    likes: 24,
    comments: 8,
    tags: ["certification", "aws", "cloud"]
  },
  {
    id: 2,
    userId: 3,
    content: "Looking for advice on transitioning from data analytics to machine learning engineering. Anyone made this switch?",
    timestamp: "4h ago",
    likes: 15,
    comments: 12,
    tags: ["career-change", "machine-learning", "advice"]
  },
  {
    id: 3,
    userId: 2,
    content: "Sharing my career roadmap for UX design - from junior to senior in 3 years. Hope this helps someone!",
    timestamp: "1d ago",
    likes: 56,
    comments: 23,
    tags: ["ux-design", "career-path", "mentoring"]
  }
];

// Main App Component
export default function CareerConnectApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [users, setUsers] = useState(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState(MOCK_USERS[0]);
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    
    const newPost = {
      id: posts.length + 1,
      userId: currentUser.id,
      content: newPostContent,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      tags: []
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? {...post, likes: post.likes + 1} : post
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">
          {activeTab === 'home' && (
            <FeedSection 
              posts={posts} 
              users={users} 
              currentUser={currentUser}
              newPostContent={newPostContent}
              setNewPostContent={setNewPostContent}
              handleCreatePost={handleCreatePost}
              handleLikePost={handleLikePost}
            />
          )}
          {activeTab === 'network' && <NetworkSection users={users} />}
          {activeTab === 'jobs' && <JobsSection />}
          {activeTab === 'learning' && <LearningSection />}
        </main>
        <RightSidebar users={users} />
      </div>
    </div>
  );
}

// Header Component
function Header({ currentUser }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">CareerConnect</span>
          </div>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 bg-gray-50"
              placeholder="Search..."
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <MessageCircle className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 font-medium text-gray-700">{currentUser.name}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Sidebar Component
function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'network', label: 'My Network', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'learning', label: 'Learning', icon: BookOpen },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
      </div>
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

// Feed Section Component
function FeedSection({ 
  posts, 
  users, 
  currentUser,
  newPostContent,
  setNewPostContent,
  handleCreatePost,
  handleLikePost
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg mb-6 p-4">
        <div className="flex">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="h-10 w-10 rounded-full"
          />
          <textarea
            className="ml-3 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share an update or ask a question..."
            rows="3"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end mt-3">
          <button 
            onClick={handleCreatePost}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {posts.map((post) => {
          const author = users.find(user => user.id === post.userId);
          return (
            <div key={post.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center">
                <img 
                  src={author.avatar} 
                  alt={author.name} 
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">{author.name}</div>
                  <div className="text-sm text-gray-500">{author.title} • {post.timestamp}</div>
                </div>
              </div>
              <p className="mt-4 text-gray-800">{post.content}</p>
              {post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex justify-between text-gray-500 text-sm">
                <button 
                  onClick={() => handleLikePost(post.id)}
                  className="flex items-center hover:text-blue-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  {post.likes} Likes
                </button>
                <button className="flex items-center hover:text-blue-600">
                  <MessageCircle className="h-5 w-5 mr-1" />
                  {post.comments} Comments
                </button>
                <button className="flex items-center hover:text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Network Section Component
function NetworkSection({ users }) {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Network</h2>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Connections</h3>
          <span className="text-blue-600 text-sm font-medium">See all</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map(user => (
            <div key={user.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
              <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full" />
              <div className="ml-4">
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">{user.title}</div>
              </div>
              <button className="ml-auto text-sm text-blue-600 font-medium">Message</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">People You May Know</h3>
          <span className="text-blue-600 text-sm font-medium">See all</span>
        </div>
        <div className="space-y-4">
          {[
            { id: 5, name: 'Emily Chen', title: 'Marketing Specialist', avatar: '/api/placeholder/40/40' },
            { id: 6, name: 'David Patel', title: 'Full Stack Developer', avatar: '/api/placeholder/40/40' },
          ].map(user => (
            <div key={user.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
              <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full" />
              <div className="ml-4">
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">{user.title}</div>
              </div>
              <button className="ml-auto px-3 py-1 bg-blue-600 text-white text-sm rounded-md">Connect</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Jobs Section Component
function JobsSection() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Opportunities</h2>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Jobs for You</h3>
          <span className="text-blue-600 text-sm font-medium">See all</span>
        </div>
        <div className="space-y-4">
          {[
            { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp', location: 'San Francisco, CA (Remote)', salary: '$120K - $150K', postedDate: '2 days ago' },
            { id: 2, title: 'UX Researcher', company: 'DesignHub', location: 'New York, NY', salary: '$90K - $110K', postedDate: '1 week ago' },
            { id: 3, title: 'Data Scientist', company: 'Analytics Inc.', location: 'Remote', salary: '$110K - $140K', postedDate: '3 days ago' },
          ].map(job => (
            <div key={job.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500">
              <h4 className="font-semibold text-lg text-gray-900">{job.title}</h4>
              <div className="text-gray-700">{job.company}</div>
              <div className="text-gray-500 text-sm mt-1">{job.location}</div>
              <div className="text-gray-700 mt-2">{job.salary}</div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-500 text-sm">Posted {job.postedDate}</span>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md">Apply</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Career Progress Tracker</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Applications Sent</span>
              <span className="text-sm text-gray-500">8/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Interviews Scheduled</span>
              <span className="text-sm text-gray-500">3/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Skills Development</span>
              <span className="text-sm text-gray-500">70%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Learning Section Component
function LearningSection() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Resources</h2>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Recommended Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 1, title: 'Introduction to AI and Machine Learning', provider: 'TechAcademy', duration: '6 weeks', level: 'Beginner', image: '/api/placeholder/100/60' },
            { id: 2, title: 'Advanced React Development', provider: 'CodeMasters', duration: '8 weeks', level: 'Intermediate', image: '/api/placeholder/100/60' },
            { id: 3, title: 'Data Science Fundamentals', provider: 'DataLearn', duration: '10 weeks', level: 'Beginner', image: '/api/placeholder/100/60' },
            { id: 4, title: 'UX Research Methods', provider: 'DesignSchool', duration: '4 weeks', level: 'All Levels', image: '/api/placeholder/100/60' },
          ].map(course => (
            <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md">
              <img src={course.image} alt={course.title} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h4 className="font-medium text-gray-900">{course.title}</h4>
                <div className="text-sm text-gray-500 mt-1">{course.provider}</div>
                <div className="flex justify-between mt-2 text-sm text-gray-700">
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                </div>
                <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-md">Enroll</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Your Learning Path</h3>
        <div className="space-y-6">
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div className="h-full w-0.5 bg-gray-200 mx-auto"></div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Web Development Fundamentals</h4>
              <p className="text-sm text-gray-500 mt-1">Completed on March 15, 2025</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div className="h-full w-0.5 bg-gray-200 mx-auto"></div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Advanced JavaScript & Frameworks</h4>
              <p className="text-sm text-gray-500 mt-1">In progress - 70% complete</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-bold">3</span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Full Stack Development</h4>
              <p className="text-sm text-gray-500 mt-1">Starts May 1, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Right Sidebar Component
function RightSidebar({ users }) {
  return (
    <aside className="hidden lg:block w-64 bg-white shadow-sm">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-700">Career Events</h3>
        <div className="mt-3 space-y-3">
          {[
            { id: 1, title: 'Tech Career Fair', date: 'Apr 20, 2025', time: '10:00 AM - 4:00 PM' },
            { id: 2, title: 'Resume Workshop', date: 'Apr 25, 2025', time: '2:00 PM - 3:30 PM' },
          ].map(event => (
            <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900">{event.title}</div>
              <div className="text-sm text-gray-500 mt-1">{event.date}</div>
              <div className="text-sm text-gray-500">{event.time}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-700">Active Mentors</h3>
        <div className="mt-3 space-y-3">
          {users.slice(0, 3).map(user => (
            <div key={user.id} className="flex items-center">
              <div className="relative">
                <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">{user.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-700">Trending Topics</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {['remote-work', 'tech-interviews', 'career-change', 'salary-negotiation', 'skill-development'].map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}