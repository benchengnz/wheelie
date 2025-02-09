// app/layout.tsx
import React, { ReactNode } from 'react';
import ThemeProviderClient from '../components/ThemeProviderClient';

export const metadata = {
  title: 'Spinning Wheel App',
  description: 'Customizable spinning wheel for games',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <head>
        <title>Spinning Wheel App</title>
      </head>
      <body>
        <ThemeProviderClient>{children}</ThemeProviderClient>
      </body>
    </html>
  );
}
