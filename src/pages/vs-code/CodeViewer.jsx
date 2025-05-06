import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import FileExplorer from '@/components/core/CodeEditor/FileExplorer';
import Editor from '@/components/core/CodeEditor/Editor';
import { useTheme } from '@/context/ThemeContext';
import { endpoints } from '@/services/api.config';
import { toast } from 'sonner';
import Loader from '@/components/common/Loader';

const CodeViewer = () => {
  const { urlCode } = useParams();
  const [structure, setStructure] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const handleFileSelect = file => {
    if (file.type === 'file') {
      setSelectedFile(file);
    }
  };

  const fetchData = async () => {
    try {
      const response = await endpoints.vsCode.GetSingleCodeDetails(urlCode);
      setStructure(response.data.data.content);
      toast.success('Your code is here . Great Experience For Developers from a Developer');
    } catch (error) {
      toast.error('Failed to fetch shared code');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <motion.div className={`flex  w-[calc(100vw-4rem)] h-[calc(100vh-4rem)] border ${theme.border} backdrop-blur-2xl rounded-lg`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <Loader text={'Loading code...'} />
        ) : structure ? (
          <>
            <FileExplorer data={structure} onFileSelect={handleFileSelect} />
            <Editor file={selectedFile} />
          </>
        ) : (
          <p className="m-auto text-gray-400 italic">No file structure available</p>
        )}
      </motion.div>
      <Link to={'/'} className='w-full text-end hover:underline container mt-2 cursor-pointer'>Back to craftfosslabs</Link> 
    </div>
  );
};

export default CodeViewer;
