import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter, Facebook, Copy, Share2, MessageCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'sonner';

const Share = ({ url }) => {
  const encodedUrl = encodeURIComponent(url || window.location.href);
  const { theme } = useTheme();
  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard');
  };

  const platforms = [
    {
      icon: <Linkedin size={18} />,
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      icon: <Twitter size={18} />,
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
    },
    {
      icon: <Facebook size={18} />,
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      icon: <MessageCircle size={18} />,
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodedUrl}`,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`gap-2 ${theme.secondary} border ${theme.border} hover:${theme.highlight}`}
        >
          <Share2 size={12} className={`${theme.text}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-row items-center gap-3 p-3">
        {platforms.map((platform, i) => (
          <a
            key={i}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all border cursor-pointer"
            title={`Share on ${platform.name}`}
          >
            {platform.icon}
          </a>
        ))}
        <button
          onClick={handleCopy}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all border cursor-pointer"
          title="Copy Link"
        >
          <Copy size={18} />
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Share;
