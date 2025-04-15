import React from 'react';
import { AppSidebar } from '@/components/common/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import ThemeButton from '@/components/common/ThemeButton';
const DashboardLayout = ({ children }) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center justify-between gap-2 px-4 w-full">
              <SidebarTrigger className="-ml-1" />
              <ThemeButton />
            </div>
          </header>
          <div className="flex-1 flex-col gap-4 md:p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
