import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from './loading';
import React from 'react';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <Suspense fallback={<Loading />}>
          <main className="h-full w-full pt-16 overflow-hidden">{children}</main>
        </Suspense>
      </div>
    </>
  );
}
