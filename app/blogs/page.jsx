"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

const Blogs = () => {
  const blogPosts = [
    {
      title: "Building Your First AI-Powered Web App",
      excerpt: "Learn how to create a modern web application using Sloth Coder's AI capabilities. From concept to deployment in under an hour.",
      author: "Alex Chen",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      category: "Tutorial",
      image: "/space.jpg"
    },
    {
      title: "The Future of AI-Assisted Development",
      excerpt: "Exploring how artificial intelligence is revolutionizing the way developers write code and build applications.",
      author: "Sarah Kim",
      date: "Dec 12, 2024",
      readTime: "12 min read",
      category: "Insights",
      image: "/space1.jpg"
    },
    {
      title: "10 Tips for Better Code Generation",
      excerpt: "Master the art of writing effective prompts to get the best results from AI code generation tools.",
      author: "Marcus Rodriguez",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      category: "Tips & Tricks",
      image: "/spaces.jpg"
    },
    {
      title: "From Idea to MVP: A Complete Guide",
      excerpt: "A comprehensive guide to turning your startup idea into a working minimum viable product using modern tools.",
      author: "Emily Watson",
      date: "Dec 8, 2024",
      readTime: "15 min read",
      category: "Guide",
      image: "/space.jpg"
    }
  ];

  const categories = ["All", "Tutorial", "Insights", "Tips & Tricks", "Guide", "Case Study"];

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
            Blog & Insights
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the latest insights, tutorials, and stories from the Sloth Coder community.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === "All"
                    ? "bg-yellow-500 text-black"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent"></div>
            <div className="relative p-8 md:p-12">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">Featured</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {blogPosts[0].title}
              </h2>
              <p className="text-xl text-gray-300 mb-6 max-w-3xl">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center gap-6 text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{blogPosts[0].author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{blogPosts[0].date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{blogPosts[0].readTime}</span>
                </div>
              </div>
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read Full Article
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {blogPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.title}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <div className="h-48 bg-gradient-to-br from-yellow-500/20 to-purple-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-gray-400 text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <span>{post.date}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest articles, tutorials, and insights delivered to your inbox. No spam, just valuable content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
              />
              <motion.button
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blogs;
