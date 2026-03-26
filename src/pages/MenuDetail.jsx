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
            <div>
              <h2 className="puz-title">Love Puzzle</h2>
              <p className="puz-sub">จับคู่ภาพให้ครบทุกคู่ 💗</p>
            </div>
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
      <div className="detail-overlay" onClick={onClose}>
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
            {localData.items.map((m, i) => (
              <div key={m.id} className="mem-card" style={{ '--rot': `${(i % 3 - 1) * 3}deg` }}>
                <div className="mem-card-img" style={{ backgroundImage: `url(${m.img || import.meta.env.BASE_URL + 'IMG_9187.png'})` }} />
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
      </div>
    )
  }

  /* ── Calendar / other layouts ── */
  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-card" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose}>✕</button>
        <div className={`detail-header calendar-header ${data.id === 'calendar' ? 'calendar-centered' : ''}`}>
          <div className="calendar-hero">
            <img src={localData.heroImg || import.meta.env.BASE_URL + 'IMG_9187.png'} alt={data.title} />
            <button className="play-overlay" aria-label="Play">▶</button>
          </div>
          <div className="calendar-info">
            <h2 className="detail-title">{data.title}</h2>
            <p className="detail-desc">{data.desc}</p>
          </div>
        </div>

        <div className="detail-body calendar-body">
          {data.id === 'calendar' ? (
            <div className="countdown-grid">
              <div className="count-cell"><div className="count-num">{String(count.years).padStart(2,'0')}</div><div className="count-label">Year</div></div>
              <div className="count-cell"><div className="count-num">{String(count.months).padStart(2,'0')}</div><div className="count-label">Month</div></div>
              <div className="count-cell"><div className="count-num">{String(count.days).padStart(2,'0')}</div><div className="count-label">Days</div></div>
              <div className="count-cell"><div className="count-num">{String(count.hours).padStart(2,'0')}</div><div className="count-label">Hours</div></div>
              <div className="count-cell"><div className="count-num">{String(count.minutes).padStart(2,'0')}</div><div className="count-label">Minutes</div></div>
              <div className="count-cell"><div className="count-num">{String(count.seconds).padStart(2,'0')}</div><div className="count-label">Seconds</div></div>
            </div>
          ) : (
            <>
              {localData.items && (
                <div className="mem-gallery">
                  {localData.items.map((m) => (
                    <div key={m.id} className="mem-item">
                      {m.img && <img src={m.img} alt={m.text} />}
                      <div className="mem-meta"><strong>{m.date}</strong> — {m.text}</div>
                    </div>
                  ))}
                </div>
              )}
              {data.notes && (
                <ul className="notes-list">
                  {data.notes.map((n) => <li key={n.id}>{n.text}</li>)}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
