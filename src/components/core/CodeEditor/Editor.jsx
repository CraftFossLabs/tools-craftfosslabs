import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import { Copy, Check, Loader2, CircleDotDashed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import toast from 'react-hot-toast';

const Editor = ({ file }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [content, setContent] = React.useState('');
  const codeRef = React.useRef(null);

  useEffect(() => {
    if (file?.content) {
      setIsLoading(true);
      setTimeout(
        () => {
          setContent(file.content);
          setIsLoading(false);
          requestAnimationFrame(() => {
            if (codeRef.current) {
              Prism.highlightElement(codeRef.current);
            }
          });
        },
        file.content.length > 100000 ? 500 : 0
      );
    } else {
      setContent('');
      setIsLoading(false);
    }
  }, [file]);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.scrollTop = 0;
    }
  }, [content]);

  const handleCopy = async () => {
    if (content) {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderTabs = () => {
    if (!file) return null;
    return (
      <div
        className={`h-9 flex items-center justify-between border-b ${theme.border}  ${theme.secondary} ${theme.text}`}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex items-center h-full px-3 text-[13px]`}
        >
          <span className="mr-2">
            {' '}
            <CircleDotDashed size={12} className={`${theme.highlight} animate-pulse`} />
          </span>{' '}
          {file.name}
          {file.content.length > 100000 && (
            <span className="ml-2 text-xs">
              (Large file - {Math.round(file.content.length / 1000)}KB)
            </span>
          )}
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCopy}
          className="flex items-center h-full px-3 mr-2 cursor-pointer rounded"
          style={{ color: theme.accent }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check size={16} />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Copy size={16} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    );
  };

  if (!file) {
    return (
      <div
        className={`flex-1 flex items-center justify-center text-[13px] ${theme.primary} ${theme.text}`}
      >
        Select a file to view its contents
      </div>
    );
  }

  return (
    <motion.div className={`flex-1 flex flex-col w-[70vw] overflow-scroll bg-black`}>
      {renderTabs()}
      <div className="flex-1 overflow-auto h-[94vh]">
        <div className="p-4 bg-black h-[82vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <Loader2 className={`animate-spin ${theme.highlight}`} size={24} />
              <p>Loading Your Code Please Wait</p>
            </div>
          ) : (
            <pre className="!bg-transparent !m-0 !p-0">
              <code
                ref={codeRef}
                className={`language-${file.language || 'javascript'}`}
                style={{
                  fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                  fontSize: '13px',
                  lineHeight: '1.5',
                }}
              >
                {content}
              </code>
            </pre>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Editor;
