import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useDroppable } from 'react-beautiful-dragify';
import TaskCard from './TaskCard';
import { useTheme } from '@/context/ThemeContext';

const TaskColumn = ({ columnId, tasks, onUpdateTask, onDeleteTask }) => {
  const { theme } = useTheme();
  const { droppableProps } = useDroppable({
    id: columnId,
    type: 'task',
    direction: 'vertical',
  });

  const getColumnColor = columnId => {
    switch (columnId) {
      case 'To Do':
        return 'border-blue-500';
      case 'In Progress':
        return 'border-yellow-500';
      case 'Done':
        return 'border-green-500';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <div
      className={`bg-gradient-to-tl ${theme.primary}  ${theme.text} rounded-lg p-4 hover:shadow border-t-4 ${getColumnColor(columnId)}`}
    >
      <h2 className={`text-lg font-semibold mb-4 ${theme.highlight}`}>
        {columnId} ({tasks.length})
      </h2>
      <div {...droppableProps} className="min-h-96">
        <AnimatePresence>
          {tasks.map((task, index) => (
            <TaskCard
              key={`task-${task._id}`}
              task={task}
              index={index}
              onEdit={onUpdateTask}
              onDelete={onDeleteTask}
            />
          ))}
        </AnimatePresence>
        {tasks.length === 0 && (
          <div
            className={`text-center p-8 border-2 border-dashed  ${theme.border} ${theme.text} rounded-lg`}
          >
            No tasks
          </div>
        )}
      </div>
    </div>
  );
};
export default TaskColumn;
