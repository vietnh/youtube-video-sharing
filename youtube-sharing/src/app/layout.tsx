import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from './components/Header';
import UserSection from './widgets/UserSection';
import PageLayout from './components/PageLayout';
import Notifications from './widgets/Notifications';
import { MainTitle } from './widgets/MainTitle';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="min-h-full bg-gray-100 font-inter">
          <Header left={<MainTitle />} right={<UserSection />} />
          <Notifications />
          <PageLayout>{children}</PageLayout>
        </div>
      </body>
    </html>
  );
}
