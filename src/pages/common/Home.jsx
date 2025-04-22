import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import HeroSectionHeadertext from '@/components/common/HeroSectionHeadertext';

const Home = () => {
  const { theme } = useTheme();
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const tools = [
    {
      id: 1,
      name: 'Code Analyzer',
      description: 'Analyze your code for best practices and security issues',
      icon: '🔍',
    },
    {
      id: 2,
      name: 'License Manager',
      description: 'Manage open source licenses across your projects',
      icon: '📝',
    },
    {
      id: 3,
      name: 'Dependency Tracker',
      description: 'Track and update dependencies in your FOSS projects',
      icon: '🔄',
    },
    {
      id: 4,
      name: 'Collaboration Hub',
      description: 'Seamlessly collaborate with other open source contributors',
      icon: '👥',
    },
  ];

  return (
    <div className={`bg-gradient-to-bl ${theme.primary} ${theme.text} w-full`}>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <HeroSectionHeadertext
            title={'Open Source Tools for'}
            title2={'Modern Developers'}
            subtext={
              ' Simplify your open source development workflow with our suite of professional tools designed to enhance productivity and collaboration.'
            }
          />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {tools.map(tool => (
              <motion.div
                key={tool.id}
                variants={slideUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`bg-gradient-to-tl ${theme.primary} rounded-xl hover:shadow-xl p-6  transition-shadow`}
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold  mb-2">{tool.name}</h3>
                <p>{tool.description}</p>
                <motion.a
                  whileHover={{ x: 5 }}
                  className={`mt-4 inline-block hover:${theme.highlight} font-medium`}
                  href="#"
                >
                  Learn more →
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold ${theme.highlight} mb-4`}>
              Why Choose Our Tools?
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Built by developers for developers, our tools streamline the FOSS development process
              from start to finish.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className={`bg-gradient-to-tl ${theme.primary} ${theme.text} rounded-xl p-6 hover:shadow-xl`}
            >
              <div
                className={`${theme.accent} w-12 h-12 rounded-full flex items-center justify-center mb-4`}
              >
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">High Performance</h3>
              <p>Optimized tools that won't slow down your workflow, even with large codebases.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
              className={`bg-gradient-to-tl ${theme.primary} ${theme.text} rounded-xl p-6 hover:shadow-xl`}
            >
              <div
                className={`${theme.accent} w-12 h-12 rounded-full flex items-center justify-center mb-4`}
              >
                <span className="text-xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Security First</h3>
              <p>Built with security best practices to keep your projects safe and compliant.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: '-100px' }}
              className={`bg-gradient-to-tl ${theme.primary} ${theme.text} rounded-xl p-6 hover:shadow-xl`}
            >
              <div
                className={`${theme.accent} w-12 h-12 rounded-full flex items-center justify-center mb-4`}
              >
                <span className="text-xl">🌐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p>Developed with input from the FOSS community to meet real-world needs.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className={`bg-gradient-to-br ${theme.primary} ${theme.text} rounded-2xl p-8 md:p-12 text-center`}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme.highlight}`}>
              Ready to transform your development workflow?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of developers who are already using CraftFOSSLabs tools to improve
              their open source projects.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${theme.button} font-semibold px-6 py-3 rounded-lg`}
              >
                Get Started for Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${theme.button} font-semibold px-6 py-3 rounded-lg border ${theme.border}`}
              >
                See Documentation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
