import React from 'react'
import Image from 'next/image'
type Props = {}
export const Table = (props: Props) => {
  return (
    <div className="flex flex-col items-center 
     min-h-[100vh] -mt-20 justify-center bg-[#0A0A0A] text-white">
    <h1 className="text-3xl font-bold text-center mb-8">Tired of doing random questions?</h1>
    <div className="flex flex-col md:flex-row justify-between gap-5 items-center w-full max-w-4xl">
      <div className="bg-red-900 bg-opacity-10 border border-[#7F1D1D] p-8 rounded-lg w-3/4 md:w-2/3 mr-4">
        <h2 className="text-xl font-bold mb-4">Without DSABuddy</h2>
        <ul className='flex flex-col gap-3 '>
          <li className='text-red-500 '>
            <Image src="/wrong.png" alt='wrong' width={20} height={20}/>
          </li>
          <li className='text-red-500 '>
            <Image src="/wrong.png" alt='wrong' width={20} height={20}/>
          </li>
          <li className='text-red-500 '>
            <Image src="/wrong.png" alt='wrong' width={20} height={20}/>
          </li>
          <li className='text-red-500 '>
            <Image src="/wrong.png" alt='wrong' width={20} height={20}/>
          </li>
          <li className='text-red-500 '>
            <Image src="/wrong.png" alt='wrong' width={20} height={20}/>
          </li>
        </ul>
      </div>
      <div className="bg-green-900 p-8 bg-opacity-10 border border-green-500 rounded-lg w-3/4 md:w-2/3 ml-4">
        <h2 className="text-xl font-bold mb-4">With DSABuddy</h2>
        <ul className='flex flex-col gap-3'>
        <li className='text-green-500 '>
            <Image src="/right.png" alt='wrong' width={20} height={20}/>
          </li>
        <li className='text-green-500 '>
            <Image src="/right.png" alt='wrong' width={20} height={20}/>
          </li>
        <li className='text-green-500 '>
            <Image src="/right.png" alt='wrong' width={20} height={20}/>
          </li>
        <li className='text-green-500 '>
            <Image src="/right.png" alt='wrong' width={20} height={20}/>
          </li>
        <li className='text-green-500 '>
            <Image src="/right.png" alt='wrong' width={20} height={20}/>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}