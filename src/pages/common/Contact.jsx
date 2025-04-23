import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  ShieldCheck,
  Mail,
  User,
  MessageSquare,
  Send,
  Loader2,
  ChevronDown,
  Code2,
  CopyCheck,
  Copy,
  Eye,
} from 'lucide-react';
import HeroSectionHeadertext from '@/components/common/HeroSectionHeadertext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import Loader from '@/components/common/Loader';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { endpoints } from '@/services/api.config';

const Contact = () => {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [validation, setValidation] = useState({
    name: { valid: false, message: '' },
    email: { valid: false, message: '' },
    message: { valid: false, message: '' },
  });

  const faqItems = [
    {
      question: 'Who are we?',
      answer:
        'We are group of developers which has passion to create something new softwares which will help mostly developers as well as users.',
    },
    {
      question: 'Is these free for use?',
      answer:
        'Yes, we generally want to make it free as 20,000 api calls or usage is free that is mostly free but after that if someone has reached upto that which is not possible for short term user then yuo can support us by miniaml pay as to maintain the server and db costs.',
    },
    {
      question: 'How can you contact us directly?',
      answer: 'You can contact us via direct mail to contact@craftfosslabs.com.',
    },
    {
      question: 'Do Craftfosslabs provide custom development services?',
      answer:
        'Yes, we offer custom development services tailored to your specific needs. Contact us with your requirements for a detailed discussion.',
    },
  ];

  const validateField = (field, value) => {
    const validations = {
      name: {
        valid: value.trim().length >= 2,
        message: value.trim().length >= 2 ? '' : 'Name must be at least 2 characters',
      },
      email: {
        valid: /^\S+@\S+\.\S+$/.test(value),
        message: /^\S+@\S+\.\S+$/.test(value) ? '' : 'Please enter a valid email address',
      },
      message: {
        valid: value.trim().length >= 10,
        message: value.trim().length >= 10 ? '' : 'Message must be at least 10 characters',
      },
    };

    return validations[field];
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    const fieldValidation = validateField(name, value);
    setValidation(prev => ({
      ...prev,
      [name]: fieldValidation,
    }));
  };

  const toggleFaq = index => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleCopied = () => {
    navigator.clipboard.writeText(contactFormCode).then(() => {
      setIsCopied(true);
      toast.success('Code Copied Successfully');
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  const toggleCodeView = () => {
    setShowCode(!showCode);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    const allFieldsValid = Object.keys(formData).every(field => {
      const fieldValidation = validateField(field, formData[field]);
      setValidation(prev => ({
        ...prev,
        [field]: fieldValidation,
      }));
      return fieldValidation.valid;
    });

    if (!allFieldsValid) {
      setIsSubmitting(false);
      toast.error('Please fill all fields correctly');
      return;
    }

    try {
      const response = await endpoints.auth.contactUs(formData);
      if (response.status === 200) {
        toast.success('Message sent successfully! We will get back to you soon.');
      } else {
        toast.error('Failed to send yuor Query');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      setValidation({
        name: { valid: false, message: '' },
        email: { valid: false, message: '' },
        message: { valid: false, message: '' },
      });
    }
  };
  const contactFormCode = `import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  ShieldCheck,
  Mail,
  User,
  MessageSquare,
  Send,
  Loader2,
} from 'lucide-react';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [validation, setValidation] = useState({
    name: { valid: false, message: '' },
    email: { valid: false, message: '' },
    message: { valid: false, message: '' },
  });

  const validateField = (field, value) => {
    const validations = {
      name: {
        valid: value.trim().length >= 2,
        message: value.trim().length >= 2 ? '' : 'Name must be at least 2 characters',
      },
      email: {
        valid: /^\\S+@\\S+\\.\\S+$/.test(value),
        message: /^\\S+@\\S+\\.\\S+$/.test(value) ? '' : 'Please enter a valid email address',
      },
      message: {
        valid: value.trim().length >= 10,
        message: value.trim().length >= 10 ? '' : 'Message must be at least 10 characters',
      },
    };

    return validations[field];
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    const fieldValidation = validateField(name, value);
    setValidation(prev => ({
      ...prev,
      [name]: fieldValidation,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    const allFieldsValid = Object.keys(formData).every(field => {
      const fieldValidation = validateField(field, formData[field]);
      setValidation(prev => ({
        ...prev,
        [field]: fieldValidation,
      }));
      return fieldValidation.valid;
    });

    if (!allFieldsValid) {
      setIsSubmitting(false);
      toast.error('Please fill all fields correctly');
      return;
    }

    try {
      // Your API call here
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setValidation({
        name: { valid: false, message: '' },
        email: { valid: false, message: '' },
        message: { valid: false, message: '' },
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          {validation.name.valid && <ShieldCheck className="h-4 w-4 text-green-500" />}
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            className="pl-10 w-full p-2 border rounded-md"
          />
        </div>
        {validation.name.message && (
          <p className="text-sm text-red-500">{validation.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          {validation.email.valid && <ShieldCheck className="h-4 w-4 text-green-500" />}
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-blue-600" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="user@craftfosslabs.com"
            className="pl-10 w-full p-2 border rounded-md"
          />
        </div>
        {validation.email.message && (
          <p className="text-sm text-red-500">{validation.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          {validation.message.valid && (
            <ShieldCheck className="h-4 w-4 text-green-500" />
          )}
        </div>
        <div className="relative">
          <div className="absolute left-0 top-3 pl-3 pointer-events-none">
            <MessageSquare className="h-5 w-5 text-blue-600" />
          </div>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your message..."
            rows={5}
            className="pl-10 w-full p-2 border rounded-md"
          />
        </div>
        {validation.message.message && (
          <p className="text-sm text-red-500">{validation.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md flex items-center justify-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;`;

  return (
    <div className={`bg-gradient-to-tl ${theme.primary} ${theme.text} w-full pt-12`}>
      <HeroSectionHeadertext
        title={'Get in'}
        title2={'Touch'}
        subtext={
          'We are here to help and answer any questions you might have. We look forward to hearing from you.'
        }
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`bg-gradient-to-br ${theme.primary} ${theme.text} rounded-xl hover:shadow-lg overflow-hidden`}
          >
            <div className="p-6">
              <div className="text-2xl font-bold flex justify-between items-center mb-4">
                Send us a Message
                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleCodeView}
                    className={`cursor-pointer flex items-center ${theme.secondary} ${theme.text} px-2 py-1 rounded text-sm`}
                  >
                    {showCode ? (
                      <Eye className="h-4 w-4 mr-1" />
                    ) : (
                      <Code2 className="h-4 w-4 mr-1" />
                    )}
                    {showCode ? 'View Form' : 'View Code'}
                  </motion.div>

                  {showCode && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopied}
                      className="cursor-pointer"
                    >
                      {isCopied ? (
                        <CopyCheck className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy className={`h-5 w-5 ${theme.highlight}`} />
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
              <p className="mb-6">
                {showCode
                  ? "Here's the code for this contact form:"
                  : "Fill out the form below and we'll get back to you as soon as possible."}
              </p>

              {showCode ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`font-mono text-sm bg-gradient-to-br ${theme.primary} p-4 rounded-lg overflow-auto max-h-96`}
                >
                  <pre className="whitespace-pre-wrap">{contactFormCode}</pre>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="name">Name</Label>
                        {validation.name.valid && (
                          <ShieldCheck className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className={`h-5 w-5 ${theme.highlight}`} />
                        </div>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          className={`pl-10 w-full border`}
                        />
                      </div>
                      {validation.name.message && (
                        <p className="text-sm text-red-500">{validation.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email
                        </Label>
                        {validation.email.valid && (
                          <ShieldCheck className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className={`h-5 w-5 ${theme.highlight}`} />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="user@craftfosslabs.com"
                          className={`pl-10 w-full border`}
                        />
                      </div>
                      {validation.email.message && (
                        <p className="text-sm text-red-500">{validation.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="message" className="text-sm font-medium">
                          Message
                        </Label>
                        {validation.message.valid && (
                          <ShieldCheck className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="relative">
                        <div className="absolute left-0 top-3 pl-3 pointer-events-none">
                          <MessageSquare className={`h-5 w-5 ${theme.highlight}`} />
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Your message..."
                          rows={5}
                          className={`pl-10 w-full p-2 border rounded-md ${validation.message.message ? 'border-red-500' : 'border-gray-300'}`}
                        />
                      </div>
                      {validation.message.message && (
                        <p className="text-sm text-red-500">{validation.message.message}</p>
                      )}
                    </div>

                    <Button
                      variant={'default'}
                      type="submit"
                      className={`${theme.button} w-full`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader text={'Sending your query'} />
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-br ${theme.primary} rounded-xl hover:shadow-sm overflow-hidden`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 flex items-center justify-between cursor-pointer"
                  >
                    <span className="font-semibold text-left">{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${expandedFaq === index ? 'transform rotate-180' : ''}`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="px-6 pb-4"
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
