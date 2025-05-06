import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBigLeftDashIcon, DockIcon, MailCheck, MailCheckIcon, SearchCheckIcon, XCircleIcon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Loader from '@/components/common/Loader';
import { endpoints } from '@/services/api.config';
import CommonHeader from './CommonHeader';

const EmailFinder = () => {
    const { theme } = useTheme();
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [type, setType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            if (type === 'email') {
                const response = await endpoints.emailFinder.findEmail(text);
                setResult(response.data.data);
            } else if (type === 'mobile') {
                const response = await endpoints.emailFinder.findMobile(text);
                setResult(response.data.data);
            } else if (type === 'link') {
                const response = await endpoints.emailFinder.findLink(text);
                setResult(response.data.data);
            }
        } catch (err) {
            setError(
                err.response?.data?.message || 'An error occurred while finding emails'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${theme.secondary} p-6 rounded-xl`}
            >
                <div className="max-w-4xl mx-auto space-y-4"> 
                    <CommonHeader title={'Email Finder'} subtext={' Extract email addresses , mobile number and links from any text'}/>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={` bg-gradient-to-br ${theme.primary} rounded-md hover:shadow-md transition-colors duration-200`}
                    >
                        <div className="px-4 py-5 sm:p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="text" >
                                        Enter text to analyze
                                    </Label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                                            <DockIcon className={`h-5 w-5 ${theme.highlight}`} />
                                        </div>
                                        <textarea
                                            id="text"
                                            name="text"
                                            rows={6}
                                            className={`block w-full pl-10 pr-3 py-2 border ${theme.border} rounded-md transition-colors duration-200`}
                                            placeholder="Paste your text here..."
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex justify-between gap-4">
                                    <div className="w-2/3">
                                        <div>
                                            <Button
                                                type="submit"
                                                disabled={loading || !text.trim()}
                                                className={`w-full cursor-pointer transition-colors duration-200`}
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader text={`Finding
                                                        ${type === 'email'
                                                                ? 'Emails'
                                                                : type === 'mobile'
                                                                    ? 'Mobile Numbers'
                                                                    : 'Links'}
                                                        ...`} />

                                                    </>
                                                ) : (
                                                    <>
                                                        <SearchCheckIcon className="-ml-1 mr-2 h-5 w-5" />
                                                        Find{' '}
                                                        {type === 'email'
                                                            ? 'Emails'
                                                            : type === 'mobile'
                                                                ? 'Mobile Numbers'
                                                                : 'Links'}
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="w-1/3">
                                        <select
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                            className={`w-full h-full px-2 border ${theme.border} rounded-md transition-colors duration-200`}
                                        >
                                            <option value="">Select</option>
                                            <option value="email">Email</option>
                                            <option value="mobile">Mobile</option>
                                            <option value="link">Link</option>
                                        </select>
                                    </div>
                                </div>
                            </form>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="mt-6 bg-red-50 p-4 rounded-md"
                                    >
                                        <div className="flex items-center">
                                            <XCircleIcon className="h-5 w-5 text-red-400 mr-2" />
                                            <p className="text-sm text-red-700">
                                                {error}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {result && type === 'email' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-8"
                                >
                                    <h2 className="text-lg font-medium mb-4 flex items-center">
                                        <MailCheckIcon className={`h-5 w-5 mr-2 ${theme.highlight}`} />
                                        Found Emails
                                    </h2>
                                    <div className=" hover:shadow overflow-hidden sm:rounded-md">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div className={`p-4 ${theme.secondary} ${theme.text} rounded-lg`}>
                                                <h3 className="text-lg font-semibold mb-2">
                                                    Total Emails
                                                </h3>
                                                <p className={`text-2xl font-bold ${theme.highlight}`}>
                                                    {result.totalEmails}
                                                </p>
                                            </div>
                                            <div className={`p-4 ${theme.secondary} ${theme.text} rounded-lg`}>
                                                <h3 className="text-lg font-semibold mb-2">
                                                    Unique Emails
                                                </h3>
                                                <p className={`text-2xl font-bold ${theme.highlight}`}>
                                                    {result.uniqueEmails}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-2">
                                            <h3 className="text-lg font-semibold mb-4">
                                                Email Details
                                            </h3>
                                            <div className="space-y-2">
                                                {result &&
                                                    result.emailCounts.map((emailData, index) => (
                                                        <div
                                                            key={index}
                                                            className={`p-4 ${theme.secondary} ${theme.text} rounded-lg flex justify-between items-center`}
                                                        >
                                                            <span>
                                                                {emailData.email}
                                                            </span>
                                                            <span className="text-sm">
                                                                Found {emailData.count}{' '}
                                                                {emailData.count === 1 ? 'time' : 'times'}
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {result && type === 'mobile' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-8"
                                >
                                    <h2 className="text-lg font-medium mb-4 flex items-center">
                                        <MailCheck className={`h-5 w-5 mr-2 ${theme.highlight}`} />
                                        Found Mobile Numbers
                                    </h2>
                                    <div className=" hover:shadow overflow-hidden sm:rounded-md">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div className={`p-4 ${theme.secondary} ${theme.text} rounded-lg`}>
                                                <h3 className="text-lg font-semibold mb-2">
                                                    Total Mobile Numbers
                                                </h3>
                                                <p className={`text-2xl font-bold ${theme.highlight}`}>
                                                    {result.totalPhoneNumbers}
                                                </p>
                                            </div>
                                            <div className={`p-4 ${theme.secondary} ${theme.text} rounded-lg`}>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                    Unique Mobile Numbers
                                                </h3>
                                                <p className={`text-2xl font-bold ${theme.highlight}`}>
                                                    {result.uniquePhoneNumbers}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-2">
                                            <h3 className="text-lg font-semibold mb-4">
                                                Mobile Number Details
                                            </h3>
                                            <div className="space-y-2">
                                                {result &&
                                                    result.phoneCounts.map((phoneData, index) => (
                                                        <div
                                                            key={index}
                                                            className={`p-4 ${theme.secondary} ${theme.text} rounded-lg flex justify-between items-center`}
                                                        >
                                                            <span >
                                                                {phoneData.phone}
                                                            </span>
                                                            <span className="text-sm">
                                                                Found {phoneData.count}{' '}
                                                                {phoneData.count === 1 ? 'time' : 'times'}
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {result && type === 'link' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-8"
                                >
                                    <h2 className="text-lg font-medium mb-4 flex items-center">
                                        <MailCheckIcon className={`h-5 w-5 mr-2 ${theme.highlight}`} />
                                        Found Links
                                    </h2>
                                    <div className=" hover:shadow overflow-hidden sm:rounded-md">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className={`p-4 ${theme.secondary} ${theme.text} rounded-lg`}>
                                                <h3 className="text-lg font-semibold mb-2">
                                                    Total Links
                                                </h3>
                                                <p className={`text-2xl font-bold ${theme.highlight}`}>
                                                    {result.totalLinks}
                                                </p>
                                            </div>
                                            <div className={`p-4 ${theme.secondary} ${theme.text} rounded-lg`}>
                                                <h3 className="text-lg font-semibold  mb-2">
                                                    Unique Links
                                                </h3>
                                                <p className={`text-2xl font-bold ${theme.highlight}`}>
                                                    {result.uniqueLinks}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-2">
                                            <h3 className="text-lg font-semibold mb-4">
                                                Link Details
                                            </h3>
                                            <div className="space-y-2">
                                                {result &&
                                                    result.linkCounts.map((linkData, index) => (
                                                        <div
                                                            key={index}
                                                            className={`p-4 ${theme.secondary} ${theme.text} rounded-lg flex justify-between items-center`}
                                                        >
                                                            <span>
                                                                {linkData.link}
                                                            </span>
                                                            <span className="text-sm">
                                                                Found {linkData.count}{' '}
                                                                {linkData.count === 1 ? 'time' : 'times'}
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

export default EmailFinder