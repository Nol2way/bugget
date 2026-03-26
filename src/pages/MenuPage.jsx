import React, { useState } from 'react'
import MENU_DATA from '../data/menuData'
import MenuDetail from './MenuDetail'

const MENU_ITEMS = [
  {
    id: 'memories',
    title: 'Our Memories',
    desc: 'Every precious moment with you',
    icon: '🧸',
    heart: '❤️',
  },
  {
    id: 'calendar',
    title: 'Love Calendar',
    desc: 'Counting days of our love story',
    icon: '🎁',
    heart: '❤️',
  },
  {
    id: 'puzzle',
    title: 'Love Puzzle',
    desc: 'A puzzle made just for two',
    icon: '🪷',
    heart: '💕',
  },
  {
    id: 'notes',
    title: 'Love Notes',
    desc: 'Sweet words just for you',
    icon: '💌',
    heart: '💖',
  },
]

export default function MenuPage() {
  const [selected, setSelected] = useState(null)

  function openItem(id) { setSelected(id) }
  function closeItem() { setSelected(null) }

  return (
    <div className="menu-root">
      {/* floating petals */}
      {['🌸','🌺','🌸','💮','🌸'].map((icon, i) => (
        <span key={i} className="petal" style={{
          left: `${[8,22,50,74,90][i]}%`,
          animationDuration: `${[9,12,10,13,8][i]}s`,
          animationDelay: `${[0,2,4,1,3][i]}s`,
        }}>{icon}</span>
      ))}

      <div className="menu-inner">
        <h1 className="menu-title">Menu of Our Love</h1>
        <p className="menu-sub">♡ Together Forever ♡</p>

        <div className="menu-grid">
          {MENU_ITEMS.map((item) => (
            <button key={item.id} className="menu-card" onClick={() => openItem(item.id)}>
              <span className="menu-card-icon">{item.icon}</span>
              <div className="menu-card-body">
                <span className="menu-card-title">{item.title}</span>
                <span className="menu-card-desc">{item.desc} {item.heart}</span>
              </div>
              <span className="menu-card-heart">♡</span>
            </button>
          ))}
        </div>
      </div>
      {selected && <MenuDetail data={MENU_DATA[selected]} onClose={closeItem} />}
    </div>
  )
}
