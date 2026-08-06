import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'

type IconName =
  | 'activity'
  | 'apple'
  | 'chart'
  | 'chevron'
  | 'clock'
  | 'compass'
  | 'fingerprint'
  | 'home'
  | 'infinity'
  | 'qr'
  | 'refresh'
  | 'search'
  | 'scan'
  | 'swap'
  | 'wallet'

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.85,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  const paths: Record<IconName, ReactNode> = {
    activity: <><path d="M3 12h4l2.2-6 4.1 12 2.2-6H21" /></>,
    apple: <><path fill="currentColor" stroke="none" d="M16.6 12.9c0-2.3 1.9-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.5-.2-2.9.9-3.7.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3-.5 7.4 1.3 9.8.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s1.9.8 3.3.8c1.4 0 2.3-1.2 3.1-2.5.9-1.4 1.3-2.8 1.3-2.9-.1 0-2.9-1.1-2.9-4.1Z" /><path fill="currentColor" stroke="none" d="M14.3 6.1c.7-.8 1.2-2 1.1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1.1 3 1.1.1 2.2-.6 2.9-1.4Z" /></>,
    chart: <><path d="m4 17 5-5 3 3 7-8" /><path d="M17 7h2v2" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
    clock: <><path d="M5 8.5A8 8 0 1 1 4.4 14" /><path d="M4.5 5.5v4h4" /><path d="M12 8v4l2.7 1.7" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" /></>,
    fingerprint: <><path d="M12 4a7 7 0 0 0-7 7" /><path d="M12 4a7 7 0 0 1 7 7c0 2-.3 4-.8 5.7" /><path d="M12 7a4 4 0 0 0-4 4c0 4.8-1 7.1-2.7 9" /><path d="M12 7a4 4 0 0 1 4 4c0 4.6.8 7.1 2.1 8.8" /><path d="M12 10a1 1 0 0 0-1 1c0 4.2-.4 7.1-1.7 9" /><path d="M13 11c0 3.3.2 5.8 1.2 8" /></>,
    home: <><path fill="currentColor" stroke="none" d="m2.8 10.4 8.1-6.8a1.7 1.7 0 0 1 2.2 0l8.1 6.8a1.4 1.4 0 0 1 .5 1.1v7.3a2.2 2.2 0 0 1-2.2 2.2H4.5a2.2 2.2 0 0 1-2.2-2.2v-7.3a1.4 1.4 0 0 1 .5-1.1Z" /><path d="M10 20.8v-4.6h4v4.6" fill="#37383a" stroke="none" /><path d="M10.9 18.7h2.2" stroke="#fff" strokeWidth="1.05" strokeLinecap="round" /></>,
    infinity: <path d="M7.2 7.5c-2.2 0-3.7 1.7-3.7 4.5s1.5 4.5 3.7 4.5c3 0 6.6-9 9.6-9 2.2 0 3.7 1.7 3.7 4.5s-1.5 4.5-3.7 4.5c-3 0-6.6-9-9.6-9Z" />,
    qr: <><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" /><path d="M14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z" /></>,
    refresh: <><path d="M20 11a8 8 0 0 0-14.7-3L4 10" /><path d="M4 5v5h5" /><path d="M4 13a8 8 0 0 0 14.7 3L20 14" /><path d="M20 19v-5h-5" /></>,
    search: <><circle cx="10.7" cy="10.7" r="6.7" /><path d="m16 16 4.5 4.5" /></>,
    scan: <><path d="M5 9V5a1 1 0 0 1 1-1h4" /><path d="M15 4h3a2 2 0 0 1 2 2v3" /><path d="M20 15v3a2 2 0 0 1-2 2h-3" /><path d="M9 20H6a2 2 0 0 1-2-2v-3" /><path d="M6 12h12" /></>,
    swap: <><path d="M7 7h12l-3-3" /><path d="m17 17H5l3 3" /></>,
    wallet: <><path d="M5 8.2A2.2 2.2 0 0 1 7.2 6H19a1 1 0 0 1 1 1v11.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 4 17.5v-7.1a2.2 2.2 0 0 1 1-2.2Z" /><path d="M4.5 9H18a2 2 0 0 1 2 2v2.5h-4.4a2.5 2.5 0 0 1 0-5H20" /><circle cx="16" cy="11" r=".65" fill="currentColor" /></>,
  }

  return <svg {...common}>{paths[name]}</svg>
}

