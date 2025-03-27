import { menuItems } from '@/constants'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-center'>
      <div className='w-[1408px] h-[64px] mt-[16px] rounded-full shadow-md px-[24px] flex justify-between'>
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
          {menuItems.map((item, index) => (
            <div
              className='w-[112px] h-[40px] rounded-full flex gap-1 justify-center items-center cursor-pointer hover:bg-white hover:invert ease-in-out duration-600'
              key={index}
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={20}
                height={20}
                className='object-fit brightness-0 contrast-200'
              />
              <p className=''>{item.name}</p>
            </div>
          ))}
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
              <p className='text-[14px] text-white'>OJ</p>
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
    </nav>
  )
}

export default Navbar
