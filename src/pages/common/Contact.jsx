import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  Mail,
  User,
  MessageSquare,
  Send,
  Loader2,
  MapPin,
  Phone,
  Clock,
  ChevronDown,
  Globe,
  Building2,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
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
      question: 'What are your typical response times?',
      answer:
        'We strive to respond to all inquiries within 24 hours during business days. For urgent matters, please use our priority support channels.',
    },
    {
      question: 'Do you offer technical support?',
      answer:
        'Yes, we provide comprehensive technical support through various channels including email, phone, and our ticketing system.',
    },
    {
      question: 'How can I report a bug?',
      answer:
        'You can report bugs through our GitHub repository, or by using this contact form. Please include as much detail as possible.',
    },
    {
      question: 'Do you provide custom development services?',
      answer:
        'Yes, we offer custom development services tailored to your specific needs. Contact us with your requirements for a detailed discussion.',
    },
  ];

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '123 Tech Hub, Financial District',
      hours: '9:00 AM - 6:00 PM PST',
      phone: '+1 (555) 123-4567',
    },
    {
      city: 'London',
      address: '456 Innovation Centre, Westminster',
      hours: '9:00 AM - 6:00 PM GMT',
      phone: '+44 20 7123 4567',
    },
    {
      city: 'Singapore',
      address: '789 Digital Park, Marina Bay',
      hours: '9:00 AM - 6:00 PM SGT',
      phone: '+65 6789 0123',
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
      // TODO: Implement actual API call here
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
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = index => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className={`bg-gradient-to-bl ${theme.primary} ${theme.text} w-full`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`w-full ${theme.secondary} py-20 `}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            We're here to help and answer any questions you might have. We look forward to hearing
            from you.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="w-full">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-bold">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Name
                      </Label>
                      {validation.name.valid && <ShieldCheck className="h-4 w-4 text-green-500" />}
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
                        className={`pl-10 ${validation.name.message ? 'border-red-500 focus:ring-red-500' : ''}`}
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
                      {validation.email.valid && <ShieldCheck className="h-4 w-4 text-green-500" />}
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
                        placeholder="you@example.com"
                        className={`pl-10 ${validation.email.message ? 'border-red-500 focus:ring-red-500' : ''}`}
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
                        className={`block w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 ${
                          validation.message.message
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-input focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
                        }`}
                      />
                    </div>
                    {validation.message.message && (
                      <p className="text-sm text-red-500">{validation.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className={`w-full bg-gradient-to-r ${theme.primary} text-white`}
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
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Quick Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className={`h-6 w-6 ${theme.highlight}`} />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-muted-foreground">support@craftfosslabs.com</p>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className={`h-6 w-6 ${theme.highlight}`} />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Globe className={`h-6 w-6 ${theme.highlight}`} />
                  <div>
                    <h3 className="font-semibold">Global Support</h3>
                    <p className="text-muted-foreground">Available in multiple languages</p>
                    <p className="text-sm text-muted-foreground">24/7 for urgent issues</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Office Locations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officeLocations.map((office, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Building2 className={`h-5 w-5 ${theme.highlight}`} />
                      <h3 className="font-semibold text-lg">{office.city}</h3>
                    </div>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-5 w-5 mt-0.5" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Clock className="h-5 w-5 mt-0.5" />
                        <span>{office.hours}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Phone className="h-5 w-5 mt-0.5" />
                        <span>{office.phone}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between"
                >
                  <span className="font-semibold">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-muted-foreground">{item.answer}</p>
                  </motion.div>
                )}
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
