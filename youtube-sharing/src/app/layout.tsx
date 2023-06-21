import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from './components/Header';
import UserSection from './widgets/UserSection';
import PageLayout from './components/PageLayout';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
          <div className="min-h-full bg-gray-100">
            <Header right={<UserSection />} />
            <PageLayout>{children}</PageLayout>
          </div>
      </body>
    </html>
  );
}
