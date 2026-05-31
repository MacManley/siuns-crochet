import { useState, useEffect } from 'react'
import './App.css'

const IG_URL = 'https://www.instagram.com/siuns_crochet/'

// Paste your Behold feed ID here (from behold.so → your feed → "Feed ID")
const BEHOLD_FEED_ID = '3koebaOnzczRIC905iZY'

const products = [
  { emoji: '🌸', name: 'Flowers', desc: 'Beautiful crocheted blooms; bouquets, corsages, and decorative arrangements that never wilt.', bg: '#FEC8C3' },
  { emoji: '🧸', name: 'Animals', desc: 'Cuddly creatures; from bunnies to frogs and everything in between.', bg: '#f7cc98' },
  { emoji: '🍋', name: 'Food', desc: 'Adorable crocheted food; lemons, mushrooms, cookies, and more. Perfect for play or display.', bg: '#FCF6BD' },
  { emoji: '🐰', name: 'Jellycat Inspired', desc: 'Jellycat-inspired designs that bring the same charm and cuteness to your home.', bg: '#D0F4DE' },
  { emoji: '🎁', name: 'Mystery Boxes', desc: 'Unwrap the surprise with discounted mystery boxes, filled with delightful crocheted treasures!', bg: '#88c0dc' },
  { emoji: '💌', name: 'Custom Orders', desc: "Have something special in mind? Send a message on Instagram and let's make it!", bg: '#d4c1f9' },
]

const PLACEHOLDER_COLOURS = ['#FCF6BD', '#D0F4DE', '#FEC8C3', '#A9DEF9', '#FF99CB', '#E4C1F9']

// Start the fetch immediately at module load — before React even mounts,
// so by the time the user scrolls down the request is already in flight.
const feedPromise = BEHOLD_FEED_ID
  ? fetch(`https://feeds.behold.so/${BEHOLD_FEED_ID}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(data => (Array.isArray(data) ? data : (data.posts ?? [])).slice(0, 6))
  : Promise.resolve(null)

function InstagramFeed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(!!BEHOLD_FEED_ID)
  const [error, setError] = useState(false)

  useEffect(() => {
    feedPromise
      .then(items => {
        if (items === null) { setLoading(false); return }
        setPosts(items)
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  if (error || !BEHOLD_FEED_ID) {
    return (
      <div className="ig-setup-notice">
        <p>
          <strong>Almost there!</strong> Go to{' '}
          <a href="https://behold.so" target="_blank" rel="noopener noreferrer">behold.so</a>,
          connect <strong>@siuns_crochet</strong>, create a feed, then paste
          the Feed ID into <code>BEHOLD_FEED_ID</code> in <code>src/App.jsx</code>.
        </p>
      </div>
    )
  }

  return (
    <div className="ig-feed-grid">
      {loading
        ? PLACEHOLDER_COLOURS.map((bg, i) => (
            <div key={i} className="ig-feed-tile ig-feed-tile--skeleton" style={{ background: bg }} />
          ))
        : posts.map(post => {
            // sizes can be an object of URLs or objects with a url property
            const sizeVal = post.sizes?.medium
            const src = (typeof sizeVal === 'string' ? sizeVal : sizeVal?.url)
              ?? post.mediaUrl
              ?? post.thumbnailUrl
            const caption = post.prunedCaption ?? post.caption ?? ''
            const snippet = caption.length > 90 ? caption.slice(0, 90) + '…' : caption

            return (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="ig-feed-tile"
                aria-label={caption || 'View on Instagram'}
              >
                <img
                  src={src}
                  alt={post.altText || snippet || 'Instagram post'}
                  loading="eager"
                />
                {snippet && (
                  <span className="ig-feed-overlay">
                    <span className="ig-feed-caption">{snippet}</span>
                  </span>
                )}
              </a>
            )
          })
      }
    </div>
  )
}

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
            <img src="./assets/IMG_7760.png" alt="Siun's Crochet logo" className="nav-logo" />
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
          <img src="./assets/IMG_7760.png" alt="Siun's Crochet logo" className="hero-avatar" />
          <h1 className="hero-title">Siun's Crochet</h1>
          <p className="hero-sub">Handmade with love, one stitch at a time.</p>
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
            <img src="./assets/IMG_7599.jpg" alt="Siún" />
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
                <div className="product-img" style={{ background: p.bg }}><span>{p.emoji}</span></div>
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

          <InstagramFeed />

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
