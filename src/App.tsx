import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'

type IconName =
  | 'activity'
  | 'chart'
  | 'chevron'
  | 'clock'
  | 'compass'
  | 'fingerprint'
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
    chart: <><path d="m4 17 5-5 3 3 7-8" /><path d="M17 7h2v2" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
    clock: <><path d="M5 8.5A8 8 0 1 1 4.4 14" /><path d="M4.5 5.5v4h4" /><path d="M12 8v4l2.7 1.7" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" /></>,
    fingerprint: <><path d="M12 4a7 7 0 0 0-7 7" /><path d="M12 4a7 7 0 0 1 7 7c0 2-.3 4-.8 5.7" /><path d="M12 7a4 4 0 0 0-4 4c0 4.8-1 7.1-2.7 9" /><path d="M12 7a4 4 0 0 1 4 4c0 4.6.8 7.1 2.1 8.8" /><path d="M12 10a1 1 0 0 0-1 1c0 4.2-.4 7.1-1.7 9" /><path d="M13 11c0 3.3.2 5.8 1.2 8" /></>,
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
  return <span className="action-glyph binance-glyph"><img src="https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png" alt="" /></span>
}

function CardBadge() {
  return <span className="action-glyph card-glyph"><strong>VISA</strong><span className="card-circles"><i /><i /></span></span>
}

type MarketAsset = {
  id: string
  name: string
  kind: 'bitcoin' | 'ethereum' | 'bnb'
  icon: string
  price: string
  change: string
}

function AssetMark({ asset }: { asset: MarketAsset }) {
  return <span className={`token-mark ${asset.kind}-mark`}><img src={asset.icon} alt="" /><span>{asset.kind === 'ethereum' ? 'E' : 'B'}</span></span>
}

const referenceAssets: MarketAsset[] = [
  { id: 'bitcoin', name: 'Bitcoin', kind: 'bitcoin', icon: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', price: '$64,634.71', change: '+0.71%' },
  { id: 'ethereum', name: 'Ethereum', kind: 'ethereum', icon: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', price: '$1,906.66', change: '+1.88%' },
  { id: 'binancecoin', name: 'BNB Smart Chain', kind: 'bnb', icon: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png', price: '$595.28', change: '+0.33%' },
]

const livePriceUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cbinancecoin&order=market_cap_desc&per_page=3&page=1&sparkline=false'

function formatUsd(value: number) {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

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
  const [assets, setAssets] = useState(referenceAssets)

  useEffect(() => {
    const liveMode = new URLSearchParams(window.location.search).get('live') === '1'
    if (!liveMode) return

    const controller = new AbortController()
    fetch(livePriceUrl, { signal: controller.signal })
      .then((response) => response.ok ? response.json() as Promise<Array<{ id: string; current_price: number; price_change_percentage_24h: number | null }>> : Promise.reject(new Error('Price request failed')))
      .then((liveAssets) => {
        setAssets((currentAssets) => currentAssets.map((asset) => {
          const liveAsset = liveAssets.find((item) => item.id === asset.id)
          if (!liveAsset) return asset
          const change = liveAsset.price_change_percentage_24h ?? 0
          return { ...asset, price: formatUsd(liveAsset.current_price), change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` }
        }))
      })
      .catch(() => undefined)

    return () => controller.abort()
  }, [])

  if (isLocked) return <LockScreen onUnlock={() => setIsLocked(false)} />

  return (
    <main className="app-shell">
      <div className="wallet-app">
        <header className="wallet-header">
          <div className="wallet-chip">
            <WalletGlyph />
            <div className="wallet-chip-copy"><strong>Main Wallet 1</strong><span>$1,000.00</span></div>
          </div>
          <div className="header-actions">
            <button className="round-button" aria-label="Transaction history"><Icon name="clock" size={22} /></button>
            <button className="round-button" aria-label="Scan QR code"><Icon name="scan" size={22} /></button>
          </div>
        </header>

        <section className="limit-banner">
          <span className="banner-accent" />
          <span className="banner-icon"><Icon name="refresh" size={25} /></span>
          <div><strong>Set a price. Swap automatically</strong><span>Try Limit Orders</span></div>
        </section>

        <section className="start-section">
          <h1>Get started by adding some<br />crypto</h1>
          <div className="start-actions">
            <button className="start-action"><QrBadge /><span>Receive<br />crypto</span></button>
            <button className="start-action"><BinanceBadge /><span>Deposit from<br />Binance</span></button>
            <button className="start-action"><CardBadge /><span>Buy with<br />Cards</span></button>
          </div>
        </section>

        <section className="token-section">
          <h2>Explore tokens <Icon name="chevron" size={25} /></h2>
          <div className="token-list">
            {assets.map((asset) => (
              <div className="token-row" key={asset.name}>
                <div className="token-leading"><AssetMark asset={asset} /><strong>{asset.name}</strong></div>
                <div className="token-price"><strong>{asset.price}</strong><span>{asset.change}</span></div>
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
            <button className="nav-item active"><Icon name="wallet" size={22} /></button>
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
