import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import FloatingIcons from '@/components/FloatingIcons'
import { USER } from '@/lib/types'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mainstack',
  description: 'Mainstack ...',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const userApi = 'https://fe-task-api.mainstack.io/user'

  let userData = null

  try {
    const response = await fetch(userApi)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    userData = await response.json()
  } catch (error) {
    console.error('Error fetching User Data')
  }

  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased`}>
        <div className='sticky lg:fixed h-[80px] w-screen bg-white backdrop-blur-md z-50'></div>
        <Navbar user={userData as USER} />
        <div className='flex justify-center items-center mt-[80px]'>
          <FloatingIcons />
          <div className=' max-w-[1160px] lg:min-w-[1160px]'>{children}</div>
        </div>
      </body>
    </html>
  )
}
