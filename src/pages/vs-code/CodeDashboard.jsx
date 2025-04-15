import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FileExplorer from '@/components/core/CodeEditor/FileExplorer';
import Editor from '@/components/core/CodeEditor/Editor';
import fileStructure from '@/data/fileStructure.json';

const CodeDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = file => {
    if (file.type === 'file') {
      setSelectedFile(file);
    }
  };
  return (
    <motion.div
      className="flex flex-row "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FileExplorer data={fileStructure} onFileSelect={handleFileSelect} />
      <Editor file={selectedFile} />
    </motion.div>
  );
};

export default CodeDashboard;
