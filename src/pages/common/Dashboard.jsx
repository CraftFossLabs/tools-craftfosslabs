import React, { useState } from 'react';
import useUserStore from '@/store/userStore';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { PartyPopper, Mail, Map, UserCircle2, Search, FileText, Link, ImageIcon, QrCodeIcon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import EmailFinder from '@/components/core/Dashboard/EmailFinder';
import Modal from '@/components/common/Modal';
import Tracking from '@/components/core/Dashboard/Tracking';
import UrlShortner from '@/components/core/Dashboard/UrlShortner';
import MapsByIndia from '@/components/core/Dashboard/MapsByIndia';
import QrCode from '@/components/core/Dashboard/QrCode';
import ProfilePicture from '@/components/core/Dashboard/ProfilePicture';
import FileConverter from '@/components/core/Dashboard/FileConverter';

const Dashboard = () => {
  const user = useUserStore(state => state.user);
  const { theme } = useTheme();
  const [activeTool, setActiveTool] = useState(null);
  if (!user) return <div>Loading user data...</div>;

  const tools = [
    {
      title: 'Email Finder',
      icon: Search,
      description: 'Find professional emails using name & domain.',
      component: <EmailFinder />,
    },
    {
      title: 'Mail',
      icon: Mail,
      description: 'Send or schedule custom emails quickly.',
    },
    {
      title: 'Maps by India',
      icon: Map,
      description: 'Access map services tailored for India.',
      component : <MapsByIndia/>
    },
    {
      title: 'Profile Picture',
      icon: UserCircle2,
      description: 'Generate or update your profile avatar.',
      component : <ProfilePicture/>
    },
    {
      title: 'Tracking',
      icon: Search,
      description: 'Track deliveries or device locations.',
      component: <Tracking />,
    },
    {
      title: 'QR Code',
      icon: QrCodeIcon,
      description: 'Create custom QR codes instantly.',
      component: <QrCode/>,
    },
    {
      title: 'File Converter',
      icon: FileText,
      description: 'Convert files to various formats (PDF, DOCX, etc).',
      component: <FileConverter/>
    },
    {
      title: 'URL Shortener',
      icon: Link,
      description: 'Shorten long URLs with analytics support.',
      component : <UrlShortner/>
    },
    {
      title: 'Image Processing',
      icon: ImageIcon,
      description: 'Compress, resize, and convert images.',
    },
  ];

  return (
    <div className={`${theme.text} p-1`}>
      <h1 className='md:text-2xl text-md font-bold flex items-center gap-2 mt-2'>
        Hey, {user.name}
        <PartyPopper className={`w-6 h-6 ${theme.highlight}`} />
      </h1>
      <h2 className="md:text-lg text-sm text-muted-foreground mb-4">Welcome to the Tools Section</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-2 sm:p-4">
        {tools.map((tool, index) => (
          <Card
            key={index}
            className={`rounded-2xl hover:shadow-md transition-all duration-300 min-h-20 h-full flex flex-col justify-center items-center cursor-pointer ${theme.secondary} border-none 
              ${index % 5 === 0 ? 'md:col-span-3 md:row-span-2' : ''} 
              ${index % 3 === 0 ? 'md:col-span-2' : ''}`}
              onClick={() => tool.component && setActiveTool(tool)}
          >
            <tool.icon className={`md:w-16 md:h-16 w-10 h-10 mx-auto ${theme.highlight} `} />
            <CardHeader className={`md:text-xl text-lg font-semibold text-nowrap text-center w-full ${theme.text}`}>
              {tool.title}
            </CardHeader>
            <CardContent className={`md:text-sm text-xs text-center ${theme.text}`}>
              {tool.description}
            </CardContent>
          </Card>
        ))}
      </div>
      <Modal isOpen={!!activeTool} onClose={() => setActiveTool(null)}>
        {activeTool?.component}
      </Modal>
    </div>
  );
};

export default Dashboard;