function WalletGlyph() {
  return <span className="wallet-glyph"><Icon name="wallet" size={24} /></span>
}

function QrBadge() {
  return <span className="action-glyph qr-glyph"><Icon name="qr" size={31} /></span>
}

function BinanceBadge() {
  return <span className="action-glyph binance-glyph"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="m24 4.8 5.6 5.6-5.6 5.6-5.6-5.6L24 4.8ZM11.2 17.6l5.6 5.6-5.6 5.6-5.6-5.6 5.6-5.6ZM36.8 17.6l5.6 5.6-5.6 5.6-5.6-5.6 5.6-5.6ZM24 17.6l7.9 7.9-7.9 7.9-7.9-7.9 7.9-7.9ZM11.2 30.4l5.6 5.6-5.6 5.6-5.6-5.6 5.6-5.6ZM36.8 30.4l5.6 5.6-5.6 5.6-5.6-5.6 5.6-5.6ZM24 30.4l5.6 5.6-5.6 5.6-5.6-5.6 5.6-5.6Z" fill="currentColor" /></svg></span>
}

function CardBadge() {
  return <span className="action-glyph card-glyph"><Icon name="apple" size={22} /><strong>Pay</strong></span>
}

function HyperliquidGlyph() {
  return (
    <span className="hyperliquid-glyph" aria-hidden="true">
      <svg viewBox="0 0 58 42" fill="none">
        <defs>
          <linearGradient id="hyperliquid-blue" x1="8" y1="5" x2="50" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#83f1ff" />
            <stop offset=".45" stopColor="#3274ff" />
            <stop offset="1" stopColor="#6d1cff" />
          </linearGradient>
          <linearGradient id="hyperliquid-pink" x1="10" y1="36" x2="48" y2="7" gradientUnits="userSpaceOnUse">
            <stop stopColor="#153eff" />
            <stop offset=".52" stopColor="#1cc9ff" />
            <stop offset="1" stopColor="#f2fcff" />
          </linearGradient>
        </defs>
        <path d="M7 29.3c3.9-7.6 10.6-14.6 17.8-14.6 6.4 0 8.1 8.7 14.4 8.7 4.3 0 7.6-3.3 11.8-10.2" stroke="url(#hyperliquid-blue)" strokeWidth="7" strokeLinecap="round" />
        <path d="M7 29.3c5.5 4 11.1 6.2 17.1 6.2 7.5 0 9.5-7.7 15.4-7.7 3.7 0 6.4 1.3 9.5 3.2" stroke="url(#hyperliquid-pink)" strokeWidth="5.5" strokeLinecap="round" />
        <circle cx="40.2" cy="9.2" r="7" fill="#d6f6ff" stroke="#5b79ff" strokeWidth="2" />
        <path d="M35.6 10.4c2.3-2.5 5.1-3.1 8.8-2.2" stroke="#2a3a9d" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function MarketsGlyph() {
  return (
    <span className="promo-alt-glyph" aria-hidden="true">
      <svg viewBox="0 0 58 42" fill="none">
        <defs>
          <linearGradient id="markets-blue" x1="8" y1="35" x2="48" y2="7" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6e41ff" />
            <stop offset=".52" stopColor="#32cfff" />
            <stop offset="1" stopColor="#dffbff" />
          </linearGradient>
        </defs>
        <circle cx="29" cy="21" r="16" fill="#252b70" fillOpacity=".72" />
        <path d="m14 28 8-8 6 5 12-13" stroke="url(#markets-blue)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M39 12h5v5" stroke="#dffbff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="28" r="2.6" fill="#7b5cff" />
        <circle cx="40" cy="12" r="2.6" fill="#8eeeff" />
      </svg>
    </span>
  )
}

function PromoGlyph({ kind }: { kind: 'hyperliquid' | 'markets' }) {
  return kind === 'hyperliquid' ? <HyperliquidGlyph /> : <MarketsGlyph />
}

type WalletToken = {
  id: string
  name: string
  symbol: string
  balance: string
  value: string
  kind: 'bitcoin' | 'tether' | 'tron' | 'ethereum' | 'bnb'
}

function TokenMark({ token }: { token: WalletToken }) {
  return (
    <span className={`token-mark ${token.kind}-mark`} aria-hidden="true">
      {token.kind === 'tron' && (
        <svg viewBox="0 0 48 48" fill="none">
          <path d="m9.2 11.1 29.7 4.2-9.1 23.1L9.2 11.1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="m9.2 11.1 14.2 8.2 15.5-4M23.4 19.3l6.4 19.1M9.2 11.1l20.6 27.3" stroke="currentColor" strokeWidth="1.55" strokeLinejoin="round" />
        </svg>
      )}
      {token.kind === 'bitcoin' && <strong>₿</strong>}
      {token.kind === 'tether' && (
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M14 10h20v5.5h-6.8v17.8c0 1.8-1.4 3.2-3.2 3.2s-3.2-1.4-3.2-3.2V15.5H14V10Z" fill="currentColor" />
          <path d="M11.5 17.3c3.2 1.5 7.5 2.3 12.5 2.3s9.3-.8 12.5-2.3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      )}
      {token.kind === 'ethereum' && (
        <svg viewBox="0 0 48 48" fill="none">
          <path d="m24 5 13.2 19.2L24 32 10.8 24.2 24 5Z" fill="#d7e1ff" />
          <path d="m24 5-13.2 19.2L24 32V5Z" fill="#fff" fillOpacity=".34" />
          <path d="m24 34.7 13.2-7.9L24 43 10.8 26.8 24 34.7Z" fill="#c2d1ff" />
          <path d="m24 34.7-13.2-7.9L24 43V34.7Z" fill="#fff" fillOpacity=".36" />
        </svg>
      )}
      {token.kind === 'bnb' && (
        <svg viewBox="0 0 48 48" fill="none">
          <path d="m24 8 4.1 4.1-4.1 4.1-4.1-4.1L24 8ZM14.8 17.2l4.1 4.1-4.1 4.1-4.1-4.1 4.1-4.1ZM33.2 17.2l4.1 4.1-4.1 4.1-4.1-4.1 4.1-4.1ZM24 17.2l7.2 7.2-7.2 7.2-7.2-7.2 7.2-7.2Z" fill="currentColor" />
          <path d="m24 31.6 4.1 4.1-4.1 4.1-4.1-4.1 4.1-4.1Z" fill="currentColor" />
          <path d="m14.8 27.8 4.1 4.1-4.1 4.1-4.1-4.1 4.1-4.1ZM33.2 27.8l4.1 4.1-4.1 4.1-4.1-4.1 4.1-4.1Z" fill="currentColor" />
        </svg>
      )}
    </span>
  )
}

const walletTokens: WalletToken[] = [
  { id: 'tether', name: 'Tether', symbol: 'USDT', balance: '1,013,452.76', value: '$1,013,452.76', kind: 'tether' },
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', balance: '15.42', value: '$1,026,784.32', kind: 'bitcoin' },
  { id: 'tron', name: 'TRON', symbol: 'TRX', balance: '0.000002', value: '$0.0₆541', kind: 'tron' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', balance: '0', value: '$0.00', kind: 'ethereum' },
  { id: 'bnb', name: 'BNB Smart Chain', symbol: 'BNB', balance: '0', value: '$0.00', kind: 'bnb' },
]

const promoSlides: Array<{ title: string; subtitle: string; icon: 'hyperliquid' | 'markets' }> = [
  { title: 'Explore Hyperliquid: 200+ markets live', subtitle: 'Explore now', icon: 'hyperliquid' },
  { title: 'Trade faster with live crypto prices', subtitle: 'Discover markets now', icon: 'markets' },
]

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isHolding, setIsHolding] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)

  useEffect(() => () => {
    if (holdTimer.current) clearTimeout(holdTimer.current)
  }, [])

  const startHold = (event: PointerEvent<HTMLButtonElement>) => {
    if (isUnlocking) return
    event.currentTarget.setPointerCapture?.(event.pointerId)
    setIsHolding(true)
    holdTimer.current = setTimeout(() => {
      setIsUnlocking(true)
      onUnlock()
    }, 500)
  }

  const cancelHold = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current)
    holdTimer.current = null
    if (!isUnlocking) setIsHolding(false)
  }

  return (
    <main className="lock-screen">
      <div className="lock-screen-content">
        <div className="lock-brand"><WalletGlyph /></div>
        <p className="lock-eyebrow">Orbit Wallet</p>
        <h1>Unlock your wallet</h1>
        <p className="lock-caption">Use your fingerprint to continue</p>
        <button
          className={`fingerprint-button${isHolding ? ' holding' : ''}${isUnlocking ? ' unlocking' : ''}`}
          onPointerDown={startHold}
          onPointerUp={cancelHold}
          onPointerCancel={cancelHold}
          onPointerLeave={cancelHold}
          disabled={isUnlocking}
          aria-label="Hold to unlock with fingerprint"
        >
          <Icon name="fingerprint" size={68} />
        </button>
        <span className="lock-hint">Tap to unlock</span>
      </div>
      <span className="lock-footer"><Icon name="wallet" size={14} /> Your wallet is secured locally</span>
    </main>
  )
}

