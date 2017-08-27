import React from 'react'

export default function Suggestion({ data, selected, onClick }) {
  const handleClick = () => onClick(data)

  return (
    <li
      className={`suggestion ${selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {data.handle}
    </li>
  )
}
