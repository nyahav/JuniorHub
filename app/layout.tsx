import { Inter } from 'next/font/google';
import './globals.css';
import React, { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import ClientLayout from './layoutClient'; // Import ClientLayout

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ג׳וניורהאב - פלטפורמה למפתחים ג׳וניורים',
  description: 'עזרה בחיפוש עבודה למפתחי תוכנה מתחילים',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider>
          <ClientLayout>{children}</ClientLayout>
        </ClerkProvider>
      </body>
    </html>
  );
}