function App() {
  const [isLocked, setIsLocked] = useState(true)
  const [promoIndex, setPromoIndex] = useState(0)

  useEffect(() => {
    const promoTimer = window.setInterval(() => {
      setPromoIndex((currentIndex) => (currentIndex + 1) % promoSlides.length)
    }, 2000)

    return () => window.clearInterval(promoTimer)
  }, [])

  if (isLocked) return <LockScreen onUnlock={() => setIsLocked(false)} />

  return (
    <main className="app-shell">
      <div className="wallet-app">
        <header className="wallet-header">
          <div className="wallet-chip">
            <WalletGlyph />
            <div className="wallet-chip-copy"><strong>Morse</strong></div>
          </div>
          <div className="header-actions">
            <button className="round-button" aria-label="Transaction history"><Icon name="clock" size={22} /></button>
            <button className="round-button" aria-label="Scan QR code"><Icon name="scan" size={22} /></button>
          </div>
        </header>

        <section className="limit-banner" aria-label="Wallet promotions">
          <div className="banner-indicators" aria-hidden="true">
            {promoSlides.map((slide, index) => (
              <span className={`banner-indicator${index === promoIndex ? ' active' : ''}`} key={slide.title} />
            ))}
          </div>
          <div className="promo-slide-viewport">
            <div className="promo-slide-track" style={{ transform: `translateY(-${promoIndex * 100}%)` }}>
              {promoSlides.map((slide) => (
                <div className="promo-slide" key={slide.title}>
                  <PromoGlyph kind={slide.icon} />
                  <div className="promo-copy">
                    <strong>{slide.title}</strong>
                    <span>{slide.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="start-section">
          <h1>Get started by adding some<br />crypto</h1>
          <div className="start-actions">
            <button className="start-action"><QrBadge /><span>Receive<br />crypto</span></button>
            <button className="start-action"><BinanceBadge /><span>Deposit from<br />Binance</span></button>
            <button className="start-action"><CardBadge /><span>Buy with<br />Apple Pay</span></button>
          </div>
        </section>

        <section className="token-section">
          <h2>Tokens <Icon name="chevron" size={25} /></h2>
          <div className="token-list">
            {walletTokens.map((token) => (
              <div className="token-row" key={token.id}>
                <div className="token-leading"><TokenMark token={token} /><div className="token-copy"><strong>{token.name}</strong><span>{token.balance} {token.symbol}</span></div></div>
                <div className="token-price"><strong>{token.value}</strong><span>$0.00</span></div>
              </div>
            ))}
          </div>
          <button className="view-all-button">View all <Icon name="chevron" size={24} /></button>
        </section>

        <section className="perps-section">
          <h2>Perps <Icon name="chevron" size={25} /></h2>
          <div className="perps-preview"><span className="perps-coin">B</span><div><strong>Bitcoin Perpetual</strong><span>BTC-PERP</span></div><strong className="perps-value">$64,634.71</strong></div>
        </section>

        <nav className="bottom-dock" aria-label="Main navigation">
          <div className="nav-pill">
            <button className="nav-item active"><Icon name="home" size={22} /></button>
            <button className="nav-item"><Icon name="chart" size={22} /></button>
            <button className="nav-item"><Icon name="infinity" size={23} /></button>
            <button className="nav-item"><Icon name="compass" size={22} /></button>
          </div>
          <button className="nav-search" aria-label="Search"><Icon name="search" size={27} /></button>
        </nav>
      </div>
    </main>
  )
}

export default App
