import React from 'react'
import PinBar from './PinBar'
import Keypad from './Keypad'

export default function LockCard({ pinLength, pin, onPress, onDelete, onClear, msg, shaking }) {
  return (
    <div className={`card${shaking ? ' shake' : ''}`}>
      <div className="bow">🎀</div>
      <h1>My Lock</h1>
      <p className="subtitle">🔒 Anniversary Code?</p>

      <PinBar length={pinLength} pin={pin} />

      <Keypad onPress={onPress} onDelete={onDelete} onClear={onClear} />

      <div className="msg">{msg}</div>
      <div className="corner-flower">🌸</div>
    </div>
  )
}
