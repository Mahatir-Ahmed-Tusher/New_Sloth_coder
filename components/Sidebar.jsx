"use client";
import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Settings, 
  CreditCard, 
  Info, 
  FolderOpen, 
  Menu,
  Home,
  Code,
  User
} from "lucide-react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

const Sidebar = ({ isOpen, onClose }) => {
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("recent");
  const convex = useConvex();
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch recent projects when sidebar opens and user is logged in
  useEffect(() => {
    const fetchRecentProjects = async () => {
      if (isOpen && userDetail && userDetail !== "loading" && userDetail._id) {
        setLoading(true);
        try {
          const projects = await convex.query(api.workspace.GetAllWorkspace, {
            userId: userDetail._id
          });
          
          // Transform projects to match the UI format
          const transformedProjects = projects
            .sort((a, b) => new Date(b._creationTime) - new Date(a._creationTime))
            .slice(0, 5) // Get only the 5 most recent
            .map((project, index) => {
              const creationDate = new Date(project._creationTime);
              const now = new Date();
              const diffInHours = Math.floor((now - creationDate) / (1000 * 60 * 60));
              const diffInDays = Math.floor(diffInHours / 24);
              
              let timeAgo = "";
              if (diffInHours < 1) {
                timeAgo = "Just now";
              } else if (diffInHours < 24) {
                timeAgo = `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
              } else {
                timeAgo = `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
              }

              // Determine status based on messages
              const hasMessages = project.messages && project.messages.length > 0;
              const hasFiles = project.fileData && Object.keys(project.fileData).length > 0;
              let status = "in-progress";
              if (hasMessages && hasFiles) {
                status = "completed";
              } else if (hasMessages) {
                status = "chat-only";
              }

              return {
                id: project._id,
                name: `Project ${index + 1}`,
                date: timeAgo,
                status: status,
                workspaceId: project._id
              };
            });
          
          setRecentProjects(transformedProjects);
        } catch (error) {
          console.error("Error fetching recent projects:", error);
          setRecentProjects([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecentProjects();
  }, [isOpen, userDetail, convex]);

  const handleProjectClick = (project) => {
    if (project.workspaceId) {
      router.push(`/workspace/${project.workspaceId}`);
      onClose();
    }
  };

  const menuItems = [
    {
      id: "recent",
      label: "Recent Projects",
      icon: FolderOpen,
      description: "Your latest creations"
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      description: "Customize your experience"
    },
    {
      id: "subscription",
      label: "Subscription",
      icon: CreditCard,
      description: "Manage your plan"
    },
    {
      id: "about",
      label: "About",
      icon: Info,
      description: "Learn more about Sloth Coder"
    }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case "recent":
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Projects</h3>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
              </div>
            ) : recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-gray-600/30 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-white font-medium">{project.name}</h4>
                      <p className="text-gray-400 text-sm">{project.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : project.status === 'chat-only'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status === 'chat-only' ? 'chat' : project.status}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <FolderOpen className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">No projects yet</p>
                <p className="text-gray-500 text-xs mt-1">Start building your first project!</p>
              </div>
            )}
          </div>
        );
      
      case "settings":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-gray-600/30">
                <h4 className="text-white font-medium mb-2">Theme</h4>
                <select className="w-full bg-transparent border border-gray-600/50 rounded-md p-2 text-sm text-gray-300 outline-none">
                  <option value="dark" className="bg-gray-800">Dark Mode</option>
                  <option value="light" className="bg-gray-800">Light Mode</option>
                </select>
              </div>
              <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-gray-600/30">
                <h4 className="text-white font-medium mb-2">Default AI Model</h4>
                <select className="w-full bg-transparent border border-gray-600/50 rounded-md p-2 text-sm text-gray-300 outline-none">
                  <option value="gemini" className="bg-gray-800">Gemini</option>
                  <option value="anthropic" className="bg-gray-800">Anthropic</option>
                  <option value="qwen" className="bg-gray-800">Qwen3-Coder</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case "subscription":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Subscription</h3>
            <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30">
              <h4 className="text-white font-medium mb-2">Current Plan: Pro</h4>
              <p className="text-gray-400 text-sm mb-3">2.5M tokens remaining</p>
              <button className="w-full bg-yellow-500 text-black py-2 rounded-md font-medium hover:bg-yellow-400 transition-colors duration-300">
                Upgrade Plan
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Used this month:</span>
                <span className="text-white">1.2M tokens</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '48%' }}></div>
              </div>
            </div>
          </div>
        );
      
      case "about":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">About Sloth Coder</h3>
            <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-gray-600/30">
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Sloth Coder is your AI-powered development companion, designed to help you build amazing applications at your own pace. 
                Whether you're a seasoned developer or just starting out, our platform makes coding accessible and enjoyable.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-400">
                  <Code className="w-4 h-4 mr-2" />
                  <span>AI-Powered Code Generation</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Home className="w-4 h-4 mr-2" />
                  <span>Real-time Preview</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <User className="w-4 h-4 mr-2" />
                  <span>User-Friendly Interface</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs">Version 1.0.0</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            className="fixed left-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl border-r border-gray-600/30 z-50"
            style={{
              boxShadow: '0 0 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-600/30">
              <h2 className="text-xl font-bold text-white">Sloth Coder</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Navigation */}
            <div className="p-4 border-b border-gray-600/30">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-400">{item.description}</div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              {renderSectionContent()}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-600/30">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">
                    {userDetail?.name || "Guest User"}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {userDetail?.email || "Not signed in"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
