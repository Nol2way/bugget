import React from 'react'

export default function Keypad({ onPress, onDelete, onClear }) {
  const keys = ['1','2','3','4','5','6','7','8','9','C','0','⌫']
    const handleClick = (k) => {
      if (k === '⌫') onDelete && onDelete();
      else if (k === 'C') onClear && onClear();
      else if (k !== '') onPress && onPress(k);
    };
    return (
      <div className="keypad bungee-regular">
        {keys.map((k, i) => (
          <button
            key={i}
            className={`key ${k === '⌫' ? 'del' : k === 'C' ? 'clear' : ''}`}
            onClick={() => handleClick(k)}
          >
            {k === '⌫' ? '⌫' : k}
          </button>
        ))}
      </div>
    );
}
