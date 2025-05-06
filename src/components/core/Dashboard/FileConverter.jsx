import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { useTheme } from '@/context/ThemeContext';
import CommonHeader from './CommonHeader';
import { endpoints } from '@/services/api.config';
import { CircleCheckIcon, File } from 'lucide-react';
import Loader from '@/components/common/Loader';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const supportedFormats = {
  images: {
    label: 'Images',
    formats: [
      { value: 'jpg', label: 'JPEG' },
      { value: 'png', label: 'PNG' },
      { value: 'webp', label: 'WebP' },
      { value: 'avif', label: 'AVIF' },
      { value: 'gif', label: 'GIF' },
    ],
  },
  documents: {
    label: 'Documents',
    formats: [
      { value: 'pdf', label: 'PDF' },
      { value: 'docx', label: 'DOCX' },
      { value: 'txt', label: 'TXT' },
    ],
  },
  audio: {
    label: 'Audio',
    formats: [
      { value: 'mp3', label: 'MP3' },
      { value: 'wav', label: 'WAV' },
    ],
  },
  video: {
    label: 'Video',
    formats: [
      { value: 'mp4', label: 'MP4' },
      { value: 'avi', label: 'AVI' },
    ],
  },
};

const getSupportedTargetFormats = (fileType) => {
  if (fileType.startsWith('image/')) {
    return ['jpg', 'png', 'webp', 'avif', 'gif', 'pdf'];
  } else if (fileType === 'application/pdf') {
    return ['docx', 'txt'];
  } else if (fileType.startsWith('video/')) {
    return ['mp4', 'avi', 'mp3', 'wav'];
  } else if (fileType.startsWith('audio/')) {
    return ['mp3', 'wav'];
  } else if (
    fileType ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return ['pdf', 'txt'];
  } else if (fileType === 'text/plain') {
    return ['pdf', 'docx'];
  }
  return [];
};

