import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from './components/Header';
import UserSection from './widgets/UserSection';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full bg-gray-100">
      <body className="h-full">
          <div className="min-h-full">
            <Header right={<UserSection />} />
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
              {children}
            </main>
          </div>
      </body>
    </html>
  );
}
