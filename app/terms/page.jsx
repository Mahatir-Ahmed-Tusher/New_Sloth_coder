"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle, AlertTriangle, Users, Shield, Scale } from "lucide-react";
import Link from "next/link";

const TermsOfService = () => {
  const sections = [
    {
      icon: Users,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Sloth Coder, you accept and agree to be bound by these terms",
        "If you disagree with any part of these terms, you may not access our service",
        "We reserve the right to modify these terms at any time",
        "Continued use after changes constitutes acceptance of new terms"
      ]
    },
    {
      icon: Shield,
      title: "User Accounts and Responsibilities",
      content: [
        "You are responsible for maintaining the confidentiality of your account",
        "You must provide accurate and complete information when creating an account",
        "You are responsible for all activities that occur under your account",
        "You must notify us immediately of any unauthorized use of your account"
      ]
    },
    {
      icon: CheckCircle,
      title: "Acceptable Use",
      content: [
        "Use the service for lawful purposes only",
        "Do not attempt to gain unauthorized access to our systems",
        "Do not interfere with or disrupt the service",
        "Respect intellectual property rights and do not upload copyrighted material"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Prohibited Activities",
      content: [
        "Creating malicious code or applications",
        "Attempting to reverse engineer our platform",
        "Using the service for spam or harassment",
        "Violating any applicable laws or regulations"
      ]
    },
    {
      icon: Scale,
      title: "Intellectual Property",
      content: [
        "Sloth Coder retains ownership of the platform and its content",
        "You retain ownership of code and projects you create",
        "You grant us license to use your content for service provision",
        "We may use anonymized data for research and improvement"
      ]
    },
    {
      icon: FileText,
      title: "Limitation of Liability",
      content: [
        "We provide the service 'as is' without warranties",
        "We are not liable for any indirect or consequential damages",
        "Our liability is limited to the amount you paid for the service",
        "We are not responsible for third-party services or content"
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
              <FileText className="w-16 h-16 text-yellow-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              These terms govern your use of Sloth Coder and outline the rules, 
              rights, and responsibilities for using our platform.
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
            Questions About Terms?
          </h3>
          <p className="text-gray-300 mb-6">
            If you have any questions about these Terms of Service, 
            please contact our legal team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors duration-300"
            >
              Contact Us
            </Link>
            <Link
              href="/privacy"
              className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium hover:border-yellow-400 hover:text-yellow-400 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
