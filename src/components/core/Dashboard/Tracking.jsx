import { useEffect, useState } from 'react'; 
import { motion } from 'framer-motion';
import { endpoints } from '@/services/api.config';
import { Clock10Icon, CommandIcon, Computer, Globe, Globe2Icon, GlobeLock, Map, MapPinCheck, Phone, Server } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import CommonHeader from './CommonHeader';

const Tracking = () => {
    const {theme} = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await endpoints.tracking.getTrackingStatus();
        setData(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading tracking information...
          </p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center"
      >
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg max-w-md w-full mx-4">
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">
            Error
          </h2>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </motion.div>
    );
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-gradient-to-b ${theme.primary} ${theme.text} py-4 p-1 rounded-md`}
      >
        <div className="max-w-7xl mx-auto space-y-4"> 
          <CommonHeader title={'Device & Location Tracking'} subtext={'Real-time information about your device and location'}/>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Device Information Card */}
            <motion.div
              variants={itemVariants}
              className={`${theme.secondary} rounded-lg hover:shadow-lg p-6`}
            >
              <div className="flex items-center mb-4">
                <Phone className={`h-6 w-6 ${theme.highlight} mr-2`} />
                <h2 className="md:text-xl text-lg font-semibold">
                  Device Information
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Computer className={`h-5 w-5 mr-2 ${theme.highlight}`} />
                  <span>Device: {data?.deviceModel}</span>
                </div>
                <div className="flex items-center">
                  <Globe className={`h-5 w-5 mr-2 ${theme.highlight}`} />
                  <span>Browser: {data?.browser}</span>
                </div>
                <div className="flex items-center">
                  <Server className={`h-5 w-5 mr-2 ${theme.highlight}`} />
                  <span>OS: {data?.os}</span>
                </div>
              </div>
            </motion.div>

            {/* Location Information Card */}
            <motion.div
              variants={itemVariants}
              className={`${theme.secondary} rounded-lg hover:shadow-lg p-6`}
            >
              <div className="flex items-center mb-4">
                <Map className={`h-6 w-6 ${theme.highlight} mr-2`} />
                <h2 className="text-xl font-semibold">
                  Location Information
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <GlobeLock className={`h-5 w-5 mr-2 ${theme.highlight}`} />
                  <span>City: {data?.locationData.city}</span>
                </div>
                <div className="flex items-center">
                  <Globe2Icon className={`h-5 w-5 mr-2 ${theme.highlight}`} />
                  <span>Country: {data?.locationData.country}</span>
                </div>
                <div className="flex items-center">
                  <MapPinCheck className={`h-5 w-5 mr-2 ${theme.highlight}`} />
                  <span>Region: {data?.locationData.regionName}</span>
                </div>
                <div className="flex items-center">
                  <Clock10Icon className={`h-5 w-5 mr-2 ${theme.highlight}`} />
                  <span>Timezone: {data?.locationData.timezone}</span>
                </div>
              </div>
            </motion.div>

            {/* Network Information Card */}
            <motion.div
              variants={itemVariants}
              className={`${theme.secondary} rounded-lg hover:shadow-lg p-6`}
            >
              <div className="flex items-center mb-4">
                <Server className={`h-5 w-5 mr-2 ${theme.highlight}`} />
                <h2 className="text-xl font-semibold">
                  Network Information
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Globe2Icon className={`h-5 w-5 mr-2 ${theme.highlight}`} />
                  <span>IP Address: {data?.ip}</span>
                </div>
                <div className="flex items-center">
                  <MapPinCheck className={`h-5 w-5 mr-2 ${theme.highlight}`} />
                  <span>
                    Coordinates: {data?.locationData.lat},{' '}
                    {data?.locationData.lon}
                  </span>
                </div>
                <div className="flex items-center">
                  <CommandIcon className={`h-5 w-5 mr-2 ${theme.highlight}`} />
                  <span className="truncate">
                    User Agent: {data?.userAgent}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Tracking;
