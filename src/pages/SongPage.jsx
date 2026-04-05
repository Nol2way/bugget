import React from 'react'

const PETALS = [
  { left: '5%',  dur: '9s',  delay: '0s',  icon: '🌸' },
  { left: '25%', dur: '12s', delay: '2s',  icon: '🌺' },
  { left: '55%', dur: '10s', delay: '4s',  icon: '🌸' },
  { left: '78%', dur: '13s', delay: '1s',  icon: '💮' },
  { left: '92%', dur: '8s',  delay: '3s',  icon: '🌸' },
  {left: '15%', dur: '11s', delay: '5s',  icon: '🌼' },
  
]

export default function SongPage({ onContinue }) {
  return (
    <div className="song-root">
      {PETALS.map((p, i) => (
        <span key={i} className="petal" style={{ left: p.left, animationDuration: p.dur, animationDelay: p.delay }}>{p.icon}</span>
      ))}

      <div className="song-wrapper">
        <p className="song-for-you">The song is for you ♡</p>

        {/* TV frame */}
        <div className="song-tv">
          <div className="song-tv-antenna">
            <span className="song-tv-ant-left" />
            <span className="song-tv-ant-right" />
          </div>
          <div className="song-tv-body">
            <div className="song-tv-screen">
              <iframe
                src="https://www.youtube.com/embed/LCuxGozZh7c?autoplay=1&rel=0"
                title="เหตุผล - Three Man Down"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {/* TV legs */}
            <div className="song-tv-legs">
              <span className="song-tv-leg" />
              <span className="song-tv-leg" />
            </div>
          </div>
        </div>

        <p className="song-title">เหตุผล — Three Man Down</p>

        <button className="song-continue-btn" onClick={onContinue}>
          เข้าสู่เมนู 💗
        </button>
      </div>
    </div>
  )
}
