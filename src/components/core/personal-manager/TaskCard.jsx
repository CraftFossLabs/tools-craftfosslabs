import { Calendar, Clock, Edit, MessageSquare, Star, StarOff, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { useDraggable } from 'react-beautiful-dragify';
import { AnimatePresence, motion } from 'framer-motion';

const TaskCard = ({ task, index, onEdit, onDelete }) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [selfEval, setSelfEval] = useState(task.selfEvaluation);

  const { draggableProps, dragHandleProps } = useDraggable({
    id: `task-${task._id}`,
    type: 'task',
    index: index,
  });

  const handleAddComment = () => {
    if (!comment.trim()) return;
    const newComments = task.reviewerComments
      ? `${task.reviewerComments}\n---\n${comment}`
      : comment;
    onEdit({ ...task, reviewerComments: newComments }, task._id);
    setComment('');
  };

  const handleSelfEval = val => {
    setSelfEval(val);
    onEdit({ ...task, selfEvaluation: val }, task._id);
  };

  const renderStars = (rating, editable = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (editable) {
        stars.push(
          <button
            key={i}
            onClick={() => handleSelfEval(i)}
            className="focus:outline-none"
            disabled={task.status !== 'Done'}
          >
            {i <= rating ? (
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
            ) : (
              <StarOff size={16} className="text-gray-300" />
            )}
          </button>
        );
      } else {
        stars.push(
          i <= rating ? (
            <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
          ) : (
            <StarOff key={i} size={16} className="text-gray-300" />
          )
        );
      }
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  const getPriorityColor = priority => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'med':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mb-3"
      {...draggableProps}
    >
      <div className="bg-white rounded-lg shadow border-l-4 border-blue-500 overflow-hidden">
        <div className="p-4">
          <div
            {...dragHandleProps}
            className="w-full h-6 flex justify-center items-center cursor-grab mb-1 text-gray-400 hover:text-gray-600"
          >
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg text-gray-900">{task.title}</h3>
            <div className="flex gap-1">
              <button
                onClick={() => onEdit(task, task._id)}
                className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => {
                  onDelete(task, task._id);
                }}
                className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          {task.description && <p className="text-gray-600 text-sm mb-3">{task.description}</p>}
          <div className="flex flex-wrap gap-2 mb-3">
            {task.priority && (
              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            )}
            {task.deadline && (
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 flex items-center gap-1">
                <Calendar size={12} />
                {formatDate(task.deadline)}
              </span>
            )}
            {task.dateAssigned && (
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 flex items-center gap-1">
                <Clock size={12} />
                Created: {formatDate(task.dateAssigned)}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">Self:</span>
              {renderStars(
                task.status === 'Done' ? selfEval : task.selfEvaluation,
                task.status === 'Done'
              )}
            </div>
            {task.reviewerScore > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Review:</span>
                {renderStars(task.reviewerScore)}
              </div>
            )}
            <button
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-1 text-xs ${task.reviewerComments ? 'text-blue-600' : 'text-gray-500'} hover:underline`}
            >
              <MessageSquare size={14} />
              {task.reviewerComments ? 'View Comments' : 'Add Comment'}
            </button>
          </div>
        </div>
        {/* Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-100 bg-gray-50 p-3 overflow-hidden"
            >
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Add Comment</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className="flex-1 p-2 text-sm border border-gray-300 rounded-md"
                    placeholder="Type a comment..."
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!comment.trim()}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    Post
                  </button>
                </div>
              </div>
              {task.reviewerComments && (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  <h4 className="text-xs font-medium text-gray-700">Comments</h4>
                  {task.reviewerComments.split('\n---\n').map((comment, i) => (
                    <div key={i} className="bg-white p-2 rounded border border-gray-200 text-sm">
                      {comment}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TaskCard;
