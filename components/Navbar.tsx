'use client'

import { menuItems } from '@/constants'
import { USER } from '@/lib/types'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const Navbar = ({ user }: USER) => {
  const pathname = usePathname()
  const [menu, setMenu] = useState(false)

  const getInitials = (user: USER) => {
    if (!user) return '??'
    return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
  }

  return (
    <nav className='flex justify-center z-[51] relative'>
      {/* WEB  */}
      <div className='hidden w-[90%] h-[64px] lg:mt-[16px] rounded-full shadow-md px-[24px] lg:flex justify-between sticky lg:fixed bg-white backdrop-blur-md '>
        {/* LOGO  */}
        <div className='h-full flex items-center'>
          <Image
            src='/assets/mainstack-logo.svg'
            alt='logo'
            height={36}
            width={36}
            className='object-fit cursor-pointer'
          />
        </div>
        {/* MENU ITEMS  */}
        <div className='flex gap-5 justify-center items-center'>
          {menuItems.map((item, index) => {
            const isActive = pathname === item.link
            // FIX HOVER EFFECT
            return (
              <Link
                href={item.link}
                className={`w-[112px] h-[40px] rounded-full flex gap-1 justify-center items-center cursor-pointer ${
                  isActive
                    ? 'bg-white invert'
                    : 'hover:bg-white hover:invert transition duration-400'
                }`}
                key={index}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={20}
                  height={20}
                  className='object-fit brightness-0 contrast-200'
                />
                <p className='font-semibold'>{item.name}</p>
              </Link>
            )
          })}
        </div>
        {/* PROFILE */}
        <div className='flex justify-center items-center gap-5'>
          <div className='flex items-center justify-center h-full gap-10'>
            <Image
              src='/icons/notifications.svg'
              alt='notifications'
              width={20}
              height={20}
              className='cursor-pointer brightness-0 contrast-200'
            />
            <Image
              src='/icons/chat.svg'
              alt='notifications'
              width={20}
              height={20}
              className='cursor-pointer brightness-0 contrast-200'
            />
          </div>
          <div className='flex items-center justify-center h-[40px] gap-3 rounded-full p-2 bg-linear-to-r from-zinc-100 to-[#EFF1F6]'>
            <div className='bg-black w-[32px] h-[32px] rounded-full flex items-center justify-center cursor-pointer'>
              <p className='text-[14px] text-white'>{getInitials(user)}</p>
            </div>
            <Image
              src='/icons/menu.svg'
              alt='notifications'
              width={20}
              height={20}
              className='cursor-pointer brightness-0 contrast-200'
            />
          </div>
        </div>
      </div>

      {/* MOBILE  */}
      <div className='lg:hidden flex items-center w-[90%] h-[64px] rounded-full shadow-md px-[24px] justify-between fixed'>
        {/* LOGO  */}
        <div className='h-full flex items-center'>
          <Image
            src='/assets/mainstack-logo.svg'
            alt='logo'
            height={36}
            width={36}
            className='object-fit cursor-pointer'
          />
        </div>
        <MenuIcon onClick={() => setMenu(!menu)} />
      </div>
      {menu && (
        <div
          className={`fixed inset-0 bg-white justify-center flex flex-col gap-4 z-40 transform transition-transform duration-300 ${
            menu ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <MenuIcon
            onClick={() => setMenu(!menu)}
            className='absolute top-5 right-10'
          />
          <div className=' flex flex-col items-center justify-center gap-5'>
            {menuItems.map((item, index) => {
              const isActive = pathname === item.link
              // FIX HOVER EFFECT
              return (
                <Link
                  href={item.link}
                  className={`w-[112px] h-[40px] rounded-full flex gap-1 justify-center items-center cursor-pointer ${
                    isActive
                      ? 'bg-white invert'
                      : 'hover:bg-white hover:invert transition duration-400'
                  }`}
                  key={index}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                    className='object-fit brightness-0 contrast-200'
                  />
                  <p className='font-semibold'>{item.name}</p>
                </Link>
              )
            })}
          </div>
          <div className='flex justify-center items-center gap-5'>
            <div className='flex items-center justify-center h-full gap-10'>
              <Image
                src='/icons/notifications.svg'
                alt='notifications'
                width={20}
                height={20}
                className='cursor-pointer brightness-0 contrast-200'
              />
              <Image
                src='/icons/chat.svg'
                alt='notifications'
                width={20}
                height={20}
                className='cursor-pointer brightness-0 contrast-200'
              />
            </div>
            <div className='flex items-center justify-center h-[40px] gap-3 rounded-full p-2 bg-linear-to-r from-zinc-100 to-[#EFF1F6]'>
              <div className='bg-black w-[32px] h-[32px] rounded-full flex items-center justify-center cursor-pointer'>
                <p className='text-[14px] text-white'>{getInitials(user)}</p>
              </div>
              <Image
                src='/icons/menu.svg'
                alt='notifications'
                width={20}
                height={20}
                className='cursor-pointer brightness-0 contrast-200'
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
