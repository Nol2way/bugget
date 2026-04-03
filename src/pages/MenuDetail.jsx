import React, { useEffect, useState, useCallback } from 'react'

function computeCountdown(fromDate) {
  const now = new Date()
  const then = new Date(fromDate)
  let delta = Math.max(0, Math.floor((now - then) / 1000))

  const years = Math.floor(delta / (3600 * 24 * 365))
  delta -= years * 3600 * 24 * 365
  const months = Math.floor(delta / (3600 * 24 * 30))
  delta -= months * 3600 * 24 * 30
  const days = Math.floor(delta / (3600 * 24))
  delta -= days * 3600 * 24
  const hours = Math.floor(delta / 3600)
  delta -= hours * 3600
  const minutes = Math.floor(delta / 60)
  const seconds = delta - minutes * 60

  return { years, months, days, hours, minutes, seconds }
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* ─────────────────────────────────────
   Puzzle: จับคู่ภาพ
───────────────────────────────────── */
function PuzzleGame({ data, onClose }) {
  const PAIRS = data.pairs || []

  function makeDeck() {
    return shuffle([...PAIRS, ...PAIRS].map((p, i) => ({ ...p, uid: `${p.id}-${i}` })))
  }

  const [cards, setCards] = useState(makeDeck)
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState(new Set())
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)
  const [won, setWon] = useState(false)

  useEffect(() => {
    if (PAIRS.length > 0 && matched.size === PAIRS.length) setWon(true)
  }, [matched, PAIRS.length])

  const handleFlip = useCallback((idx) => {
    if (locked) return
    if (flipped.includes(idx)) return
    if (matched.has(cards[idx].id)) return

    const next = [...flipped, idx]
    setFlipped(next)

    if (next.length === 2) {
      setLocked(true)
      setMoves(m => m + 1)
      const [a, b] = next
      if (cards[a].id === cards[b].id) {
        setMatched(prev => { const s = new Set(prev); s.add(cards[a].id); return s })
        setFlipped([])
        setLocked(false)
      } else {
        setTimeout(() => { setFlipped([]); setLocked(false) }, 900)
      }
    }
  }, [locked, flipped, matched, cards])

  function restart() {
    setCards(makeDeck())
    setFlipped([])
    setMatched(new Set())
    setMoves(0)
    setWon(false)
    setLocked(false)
  }

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="puz-page" onClick={e => e.stopPropagation()}>
        <button className="detail-close mem-close" onClick={onClose}>✕</button>

        <div className="puz-header">
          <div className="puz-header-left">
            <span className="puz-icon">🧩</span>
          </div>
          <div className="puz-score">
            <span className="puz-score-num">{moves}</span>
            <span className="puz-score-label">ครั้ง</span>
          </div>
        </div>

        {won ? (
          <div className="puz-win">
            <div className="puz-win-emoji">🎉</div>
            <h3 className="puz-win-title">เก่งมากเลย!</h3>
            <p className="puz-win-sub">จับคู่ครบใน {moves} ครั้ง 💕</p>
            <button className="puz-restart-btn" onClick={restart}>เล่นใหม่ 🔄</button>
          </div>
        ) : (
          <>
            <div className="puz-grid">
              {cards.map((card, idx) => {
                const isFlipped = flipped.includes(idx) || matched.has(card.id)
                const isMatched = matched.has(card.id)
                return (
                  <div
                    key={card.uid}
                    className={`puz-card${isFlipped ? ' flipped' : ''}${isMatched ? ' matched' : ''}`}
                    onClick={() => handleFlip(idx)}
                  >
                    <div className="puz-card-inner">
                      <div className="puz-card-back">
                        <span className="puz-back-icon">💝</span>
                      </div>
                      <div className="puz-card-front">
                        <span className="puz-card-emoji">{card.emoji}</span>
                        <span className="puz-card-label">{card.label}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="puz-footer">
              <span className="puz-matched-text">{matched.size} / {PAIRS.length} คู่</span>
              <button className="puz-restart-btn puz-restart-sm" onClick={restart}>เริ่มใหม่</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────
   Love Note: animated envelope
───────────────────────────────────── */
function LoveNote({ data, onClose }) {
  const [opened, setOpened] = useState(false)
  const lines = (data.letter || '').split('\n')

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="env-scene" onClick={e => e.stopPropagation()}>
        <button className="detail-close mem-close" onClick={onClose}>✕</button>

        {/* floating hearts */}
        <div className="env-hearts" aria-hidden="true">
          {['💕','🌸','💗','✨','💝'].map((h, i) => (
            <span key={i} className="env-heart" style={{ '--delay': `${i * 0.7}s`, '--x': `${10 + i * 18}%` }}>{h}</span>
          ))}
        </div>

        <div className="env-title-row">
          <span>💌</span>
          <h2 className="env-page-title">Love Notes</h2>
        </div>

        {/* ── Envelope ── */}
        <div className={`env-wrap${opened ? ' env-opened' : ''}`} onClick={() => setOpened(true)}>

          {/* Letter (slides up when opened) */}
          <div className="env-letter">
            <p className="env-letter-to">Dear {data.to || 'You'},</p>
            <div className="env-letter-body">
              {lines.map((line, i) =>
                line === '' ? <br key={i} /> : <p key={i}>{line}</p>
              )}
            </div>
            <p className="env-letter-sign">With love 💗</p>
          </div>

          {/* Envelope body — overflow:hidden clips only the V-fold triangles */}
          <div className="env-body">
            <div className="env-flap env-flap-bl" />
            <div className="env-flap env-flap-br" />
            <span className="env-seal">💝</span>
          </div>
          {/* Top flap is OUTSIDE env-body so overflow:hidden can't clip its 3-D rotation */}
          <div className="env-flap-top" />
        </div>

        {!opened && (
          <p className="env-hint">แตะที่ซองเพื่อเปิดอ่าน 💌</p>
        )}
      </div>
    </div>
  )
}

export default function MenuDetail({ data, onClose }) {
  if (!data) return null

  /* ── Notes branch ── */
  if (data.id === 'notes') {
    return <LoveNote data={data} onClose={onClose} />
  }

  /* ── Puzzle branch ── */
  if (data.id === 'puzzle') {
    return <PuzzleGame data={data} onClose={onClose} />
  }

  const [localData, setLocalData] = useState(() => ({ ...data, items: data.items ? [...data.items] : [] }))
  const [count, setCount] = useState(() => computeCountdown(data.start || Date.now()))
  const [fullImage, setFullImage] = useState(null) // { img, date, text }

  useEffect(() => {
    if (!data.start) return undefined
    const id = setInterval(() => setCount(computeCountdown(data.start)), 1000)
    return () => clearInterval(id)
  }, [data.start])

  function handleUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const newItem = {
        id: 'mu' + Date.now(),
        date: new Date().toLocaleDateString('en-CA'),
        text: file.name.replace(/\.[^.]+$/, ''),
        img: ev.target.result,
      }
      setLocalData((prev) => ({ ...prev, items: [...prev.items, newItem] }))
    }
    reader.readAsDataURL(file)
  }

  function deleteMem(id) {
    setLocalData((prev) => ({ ...prev, items: prev.items.filter(m => m.id !== id) }))
  }

  /* ── Memories layout ── */
  if (data.id === 'memories') {
    return (
      <div className={`detail-overlay ${fullImage ? 'lightbox-open' : ''}`} onClick={onClose}>
        <div className="mem-page" onClick={(e) => e.stopPropagation()}>
          <button className="detail-close mem-close" onClick={onClose}>✕</button>

          {/* Header */}
          <div className="mem-page-header">
            <div className="mem-page-title-wrap">
              <span className="mem-page-icon">🧸</span>
              <div>
                <h2 className="mem-page-title">Our Sweet Moments</h2>
                <p className="mem-page-sub">Every precious moment with you 💗</p>
              </div>
            </div>
            <label className="mem-upload-btn">
              <input type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
              + Add Memory
            </label>
          </div>

          {/* Photo row */}
          <div className="mem-row">
            {localData.items.map((m) => (
              <div key={m.id} className="mem-card">
                <img
                  className="mem-card-img"
                  src={m.img || import.meta.env.BASE_URL + 'IMG_9187.png'}
                  alt="memory"
                  onClick={() => setFullImage({ img: m.img || import.meta.env.BASE_URL + 'IMG_9187.png', date: m.date, text: m.text })}
                />
                <div className="mem-card-footer">
                  <span className="mem-card-date">{m.date}</span>
                  <span className="mem-card-text">{m.text}</span>
                </div>
                <button className="delete-mem" onClick={() => deleteMem(m.id)}>✕</button>
              </div>
            ))}
            {localData.items.length === 0 && (
              <div className="mem-empty">No memories yet 💭</div>
            )}
          </div>
        </div>
        {fullImage && (
          <div className="mem-lightbox" onClick={() => setFullImage(null)}>
            <div className="mem-lightbox-polaroid" onClick={(e) => e.stopPropagation()}>
              <button className="mem-lightbox-close" onClick={() => setFullImage(null)}>✕</button>
              <span className="mem-lightbox-sticker">💕</span>
              <img src={fullImage.img} alt="memory" />
              <div className="mem-lightbox-caption">
                <span className="mem-lightbox-date">{fullImage.date}</span>
                {fullImage.text && <span className="mem-lightbox-text">{fullImage.text}</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

}
