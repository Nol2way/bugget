import React, { useState, useEffect } from 'react'
import Polaroid from './components/Polaroid'
import LockCard from './components/LockCard'
import MenuPage from './pages/MenuPage'
import SongPage from './pages/SongPage'
import './styles.css'

const CORRECT_CODE = '030369'

const PETALS = [
  { left: '8%',  dur: '9s',  delay: '0s',  icon: '🌸' },
  { left: '22%', dur: '12s', delay: '2s',  icon: '🌺' },
  { left: '50%', dur: '10s', delay: '4s',  icon: '🌸' },
  { left: '74%', dur: '13s', delay: '1s',  icon: '💮' },
  { left: '90%', dur: '8s',  delay: '3s',  icon: '🌸' },
]

export default function App() {
  const [pin, setPin] = useState('')
  const [locked, setLocked] = useState(false)
  const [phase, setPhase] = useState('lock') // 'lock' | 'song' | 'menu'
  const [msg, setMsg] = useState('')
  const [shaking, setShaking] = useState(false)
  const [images, setImages] = useState([import.meta.env.BASE_URL + 'IMG_9187.png'])
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key >= '0' && e.key <= '9') handlePress(e.key)
      else if (e.key === 'Backspace') handleDelete()
      else if (e.key === 'Enter') confirmPin(pin)
      else if (e.key === 'ArrowRight') setCurrent((c) => (c + 1) % images.length)
      else if (e.key === 'ArrowLeft') setCurrent((c) => (c - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, pin, locked])

  function handlePress(digit) {
    if (locked) return
    if (pin.length >= CORRECT_CODE.length) return
    setPin((p) => {
      const next = (p + digit).slice(0, CORRECT_CODE.length)
      if (next.length === CORRECT_CODE.length) confirmPin(next)
      return next
    })
    setMsg('')
  }

  function handleDelete() {
    if (locked) return
    setPin((p) => p.slice(0, -1))
    setMsg('')
  }

  function handleClear() {
    if (locked) return
    setPin('')
    setMsg('')
  }

  function confirmPin(value) {
    const v = value ?? pin
    if (!v) return
    if (v === CORRECT_CODE) {
      setMsg('💗 ถูกต้องแล้ว กำลังเข้าสู่ระบบ...')
      setTimeout(() => { setLocked(true); setPhase('song') }, 800)
    } else {
      setMsg('💔 รหัสไม่ถูกต้อง ลองใหม่นะ')
      setPin('')
      setShaking(true)
      setTimeout(() => setShaking(false), 450)
    }
  }

  function changePhoto(ev) {
    const file = ev.target.files && ev.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      setImages((arr) => {
        const next = [...arr, e.target.result]
        setCurrent(next.length - 1)
        return next
      })
    }
    reader.readAsDataURL(file)
  }

  function nextImage() {
    setCurrent((c) => (c + 1) % images.length)
  }
  function prevImage() {
    setCurrent((c) => (c - 1 + images.length) % images.length)
  }
  function toggleAutoplay() {
    setAutoplay((a) => !a)
  }

  useEffect(() => {
    if (!autoplay || images.length <= 1) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % images.length), 3000)
    return () => clearInterval(id)
  }, [autoplay, images.length])

  if (phase === 'menu') return <MenuPage />
  if (phase === 'song') return <SongPage onContinue={() => setPhase('menu')} />

  return (
    <div className="app-root">
      {PETALS.map((p, i) => (
        <span key={i} className="petal" style={{ left: p.left, animationDuration: p.dur, animationDelay: p.delay }}>{p.icon}</span>
      ))}
      <div className="page-wrapper">
        <Polaroid
          images={images}
          current={current}
          prev={prevImage}
          next={nextImage}
        //   onUpload={changePhoto}
          caption={"Forget rak phi John 💗"}
          autoplay={autoplay}
          toggleAutoplay={toggleAutoplay}
        />

        <LockCard
          pinLength={CORRECT_CODE.length}
          pin={pin}
          onPress={handlePress}
          onDelete={handleDelete}
          onClear={handleClear}
          msg={msg}
          shaking={shaking}
        />
      </div>
    </div>
  )
}

