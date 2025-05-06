import React from 'react'
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const CommonHeader = ({title, subtext}) => {
    const { theme } = useTheme();
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-4"
            >
                <h1 className={`md:text-3xl  text-xl font-medium ${theme.highlight}`}>
                   {title}
                </h1>
                <p className={`md:text-lg text-md ${theme.text}`}>
                    {subtext}
                </p>
            </motion.div>
        </div>
    )
}

export default CommonHeader