import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-purple-950 text-white my-2 py-2'>
        <div className="logo">
            <span className='font-semibold text-2xl mx-10'>Todo Manager</span>
        </div>
        <ul className='flex gap-10 mx-10'>
            <li className='hover:cursor-pointer hover:underline hover:text-cyan-400 hover:font-bold hover:transition-all hover:duration-75'>Home</li>
            <li className='hover:cursor-pointer hover:underline hover:text-cyan-400 hover:font-bold hover:transition-all hover:duration-75'>Your Todo</li>
        </ul>
    </nav>
  )
}

export default Navbar
