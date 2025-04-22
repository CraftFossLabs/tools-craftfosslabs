import React from 'react';
import {
  mdiFolder,
  mdiFileDocument,
  mdiChevronRight,
  mdiChevronDown,
  mdiFolderOpen,
} from '@mdi/js';
import Icon from '@mdi/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import ThemeButton from '@/components/common/ThemeButton';
import Share from '@/components/common/Share';

const FileExplorer = ({ data, onFileSelect }) => {
  const { theme } = useTheme();
  const [expandedItems, setExpandedItems] = React.useState(
    new Set(['vs-code', 'src', 'components'])
  );

  const toggleExpand = path => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const renderItem = (item, path = '', depth = 0) => {
    const fullPath = `${path}/${item.name}`;
    const isExpanded = expandedItems.has(fullPath);

    if (item.type === 'file') {
      return (
        <motion.div
          key={fullPath}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="group"
        >
          <div
            className={`flex items-center h-6  cursor-pointer text-[13px] ${theme.text}`}
            style={{ paddingLeft: `${depth * 8 + 4}px` }}
            onClick={() => onFileSelect(item)}
          >
            <Icon path={mdiFileDocument} size={0.6} className={`${theme.highlight}`} />
            <span className="ml-1">{item.name}</span>
          </div>
        </motion.div>
      );
    }

    return (
      <div key={fullPath}>
        <div
          className={`flex items-center h-6 cursor-pointer text-[13px] bg-transparent  ${theme.text}`}
          style={{ paddingLeft: `${depth * 8 + 4}px` }}
          onClick={() => toggleExpand(fullPath)}
        >
          <motion.div initial={false} animate={{ rotate: isExpanded ? 90 : 0 }}>
            <Icon
              path={isExpanded ? mdiChevronDown : mdiChevronRight}
              size={0.6}
              className={`${isExpanded ? theme.highlight : theme.text}`}
            />
          </motion.div>
          <Icon
            path={isExpanded ? mdiFolderOpen : mdiFolder}
            size={0.6}
            className={`${isExpanded ? theme.highlight : theme.text}`}
          />
          <span className="ml-1">{item.name}</span>
        </div>
        <AnimatePresence>
          {isExpanded && item.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {item.children.map(child => renderItem(child, fullPath, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div
      className={`md:w-2/12 min-h-[90vh] overflow-y-auto rounded-l-lg flex flex-col justify-between h-full bg-gradient-to-bl ${theme.primary}  border-r ${theme.border}`}
    >
      <div className="max-w-96">
        <div className="p-2 flex justify-between items-center">
          <span className={`text-[11px] uppercase tracking-wide ${theme.text}`}>Explorer</span>
          <div className="flex gap-2 items-center">
            <ThemeButton />
            <Share url={window.location.href} />
          </div>
        </div>
        {renderItem(data)}
      </div>

      <div className={`flex justify-center items-center p-2 mt-4 ${theme.secondary} ${theme.text}`}>
        <span className="text-[11px] uppercase tracking-wide">Made BY CraftFossLabs</span>
      </div>
    </div>
  );
};

export default FileExplorer;
