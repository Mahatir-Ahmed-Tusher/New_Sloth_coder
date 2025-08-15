"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp, Search, Code, CreditCard, Users, Zap } from "lucide-react";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState(new Set());

  const categories = [
    { id: "general", name: "General", icon: HelpCircle },
    { id: "technical", name: "Technical", icon: Code },
    { id: "billing", name: "Billing", icon: CreditCard },
    { id: "account", name: "Account", icon: Users }
  ];

  const faqData = {
    general: [
      {
        question: "What is Sloth Coder?",
        answer: "Sloth Coder is an AI-powered development platform that helps you build web applications by simply describing what you want to create. Our platform generates code, provides real-time previews, and helps you iterate on your ideas quickly."
      },
      {
        question: "How does AI code generation work?",
        answer: "Our AI analyzes your natural language descriptions and generates appropriate code using advanced language models. It understands context, follows best practices, and creates functional applications that you can immediately preview and modify."
      },
      {
        question: "What programming languages do you support?",
        answer: "We currently support JavaScript, React, HTML, CSS, and related web technologies. We're constantly expanding our language support based on user demand and community feedback."
      },
      {
        question: "Is my code private and secure?",
        answer: "Yes, your code and projects are private by default. We use enterprise-grade security measures to protect your data, and we never share your code without your explicit permission."
      }
    ],
    technical: [
      {
        question: "Can I export my generated code?",
        answer: "Absolutely! You can export your projects as downloadable files that you can run locally or deploy to any hosting platform. We provide clean, production-ready code that follows industry standards."
      },
      {
        question: "How accurate is the generated code?",
        answer: "Our AI generates high-quality, functional code that follows best practices. While it's designed to work out of the box, you may want to review and customize it for your specific needs."
      },
      {
        question: "Can I customize the generated code?",
        answer: "Yes! All generated code is fully editable. You can modify, extend, or completely rewrite any part of the code to match your requirements. The platform provides a real-time preview as you make changes."
      },
      {
        question: "What if the AI generates incorrect code?",
        answer: "While rare, if you encounter issues with generated code, you can regenerate it with more specific instructions, edit it manually, or contact our support team for assistance."
      }
    ],
    billing: [
      {
        question: "What are your pricing plans?",
        answer: "We offer several plans: Basic ($4.99/month), Starter ($9.99/month), Pro ($19.99/month), and Unlimited ($49.99/month). Each plan includes different token limits and features."
      },
      {
        question: "How do tokens work?",
        answer: "Tokens are consumed when you generate code or chat with our AI. Different operations use different amounts of tokens. You can monitor your usage in your account dashboard."
      },
      {
        question: "Can I upgrade or downgrade my plan?",
        answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle."
      },
      {
        question: "Do you offer refunds?",
        answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with our service, contact our support team for a full refund."
      }
    ],
    account: [
      {
        question: "How do I create an account?",
        answer: "You can sign up using your Google account or email address. The process takes less than a minute and you can start building immediately."
      },
      {
        question: "Can I share my projects with others?",
        answer: "Yes, you can share your projects with others by generating a shareable link. You control the privacy settings for each project."
      },
      {
        question: "How do I delete my account?",
        answer: "You can delete your account from your account settings. This will permanently remove all your data and projects. Please contact support if you need assistance."
      },
      {
        question: "Is there a limit on the number of projects?",
        answer: "Free accounts can create up to 3 projects. Paid plans have higher limits or unlimited projects depending on your subscription tier."
      }
    ]
  };

  const toggleItem = (itemIndex) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemIndex)) {
      newExpanded.delete(itemIndex);
    } else {
      newExpanded.add(itemIndex);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = faqData[activeCategory].filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <HelpCircle className="w-16 h-16 text-yellow-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about Sloth Coder. 
              Can't find what you're looking for? Contact our support team.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-gray-600/50 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-gray-600/30'
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <AnimatePresence mode="wait">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-gray-600/30 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
                >
                  <h3 className="text-lg font-medium text-white pr-4">
                    {faq.question}
                  </h3>
                  {expandedItems.has(index) ? (
                    <ChevronUp className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedItems.has(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-8 border border-yellow-500/30"
        >
          <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-4">
            Still Have Questions?
          </h3>
          <p className="text-gray-300 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors duration-300"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@slothcoder.com"
              className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium hover:border-yellow-400 hover:text-yellow-400 transition-colors duration-300"
            >
              Email Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
