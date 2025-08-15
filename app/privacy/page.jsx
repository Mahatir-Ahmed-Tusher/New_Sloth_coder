"use client";
import React from "react";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Users, Database, Globe } from "lucide-react";
import Link from "next/link";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        "Personal information (name, email, profile picture) when you sign up",
        "Usage data and analytics to improve our services",
        "Code snippets and project data you create",
        "Communication data when you contact our support team"
      ]
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our AI-powered coding services",
        "To personalize your experience and improve our platform",
        "To communicate with you about updates and features",
        "To ensure security and prevent fraud"
      ]
    },
    {
      icon: Database,
      title: "Data Storage and Security",
      content: [
        "Your data is stored securely using industry-standard encryption",
        "We use cloud infrastructure with enterprise-grade security",
        "Regular security audits and penetration testing",
        "Compliance with GDPR and other privacy regulations"
      ]
    },
    {
      icon: Users,
      title: "Data Sharing",
      content: [
        "We do not sell your personal information to third parties",
        "Limited sharing with service providers for essential functions",
        "Anonymized data may be used for research and analytics",
        "Legal disclosure only when required by law"
      ]
    },
    {
      icon: Globe,
      title: "Your Rights",
      content: [
        "Access, update, or delete your personal information",
        "Export your data in a portable format",
        "Opt-out of marketing communications",
        "Request data processing restrictions"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-yellow-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your information when you use Sloth Coder.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-600/30"
            >
              <div className="flex items-center mb-6">
                <section.icon className="w-8 h-8 text-yellow-400 mr-4" />
                <h2 className="text-2xl font-semibold text-white">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-8 border border-yellow-500/30"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            Questions About Privacy?
          </h3>
          <p className="text-gray-300 mb-6">
            If you have any questions about this Privacy Policy or our data practices, 
            please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors duration-300"
            >
              Contact Us
            </Link>
            <Link
              href="/terms"
              className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium hover:border-yellow-400 hover:text-yellow-400 transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
