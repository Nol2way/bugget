import React from 'react'

export default function PinBar({ pin, length }) {
  return (
    <div className="pin-bar">
      {Array.from({ length }).map((_, i) => {
        const filled = i < pin.length
        return (
          <span key={i} className={`pin-cell${filled ? '' : ' empty-dot'}`}>
            {filled ? (i === 0 ? pin[0] : '*') : ''}
          </span>
        )
      })}
    </div>
  )
}
