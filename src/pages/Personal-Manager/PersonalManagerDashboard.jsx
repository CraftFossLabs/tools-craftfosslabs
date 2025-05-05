import { useState, useEffect } from 'react';
import { DragifyProvider } from 'react-beautiful-dragify';
import { PlusCircle, Trash2 } from 'lucide-react';
import TaskForm from '@/components/core/personal-manager/TaskForm';
import TaskColumn from '@/components/core/personal-manager/TaskColumn';
import Modal from '@/components/core/personal-manager/Modal';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import Loader from '@/components/common/Loader';
import { endpoints } from '@/services/api.config';

const PersonalManagerDashboard = () =>  {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ type: null, task: null });
  const columns = ['To Do', 'In Progress', 'Done'];
  const [formTask, setFormTask] = useState({
    dateAssigned: new Date().toISOString().split('T')[0],
    title: '',
    description: '',
    priority: 'Med',
    deadline: '',
    status: 'To Do',
    selfEvaluation: 0,
    reviewerScore: 0,
    reviewerComments: '',
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await endpoints.PersonalManager.fetchTasks();
      console.log(fetchedTasks)
      if (fetchedTasks && Array.isArray(fetchedTasks)) {
        setTasks(fetchedTasks.data);
      } else if (fetchedTasks && Array.isArray(fetchedTasks.data)) {
        setTasks(fetchedTasks.data);
      } else if (fetchedTasks && Array.isArray(fetchedTasks.tasks)) {
        setTasks(fetchedTasks.tasks);
      } else {
        console.warn('Unexpected response format, returning empty array:', fetchedTasks.data);
        setTasks([]);
      } 
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setFormTask({
      dateAssigned: new Date().toISOString().split('T')[0],
      title: '',
      description: '',
      priority: 'Med',
      deadline: '',
      status: 'To Do',
      selfEvaluation: 0,
      reviewerScore: 0,
      reviewerComments: '',
    });
    setModal({ type: 'create', task: null });
  };

  const handleOpenEdit = task => {
    setFormTask({ ...task });
    setModal({ type: 'edit', task });
  };

  const handleOpenDelete = task => {
    setModal({ type: 'delete', task });
  };

  const handleCloseModal = () => {
    setModal({ type: null, task: null });
  };

  const handleFormChange = updated => {
    setFormTask(updated);
  };

  const handleAddTask = async task => {
    setLoading(true);
    try {
      await endpoints.PersonalManager.addTask(task);
      handleCloseModal();
      await loadTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (updatedTask, _id) => {
    setLoading(true);
    try {
      await endpoints.PersonalManager.updateTask(updatedTask, _id);
      handleCloseModal();
      await loadTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async _id => {
    setLoading(true);
    try {
      await endpoints.PersonalManager.deleteTask(_id);
      handleCloseModal();
      await loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = result => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    const taskId = draggableId.replace('task-', '');
    const taskToUpdate = tasks.find(task => task._id === taskId);

    if (taskToUpdate && taskToUpdate.status !== destination.droppableId) {
      const updatedTask = {
        ...taskToUpdate,
        status: destination.droppableId,
      };
      handleUpdateTask(updatedTask, taskToUpdate._id);
    }
  };

  return (
    <div className={`w-full  ${theme.text} h-full`}>
      <div className="pt-20 max-w-7xl mx-auto">
        <div className="mb-6 w-full flex justify-end items-center">
          <Button onClick={handleOpenCreate} className={`flex items-center  gap-2 ${theme.accent}`}>
            <PlusCircle size={18} />
            Add New Task
          </Button>
        </div>

        {loading && <Loader text={'Loading The Details Of Tasks Sooner....'} />}

        {/* Task Board */}
        <DragifyProvider onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map(columnId => (
              <TaskColumn
                key={columnId}
                columnId={columnId}
                tasks={tasks.filter(task => task.status === columnId)}
                onUpdateTask={(task, _id) => handleOpenEdit({ ...task, _id })}
                onDeleteTask={(task, _id) => handleOpenDelete({ ...task, _id })}
              />
            ))}
          </div>
        </DragifyProvider>

        {/* Create/Edit Modal */}
        <Modal isOpen={modal.type === 'create' || modal.type === 'edit'} onClose={handleCloseModal}>
          <TaskForm
            mode={modal.type}
            task={formTask}
            loading={loading}
            columns={columns}
            onChange={handleFormChange}
            onSubmit={modal.type === 'edit' ? t => handleUpdateTask(t, t._id) : handleAddTask}
            onCancel={handleCloseModal}
          />
        </Modal>

        {/* Delete Modal */}
        <Modal isOpen={modal.type === 'delete'} onClose={handleCloseModal}>
          <div className={`p-6 text-center rounded-md ${theme.secondary}`}>
            <div className={`mb-4 ${theme.highlight} flex justify-center`}>
              <Trash2 size={32} />
            </div>
            <h2 className={`text-lg font-semibold ${theme.highlight} mb-2`}>Delete Task?</h2>
            <p className={`mb-6 ${theme.text}`}>
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant={'outline'} onClick={handleCloseModal} className="w-1/2">
                Cancel
              </Button>
              <Button
                variant={'destructive'}
                className="w-1/2"
                onClick={() => handleDeleteTask(modal.task._id)}
                disabled={loading}
              >
                {loading ? <Loader text={'Deleting Task ..'} /> : 'Delete'}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default PersonalManagerDashboard