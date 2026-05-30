import './App.css'

const IG_URL = 'https://www.instagram.com/siuns_crochet/'

const products = [
  { emoji: '🌸', name: 'Flowers', desc: 'Beautiful crocheted blooms — bouquets, corsages, and decorative arrangements that never wilt.', bg: '#FEC8C3' },
  { emoji: '🧸', name: 'Animals', desc: 'Cuddly creatures — from bunnies to frogs and everything in between.', bg: '#FCF6BD' },
  { emoji: '🍓', name: 'Food', desc: 'Adorable crocheted food — lemons, mushrooms, cookies, and more. Perfect for play or display.', bg: '#D0F4DE' },
  { emoji: '💌', name: 'Custom Orders', desc: 'Have something special in mind? Send a message on Instagram and let\'s make it!', bg: '#E4C1F9' },
]

const igTiles = [
  { bg: '#FCF6BD', emoji: '🌼' },
  { bg: '#D0F4DE', emoji: '🧸' },
  { bg: '#FEC8C3', emoji: '🎀' },
  { bg: '#A9DEF9', emoji: '🧶' },
  { bg: '#FF99CB', emoji: '🌸' },
  { bg: '#E4C1F9', emoji: '👜' },
]

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function App() {
  return (
    <>
      {/* ── Nav ── */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-brand">
            <img src="/IMG_7760.jpeg" alt="Siun's Crochet logo" className="nav-logo" />
            <span className="nav-name">Siun's Crochet</span>
          </a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#shop">Shop</a></li>
            <li><a href={IG_URL} target="_blank" rel="noopener noreferrer" className="nav-ig">Instagram ↗</a></li>
          </ul>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-inner">
          <img src="/IMG_7760.jpeg" alt="" className="hero-avatar" />
          <h1 className="hero-title">Siun's Crochet</h1>
          <p className="hero-sub">
            Handmade with love, one stitch at a time.
          </p>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="hero-cta">
            <InstagramIcon />
            Shop on Instagram
          </a>
        </div>
      </section>

      {/* ── About ── */}
      <section className="section about" id="about">
        <div className="about-inner">
          <div className="about-img-wrap">
            <img src="/IMG_7599.jpeg" alt="Siun crocheting" />
          </div>
          <div className="about-text">
            <p className="section-label">About</p>
            <h2 className="section-title">Hi, I'm Siun 👋</h2>
            <p className="about-body">
              I'm a crochet artist based in Ireland with a passion for making
              adorable handmade pieces. Every item I create is made with care
              and attention to detail.
            </p>
            <p className="about-body">
              Whether you're looking for a unique gift, a cosy accessory, or a
              custom piece, I'd love to make something special for you. Reach
              out on Instagram to place an order or ask any questions!
            </p>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="hero-cta" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
              <InstagramIcon />
              @siuns_crochet
            </a>
          </div>
        </div>
      </section>

      {/* ── Shop ── */}
      <section className="section products" id="shop">
        <div className="section-inner">
          <p className="section-label">Shop</p>
          <h2 className="section-title">What I make</h2>
          <div className="products-grid">
            {products.map((p) => (
              <a key={p.name} href={IG_URL} target="_blank" rel="noopener noreferrer" className="product-card">
                <div className="product-img" style={{ background: p.bg }}>{p.emoji}</div>
                <div className="product-info">
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-desc">{p.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instagram ── */}
      <section className="section instagram" id="instagram">
        <div className="instagram-inner">
          <p className="section-label">Follow along</p>
          <h2 className="instagram-handle">@siuns_crochet</h2>
          <p className="instagram-body">
            See my latest makes, works-in-progress, and behind-the-scenes
            on Instagram. Orders are taken through DMs!
          </p>

          {/* Placeholder grid — connect a real feed via behold.so or similar */}
          <div className="instagram-grid">
            {igTiles.map((tile, i) => (
              <a key={i} href={IG_URL} target="_blank" rel="noopener noreferrer" className="ig-tile" style={{ background: tile.bg }}>
                <span>{tile.emoji}</span>
                <span className="ig-tile-overlay">View post ↗</span>
              </a>
            ))}
          </div>

          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="instagram-btn">
            <InstagramIcon />
            Follow on Instagram
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-brand">Siun's Crochet</div>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#shop">Shop</a>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Siun's Crochet. Made with 🧶 and love.</p>
        <p className="footer-credit">Site by <a href="https://nathanmanley.me" target="_blank" rel="noopener noreferrer">Nathan</a></p>
      </footer>
    </>
  )
}
