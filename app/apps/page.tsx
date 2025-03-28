import Image from 'next/image'
import React from 'react'

const AppsPage = () => {
  return (
    <section className='flex w-full h-screen justify-center items-center'>
      <Image
        src='/assets/mainstack-logo.svg'
        height={100}
        width={100}
        alt='logo'
      />
      <p className='text-3xl font-black animate-pulse'>Apps Page ...</p>
    </section>
  )
}

export default AppsPage
