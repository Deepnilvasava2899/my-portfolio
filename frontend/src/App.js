import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Navigation Component
const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-purple-900/90 backdrop-blur-lg border-b border-purple-700/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Deepnil Vasava
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                location.pathname === '/' 
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white' 
                  : 'text-purple-200 hover:text-white hover:bg-purple-800'
              }`}
            >
              Portfolio
            </Link>
            <Link 
              to="/projects" 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                location.pathname === '/projects' 
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white' 
                  : 'text-purple-200 hover:text-white hover:bg-purple-800'
              }`}
            >
              Projects
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-purple-700/50">
            <div className="flex flex-col space-y-2 mt-4">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white' 
                    : 'text-purple-200 hover:text-white hover:bg-purple-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link 
                to="/projects" 
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  location.pathname === '/projects' 
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white' 
                    : 'text-purple-200 hover:text-white hover:bg-purple-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Projects Page Component
const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: 'Dynamic Pricing Optimization for E-commerce Platform',
      description: 'Developed a Python-based model using Scikit-learn and particle swarm optimization to forecast and optimize product prices, ensuring profitability.',
      longDescription: 'This project involved creating a sophisticated machine learning model that analyzes market trends, competitor pricing, and customer behavior to dynamically adjust product prices in real-time. The system uses particle swarm optimization algorithms to find optimal pricing strategies that maximize both profitability and market competitiveness.',
      tech: ['Python', 'Scikit-learn', 'Particle Swarm Optimization', 'Azure', 'Machine Learning'],
      features: [
        'Real-time price optimization',
        'Market trend analysis',
        'Competitor price monitoring',
        'Profitability forecasting',
        'Scalable Azure deployment'
      ],
      image: 'https://images.pexels.com/photos/16053029/pexels-photo-16053029.jpeg',
      github: '#',
      demo: '#'
    },
    {
      id: 2,
      title: 'Email Classifier for Gmail',
      description: 'Developed a Python-based machine learning model to classify Gmail emails (e.g., spam, business), hosted on Azure for secure performance.',
      longDescription: 'An intelligent email classification system that uses natural language processing and machine learning to automatically categorize Gmail emails into different categories such as spam, business, personal, and promotional. The system provides detailed analytics and productivity insights to help users manage their inbox more efficiently.',
      tech: ['Python', 'Natural Language Processing', 'Machine Learning', 'Azure', 'Gmail API'],
      features: [
        'Multi-category email classification',
        'Spam detection with high accuracy',
        'Gmail API integration',
        'Real-time processing',
        'Productivity analytics dashboard'
      ],
      image: 'https://images.pexels.com/photos/5475760/pexels-photo-5475760.jpeg',
      github: '#',
      demo: '#'
    },
    {
      id: 3,
      title: 'Domain-Wise Address Export (Client-Based Project)',
      description: 'Designed a VBA.NET solution with macros to categorize and extract domain addresses from Gmail accounts, ensuring transparency, privacy, and security.',
      longDescription: 'A comprehensive data extraction and management tool built for enterprise clients to efficiently organize and export email addresses based on domain classification. The solution includes advanced macro automation, data validation, and export functionality while maintaining strict privacy and security standards.',
      tech: ['VBA.NET', 'Excel Macros', 'Data Processing', 'Gmail Integration', 'Enterprise Security'],
      features: [
        'Domain-based email categorization',
        'Automated data extraction',
        'Excel macro integration',
        'Privacy-focused design',
        'Enterprise-grade security'
      ],
      image: 'https://images.unsplash.com/photo-1585384107568-5bc588c7eefd',
      github: '#',
      demo: '#'
    }
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              My Projects
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Explore my portfolio of innovative projects spanning machine learning, data science, and enterprise solutions.
              Each project demonstrates my expertise in solving real-world problems through technology.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {projects.map((project) => (
              <div key={project.id} className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-300/20 hover:transform hover:scale-105 transition-all duration-500 card-hover">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech, index) => (
                        <span key={index} className="bg-purple-700/80 text-white px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="bg-pink-700/80 text-white px-3 py-1 rounded-full text-sm">
                          +{project.tech.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-pink-300 mb-4">{project.title}</h3>
                  <p className="text-purple-100 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 px-6 py-2 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105"
                    >
                      View Details
                    </button>
                    <a 
                      href={project.github}
                      className="border-2 border-purple-400 hover:bg-purple-400 hover:text-purple-900 px-6 py-2 rounded-full font-semibold text-purple-200 transition-all duration-300"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-purple-900/95 backdrop-blur-lg rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-300/20">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-pink-300">{selectedProject.title}</h2>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-200 mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tech.map((tech, index) => (
                      <span key={index} className="bg-purple-700/80 text-white px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-purple-200 mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="text-purple-100 flex items-start">
                        <span className="text-pink-400 mr-3">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-purple-200 mb-4">Project Overview</h3>
                <p className="text-purple-100 leading-relaxed mb-6">{selectedProject.longDescription}</p>
                
                <div className="flex gap-4">
                  <a 
                    href={selectedProject.github}
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105"
                  >
                    View on GitHub
                  </a>
                  <a 
                    href={selectedProject.demo}
                    className="border-2 border-purple-400 hover:bg-purple-400 hover:text-purple-900 px-6 py-3 rounded-full font-semibold text-purple-200 transition-all duration-300"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Portfolio Page Component
const PortfolioPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('Error sending message. Please try again.');
    }
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const skills = {
    technical: [
      'Windows 10/11', 'macOS', 'Chrome OS', 'Microsoft Office 365', 
      'Google Workspace', 'Active Directory', 'Azure Active Directory (Entra ID)',
      'LAN/WAN Networking', 'Hardware & Software Configuration', 
      'Printer & Peripheral Support', 'VoIP Systems', 'Web Server Backup/Recovery'
    ],
    support: [
      'Level 1 Helpdesk & Technical Support', 'Ticketing Systems (Jira, ServiceNow)',
      'Troubleshooting (Hardware, Software, Network)', 'User Account Provisioning',
      'Incident Resolution & Documentation', 'Onboarding/Offboarding Support',
      'System Health Checks'
    ],
    core: [
      'Customer Service', 'Time Management', 'Attention to Detail',
      'Problem Solving', 'Multitasking', 'Team Collaboration',
      'Adaptability', 'Communication Skills', 'SLA Compliance', 'Process Improvement'
    ]
  };

  const experience = [
    {
      title: 'Technical Support Representative',
      company: 'Voysus Canada',
      location: 'Toronto, ON',
      period: 'Sept 2024 - Feb 2025',
      achievements: [
        'Provided Level 1 technical support to end-users via phone, email, remote tools, and onsite visits for hardware, software, and networking issues.',
        'Created, managed, and resolved tickets using systems like Jira and ServiceNow, ensuring accurate documentation of incidents and resolutions.',
        'Assisted with onboarding and offboarding procedures, including user account creation in Active Directory and Microsoft Entra ID (Azure AD).',
        'Configured and maintained laptops, desktops, mobile devices, and printers; ensured proper installation of OS, drivers, and licensed software.',
        'Delivered support for Microsoft 365 applications including Outlook, Teams, Word, and Excel, along with email configuration and data sync.',
        'Responded to system access issues, password resets, and application errors, ensuring minimal downtime for users.',
        'Monitored network and system performance, escalating complex issues to Level 2 or appropriate teams while maintaining ownership until resolution.',
        'Conducted routine system health checks and assisted with web server backup and recovery processes.'
      ]
    },
    {
      title: 'Helpdesk Analyst',
      company: 'Linde Engineering India Pvt. Ltd',
      location: 'Vadodara, India',
      period: 'Jan 2021 - Nov 2022',
      achievements: [
        'Delivered daily Level 1 support for over 700 endpoints running Windows 10/11, macOS, and Chrome OS in a fast-paced IT environment, contributing to a 20% drop in tech-related disruptions.',
        'Diagnosed and resolved hardware and software issues through ServiceNow within SLA targets (<24 hours), improving user satisfaction by 15%.',
        'Performed frontline troubleshooting of desktops, laptops, mobile devices, printers, smartboards, and classroom technology peripherals.',
        'Supported end-users with productivity tools such as Google Workspace and Microsoft 365, ensuring consistent and efficient system access.',
        'Provided hands-on assistance for VoIP communication systems, enhancing team collaboration across departments.',
        'Contributed to IT planning sessions, identifying improvements to support workflows that reduced downtime and boosted service desk responsiveness.'
      ]
    }
  ];

  const education = [
    {
      degree: 'Post Graduate in Business and Information Systems Architecture',
      school: 'Fanshawe College',
      location: 'London, ON',
      period: 'Jan 2023 - Aug 2024',
      gpa: '4.0/4.2',
      coursework: 'Windows Server Administration, Cloud Computing (Azure), IT Service Management'
    },
    {
      degree: 'Bachelors of Technology in Computer Engineering',
      school: 'Birla Vishwakarma Mahavidyalaya',
      location: 'Anand, India',
      period: 'Jun 2018 - July 2022',
      gpa: '8.11/10',
      coursework: 'Network Security, Operating Systems, Software Engineering'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-purple-800/80 to-pink-800/90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/5475810/pexels-photo-5475810.jpeg)'
          }}
        ></div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
                <span className="text-4xl font-bold">DV</span>
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Deepnil Vasava
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-8 text-purple-200">
            IT Support | Azure-Certified Support Specialist
          </h2>
          <p className="text-lg md:text-xl mb-12 text-purple-100 max-w-3xl mx-auto leading-relaxed">
            IT support professional with 2+ years of experience supporting Windows 10/11, macOS. 
            Skilled in troubleshooting hardware/software issues, using Jira and ServiceNow, and managing 
            user accounts via Active Directory and Entra ID.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="mailto:vasavadeepnil2899@gmail.com" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Contact Me
            </a>
            <Link to="/projects" className="border-2 border-purple-400 hover:bg-purple-400 hover:text-purple-900 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              View Projects
            </Link>
          </div>
          <div className="flex justify-center space-x-6">
            <span className="text-purple-300">📍 London, ON</span>
            <span className="text-purple-300">📧 vasavadeepnil2899@gmail.com</span>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-r from-purple-800 to-pink-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Skills & Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-300/20">
              <h3 className="text-2xl font-bold text-pink-300 mb-6">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.technical.map((skill, index) => (
                  <span key={index} className="bg-purple-700/50 text-white px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-300/20">
              <h3 className="text-2xl font-bold text-pink-300 mb-6">Support Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.support.map((skill, index) => (
                  <span key={index} className="bg-purple-700/50 text-white px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-300/20">
              <h3 className="text-2xl font-bold text-pink-300 mb-6">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.core.map((skill, index) => (
                  <span key={index} className="bg-purple-700/50 text-white px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gradient-to-r from-pink-800 to-purple-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Certifications</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-purple-300/20 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Microsoft Certified: Azure Fundamentals</h3>
              <p className="text-xl text-purple-200">(AZ-900)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Work Experience</h2>
          <div className="max-w-6xl mx-auto space-y-12">
            {experience.map((job, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-300/20">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-pink-300 mb-2">{job.title}</h3>
                    <p className="text-xl text-white">{job.company}</p>
                    <p className="text-purple-200">{job.location}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="bg-purple-700 text-white px-4 py-2 rounded-full">{job.period}</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-purple-100 flex items-start">
                      <span className="text-pink-400 mr-3">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-gradient-to-r from-purple-800 to-pink-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Education</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-300/20">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-pink-300 mb-2">{edu.degree}</h3>
                    <p className="text-xl text-white">{edu.school}</p>
                    <p className="text-purple-200">{edu.location}</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <span className="bg-purple-700 text-white px-4 py-2 rounded-full block mb-2">{edu.period}</span>
                    <span className="text-pink-300 font-semibold">GPA: {edu.gpa}</span>
                  </div>
                </div>
                <p className="text-purple-100">
                  <strong>Relevant coursework:</strong> {edu.coursework}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-pink-800 to-purple-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Get In Touch</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-300/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-purple-200 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-purple-900/50 border border-purple-600 text-white placeholder-purple-300 focus:outline-none focus:border-pink-400"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-purple-200 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-purple-900/50 border border-purple-600 text-white placeholder-purple-300 focus:outline-none focus:border-pink-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-purple-200 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-purple-900/50 border border-purple-600 text-white placeholder-purple-300 focus:outline-none focus:border-pink-400"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
                {submitStatus && (
                  <p className={`text-center mt-4 ${submitStatus.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                    {submitStatus}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-purple-900">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center space-x-8 mb-8">
            <a href="mailto:vasavadeepnil2899@gmail.com" className="text-purple-300 hover:text-pink-400 transition-colors">
              📧 Email
            </a>
            <a href="#" className="text-purple-300 hover:text-pink-400 transition-colors">
              💼 LinkedIn
            </a>
            <a href="#" className="text-purple-300 hover:text-pink-400 transition-colors">
              🐙 GitHub
            </a>
          </div>
          <p className="text-purple-400">© 2025 Deepnil Vasava. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;