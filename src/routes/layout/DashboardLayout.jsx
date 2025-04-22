import React, { useEffect } from 'react';
import { AppSidebar } from '@/components/common/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import ThemeButton from '@/components/common/ThemeButton';
import useUserStore from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const BurningFlame = () => {
  return (
    <motion.div
      className="text-red-600 drop-shadow-[0_0_4px_#f87171]"
      animate={{
        scale: [1, 1.2, 0.95, 1],
        rotate: [0, -5, 5, 0],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Flame className="w-5 h-5" />
    </motion.div>
  );
};

const DashboardLayout = ({ children }) => {
  const user = useUserStore(state => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Skeleton
          className={` bg-gray-100 w-7xl min-h-96 flex flex-col justify-center items-center`}
          text={' Please Login I Think you have Not Loggin !'}
        />{' '}
      </div>
    );

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center justify-between gap-2 px-4 w-full">
              <SidebarTrigger className="-ml-1" />
              <div className="flex items-center gap-4">
                <Button variant={'outline'} className="rounded-3xl  gap-2">
                  <BurningFlame />
                  {user.apiMaxCall - user.apiKeyCount}
                </Button>
                <ThemeButton />
              </div>
            </div>
          </header>
          <div className="flex-1 flex-col gap-4 md:p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
