import { Inter } from 'next/font/google';
//import { JobProvider } from '@/lib/context/JobContext';
import './globals.css';
import { ReactNode } from 'react';
//import {ClerkProvider} from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ג׳וניורהאב - פלטפורמה למפתחים ג׳וניורים',
  description: 'עזרה בחיפוש עבודה למפתחי תוכנה מתחילים',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className={inter.className}>
        
        
          {children}
        
        
      </body>
    </html>
  );
}
