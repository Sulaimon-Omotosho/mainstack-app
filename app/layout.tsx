import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import FloatingIcons from '@/components/FloatingIcons'

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// })

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// })

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mainstack',
  description: 'Mainstack ...',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased`}>
        {/* <div className=' h-[80px] w-screen bg-white backdrop-blur-md z-50'></div> */}
        <Navbar />
        <div className='flex justify-center items-center mt-[80px]'>
          <FloatingIcons />
          <div className=' max-w-[1160px] lg:min-w-[1160px]'>{children}</div>
        </div>
      </body>
    </html>
  )
}
