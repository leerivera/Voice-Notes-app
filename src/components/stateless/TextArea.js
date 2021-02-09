import React from 'react'

const TextArea = (props) => {
  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  }
  return (
    <textarea
      onKeyDown={handleKeyDown}
      className="tracking-wide py-2 px-2 mb-3 leading-relaxed appearance-none block w-full  border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
      {...props}
    />
  )
}

export default TextArea
