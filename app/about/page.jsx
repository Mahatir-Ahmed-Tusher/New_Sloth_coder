"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Zap, Heart, Code, Globe, Award, Rocket } from "lucide-react";
import Link from "next/link";

const About = () => {
  const stats = [
    { number: "10K+", label: "Developers", icon: Users },
    { number: "50K+", label: "Projects Built", icon: Code },
    { number: "99.9%", label: "Uptime", icon: Zap },
    { number: "24/7", label: "Support", icon: Heart }
  ];

  const values = [
    {
      icon: Target,
      title: "Accessibility",
      description: "Making coding accessible to everyone, regardless of experience level."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Pushing the boundaries of AI-powered development tools."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive community of developers and creators."
    },
    {
      icon: Heart,
      title: "Quality",
      description: "Delivering high-quality, reliable tools that developers can trust."
    }
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Former senior engineer at Google, passionate about democratizing coding."
    },
    {
      name: "Sarah Kim",
      role: "CTO",
      bio: "AI researcher with 10+ years in machine learning and software engineering."
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Product",
      bio: "Product leader focused on creating intuitive developer experiences."
    },
    {
      name: "Dr. Emily Watson",
      role: "Lead AI Engineer",
      bio: "PhD in Computer Science, specializing in natural language processing."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Code className="w-20 h-20 text-yellow-400" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              About Sloth Coder
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize software development by making coding 
              accessible, enjoyable, and efficient for everyone. Our AI-powered platform 
              helps developers build amazing applications at their own pace.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="flex justify-center mb-4">
                <stat.icon className="w-12 h-12 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-12 border border-yellow-500/30"
        >
          <div className="text-center mb-12">
            <Rocket className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              To empower developers of all skill levels to create amazing applications 
              by providing intuitive, AI-powered tools that accelerate development 
              while maintaining code quality and best practices.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Values Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            These core values guide everything we do at Sloth Coder.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-600/30"
            >
              <div className="flex items-center mb-4">
                <value.icon className="w-8 h-8 text-yellow-400 mr-4" />
                <h3 className="text-xl font-semibold text-white">{value.title}</h3>
              </div>
              <p className="text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            The passionate individuals behind Sloth Coder.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 text-center"
            >
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{member.name}</h3>
              <p className="text-yellow-400 text-sm mb-3">{member.role}</p>
              <p className="text-gray-300 text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-12 border border-yellow-500/30"
        >
          <Globe className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to start building amazing applications? Join thousands of developers 
            who are already using Sloth Coder to bring their ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-medium hover:bg-yellow-400 transition-colors duration-300"
            >
              Get Started Free
            </Link>
            <Link
              href="/contact"
              className="border border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-medium hover:border-yellow-400 hover:text-yellow-400 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
