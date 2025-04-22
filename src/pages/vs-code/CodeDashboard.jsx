import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { endpoints } from '@/services/api.config';
import { toast } from 'sonner';
import useUserStore from '@/store/userStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2, Upload, Github, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';
import Share from '@/components/common/Share';

const CodeDashboard = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [codeList, setCodeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const user = useUserStore(state => state.user);
  const [githubUrl, setGithubUrl] = useState('');
  const [zipFile, setZipFile] = useState(null);

  const handleGithubSubmit = async () => {
    if (!githubUrl.trim()) return toast.error('Please enter a GitHub URL');
    setSubmitting(true);
    try {
      const res = await endpoints.vsCode.uploadGithub(githubUrl);
      if (!res) throw new Error('Failed to clone');
      toast.success('GitHub Repo Uploaded!');
      setGithubUrl('');
      fetchData(); // Refresh the list
    } catch (err) {
      toast.error(`Error uploading GitHub repo: ${err.message || err}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleZipSubmit = async () => {
    if (!zipFile) return toast.error('Please select a ZIP file');
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('zipfile', zipFile);
      const res = await endpoints.vsCode.uploadZip(formData);
      toast.success(res.data.message);
      setZipFile(null);
      // Reset the file input
      document.getElementById('zip-upload').value = '';
      fetchData(); // Refresh the list
    } catch (err) {
      console.log(err);
      toast.error('Error uploading ZIP file.');
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteDialog = id => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await endpoints.vsCode.deleteCode(deleteId);
      setCodeList(prevList => prevList.filter(item => item._id !== deleteId));
      toast.success('Code deleted successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete code');
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  const fetchData = async () => {
    try {
      const response = await endpoints.vsCode.GetAllCodeByUser();
      setCodeList(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch shared code');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  };

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="capitalize font-semibold md:text-2xl"
      >
        Hey{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          {user.name}
        </span>
      </motion.h1>

      <div className="flex flex-col md:flex-row items-stretch justify-between my-6 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`bg-gradient-to-bl ${theme.primary} ${theme.text} p-6 rounded-2xl md:w-1/2 w-full space-y-4 hover:shadow-lg transition-all`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2">
            <Github size={20} />
            <h3 className="text-lg font-semibold">Create from GitHub repo</h3>
          </div>
          <Label htmlFor="github-url">GitHub Repo URL</Label>
          <Input
            id="github-url"
            type="url"
            placeholder="https://github.com/username/repo"
            value={githubUrl}
            onChange={e => setGithubUrl(e.target.value)}
            className="backdrop-blur-sm bg-opacity-50"
          />
          <Button className="w-full mt-2" onClick={handleGithubSubmit} disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cloning...
              </>
            ) : (
              <>Submit</>
            )}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`bg-gradient-to-br ${theme.primary} ${theme.text} p-6 rounded-2xl md:w-1/2 w-full space-y-4 hover:shadow-lg transition-all`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2">
            <Upload size={20} />
            <h3 className="text-lg font-semibold">Upload ZIP file</h3>
          </div>
          <Label htmlFor="zip-upload">Upload ZIP File</Label>
          <Input
            id="zip-upload"
            type="file"
            accept=".zip"
            onChange={e => setZipFile(e.target.files[0])}
            className="backdrop-blur-sm bg-opacity-50"
          />
          <Button className="w-full mt-2" onClick={handleZipSubmit} disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>Upload</>
            )}
          </Button>
        </motion.div>
      </div>

      <motion.div
        className={`flex flex-col gap-4 backdrop-blur-2xl`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-2xl font-bold text-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Your Shared Code
        </motion.h2>

        {loading ? (
          <div className="flex justify-center items-center p-10">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : codeList.length === 0 ? (
          <motion.div
            className="text-center py-10 text-gray-400 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            You haven't shared any code yet. Upload a GitHub repo or ZIP to get started!
          </motion.div>
        ) : (
          <motion.div
            className="grid md:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {codeList.map(item => (
                <motion.div
                  key={item._id}
                  className={`p-5 rounded-xl  ${theme.secondary} ${theme.text} hover:shadow-xl transition-all relative group min-h-72 flex flex-col justify-between`}
                  variants={cardVariants}
                  layout
                  whileHover={{ y: -5 }}
                  exit="exit"
                >
                  <motion.div
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.2 }}
                  >
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openDeleteDialog(item._id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </motion.div>

                  <h3 className="text-lg font-semibold mb-2">
                    📁 {item.content.children[0]?.name || 'Untitled'}
                  </h3>
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-medium">{item.clicks}+ Views</h1>
                    <Share url={item.shortUrl} />
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-200">
                    <p className="text-xs">
                      Created: {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`text-xs ${theme.highlight}`}
                      onClick={() => navigate(`/code-viewer/view/${item.urlCode}`)}
                    >
                      Open
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this shared code. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CodeDashboard;
