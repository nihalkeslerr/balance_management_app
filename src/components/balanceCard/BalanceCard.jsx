import React from 'react'

function BalanceCard({ title, balance }) {
  return (
    <div className="p-3 my-2 mx-2 border rounded-md cursor-pointer w-1/5 h-36">
        <p>{title}</p>
        <span>{balance}</span>
    </div>
  )
}

export default BalanceCard