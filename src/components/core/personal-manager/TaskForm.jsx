import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/context/ThemeContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Loader from '@/components/common/Loader';

const TaskForm = ({
  mode = 'create',
  task,
  loading = false,
  columns = [],
  onChange,
  onSubmit,
  onCancel,
}) => {
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ height: 0, opacity: 0.9 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0.9 }}
      className={`${theme.secondary} ${theme.text} rounded-lg shadow p-6 mb-8 overflow-hidden`}
    >
      <h2 className="text-xl font-semibold mb-4">
        {mode === 'edit' ? 'Edit Task' : 'Add New Task'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1">Title</Label>
          <Input
            type="text"
            value={task.title}
            onChange={e => onChange({ ...task, title: e.target.value })}
            placeholder="Task title"
            className={`border ${theme.border}`}
          />
        </div>
        <div>
          <Label className="mb-1">Priority</Label>
          <Select
            value={task.priority}
            onValueChange={(value) => onChange({ ...task, priority: value })}
          >
            <SelectTrigger className={`border ${theme.border} w-full`}>
              <SelectValue placeholder="Choose Prority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Med">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-1">Deadline</Label>
          <Input
            type="date"
            value={task.deadline}
            onChange={e => onChange({ ...task, deadline: e.target.value })}
            className={`border ${theme.border}`}
          />
        </div>
        <div>
          <Label className="mb-1">Status</Label>
          <Select
            value={task.status}
            onValueChange={(value) => onChange({ ...task, status: value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <SelectTrigger className={`border ${theme.border} w-full`}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {columns.map(column => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Label className="mb-1">Description</Label>
          <textarea
            value={task.description}
            onChange={e => onChange({ ...task, description: e.target.value })}
            className={`w-full p-4 border ${theme.border} rounded-md ${theme.text}`}
            rows={3}
            placeholder="Task description"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant={'outline'}
          onClick={onCancel}
          className={`border ${theme.border}`}
          type="button"
        >
          Cancel
        </Button>
        <Button
          onClick={() => onSubmit(task)}
          disabled={!task.title || loading}
          className={`disabled:bg-gray-400 flex items-center gap-2 ${theme.accent} ${theme.highlight} overflow-hidden`}
          type="button"
        >
          {loading ? <Loader text={'Processing'} /> : mode === 'edit' ? 'Save Changes' : 'Add Task'}
        </Button>
      </div>
    </motion.div>
  );
};

export default TaskForm;
