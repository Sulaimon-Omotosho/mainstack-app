import { floatingIcons } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

const FloatingIcons = () => {
  return (
    <div className='p-2 shadow-md rounded-full fixed left-5 top-1/2 -translate-y-1/2'>
      <div className='flex flex-col gap-4 h-full w-full justify-center items-center'>
        {floatingIcons.map((icon, idx) => (
          <HoverCard key={idx}>
            <HoverCardTrigger>
              <div
                // href={icon.link}
                className='hover:bg-gray-200 rounded-full w-[40px] h-[40px] grayscale opacity-80 hover:grayscale-0 flex justify-center items-center transition duration-300'
              >
                <Image
                  src={icon.icon}
                  alt='icon'
                  width={24}
                  height={24}
                  className=''
                />
              </div>
            </HoverCardTrigger>
            {/* CHECK THE POPUP  */}
            <HoverCardContent
              className='left-8 absolute text-xs bg-black
            text-white p-2'
            >
              <p className=''>{icon.name}</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  )
}

export default FloatingIcons
