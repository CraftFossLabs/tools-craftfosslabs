import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { endpoints } from '@/services/api.config';
import { useTheme } from '@/context/ThemeContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ClipboardCheckIcon, ClipboardCopy } from 'lucide-react';
import CommonHeader from './CommonHeader';

const UrlShortner = () => {
    const {theme} = useTheme();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShortenedUrl(null);

    try {
      const response = await endpoints.urlShortener.shortenURL(url);
      const data = response.data;
      if (data.success) {
        setShortenedUrl(data.url);
      } else {
        setError(data.message);
      }
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortenedUrl) return;

    try {
      await navigator.clipboard.writeText(shortenedUrl.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      setError('Failed to copy to clipboard');
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className= {`bg-gradient-to-b ${theme.primary} ${theme.text} py-12 px-4 rounded-md sm:px-6 lg:px-8 transition-colors duration-200`}
      >
        <div className="max-w-4xl mx-auto space-y-6"> 
          <CommonHeader title={'URL Shortener'} subtext={'Create short, memorable links for your long URLs'}/>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${theme.secondary} rounded-lg hover:shadow-lg p-6`}
          >
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className='space-y-2'
                >
                  <Label
                    htmlFor="url"
                  >
                    Long URL
                  </Label>
                  <div className="mt-1">
                    <Input
                      type="url"
                      name="url"
                      id="url"
                      required
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com/very/long/url"
                      className={`border ${theme.border}`}
                    />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className={`w-full`}
                  >
                    {loading ? 'Shortening...' : 'Shorten URL'}
                  </Button>
                </motion.div>
              </form>

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

                {shortenedUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 bg-gradient-to-l ${theme.primary} ${theme.text} p-4 rounded-md`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {shortenedUrl.shortUrl}
                        </p>
                        <p className="text-sm truncate">
                          {shortenedUrl.originalUrl}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleCopy}
                        className="ml-4 inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      >
                        {copied ? (
                          <ClipboardCheckIcon className="h-5 w-5" />
                        ) : (
                          <ClipboardCopy className="h-5 w-5" />
                        )}
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

export default UrlShortner;
