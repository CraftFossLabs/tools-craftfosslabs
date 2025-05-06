import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

const ImageProcessing = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [operations, setOperations] = useState({
    resize: {
      width: 800,
      height: 600,
      fit: 'cover',
    },
    format: 'jpeg',
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.avif'],
    },
    maxFiles: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('operations', JSON.stringify(operations));

      const response = await fetch('/api/image-processing', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to process image');
      }

      // Get the filename from the Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition');
      const fileName = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : `processed.${operations.format || 'jpg'}`;

      // Create a blob from the response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleOperationChange = async (key, value) => {
    const newOperations = { ...operations, [key]: value };
    setOperations(newOperations);

    // Generate preview if we have a file
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('operations', JSON.stringify(newOperations));

        const response = await fetch('/api/image-preview', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const blob = await response.blob();
          const previewUrl = URL.createObjectURL(blob);
          setPreviewUrl(previewUrl);
        }
      } catch (error) {
        console.error('Preview generation failed:', error);
      }
    }
  };

  // Update preview whenever operations or selectedFile changes
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const generatePreview = async () => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('operations', JSON.stringify(operations));

        const response = await fetch('/api/image-preview', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const blob = await response.blob();
          // Clean up old preview URL to prevent memory leaks
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
          }
          setPreviewUrl(URL.createObjectURL(blob));
        }
      } catch (error) {
        console.error('Preview generation failed:', error);
      }
    };

    generatePreview();

    // Cleanup function
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [operations, file, previewUrl]);

  const PreviewSection = () => {
    if (!file && !previewUrl) return null;

    return (
      <div className="mt-6 p-4 border rounded-lg dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      <Helmet>
        <title>Image Processing | Free API | CraftFosslabs</title>
        <meta
          name="title"
          content="Image Processing | Free API | CraftFosslabs"
        />
        <meta
          name="description"
          content="Image Processing | Free API | CraftFosslabs"
        />
        <meta
          name="keywords"
          content="Image Processing, Free API, CraftFosslabs"
        />
        <meta name="author" content="CraftFosslabs" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Image Processing | Free API | CraftFosslabs"
        />
        <meta
          property="og:description"
          content="Image Processing | Free API | CraftFosslabs"
        />
        <meta
          property="og:image"
          content="https://freeapi.craftfosslabs.com/logo.png"
        />
        <meta
          property="og:url"
          content="https://freeapi.craftfosslabs.com/image-processing"
        />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Image Processing | Free API | CraftFosslabs"
        />
        <meta
          property="twitter:description"
          content="Image Processing | Free API | CraftFosslabs"
        />
        <meta
          property="twitter:image"
          content="https://freeapi.craftfosslabs.com/logo.png"
        />
        <meta
          property="twitter:url"
          content="https://freeapi.craftfosslabs.com/image-processing"
        />
        <meta property="twitter:type" content="website" />
        <link
          rel="canonical"
          href="https://freeapi.craftfosslabs.com/image-processing"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="robots" content="index, follow" />
        <meta name="generator" content="React-helmet" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200"
      >
        <div className="flex justify-between items-start max-w-7xl mx-auto gap-4">
          <div className="md:w-2/3 w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Image Processing
              </h1>
              <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
                Process and enhance your images with various operations
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 bg-white dark:bg-gray-800 shadow sm:rounded-lg transition-colors duration-200"
            >
              <div className="px-4 py-5 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
                    }`}
                  >
                    <input {...getInputProps()} />
                    {preview ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={preview}
                          alt="Preview"
                          width={800}
                          height={600}
                          className="max-h-48 mx-auto rounded-lg shadow-lg"
                        />
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                          Selected file: {file?.name}
                        </p>
                      </motion.div>
                    ) : (
                      <div>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                          Drag and drop an image here, or click to select
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Supported formats: JPG, PNG, WebP, AVIF
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Resize Controls */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Resize
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Width
                          </label>
                          <input
                            type="number"
                            value={operations.resize?.width || ''}
                            onChange={(e) =>
                              handleOperationChange('resize', {
                                ...operations.resize,
                                width: parseInt(e.target.value),
                              })
                            }
                            className="mt-1 p-2 appearance-none block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Height
                          </label>
                          <input
                            type="number"
                            value={operations.resize?.height || ''}
                            onChange={(e) =>
                              handleOperationChange('resize', {
                                ...operations.resize,
                                height: parseInt(e.target.value),
                              })
                            }
                            className="mt-1 p-2 appearance-none block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Fit
                        </label>
                        <select
                          value={operations.resize?.fit || 'cover'}
                          onChange={(e) =>
                            handleOperationChange('resize', {
                              ...operations.resize,
                              fit: e.target.value,
                            })
                          }
                          className="mt-1 p-2 appearance-none block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="cover">Cover</option>
                          <option value="contain">Contain</option>
                          <option value="fill">Fill</option>
                          <option value="inside">Inside</option>
                          <option value="outside">Outside</option>
                        </select>
                      </div>
                    </motion.div>

                    {/* Basic Operations */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Basic Operations
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Rotate (degrees)
                          </label>
                          <input
                            type="number"
                            value={operations.rotate || ''}
                            onChange={(e) =>
                              handleOperationChange(
                                'rotate',
                                parseInt(e.target.value)
                              )
                            }
                            className="mt-1 p-2 appearance-none block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Blur
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={operations.blur || ''}
                            onChange={(e) =>
                              handleOperationChange(
                                'blur',
                                parseInt(e.target.value)
                              )
                            }
                            className="mt-1 p-2 appearance-none block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={operations.grayscale || false}
                            onChange={(e) =>
                              handleOperationChange(
                                'grayscale',
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          <span className="ml-2 p-2 appearance-none text-sm text-gray-700 dark:text-gray-300">
                            Grayscale
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={operations.negate || false}
                            onChange={(e) =>
                              handleOperationChange('negate', e.target.checked)
                            }
                            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          <span className="ml-2 p-2 appearance-none text-sm text-gray-700 dark:text-gray-300">
                            Negate
                          </span>
                        </label>
                      </div>
                    </motion.div>

                    {/* Advanced Operations */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Advanced Operations
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Sharpen
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={operations.sharpen || ''}
                            onChange={(e) =>
                              handleOperationChange(
                                'sharpen',
                                parseInt(e.target.value)
                              )
                            }
                            className="mt-1 p-2 appearance-none block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Threshold
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="255"
                            value={operations.threshold || ''}
                            onChange={(e) =>
                              handleOperationChange(
                                'threshold',
                                parseInt(e.target.value)
                              )
                            }
                            className="mt-1 p-2 appearance-none block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Gamma
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={operations.gamma || ''}
                            onChange={(e) =>
                              handleOperationChange(
                                'gamma',
                                parseFloat(e.target.value)
                              )
                            }
                            className="mt-1 p-2 appearance-none block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Format
                          </label>
                          <select
                            value={operations.format || 'jpeg'}
                            onChange={(e) =>
                              handleOperationChange('format', e.target.value)
                            }
                            className="mt-1 p-2 appearance-none block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          >
                            <option value="jpeg">JPEG</option>
                            <option value="png">PNG</option>
                            <option value="webp">WebP</option>
                            <option value="avif">AVIF</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>

                    {/* Adjustments */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Adjustments
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Brightness
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="200"
                            value={operations.brightness || 100}
                            onChange={(e) =>
                              handleOperationChange(
                                'brightness',
                                parseInt(e.target.value)
                              )
                            }
                            className="mt-1  block w-full accent-blue-500 dark:accent-blue-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Contrast
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="200"
                            value={operations.contrast || 100}
                            onChange={(e) =>
                              handleOperationChange(
                                'contrast',
                                parseInt(e.target.value)
                              )
                            }
                            className="mt-1 block w-full accent-blue-500 dark:accent-blue-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Saturation
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="200"
                            value={operations.saturation || 100}
                            onChange={(e) =>
                              handleOperationChange(
                                'saturation',
                                parseInt(e.target.value)
                              )
                            }
                            className="mt-1 block w-full accent-blue-500 dark:accent-blue-400"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      type="submit"
                      disabled={loading || !file}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
                    >
                      {loading ? 'Processing...' : 'Process Image'}
                    </button>
                  </motion.div>
                </form>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-4 bg-red-50 dark:bg-red-900/20 p-4 rounded-md"
                    >
                      <p className="text-sm text-red-700 dark:text-red-300">
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
          <div className="md:w-1/3 w-full mx-auto">
            <PreviewSection />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ImageProcessing;
