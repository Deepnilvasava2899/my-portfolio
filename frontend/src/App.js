import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
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

  const projects = [
    {
      title: 'Dynamic Pricing Optimization for E-commerce Platform',
      description: 'Developed a Python-based model using Scikit-learn and particle swarm optimization to forecast and optimize product prices, ensuring profitability.',
      tech: 'Python, Scikit-learn, Azure',
      details: 'Deployed the model on a secure Azure-based web platform, ensuring data integrity and scalability.'
    },
    {
      title: 'Email Classifier for Gmail',
      description: 'Developed a Python-based machine learning model to classify Gmail emails (e.g., spam, business), hosted on Azure for secure performance.',
      tech: 'Python, Machine Learning, Azure',
      details: 'Documented solutions for user training, enhancing productivity and system usability.'
    },
    {
      title: 'Domain-Wise Address Export (Client-Based Project)',
      description: 'Designed a VBA.NET solution with macros to categorize and extract domain addresses from Gmail accounts, ensuring transparency, privacy, and security.',
      tech: 'VBA.NET, Excel Macros',
      details: 'Documented processes and configurations, enabling efficient troubleshooting and maintenance for client workflows.'
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800">
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
            <a href="#projects" className="border-2 border-purple-400 hover:bg-purple-400 hover:text-purple-900 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              View Projects
            </a>
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

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-r from-pink-900 to-purple-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-300/20 hover:transform hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-bold text-pink-300 mb-4">{project.title}</h3>
                <p className="text-purple-100 mb-4">{project.description}</p>
                <p className="text-sm text-purple-200 mb-4">{project.details}</p>
                <div className="bg-purple-700/50 text-white px-3 py-1 rounded-full text-sm inline-block">
                  {project.tech}
                </div>
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
}

export default App;