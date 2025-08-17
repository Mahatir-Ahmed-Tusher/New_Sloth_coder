"use client";
import React, { useState } from 'react';
import { SandpackFileExplorer, useSandpack } from '@codesandbox/sandpack-react';
import { Button } from './ui/button';
import { Plus, FolderPlus, Trash, Download } from 'lucide-react';
import { createAndDownloadZip, extractFilesFromSandpack } from '@/utils/zipUtils';

const EnhancedFileExplorer = () => {
  const { sandpack } = useSandpack();
  const { files, updateFile, addFile, deleteFile } = sandpack;
  
  const [newFileName, setNewFileName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [selectedPath, setSelectedPath] = useState('/');

  // Handle file creation
  const handleAddFile = () => {
    if (!newFileName) return;
    
    // Determine the full path for the new file
    const fullPath = selectedPath === '/' 
      ? `/${newFileName}` 
      : `${selectedPath}/${newFileName}`;
    
    // Add the file with empty content
    addFile(fullPath, '');
    
    // Reset state
    setNewFileName('');
    setShowNewFileInput(false);
  };

  // Handle folder creation
  const handleAddFolder = () => {
    if (!newFolderName) return;
    
    // Determine the full path for the new folder
    const fullPath = selectedPath === '/' 
      ? `/${newFolderName}` 
      : `${selectedPath}/${newFolderName}`;
    
    // Create an empty file in the new folder to ensure the folder exists
    // This is a common pattern in file systems that don't explicitly track folders
    addFile(`${fullPath}/.gitkeep`, '');
    
    // Reset state
    setNewFolderName('');
    setShowNewFolderInput(false);
  };

  // Handle file deletion
  const handleDeleteFile = (path) => {
    if (confirm(`Are you sure you want to delete ${path}?`)) {
      deleteFile(path);
    }
  };

  // Handle download as zip
  const handleDownloadZip = async () => {
    try {
      const filesForZip = extractFilesFromSandpack(files);
      const result = await createAndDownloadZip(filesForZip, 'Sloth-coder-generated.zip');
      if (result) {
        // Show success message or feedback
        console.log('Project downloaded successfully');
      }
    } catch (error) {
      console.error('Error downloading project:', error);
      alert('Error downloading project. Please try again.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-2 border-b border-gray-700">
        <div className="text-sm font-medium">Files</div>
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowNewFileInput(!showNewFileInput)}
            title="Add new file"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowNewFolderInput(!showNewFolderInput)}
            title="Add new folder"
          >
            <FolderPlus className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDownloadZip}
            title="Download as ZIP"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {showNewFileInput && (
        <div className="p-2 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="filename.ext"
              className="flex-1 bg-gray-800 text-white text-sm rounded px-2 py-1"
            />
            <Button size="sm" onClick={handleAddFile}>Add</Button>
          </div>
        </div>
      )}
      
      {showNewFolderInput && (
        <div className="p-2 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="folder-name"
              className="flex-1 bg-gray-800 text-white text-sm rounded px-2 py-1"
            />
            <Button size="sm" onClick={handleAddFolder}>Add</Button>
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-auto">
        <SandpackFileExplorer
          style={{ height: "100%" }}
          className="w-full"
          onSelect={(path) => setSelectedPath(path)}
        />
      </div>
    </div>
  );
};

export default EnhancedFileExplorer;