import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { auth } from '@/auth';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const session = await auth();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} overflow-hidden`}>
        <NextIntlClientProvider messages={messages}>
          {/* <SessionProvider session={session}> */}
          <Providers session={session} >
            <Toaster />
            {children}
          </Providers>
          {/* </SessionProvider> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  viewportFit: "cover",
};
