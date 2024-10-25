"use client"
import { auth } from '@/auth';
import { DashboardNav } from '@/components/dashboard-nav';
import { navItems } from '@/constants/data';
import useNavItems from '@/hooks/useNavItems';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const navItemsFiltered = useNavItems(navItems);
  const t = useTranslations()
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <>
      <div>
        <nav
          className={cn(
            `relative hidden h-screen flex-none border-r z-10 pt-20 md:block`,
            status && 'duration-500',
            !isMinimized ? 'w-72' : 'w-[85px]',
          )}
        >
          <ChevronLeft
            className={cn(
              'absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
              isMinimized && 'rotate-180'
            )}
            onClick={handleToggle}
          />
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <div className="space-y-1">
                {!isMinimized ?
                  <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight overflow-hidden ">
                    {t("TAG_OVERVIEW")}
                  </h2> : ''
                }
                <DashboardNav items={navItemsFiltered} handleToggle={handleToggle} />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
