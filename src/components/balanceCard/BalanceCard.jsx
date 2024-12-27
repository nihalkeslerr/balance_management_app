import React from 'react'

function BalanceCard({ title, balance }) {
  return (
    <div className=" p-2 my-2 rounded-md cursor-pointer lg:w-1/5 md:w-1/4 sm:w-1/3 xs:w-1/2 w-full">
      <div className="p-2 border rounded-md cursor-pointer h-56  place-content-center place-items-center  bg-gradient-to-r from-teal-300 via-blue-500 to-blue-800 shadow-2xl ">
        <p className='text-xl font-semibold text-white'>{title}</p>
        <span className='text-2xl text-white'>{balance} ₺</span>
      </div>
      
    </div>
  )
}

export default BalanceCard