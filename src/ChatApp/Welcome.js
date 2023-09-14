import React from 'react'
import reactlogo from './reactlogo.png'
import SignInWithGoogle from '../AuthOperation/SignInGoogle'
const Welcome = () => {
  return (
    <div className='flex flex-col justify-center w-full gap-4 mt-8  items-center'>
        <h1 className='text-[#4C768D] font-bold text-[30px]'>Welcome to React Chat</h1>
        <div className='relative w-96'>
        <img src={reactlogo}/>
        </div>
        <h2 className='text-[#4C768D] font-bold text-[20px]'>Sign in With Google Chat with your Fellow Developers</h2>
        <SignInWithGoogle/>
    </div>
  )
}

export default Welcome