const getFileTypeCategory = (fileType) => {
  if (fileType.startsWith('image/')) return 'Image';
  if (fileType.startsWith('video/')) return 'Video';
  if (fileType.startsWith('audio/')) return 'Audio';
  if (fileType === 'application/pdf') return 'PDF';
  if (
    fileType ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
    return 'Word Document';
  if (fileType === 'text/plain') return 'Text Document';
  return 'Unknown';
};

const FileConverter = () => {
  const { theme } = useTheme();
  const [file, setFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const newFile = acceptedFiles[0];
        setFile(newFile);
        setError(null);
        setResult(null);

        // Set default target format based on file type
        const fileType = newFile.type;
        const supportedFormats = getSupportedTargetFormats(fileType);
        if (supportedFormats.length > 0) {
          setTargetFormat(supportedFormats[0]);
        } else {
          setError('This file type is not supported for conversion');
          setFile(null);
        }
      }
    },
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif'],
      'application/pdf': ['.pdf'],
      'video/*': ['.mp4', '.avi'],
      'audio/*': ['.mp3', '.wav'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
  });

  const handleConvert = async () => {
    if (!file || !targetFormat) {
      setError('Please select both a file and target format');
      return;
    }

    // Validate conversion is supported
    const fileType = file.type;
    const supportedFormats = getSupportedTargetFormats(fileType);
    if (!supportedFormats.includes(targetFormat)) {
      setError('This conversion is not supported');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetFormat', targetFormat);
    console.log('Has file?', formData.has('file'));
    console.log('Target format:', formData.get('targetFormat'));
    try {
      const response = await endpoints.fileConverter.convertFile(formData);
      if (response.data && response.status === 200) {
        // Handle binary response
        const contentType = response.headers['content-type'];
        const contentDisposition = response.headers['content-disposition'];
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1].replace(/"/g, '')
          : `converted.${targetFormat}`;

        // Create blob from response data
        const blob = new Blob([response.data], { type: contentType });
        const url = window.URL.createObjectURL(blob);

        setResult({
          url,
          filename,
        });
      } else if (response.data.success) {
        // Handle JSON success response
        const contentDisposition = response.headers['content-disposition'];
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1].replace(/"/g, '')
          : `converted.${targetFormat}`;
        const url = window.URL.createObjectURL(response.data.url);
        setResult({
          url,
          filename,
        });
      } else {
        // Handle JSON error response
        setError(
          response.data.message || response.data.error || 'Conversion failed'
        );
      }
    } catch (err) {
      console.error('Conversion error:', err);
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        'An unexpected error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (filename) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'docx':
      case 'txt':
        return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
      case 'avif':
        return '🖼️';
      case 'mp3':
      case 'wav':
        return '🎵';
      case 'mp4':
      case 'avi':
        return '🎬';
      default:
        return '📁';
    }
  };

  const getAvailableFormats = () => {
    if (!file) return [];
    const fileType = file.type;
    const allowedFormats = getSupportedTargetFormats(fileType);

    return Object.entries(supportedFormats)
      .map(([category, categoryData]) => ({
        category,
        label: categoryData.label,
        formats: categoryData.formats.filter((format) =>
          allowedFormats.includes(format.value)
        ),
      }))
      .filter((category) => category.formats.length > 0);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${theme.secondary} p-2 rounded-xl`}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <CommonHeader title={'File Converter'} subtext={'Convert your files between various formats with ease'} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`bg-gradient-to-br ${theme.primary} rounded-md hover:shadow-md transition-colors duration-200`}
          >
            <div className="px-4 py-5 sm:p-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${isDragActive
                    ? `${theme.border}`
                    : `${theme.border}`
                  }`}
              >
                <input {...getInputProps()} />
                <File className={`mx-auto h-12 w-12 ${theme.highlight}`} />
                <p className={`mt-2 text-sm ${theme.text}`}>
                  {isDragActive
                    ? 'Drop the file here'
                    : 'Drag and drop a file here, or click to select'}
                </p>
                <p className={`mt-1 text-sm ${theme.text}`}>
                  Supported formats: Images (PNG, JPG, GIF, WebP, AVIF),
                  Documents (PDF, DOCX, TXT), Audio (MP3, WAV), Video (MP4, AVI)
                </p>
              </div>

              {file && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-4"
                >
                  <div className={`flex items-center justify-between p-4 ${theme.secondary} rounded-lg`}>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getFileIcon(file.name)}</span>
                      <div>
                        <p className="text-sm font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-xs">
                          {getFileTypeCategory(file.type)} •{' '}
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 ${theme.secondary} rounded-lg space-y-2`}>
                    <Label htmlFor="targetFormat" > Convert to </Label>
                    <select
                      id="targetFormat"
                      value={targetFormat}
                      onChange={(e) => setTargetFormat(e.target.value)}
                      className={`p-2 appearance-none w-full rounded-md border ${theme.border}`}
                    >
                      <option value="">Select format</option>
                      {getAvailableFormats().map(
                        ({ category, label, formats }) => (
                          <optgroup key={category} label={label}>
                            {formats.map((format) => (
                              <option key={format.value} value={format.value}>
                                {format.label}
                              </option>
                            ))}
                          </optgroup>
                        )
                      )}
                    </select>
                  </div>

                  <Button
                    onClick={handleConvert}
                    disabled={loading || !targetFormat}
                    className={`w-full ${theme.accent}`}
                  >
                    {loading ? (
                      <>
                        <Loader text={'Converting...'} />
                      </>
                    ) : (
                      'Convert'
                    )}
                  </Button>
                </motion.div>
              )}

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 bg-red-50 p-4 rounded-md"
                  >
                    <p className="text-sm text-red-700">
                      {error}
                    </p>
                  </motion.div>
                )}

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-green-50 p-4 rounded-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CircleCheckIcon className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-sm font-medium text-green-800">
                            Conversion successful!
                          </p>
                          <a
                            href={result.url}
                            download={result.filename}
                            className="text-sm text-green-600 hover:underline"
                          >
                            Download converted file
                          </a>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setFile(null);
                          setTargetFormat('');
                          setResult(null);
                          setError(null);
                        }}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                      >
                        Convert another
                      </motion.button>
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

export default FileConverter;
