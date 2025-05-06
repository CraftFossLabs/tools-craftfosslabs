import { useState } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';

const Mail = () => {
  const [formData, setFormData] = useState({
    name: '',
    emails: '',
    subject: '',
    message: '',
    service: 'gmail',
    EMAIL_ID: '',
    EMAIL_PASS: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const emails = formData.emails.split(',').map((email) => email.trim());
      const response = await fetch(`/api/mail/via-${formData.service}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          emails,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send email');
      }

      const data = await response.json();
      setSuccess(data.success);
      setFormData({
        name: '',
        emails: '',
        subject: '',
        message: '',
        service: formData.service,
        EMAIL_ID: '',
        EMAIL_PASS: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Mail | Free API | CraftFosslabs</title>
        <meta name="title" content="Mail | Free API | CraftFosslabs" />
        <meta name="description" content="Mail | Free API | CraftFosslabs" />
        <meta name="keywords" content="Mail, Free API, CraftFosslabs" />
        <meta name="author" content="CraftFosslabs" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Mail | Free API | CraftFosslabs" />
        <meta
          property="og:description"
          content="Mail | Free API | CraftFosslabs"
        />
        <meta
          property="og:image"
          content="https://freeapi.craftfosslabs.com/logo.png"
        />
        <meta
          property="og:url"
          content="https://freeapi.craftfosslabs.com/mail"
        />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Mail | Free API | CraftFosslabs"
        />
        <meta
          property="twitter:description"
          content="Mail | Free API | CraftFosslabs"
        />
        <meta
          property="twitter:image"
          content="https://freeapi.craftfosslabs.com/logo.png"
        />
        <meta
          property="twitter:url"
          content="https://freeapi.craftfosslabs.com/mail"
        />
        <meta property="twitter:type" content="website" />
        <link rel="canonical" href="https://freeapi.craftfosslabs.com/mail" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="robots" content="index, follow" />
        <meta name="generator" content="React-helmet" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Send Emails
            </h1>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
              Send emails using Gmail or Zoho SMTP
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email Service
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-10 py-2 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md transition-colors duration-200"
                      >
                        <option value="gmail">Gmail</option>
                        <option value="zoho">Zoho</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="EMAIL_ID"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Your Email ID
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <AtSymbolIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="EMAIL_ID"
                        name="EMAIL_ID"
                        required
                        value={formData.EMAIL_ID}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="EMAIL_PASS"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {formData.service === 'gmail'
                        ? 'App Password'
                        : 'Email Password'}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <KeyIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="EMAIL_PASS"
                        name="EMAIL_PASS"
                        required
                        value={formData.EMAIL_PASS}
                        onChange={handleChange}
                        placeholder={
                          formData.service === 'gmail'
                            ? 'Enter your Gmail app password'
                            : 'Enter your email password'
                        }
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Your Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="emails"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Recipient Emails (comma-separated)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="emails"
                      name="emails"
                      required
                      value={formData.emails}
                      onChange={handleChange}
                      placeholder="example1@email.com, example2@email.com"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Subject
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter email subject"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Message
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      loading
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    } transition-colors duration-200`}
                  >
                    {loading ? (
                      <>
                        <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="-ml-1 mr-2 h-5 w-5" />
                        Send Email
                      </>
                    )}
                  </button>
                </div>
              </form>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-6 bg-red-50 dark:bg-red-900/20 p-4 rounded-md"
                  >
                    <div className="flex items-center">
                      <XCircleIcon className="h-5 w-5 text-red-400 mr-2" />
                      <p className="text-sm text-red-700 dark:text-red-300">
                        {error}
                      </p>
                    </div>
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-6 bg-green-50 dark:bg-green-900/20 p-4 rounded-md"
                  >
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
                      <p className="text-sm text-green-700 dark:text-green-300">
                        {success}
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

export default Mail;
