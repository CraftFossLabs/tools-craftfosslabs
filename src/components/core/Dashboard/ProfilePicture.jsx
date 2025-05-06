import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { endpoints } from '@/services/api.config';
import { useTheme } from '@/context/ThemeContext';
import CommonHeader from './CommonHeader';
import { Label } from '@/components/ui/label';
import { ArrowUp01Icon, CheckCircle2Icon, ImageIcon, XCircleIcon } from 'lucide-react';
import Loader from '@/components/common/Loader';
import { Input } from '@/components/ui/input';

const ProfilePicture = () => {
  const {theme} = useTheme();
  const [formData, setFormData] = useState({
    type: 'name',
    name: 'CraftFoss Labs',
    color: '#4F46E5',
    gender: 'male',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      if (formData.type === 'name') {
        const data = {
          color: formData.color,
          name: formData.name,
        };
        const response = await endpoints.profilePicture.generateAvatar(data);
        setImageUrl(response.data.imageUrl);
      } else {
        const response = await endpoints.profilePicture.generateAvatarByGender(
          formData.gender
        );
        setImageUrl(response.data.imageUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `profile-picture-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.log(err);
      setError('Failed to download image');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${theme.secondary} p-6 rounded-xl`}
      >
        <div className="max-w-4xl mx-auto space-y-4">
         
          <CommonHeader title={'Profile Picture Generator'} subtext={'Generate beautiful profile pictures based on name or gender'}/>
                   
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={` bg-gradient-to-br ${theme.primary} rounded-md hover:shadow-md transition-colors duration-200`}
          >
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label>
                    Generation Type
                  </Label>
                  <div className="mt-2 space-x-4">
                    <Label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="name"
                        checked={formData.type === 'name'}
                        onChange={() =>
                          setFormData({ ...formData, type: 'name' })
                        }
                        className={`form-radio ${theme.highlight}`}
                      />
                      <span className={`ml-2 ${theme.text}`}>
                        Name Based
                      </span>
                    </Label>
                    <Label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="gender"
                        checked={formData.type === 'gender'}
                        onChange={() =>
                          setFormData({ ...formData, type: 'gender' })
                        }
                        className={`form-radio ${theme.highlight}`}
                      />
                      <span className={`ml-2 ${theme.text}`}>
                        Gender Based
                      </span>
                    </Label>
                  </div>
                </div>

                {formData.type === 'name' ? (
                  <>
                    <div>
                      <Label
                        htmlFor="name" 
                      >
                        Name
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`mt-1 w-full  ${theme.border}`}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="color" >
                        color Color
                      </Label>
                      <Input
                        type="color"
                        id="color"
                        value={formData.color}
                        onChange={(e) =>
                          setFormData({ ...formData, color: e.target.value })
                        }
                        className={`mt-1 w-full  ${theme.border}`}
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <Label  >Gender  </Label>
                    <div className="mt-2 space-x-4">
                      <Label className="inline-flex items-center">
                        <Input
                          type="radio"
                          value="male"
                          checked={formData.gender === 'male'}
                          onChange={() =>
                            setFormData({ ...formData, gender: 'male' })
                          }
                          className={`form-radio ${theme.highlight}`}
                          />
                          <span className={`ml-2 ${theme.text}`}>
                          Male
                        </span>
                      </Label>
                      <Label className="inline-flex items-center">
                        <Input
                          type="radio"
                          value="female"
                          checked={formData.gender === 'female'}
                          onChange={() =>
                            setFormData({ ...formData, gender: 'female' })
                          }
                          className={`form-radio ${theme.highlight}`}
                      />
                      <span className={`ml-2 ${theme.text}`}>
                          Female
                        </span>
                      </Label>
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={
                    loading || (formData.type === 'name' && !formData.name)
                  }
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
                >
                  {loading ? (
                    <> 
                      <Loader text={'Generating... '} />
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-5 w-5 mr-2" />
                      Generate Profile Picture
                    </>
                  )}
                </motion.button>
              </form>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 bg-red-50 dark:bg-red-900/20 p-4 rounded-md"
                  >
                    <div className="flex items-center">
                      <XCircleIcon className="h-5 w-5 text-red-400 mr-2" />
                      <p className="text-sm text-red-700 dark:text-red-300">
                        {error}
                      </p>
                    </div>
                  </motion.div>
                )}

                {imageUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative group">
                        <img
                          src={imageUrl}
                          alt="Generated Profile Picture"
                          width={192}
                          height={192}
                          className="w-48 h-48 rounded-full object-cover shadow-lg transition-transform duration-200 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 hover:bg-gray-900  rounded-full transition-opacity duration-200 flex items-center justify-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleDownload}
                            className="p-2 rounded-full shadow-lg  transition-opacity duration-200"
                          >
                            <ArrowUp01Icon className="h-6 w-6 text-gray-700 dark:text-gray-300 cursor-pointer" />
                          </motion.button>
                        </div>
                      </div>
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <CheckCircle2Icon className="h-5 w-5 mr-2" />
                        <span className="text-sm">
                          Profile picture generated successfully!
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ProfilePicture;
