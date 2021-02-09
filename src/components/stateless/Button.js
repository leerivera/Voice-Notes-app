import React from 'react'

export const Button = (props) => {
  let color = props.color || 'indigo'
  let type = props.type || 'button'
  return (
    <button
      type={type}
      className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}
