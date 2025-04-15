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
import { Share2Icon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

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
            className="flex items-center h-6 hover:bg-[#2a2d2e] cursor-pointer text-[13px]"
            style={{
              paddingLeft: `${depth * 8 + 4}px`,
              color: theme.highlight,
              backgroundColor: 'transparent',
              '&:hover': { backgroundColor: theme.hover },
            }}
            onClick={() => onFileSelect(item)}
          >
            <Icon path={mdiFileDocument} size={0.6} style={{ color: theme.accent }} />
            <span className="ml-1">{item.name}</span>
          </div>
        </motion.div>
      );
    }

    return (
      <div key={fullPath}>
        <div
          className="flex items-center h-6 cursor-pointer text-[13px]"
          style={{
            paddingLeft: `${depth * 8 + 4}px`,
            color: theme.highlight,
            backgroundColor: 'transparent',
            '&:hover': { backgroundColor: theme.secondary },
          }}
          onClick={() => toggleExpand(fullPath)}
        >
          <motion.div initial={false} animate={{ rotate: isExpanded ? 90 : 0 }}>
            <Icon
              path={isExpanded ? mdiChevronDown : mdiChevronRight}
              size={0.6}
              style={{ color: theme.secondary }}
            />
          </motion.div>
          <Icon
            path={isExpanded ? mdiFolderOpen : mdiFolder}
            size={0.6}
            style={{ color: theme.highlight }}
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
      className="md:w-2/12 h-full overflow-y-auto flex flex-col justify-between bg-white"
      style={{
        borderRight: `1px solid ${theme.border}`,
      }}
    >
      <div className="">
        <div className="p-2 flex justify-between items-center">
          <span className="text-[11px] uppercase tracking-wide" style={{ color: theme.text }}>
            Explorer
          </span>
          <div className="flex gap-2 items-center">
            <Share2Icon size={16} style={{ color: theme.highlight }} className="cursor-pointer" />
          </div>
        </div>
        {renderItem(data)}
      </div>

      <div className="flex justify-center items-center">
        <span className="text-[11px] uppercase tracking-wide" style={{ color: theme.highlight }}>
          Made BY CraftFossLabs
        </span>
      </div>
    </div>
  );
};

export default FileExplorer;
