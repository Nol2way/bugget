const MENU_DATA = {
  memories: {
    id: 'memories',
    title: 'Our Memories',
    desc: 'Every precious moment with you',
    icon: '🧸',
    items: [
      { id: 'm1', date: '2023-04-12', text: 'First date at the riverside', img: '/IMG_9187.png' },
      { id: 'm2', date: '2024-02-14', text: 'Valentine picnic', img: '/IMG_9187.png' },
      { id: 'm3', date: '2026-03-27', text: 'Our special clip', img: '/IMG_9187.png' },
    ],
  },
  calendar: {
    id: 'calendar',
    title: 'Love Calendar',
    desc: 'Counting days of our love story',
    start: '2026-03-03',
    heroImg: '/IMG_9187.png'
  },
  puzzle: {
    id: 'puzzle',
    title: 'Love Puzzle',
    desc: 'จับคู่ภาพให้ครบทุกคู่ 💗',
    pairs: [
      { id: 'p1', emoji: '💕', label: 'Love' },
      { id: 'p2', emoji: '🌸', label: 'Blossom' },
      { id: 'p3', emoji: '🎀', label: 'Ribbon' },
      { id: 'p4', emoji: '🍓', label: 'Sweet' },
      { id: 'p5', emoji: '🌙', label: 'Moon' },
      { id: 'p6', emoji: '⭐', label: 'Star' },
      { id: 'p7', emoji: '🦋', label: 'Butterfly' },
      { id: 'p8', emoji: '🍀', label: 'Lucky' },
    ],
  },
  notes: {
    id: 'notes',
    title: 'Love Notes',
    desc: 'Sweet words just for you',
    to: 'Nance',
    letter: `ขอบคุณที่อยู่ข้างๆ กันมาตลอด ทุกช่วงเวลาที่ได้อยู่ด้วยกันมันดีงามอย่างบอกไม่ถูก อยากบอกว่าเราโชคดีมากที่ได้มีเธอ 💗\n\nดูแลตัวเองด้วยนะ รักเธอมากๆ อยากอยู่ข้างๆ เธอนานๆ รักเธอมากกว่าที่บอกได้เสมอ 🌸`,
  },
}

export default MENU_DATA
