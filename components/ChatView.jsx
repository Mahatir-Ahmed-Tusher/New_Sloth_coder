"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lookup from "@/data/Lookup";
import { ArrowRight, AwardIcon, Link, Loader2Icon } from "lucide-react";
import Markdown from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Prompt from "@/data/Prompt";
import { useSidebar } from "./ui/sidebar";

export const countToken = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

const ChatView = () => {
  const { id } = useParams();
  const [userInput, setUserInput] = useState();
  const UpdateWorkspace = useMutation(api.workspace.UpdateWorkspace);
  const messagesEndRef = useRef(null);
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const [loader, setLoader] = useState(false);
  const { toggleSidebar } = useSidebar();
  const UpdateToken = useMutation(api.users.UpdateToken);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    getWorkspaceData();
  }, [id]);

  useEffect(() => {
    if (messages?.length > 0 && !loader) {
      const role = messages[messages?.length - 1].role;
      if (role == "user") getUserResponse(messages);
    }
  }, [messages, loader]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Use "auto" for first load
    }, 200); // or 100ms if needed
    return () => clearTimeout(timeout);
  }, [messages]);

  const [workspaceData, setWorkspaceData] = useState(null);

  const getUserResponse = async (msgs) => {
    setLoader(true);
    try {
      const prom = msgs[msgs?.length - 1].content;
      const newPrompt = Prompt.CHAT_PROMPT + prom;
      
      // Try different URL patterns
      const urlPatterns = [
        `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/ai/user-response`,
        `${window.location.origin}/api/ai/user-response`,
        `/api/ai/user-response`,
      ];
      
      let response = null;
      let lastError = null;
      
      for (const apiUrl of urlPatterns) {
        try {
          console.log("Trying API URL:", apiUrl);
          
          response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: msgs,
              prompt: newPrompt,
              model: workspaceData?.model || "gemini",
            }),
          });
          
          console.log("Response status for", apiUrl, ":", response.status);
          
          if (response.ok) {
            console.log("Success with URL:", apiUrl);
            break;
          } else {
            lastError = new Error(`HTTP error! status: ${response.status} for URL: ${apiUrl}`);
          }
        } catch (error) {
          console.log("Failed with URL:", apiUrl, "Error:", error.message);
          lastError = error;
          continue;
        }
      }
      
      if (!response || !response.ok) {
        throw lastError || new Error("All API URL patterns failed");
      }
      
      const res = await response.json();
      
      if (res.err) {
        console.error("AI Response Error:", res.err);
        // Add error message to chat
        const errorMessage = res.err.includes("API key") 
          ? "AI service is not configured. Please contact support."
          : res.err.includes("Network error")
          ? "Network error. Please check your internet connection and try again."
          : "Sorry, I encountered an error while generating a response. Please try again.";
        const updatedMessages = [...msgs, { content: errorMessage, role: "model" }];
        setMessages(updatedMessages);
        await UpdateWorkspace({ id, newMessages: updatedMessages });
      } else {
        const updatedMessages = [...msgs, { content: res.response, role: "model" }];
        setMessages(updatedMessages);
        await UpdateWorkspace({ id, newMessages: updatedMessages });

        const token =
          Number(userDetail?.token) -
          Number(countToken(JSON.stringify(res.response)));
        await UpdateToken({
          userId: userDetail?._id,
          token: token,
        });
      }
    } catch (error) {
      console.error("Error in getUserResponse:", error);
      
      let errorMessage = "Sorry, I encountered an error while generating a response. Please try again.";
      
      if (error.message.includes("fetch")) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (error.message.includes("JSON")) {
        errorMessage = "Invalid response from server. Please try again.";
      } else if (error.message.includes("HTTP error")) {
        if (error.message.includes("404")) {
          errorMessage = "API endpoint not found. Please check your configuration.";
        } else {
          errorMessage = "Server error. Please try again later.";
        }
      }
      
      // Add error message to chat
      const updatedMessages = [...msgs, { content: errorMessage, role: "model" }];
      setMessages(updatedMessages);
      await UpdateWorkspace({ id, newMessages: updatedMessages });
    } finally {
      setLoader(false);
    }
  };

  const getWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setWorkspaceData(result);
    setMessages(result?.messages);
  };

  const onGenerate = async (input) => {
    setUserInput("");
    const updated = [
      ...(messages || []),
      { role: "user", content: input },
    ];
    setMessages(updated);
    await UpdateWorkspace({ id, newMessages: updated });
    getUserResponse(updated); // Trigger AI response generation
  };
  return (
    <div className="relative h-[85vh] flex flex-col">
     
      
      <div className="flex-1 overflow-y-scroll scrollbar-hidden pl-5">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className="bg-[#272727] p-3 rounded-lg mb-2 flex gap-2 items-start "
          >
            {msg?.role == "user" && (
              <Image
                src={userDetail?.picture}
                alt="userImage"
                width={35}
                height={35}
                className="rounded-full"
              />
            )}
            <div className="prose break-words w-full max-w-full text-left">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loader && (
          <div className="bg-[#272727] p-3 rounded-lg mb-2 flex gap-2 items-start ">
            {" "}
            <Loader2Icon className="animate-spin " />
            <h2>Generating response...</h2>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input section */}
      <div className="flex gap=2 items-end">
        

        <motion.div
          className="relative p-5 border border-gray-600/30 rounded-xl max-w-2xl w-full mt-3 backdrop-blur-md bg-white/5 shadow-2xl"
          style={{
            boxShadow: '0 0 20px rgba(255, 255, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          
          {/* Glassmorphic overlay */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm"></div>
          
          <div className="relative z-10 flex gap-2">
            <textarea
            value={userInput}
              className="outline-none bg-transparent w-full h-32 max-h-56 resize-none text-white placeholder-gray-400"
              onChange={(e) => setUserInput(e.target.value)}
              type="text"
              placeholder={Lookup.INPUT_PLACEHOLDER}
            />
            {userInput && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight
                  onClick={() => onGenerate(userInput)}
                  className="bg-[#ff0] text-black drop-shadow-[0_0_10px_rgba(255,255,0,0.7)] p-2 h-8 w-8 rounded-md cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,0,0.9)] transition-shadow duration-300"
                />
              </motion.div>
            )}
          </div>
          <div className="relative z-10">
            <Link className="h-5 w-5 text-gray-400 hover:text-yellow-400 transition-colors duration-300" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatView;
