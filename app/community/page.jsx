"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, MessageCircle, Github, Twitter, Linkedin, Mail, Calendar, MapPin, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const Community = () => {
  const communityStats = [
    { number: "10K+", label: "Members", icon: Users },
    { number: "50K+", label: "Discussions", icon: MessageCircle },
    { number: "100+", label: "Projects Shared", icon: Github },
    { number: "24/7", label: "Active Support", icon: Users }
  ];

  const upcomingEvents = [
    {
      title: "AI Code Generation Workshop",
      date: "Dec 20, 2024",
      time: "2:00 PM EST",
      location: "Virtual",
      attendees: 156,
      type: "Workshop"
    },
    {
      title: "Community Showcase",
      date: "Dec 25, 2024",
      time: "7:00 PM EST",
      location: "Virtual",
      attendees: 89,
      type: "Showcase"
    },
    {
      title: "Q&A with Sloth Coder Team",
      date: "Dec 30, 2024",
      time: "1:00 PM EST",
      location: "Virtual",
      attendees: 234,
      type: "Q&A"
    }
  ];

  const featuredProjects = [
    {
      title: "AI-Powered Task Manager",
      description: "A smart task management app built with React and AI integration",
      author: "Sarah Kim",
      stars: 45,
      language: "React",
      image: "/space.jpg"
    },
    {
      title: "Code Review Assistant",
      description: "Automated code review tool using machine learning",
      author: "Alex Chen",
      stars: 32,
      language: "Python",
      image: "/space1.jpg"
    },
    {
      title: "Portfolio Generator",
      description: "Dynamic portfolio website generator with AI content suggestions",
      author: "Marcus Rodriguez",
      stars: 28,
      language: "Next.js",
      image: "/spaces.jpg"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Join Our Community
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with fellow developers, share your projects, and learn from the best in the AI-powered development space.
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {communityStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <stat.icon className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors duration-300">
                <MessageCircle className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Discord Community</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Join our Discord server for real-time discussions, help, and networking with fellow developers.
            </p>
            <motion.button
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              Join Discord
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <motion.div
            className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors duration-300">
                <Github className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">GitHub</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Explore open-source projects, contribute to the ecosystem, and showcase your work.
            </p>
            <motion.button
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              Visit GitHub
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <motion.div
            className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors duration-300">
                <Mail className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Newsletter</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Stay updated with the latest community news, events, and featured projects.
            </p>
            <motion.button
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.type === "Workshop" ? "bg-blue-500/20 text-blue-400" :
                    event.type === "Showcase" ? "bg-green-500/20 text-green-400" :
                    "bg-purple-500/20 text-purple-400"
                  }`}>
                    {event.type}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{event.title}</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                <motion.button
                  className="mt-4 w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Event
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              >
                <div className="h-32 bg-gradient-to-br from-yellow-500/20 to-purple-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{project.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span>{project.stars}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                      {project.language}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Connect With Us</h2>
          <div className="flex justify-center gap-6">
            <motion.a
              href="#"
              className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter className="w-6 h-6 text-blue-400" />
            </motion.a>
            <motion.a
              href="#"
              className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="w-6 h-6 text-blue-600" />
            </motion.a>
            <motion.a
              href="#"
              className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-6 h-6 text-white" />
            </motion.a>
            <motion.a
              href="#"
              className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="w-6 h-6 text-red-400" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Community;
