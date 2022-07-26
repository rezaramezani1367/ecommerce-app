import React from 'react';
import { FaShoppingCart,FaUser } from "react-icons/fa";

function Header() {
  return (
    <div className='border-b shadow py-2.5'>
        <div className='container-main flex justify-between  items-center'>
            <div className=' cursor-pointer font-bold hover:text-blue-800 transition-all'>Home</div>
            <div>
                <ul className='flex flex-row-reverse items-center'>
                    <li className='ml-6 font-bold cursor-pointer'>Login</li>
                    {/* <FaUser /> */}
                    <li className='font-bold cursor-pointer'><FaShoppingCart /></li>
                </ul>
            </div>

        </div>
    </div>
  )
}

export default Header