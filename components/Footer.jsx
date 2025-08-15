"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart,
  Code,
  Shield,
  BookOpen,
  HelpCircle,
  ExternalLink,
  Users,
  FileText,
  ChevronDown,
  ChevronUp,
  Search
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Hide footer on workspace pages
  if (pathname.includes("/workspace/")) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  const faqData = [
    {
      question: "What is Sloth Coder?",
      answer: "Sloth Coder is an AI-powered development platform that helps you build web applications by simply describing what you want to create."
    },
    {
      question: "How does AI code generation work?",
      answer: "Our AI analyzes your natural language descriptions and generates appropriate code using advanced language models."
    },
    {
      question: "Can I export my generated code?",
      answer: "Absolutely! You can export your projects as downloadable files that you can run locally or deploy to any hosting platform."
    },
    {
      question: "What programming languages do you support?",
      answer: "We currently support JavaScript, React, HTML, CSS, and related web technologies."
    }
  ];

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "User Guide", href: "/user-guide" },
        { name: "API", href: "/api" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "GDPR", href: "/gdpr" },
      ]
    }
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/slothcoder" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/slothcoder" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/slothcoder" },
    { name: "Email", icon: Mail, href: "mailto:hello@slothcoder.com" },
  ];

  return (
    <footer className="relative mt-20 border-t border-gray-600/30 bg-black/20 backdrop-blur-sm">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="w-8 h-8 text-yellow-400 border-none outline-none focus:outline-none" />
              <span className="text-xl font-bold text-white">Sloth Coder</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
              Build amazing applications with AI-powered code generation. 
              Whether you're a seasoned developer or just starting out, 
              our platform makes coding accessible and enjoyable.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-yellow-400 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm flex items-center group"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Support Section - moved to bottom */}
        <div className="mt-12 pt-8 border-t border-gray-600/30">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <HelpCircle className="w-6 h-6 text-yellow-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Support & FAQ</h3>
              </div>
              <button
                onClick={() => toggleSection('support')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >
                {expandedSection === 'support' ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            
            <AnimatePresence>
              {expandedSection === 'support' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {/* Search Bar */}
                  <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search FAQ..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white/5 border border-gray-600/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors duration-300 text-sm"
                    />
                  </div>

                  {/* FAQ Items */}
                  <div className="space-y-3">
                    {filteredFAQs.map((faq, index) => (
                      <div
          key={index}
                        className="bg-white/5 rounded-lg p-4 border border-gray-600/30"
                      >
                        <h4 className="text-white font-medium mb-2">{faq.question}</h4>
                        <p className="text-gray-300 text-sm">{faq.answer}</p>
                      </div>
      ))}
    </div>

                  {/* Quick Links */}
                  <div className="mt-6 pt-6 border-t border-gray-600/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Get Help</h4>
                        <div className="space-y-1">
                          <Link href="/contact" className="block text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm">
                            Contact Support
                          </Link>
                          <a href="mailto:support@slothcoder.com" className="block text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm">
                            Email Support
                          </a>
                          <Link href="/user-guide" className="block text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm">
                            User Guide
                          </Link>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Resources</h4>
                        <div className="space-y-1">
                          <Link href="/blog" className="block text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm">
                            Blog & Tutorials
                          </Link>
                          <Link href="/api" className="block text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm">
                            API Documentation
                          </Link>
                          <Link href="/community" className="block text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm">
                            Community
                          </Link>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Status</h4>
                        <div className="space-y-1">
                          <a href="/status" className="block text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm">
                            System Status
                          </a>
                          <a href="/updates" className="block text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm">
                            Updates & Changelog
                          </a>
                          <Link href="/roadmap" className="block text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm">
                            Roadmap
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-gray-600/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© {currentYear} Sloth Coder. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Made with</span>
              <Heart className="w-4 h-4 text-red-400 hidden md:inline" />
              <span className="hidden md:inline">for developers</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                Terms
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
