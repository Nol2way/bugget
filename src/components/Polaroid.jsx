import React from 'react'

export default function Polaroid({ images, current, prev, next, onUpload, caption, autoplay, toggleAutoplay }) {
  return (
    <div className="photo-side">
      <div className="polaroid">
        <span className="sticker">💕</span>

        {images[current] ? (
          <img src={images[current]} alt={`photo-${current}`} onError={(e) => (e.target.style.display = 'none')} />
        ) : (
          <div className="no-photo">📷</div>
        )}

        {images.length > 1 && (
          <>
            <button className="polaroid-nav left" onClick={prev} aria-label="Prev">‹</button>
            <button className="polaroid-nav right" onClick={next} aria-label="Next">›</button>
          </>
        )}

        <div className="caption bungee-regular" style={{ color: '#c44070', fontSize: 18 }}>{caption}</div>
      </div>

      {/* Dot strip — only when multiple images */}
      {images.length > 1 && (
        <div className="dot-strip">
          {images.map((_, i) => (
            <span key={i} className={`img-dot${i === current ? ' active' : ''}`} />
          ))}
        </div>
      )}

      {/* <div className="photo-controls">
        <label className="upload-label" htmlFor="photoInput">📷 เพิ่มรูปภาพ</label>
        <input id="photoInput" type="file" accept="image/*" onChange={onUpload} />
        {images.length > 1 && (
          <button className={`autoplay-btn${autoplay ? ' active' : ''}`} onClick={toggleAutoplay}>
            {autoplay ? '⏸ หยุด' : '▶ Auto'}
          </button>
        )}
      </div> */}
    </div>
  )
}
