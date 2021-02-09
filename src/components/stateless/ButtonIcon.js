import React from 'react'

export const ButtonIcon = (props) => {
  let color = props.color || 'indigo'
  let type = props.type || 'button'
  return (
    <button
      type={type}
      className={`mx-1 bg-white text-gray-800 font-bold rounded border-b-2 border-${color}-500 hover:border-${color}-600 hover:bg-${color}-500 hover:text-white shadow-md py-2 px-2 inline-flex items-center ${
        props.className || ''
      }`}
      onClick={props.onClick}
    >
      <span className="material-icons">{props.icon}</span>
    </button>
  )
}
