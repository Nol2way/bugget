import React from 'react'

export default function Keypad({ onPress, onDelete }) {
  const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫']
  return (
    <div className="keypad bungee-regular">
      {keys.map((k, i) => (
        <button
          key={i}
          className={`key ${k === '⌫' ? 'del' : k === '' ? 'empty' : ''}`}
          onClick={() => (k === '⌫' ? onDelete() : k === '' ? null : onPress(k))}
        >
          {k === '⌫' ? '⌫' : k}
        </button>
      ))}
    </div>
  )
}
