import React from 'react'
import  SignInGoogle from "../AuthOperation/SignInGoogle"
const Navbar = () => {
  return (
    <div className='bg-[#4C768D] px-6  py-5 flex  justify-between items-center'>
        <h1 className=' text-white'>React Chat</h1>
        <SignInGoogle/>
    </div>
  )
}

export default Navbar