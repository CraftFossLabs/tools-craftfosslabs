import { useState, useEffect, useRef } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { endpoints } from '@/services/api.config';
import { Building2, Loader, MapIcon, SearchCheckIcon, XCircleIcon } from 'lucide-react';
import CommonHeader from './CommonHeader';
import { useTheme } from '@/context/ThemeContext';
import { Input } from '@/components/ui/input';

const MapsByIndia = () => {
  const {theme} = useTheme();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [states, setStates] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchStates = async () => {
      if (query.length < 2) {
        setStates([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await endpoints.maps.getLocation(query);
        const data = response.data.data;
        setStates(data);
        setShowSuggestions(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchStates, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <> 
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${theme.secondary} p-6 rounded-xl`}
      >
        <div className="max-w-4xl mx-auto space-y-4"> 
          <CommonHeader title={'Maps by India'} subtext={'Search for states and their districts across India'}/>
                   
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`bg-gradient-to-br ${theme.primary} rounded-md hover:shadow-md transition-colors duration-200`}
          >
            <div className="px-4 py-5 sm:p-6">
              <div ref={searchRef} className="relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchCheckIcon className={`h-5 w-5 ${theme.highlight}`} />
                  </div>
                  <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a state..."
                    className={`block w-full pl-10 pr-10 py-3 border  ${theme.border}`}
                  />
                  {loading && (
                    <div className="absolute right-3 top-2">
                      <Loader className={`animate-spin h-5 w-5 ${theme.highlight}`} />
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {showSuggestions && states.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="w-full mt-1 max-h-96 overflow-y-auto"
                    >
                      {states.map((state, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <MapIcon className={`animate-pulse h-5 w-5 mr-2 ${theme.highlight}`} />
                              <h3 className="text-lg font-medium">
                                {state.name}
                              </h3>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme.secondary}`}>
                              {state.districtCount} districts
                            </span>
                          </div>
                          <div className="mt-3">
                            <h4 className="text-sm font-medium mb-2">
                              Districts:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {state.districts.map((district, dIndex) => (
                                <motion.span
                                  key={dIndex}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: dIndex * 0.02 }}
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme.secondary} ${theme.text} `}
                                >
                                  <Building2 className={`h-3 w-3 mr-1 ${theme.highlight}`} />
                                  {district}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default MapsByIndia;
