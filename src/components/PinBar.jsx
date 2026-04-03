import React from 'react'

export default function PinBar({ pin, length }) {
  return (
    <div className="pin-bar">
      {Array.from({ length }).map((_, i) => {
        const filled = i < pin.length
        return (
          <span key={i} className={`pin-cell ${filled ? 'filled' : 'empty-dot'}`}></span>
        )
      })}
    </div>
  )
}
