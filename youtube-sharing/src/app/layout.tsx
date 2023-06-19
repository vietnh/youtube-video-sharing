import './globals.css'
import { Inter } from 'next/font/google'
import Login from './widgets/Login'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="h-full bg-gray-100">
      <body className="h-full">
        <div className="min-h-full">
          <nav className="fixed left-0 top-0 w-full bg-gray-800 flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center flex-shrink-0 mr-6">
              <div className="flex-shrink-0">
              </div>
            </div>
            <div className="w-full block lg:flex lg:items-center lg:w-auto">
              <Login />
            </div>
          </nav>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
          </main>
        </div>
      </body>
    </html >
  )
}
