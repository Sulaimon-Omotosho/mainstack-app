import Image from 'next/image'

export default function Home() {
  return (
    <section className='flex w-screen h-screen justify-center items-center'>
      <Image
        src='/assets/mainstack-logo.svg'
        height={100}
        width={100}
        alt='logo'
      />
      <p className='text-3xl font-black'>Mainstack</p>
    </section>
  )
}
