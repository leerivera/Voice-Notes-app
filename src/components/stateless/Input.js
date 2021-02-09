import React from 'react'

const Input = (props) => {
  return (
    <div className={'flex items-center border-b border-indigo-500 py-2'}>
      <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" {...props} />
    </div>
  )
}

export default Input
