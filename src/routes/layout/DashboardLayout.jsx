import React, { useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useTheme, themes } from '@/context/ThemeContext';
import { ChevronDownIcon, SwatchBookIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const DashboardLayout = ({ children }) => {
  const { theme, setTheme, currentTheme } = useTheme();
  const [isThemeDropdownOpen, setThemeDropdownOpen] = useState(false);
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center justify-between gap-2 px-4 w-full">
              <SidebarTrigger className="-ml-1" />
              <div className="relative">
                <button
                  onClick={() => setThemeDropdownOpen(!isThemeDropdownOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <SwatchBookIcon className={`w-6 h-6 ${theme.highlight}`} />

                  {isThemeDropdownOpen ? (
                    <ChevronDownIcon className="w-4 h-4 transform rotate-180" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                </button>

                <AnimatePresence>
                  {isThemeDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                    >
                      {Object.entries(themes).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setTheme(key);
                            setThemeDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100 ${
                            currentTheme === key ? 'bg-gray-50' : ''
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full ${value.secondary}`} />
                          <span className="text-sm text-gray-700">{value.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 md:p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
