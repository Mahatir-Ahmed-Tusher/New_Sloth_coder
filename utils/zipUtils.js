import JSZip from 'jszip';

/**
 * Creates a zip file from the provided files object
 * @param {Object} files - Object containing file paths and their content
 * @param {string} zipFileName - Name of the zip file to be downloaded
 * @returns {Promise<void>} - Promise that resolves when the zip file is downloaded
 */
export const createAndDownloadZip = async (files, zipFileName = 'Sloth-coder-generated.zip') => {
  try {
    const zip = new JSZip();
    
    // Add files to the zip
    Object.entries(files).forEach(([filePath, fileContent]) => {
      // Remove leading slash if present
      const normalizedPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
      
      // If fileContent is an object with a code property, use that
      const content = typeof fileContent === 'object' && fileContent.code 
        ? fileContent.code 
        : fileContent;
        
      zip.file(normalizedPath, content);
    });
    
    // Generate the zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    
    // Create a download link and trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(zipBlob);
    downloadLink.download = zipFileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Clean up the object URL
    URL.revokeObjectURL(downloadLink.href);
    
    return true;
  } catch (error) {
    console.error('Error creating zip file:', error);
    return false;
  }
};

/**
 * Extracts file structure from Sandpack files object
 * @param {Object} files - Sandpack files object
 * @returns {Object} - Normalized files object with path and content
 */
export const extractFilesFromSandpack = (files) => {
  const normalizedFiles = {};
  
  Object.entries(files).forEach(([path, fileData]) => {
    // If fileData is a string, use it directly
    // If it's an object with a code property, use that
    const content = typeof fileData === 'string' 
      ? fileData 
      : fileData.code || '';
      
    normalizedFiles[path] = content;
  });
  
  return normalizedFiles;
};