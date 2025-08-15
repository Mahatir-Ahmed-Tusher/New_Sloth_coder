"use client";
import Lookup from "@/data/Lookup";
import { ArrowRight, ArrowUpRight, Link } from "lucide-react";
import React, { useContext, useState } from "react";
import GlassTextarea from "./GlassTextArea";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import SignInDialog from "./SignInDialog";
import VirtualKeyboard from "./Keyboard";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UiContext } from "@/context/UiContext";

const Hero = () => {
  const router = useRouter();
  const [userInput, setUserInput] = useState();
  const [selectedModel, setSelectedModel] = useState("gemini");
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  // const [openDialog, setOpenDialog] = useState(false);
  const { isSignInDialog, setisSignInDialog} = useContext(UiContext)
  
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setisSignInDialog(true);
      return;
    }
    // setMessages([{ role: "user", content: input }]);
    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [{ role: "user", content: input }],
      model: selectedModel,
    });
    router.push("/workspace/" + workspaceId);
  };

  return (
    <motion.div
      className="flex flex-col items-center mt-52 gap-2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="font-bold text-4xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {Lookup.HERO_HEADING}
      </motion.h2>

      <motion.p
        className="text-gray-300 font-medium"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {Lookup.HERO_DESC}
      </motion.p>

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
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none text-white placeholder-gray-400"
            onChange={(e) => setUserInput(e.target.value)}
            type="text"
            placeholder={Lookup.INPUT_PLACEHOLDER}
          />
          {userInput && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="bg-[#ff0] text-black drop-shadow-[0_0_10px_rgba(255,255,0,0.7)] p-2 h-8 w-8 rounded-md cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,0,0.9)] transition-shadow duration-300"
              />
            </motion.div>
          )}
        </div>
        <div className="relative z-10 mt-3 flex justify-between items-center">
          <select 
            value={selectedModel} 
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-transparent border border-gray-600/50 rounded-md p-1 text-sm text-gray-300 outline-none backdrop-blur-sm hover:border-yellow-400/50 transition-colors duration-300"
          >
            <option value="gemini" className="bg-gray-800">Gemini</option>
            <option value="anthropic" className="bg-gray-800">Anthropic (Claude Sonnet 4)</option>
            <option value="qwen" className="bg-gray-800">Qwen3-Coder (OpenRouter)</option>
            <option value="deepseek" className="bg-gray-800">DeepSeek R1 (OpenRouter)</option>
          </select>
          <Link className="h-5 w-5 text-gray-400 hover:text-yellow-400 transition-colors duration-300" />
        </div>
      </motion.div>

      <motion.div
        className="flex mt-8 flex-wrap max-w-2xl justify-center gap-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {Lookup.SUGGSTIONS.map((suggestion, index) => (
          <motion.h2
            key={index}
            onClick={() => onGenerate(suggestion)}
            className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer transition duration-300 ease-in-out hover:border-[#ff0] hover:shadow-[0_0_10px_#ff0]"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {suggestion}
          </motion.h2>
        ))}
      </motion.div>

      <SignInDialog
        closeDialog={(v) => setisSignInDialog(v)}
        openDialog={isSignInDialog}
      />
    </motion.div>
  );
};

export default Hero;
