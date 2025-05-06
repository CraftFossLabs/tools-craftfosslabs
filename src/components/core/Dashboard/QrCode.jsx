import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { endpoints } from '@/services/api.config';
import Loader from '@/components/common/Loader';
import { Download, QrCodeIcon } from 'lucide-react';
import CommonHeader from './CommonHeader';
import { useTheme } from '@/context/ThemeContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const QrCode = () => {
  const {theme} = useTheme();
  const [url, setUrl] = useState('');
  const [size, setSize] = useState(256);
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const handleGenerate = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const response = await endpoints.qrCode.generateQR({
        text: url,
        size: size,
        color: foregroundColor,
        backgroundColor: backgroundColor,
      });
      const { data } = response;
      if (data.success) {
        setImageUrl(data.qrUrl);
        setError(null);
      } else {
        setError(data.message);
      }
      setLoading(false);
    } catch {
      setError('Please enter a valid URL');
      return;
    }
  };

  const handleDownload = () => {
    if (!imageUrl) {
      setError('No QR code generated yet');
      return;
    }

    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = 'qr-code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-b ${theme.primary} ${theme.text} py-4 p-1 rounded-md`}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <CommonHeader title={'QR Code Generator'} subtext={' Generate custom QR codes for any URL instantly'} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${theme.secondary} rounded-lg hover:shadow-lg p-2`}
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <Label  htmlFor="url" >
                    Enter URL
                  </Label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className={`border ${theme.border}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="size">
                      QR Code Size
                    </Label>
                    <div className="mt-1">
                      <Input
                        type="range"
                        id="size"
                        min="128"
                        max="512"
                        step="32"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        className={`w-full h-2 bg-gradient-to-l ${theme.primary} rounded-lg appearance-none cursor-pointer`}
                      />
                      <div className={`mt-2 text-sm ${theme.text}`}>
                        {size}px
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label  htmlFor="foregroundColor" >
                      QR Code Color
                    </Label>
                    <div className="mt-1 flex items-center space-x-2">
                      <Input
                        type="color"
                        id="foregroundColor"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        className="h-10 w-full rounded-md cursor-pointer"
                      />
                      <span className={` text-sm ${theme.text}`}>
                        {foregroundColor}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label   htmlFor="backgroundColor" >
                      Background Color
                    </Label>
                    <div className="mt-1 flex items-center space-x-2">
                      <Input
                        type="color"
                        id="backgroundColor"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="h-10 w-full rounded-md cursor-pointer"
                      />
                      <span className={`mt-2 text-sm ${theme.text}`}>
                        {backgroundColor}
                      </span>
                    </div>
                  </div>
                </div> 

                <Button 
                  onClick={handleGenerate}
                  disabled={loading || !url}
                  className="w-full flex justify-center items-center  rounded-md hover:shadow-sm disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader text={' Generating...'} />
                    </>
                  ) : (
                    <>
                      <QrCodeIcon className="h-5 w-5 mr-2" />
                      Generate QR Code
                    </>
                  )}
                </Button>
              </div>

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

                {imageUrl && !error && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-2 bg-gradient-to-bl ${theme.primary} p-6 rounded-lg`}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div
                        className="mx-auto"
                        style={{ width: size, height: size }}
                      >
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt="QR Code"
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownload}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Download QR Code
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

export default QrCode;
