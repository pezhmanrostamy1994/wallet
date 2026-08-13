import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { RiDownload2Line, RiFingerprint2Line, RiSparkling2Line } from 'react-icons/ri'

type IconName =
  | 'activity'
  | 'apple'
  | 'chart'
  | 'chevron'
  | 'clock'
  | 'close'
  | 'compass'
  | 'fingerprint'
  | 'home'
  | 'infinity'
  | 'qr'
  | 'refresh'
  | 'search'
  | 'scan'
  | 'settings'
  | 'star'
  | 'swap'
  | 'wallet'

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero'

const ICON_SIZES: Record<IconSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  hero: 64,
}

function Icon({ name, size = 'md' }: { name: IconName; size?: IconSize | number }) {
  const pixelSize = typeof size === 'number' ? size : ICON_SIZES[size]
  const normalizedSize: IconSize = typeof size === 'number'
    ? size <= 16 ? 'xs' : size <= 22 ? 'sm' : size <= 26 ? 'md' : size <= 31 ? 'lg' : size <= 40 ? 'xl' : 'hero'
    : size
  const common = {
    className: `app-icon app-icon-${normalizedSize}`,
    width: pixelSize,
    height: pixelSize,
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
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" /></>,
    fingerprint: <><path d="M12 3a9 9 0 0 0-9 9" /><path d="M12 3a9 9 0 0 1 9 9c0 3.2-.6 6.2-1.6 9" /><path d="M12 5.5A6.5 6.5 0 0 0 5.5 12c0 4-.7 7-2 9" /><path d="M12 5.5a6.5 6.5 0 0 1 6.5 6.5c0 3.5-.5 6.7-1.4 9" /><path d="M12 8a4 4 0 0 0-4 4c0 4.8-.5 7.6-1.5 10" /><path d="M12 8a4 4 0 0 1 4 4c0 2.9-.2 5.5-.7 7.8" /><path d="M12 10.5A1.5 1.5 0 0 0 10.5 12c0 3.4-.2 6.1-.8 8.5" /><path d="M12 10.5c.8 0 1.5.7 1.5 1.5 0 2.3.1 4.3.4 6.1" /></>,
    home: <><path fill="currentColor" stroke="none" d="m2.8 10.4 8.1-6.8a1.7 1.7 0 0 1 2.2 0l8.1 6.8a1.4 1.4 0 0 1 .5 1.1v7.3a2.2 2.2 0 0 1-2.2 2.2H4.5a2.2 2.2 0 0 1-2.2-2.2v-7.3a1.4 1.4 0 0 1 .5-1.1Z" /><path d="M10 20.8v-4.6h4v4.6" fill="#37383a" stroke="none" /><path d="M10.9 18.7h2.2" stroke="#fff" strokeWidth="1.05" strokeLinecap="round" /></>,
    infinity: <path d="M7.2 7.5c-2.2 0-3.7 1.7-3.7 4.5s1.5 4.5 3.7 4.5c3 0 6.6-9 9.6-9 2.2 0 3.7 1.7 3.7 4.5s-1.5 4.5-3.7 4.5c-3 0-6.6-9-9.6-9Z" />,
    qr: <><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" /><path d="M14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z" /></>,
    refresh: <><path d="M20 11a8 8 0 0 0-14.7-3L4 10" /><path d="M4 5v5h5" /><path d="M4 13a8 8 0 0 0 14.7 3L20 14" /><path d="M20 19v-5h-5" /></>,
    search: <><circle cx="10.7" cy="10.7" r="6.7" /><path d="m16 16 4.5 4.5" /></>,
    scan: <><path d="M5 9V5a1 1 0 0 1 1-1h4" /><path d="M15 4h3a2 2 0 0 1 2 2v3" /><path d="M20 15v3a2 2 0 0 1-2 2h-3" /><path d="M9 20H6a2 2 0 0 1-2-2v-3" /><path d="M6 12h12" /></>,
    settings: <path fill="currentColor" fillRule="evenodd" stroke="none" d="M19.43 12.98c.04-.32.06-.65.06-.98s-.02-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.37-.31-.6-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.49.49 0 0 0 14 2h-4a.49.49 0 0 0-.49.42L9.13 5.07c-.61.25-1.18.59-1.69.98l-2.49-1c-.23-.08-.48 0-.6.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.08.65-.08.98s.03.66.08.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.37.31.6.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.49.42h4c.24 0 .45-.18.49-.42l.38-2.65c.61-.25 1.18-.59 1.69-.98l2.49 1c.23.08.48 0 .6-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.1-1.65ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z" />,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" fill="currentColor" stroke="none" />,
    swap: <><path d="M7 7h12l-3-3" /><path d="m17 17H5l3 3" /></>,
    wallet: <><path d="M5 8.2A2.2 2.2 0 0 1 7.2 6H19a1 1 0 0 1 1 1v11.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 4 17.5v-7.1a2.2 2.2 0 0 1 1-2.2Z" /><path d="M4.5 9H18a2 2 0 0 1 2 2v2.5h-4.4a2.5 2.5 0 0 1 0-5H20" /><circle cx="16" cy="11" r=".65" fill="currentColor" /></>,
  }

  return <svg {...common}>{paths[name]}</svg>
}

function WalletGlyph() {
  return <span className="wallet-glyph" aria-hidden="true"><img src="/trust-wallet-icon.webp" alt="" /></span>
}

function TrustWalletBadge() {
  return <span className="trust-wallet-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="M24 5 39 11v11c0 10-6.3 17-15 21C15.3 39 9 32 9 22V11L24 5Z" fill="#fff" /><path d="M24 5v38C15.3 39 9 32 9 22V11L24 5Z" fill="#1111e8" /><path d="M24 5 39 11v11c0 10-6.3 17-15 21C15.3 39 9 32 9 22V11L24 5Z" stroke="#cfd9ea" strokeWidth="1.5" strokeLinejoin="round" /></svg></span>
}

function TrustWalletGreenMark() {
  return <span className="auth-trust-mark" aria-hidden="true"><img src="/trust-wallet-icon.webp" alt="" /></span>
}

function BackArrowIcon() {
  return <svg className="back-arrow-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M26 16H6M6 16l8-8M6 16l8 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function PasscodeFingerprintIcon() {
  return <svg className="passcode-fingerprint" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 4.5A11.5 11.5 0 0 0 4.5 16" /><path d="M16 4.5A11.5 11.5 0 0 1 27.5 16c0 4.1-.7 8.2-2 11.5" /><path d="M16 8A8 8 0 0 0 8 16c0 5.2-.7 9.2-1.8 12" /><path d="M16 8a8 8 0 0 1 8 8c0 3.8-.4 7.1-1.3 10" /><path d="M16 11.5a4.5 4.5 0 0 0-4.5 4.5c0 5.4-.3 9.1-1 12" /><path d="M16 11.5a4.5 4.5 0 0 1 4.5 4.5c0 3.8-.2 7-.7 10.2" /><path d="M16 15a1 1 0 0 0-1 1c0 5-.2 8.8-.6 12" /></svg>
}

function PasscodeFingerprintImage({ className = '' }: { className?: string }) {
  return <span className={`passcode-fingerprint-image ${className}`} aria-hidden="true" />
}

function WalletSettingsIcon() {
  return <svg className="wallet-settings-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill="currentColor" d="M19.43 12.98c.04-.32.07-.65.07-.98s-.03-.66-.08-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a7.7 7.7 0 0 0-1.69-.98l-.38-2.65A.49.49 0 0 0 14 2h-4a.49.49 0 0 0-.49.42l-.38 2.65c-.61.25-1.18.58-1.69.98l-2.49-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.64l2.11 1.65c-.05.32-.08.65-.08.98s.03.66.08.98l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .6.22l2.49-1c.51.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.49.42h4c.24 0 .45-.18.49-.42l.38-2.65c.61-.25 1.18-.58 1.69-.98l2.49 1a.5.5 0 0 0 .6-.22l2-3.46a.5.5 0 0 0-.12-.64l-2.1-1.65ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z" /></svg>
}

type SettingsMenuIconName = 'moon' | 'address-book' | 'extension' | 'handle' | 'scan' | 'wallet-connect' | 'preferences' | 'security' | 'notifications' | 'support' | 'about' | 'x' | 'telegram' | 'facebook' | 'reddit' | 'youtube' | 'instagram' | 'tiktok'

function SettingsMenuIcon({ name }: { name: SettingsMenuIconName }) {
  let glyph: ReactNode

  switch (name) {
    case 'moon': glyph = <path d="M20.7 18.2A10.1 10.1 0 0 1 9.8 4.1 10.2 10.2 0 1 0 20.7 18.2Z" />; break
    case 'address-book': glyph = <><path d="M7 5.5h13.5v17H7z" /><path d="M7 8H4.5m2.5 4H4.5m2.5 4H4.5m2.5 4H4.5M11 10h6m-6 4h6m-6 4h4" /></>; break
    case 'extension': glyph = <><rect x="4" y="4" width="6.5" height="6.5" rx=".8" /><rect x="17.5" y="4" width="6.5" height="6.5" rx=".8" /><rect x="4" y="17.5" width="6.5" height="6.5" rx=".8" /><path d="M18 18h2.2m1.8 0h.1M18 21.5h.1m3.9 0H24M20 20h.1" strokeLinecap="round" /></>; break
    case 'handle': glyph = <><path d="M19.5 13.2v2.1a5.5 5.5 0 1 1-1.8-4.1" /><path d="M19.5 10.2v3h-4.1" /><circle cx="12" cy="13.5" r="3.2" /></>; break
    case 'scan': glyph = <><path d="M9.5 4.5H5.2v4.3m0 10.4v4.3h4.3m9.3 0h4.3v-4.3m0-10.4V4.5h-4.3" /><path d="M10 14h8" strokeLinecap="round" /></>; break
    case 'wallet-connect': glyph = <><path d="m9.1 17.2 3.1-3.1a3.5 3.5 0 0 1 5 5l-2.1 2.1a3.5 3.5 0 0 1-5 0" /><path d="m18.9 10.8-3.1 3.1a3.5 3.5 0 0 1-5-5l2.1-2.1a3.5 3.5 0 0 1 5 0" /></>; break
    case 'preferences': glyph = <path d="M21.6 14.1c.1-.4.1-.8.1-1.1s0-.8-.1-1.2l2-1.5-2.1-3.6-2.3.9c-.6-.5-1.2-.8-1.9-1.1L17 4h-4l-.4 2.5c-.7.3-1.3.6-1.9 1.1l-2.3-.9-2.1 3.6 2 1.5c-.1.4-.1.8-.1 1.2s0 .7.1 1.1l-2 1.6 2.1 3.6 2.3-.9c.6.5 1.2.8 1.9 1.1L13 22h4l.4-2.5c.7-.3 1.3-.6 1.9-1.1l2.3.9 2.1-3.6-2-1.6ZM15 13a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" fill="currentColor" stroke="none" />; break
    case 'security': glyph = <><rect x="5.5" y="12" width="17" height="11" rx="2" /><path d="M9 12V9a5 5 0 0 1 10 0v3m-8.3 5.5h6.6m-6.6 2.5h6.6" /></>; break
    case 'notifications': glyph = <><path d="M6.3 18.3h15.4l-2.1-3v-4.1a5.6 5.6 0 1 0-11.2 0v4.1l-2.1 3Z" /><path d="M11.3 22h3.4" strokeLinecap="round" /></>; break
    case 'support': glyph = <><path d="M5 14v-1a9 9 0 0 1 18 0v1" /><path d="M5 14v3.5a2 2 0 0 0 2 2h1.5v-6H7a2 2 0 0 0-2 2.5Zm18 0v3.5a2 2 0 0 1-2 2h-1.5v-6H21a2 2 0 0 1 2 2.5Z" /><path d="M19.5 20.5c0 1.6-1.2 2.5-3.3 2.5h-1" strokeLinecap="round" /></>; break
    case 'about': glyph = <><path d="M14 3.7 22 7v5.8c0 5.2-3.5 8.7-8 10.5-4.5-1.8-8-5.3-8-10.5V7l8-3.3Z" /><path d="m10.2 13.1 2.4 2.4 5.2-5.3" strokeLinecap="round" strokeLinejoin="round" /></>; break
    case 'x': glyph = <><rect x="4" y="4" width="20" height="20" rx="3" /><path d="m9 9 10 10m0-10L9 19" strokeLinecap="round" /></>; break
    case 'telegram': glyph = <><rect x="4" y="4" width="20" height="20" rx="3" /><path d="m8 11 12-3.5-3.8 12-3.2-4.2L8 11Zm5.2 4.3 2.2-2.3" strokeLinecap="round" strokeLinejoin="round" /></>; break
    case 'facebook': glyph = <><rect x="4" y="4" width="20" height="20" rx="3" /><path d="M16.7 10h-2c-.8 0-1.2.4-1.2 1.2V14h3l-.4 2.7h-2.6V22h-3v-5.3H8V14h2.5v-3.1c0-2.4 1.4-3.9 3.8-3.9h2.4V10Z" fill="currentColor" stroke="none" /></>; break
    case 'reddit': glyph = <><rect x="4" y="4" width="20" height="20" rx="3" /><path d="M8.5 14.1c0 2.3 2.5 4.2 5.5 4.2s5.5-1.9 5.5-4.2S17 10 14 10s-5.5 1.8-5.5 4.1Z" /><path d="m15.5 9.9.7-3.2 2.2.5m-7.2 7.4h.1m5.4 0h.1m-5 1.9c1.2.8 3.2.8 4.4 0" strokeLinecap="round" /><circle cx="19.2" cy="7.5" r="1.1" /></>; break
    case 'youtube': glyph = <><rect x="3.8" y="6.2" width="20.4" height="15.6" rx="3.5" /><path d="m12 11 5 3-5 3v-6Z" fill="currentColor" stroke="none" /></>; break
    case 'instagram': glyph = <><rect x="4" y="4" width="20" height="20" rx="4" /><circle cx="14" cy="14" r="4.2" /><circle cx="19.2" cy="8.8" r="1" fill="currentColor" stroke="none" /></>; break
    case 'tiktok': glyph = <><rect x="4" y="4" width="20" height="20" rx="3" /><path d="M16.6 8v7a3.2 3.2 0 1 1-2.1-3v-1.6c1.1.9 2.3 1.3 3.5 1.3" strokeLinecap="round" strokeLinejoin="round" /></>; break
  }

  return <svg className="settings-row-icon" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{glyph}</svg>
}

function ExtensionQrIcon() {
  return <svg className="extension-qr-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="3.5" width="7" height="7" rx="1" /><rect x="17.5" y="3.5" width="7" height="7" rx="1" /><rect x="3.5" y="17.5" width="7" height="7" rx="1" /></g><g fill="currentColor"><circle cx="19" cy="19" r="1.35" /><circle cx="22.5" cy="19" r="1.35" /><circle cx="20.75" cy="20.75" r="1.35" /><circle cx="19" cy="22.5" r="1.35" /><circle cx="22.5" cy="22.5" r="1.35" /></g></svg>
}

function QrBadge() {
  return <span className="action-glyph qr-glyph"><Icon name="qr" size="lg" /></span>
}

function McapBadge() {
  return <span className="action-glyph binance-glyph" aria-hidden="true">
    <svg viewBox="0 0 48 48" fill="none">
      <path d="m24 5.5 5.5 5.5-5.5 5.5-5.5-5.5L24 5.5Z" fill="currentColor" />
      <path d="m13 16.5 5.5 5.5-5.5 5.5L7.5 22l5.5-5.5Z" fill="currentColor" />
      <path d="m35 16.5 5.5 5.5-5.5 5.5-5.5-5.5 5.5-5.5Z" fill="currentColor" />
      <path d="m24 16.5 5.5 5.5-5.5 5.5-5.5-5.5 5.5-5.5Z" fill="currentColor" />
      <path d="m24 27.5 5.5 5.5-5.5 5.5-5.5-5.5 5.5-5.5Z" fill="currentColor" />
    </svg>
  </span>
}

function CardBadge() {
  return <span className="action-glyph card-glyph" aria-hidden="true">
    <svg viewBox="0 0 64 36" fill="none">
      <text x="32" y="14" textAnchor="middle" fill="#263b9f" fontFamily="Arial, sans-serif" fontSize="12" fontStyle="italic" fontWeight="700">VISA</text>
      <circle cx="27" cy="24" r="7" fill="#eb001b" />
      <circle cx="37" cy="24" r="7" fill="#f79e1b" />
      <path d="M32 18.5a7 7 0 0 0 0 11" fill="#ff5f00" />
    </svg>
  </span>
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
  cmcId?: number
  balance: string
  value: string
  kind: 'bitcoin' | 'tether' | 'tron' | 'ethereum' | 'bnb'
}

function LegacyTokenMark({ token }: { token: WalletToken }) {
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

const walletTokenCmcIds: Record<string, number> = { USDT: 825, BTC: 1, TRX: 1958, ETH: 1027, BNB: 1839 }

function TokenMark({ token }: { token: WalletToken }) {
  const cmcId = token.cmcId ?? walletTokenCmcIds[token.symbol]
  return <span className={`token-mark ${token.kind}-mark`} aria-hidden="true"><img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${cmcId}.png`} alt="" onError={(event) => { event.currentTarget.style.display = 'none' }} /><strong>{token.symbol === 'BTC' ? '₿' : token.symbol === 'ETH' ? '◆' : token.symbol.slice(0, 1)}</strong></span>
}

function PerpsVenueBadge() {
  return <span className="perps-venue-badge" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 8.2c0-1.7 1.1-2.8 2.7-2.8 2.2 0 4.2 6.2 6.4 6.2 1.6 0 2.7-1.1 2.7-2.8M5 15.8c0 1.7 1.1 2.8 2.7 2.8 2.2 0 4.2-6.2 6.4-6.2 1.6 0 2.7 1.1 2.7 2.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg></span>
}

function SolanaEarnMark() {
  return <span className="earn-mark solana-earn-mark" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" fill="#050505" /><path d="M17 23h31l-7 6H10l7-6ZM25 31h31l-7 6H18l7-6ZM17 39h31l-7 6H10l7-6Z" fill="url(#solana-earn-gradient)" /><defs><linearGradient id="solana-earn-gradient" x1="14" y1="44" x2="49" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#8b5cf6" /><stop offset=".5" stopColor="#00d9ff" /><stop offset="1" stopColor="#37f3a5" /></linearGradient></defs></svg></span>
}

function JunoEarnMark() {
  return <span className="earn-mark juno-earn-mark" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="27" fill="#171719" stroke="#ff7780" strokeWidth="2" /><circle cx="32" cy="32" r="22" stroke="#ff7780" strokeWidth="1.4" /><path d="M32 17v30M24 25h16M27 20l5-5 5 5M25 38l7-7 7 7" stroke="#ff7780" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
}

function AiSparkle() {
  return <span className="ai-sparkle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="m8 2 1.7 5.3L15 9l-5.3 1.7L8 16l-1.7-5.3L1 9l5.3-1.7L8 2ZM18 11l.9 3.1L22 15l-3.1.9L18 19l-.9-3.1L14 15l3.1-.9L18 11Z" /></svg></span>
}

const walletTokens: WalletToken[] = [
  { id: 'tether', name: 'Tether', symbol: 'USDT', cmcId: 825, balance: '1,013,452.76', value: '$1,013,452.76', kind: 'tether' },
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', cmcId: 1, balance: '15.42', value: '$1,026,784.32', kind: 'bitcoin' },
  { id: 'tron', name: 'TRON', symbol: 'TRX', balance: '0.000002', value: '$0.0₆541', kind: 'tron' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', cmcId: 1027, balance: '0', value: '$0.00', kind: 'ethereum' },
  { id: 'bnb', name: 'BNB Smart Chain', symbol: 'BNB', cmcId: 1839, balance: '0', value: '$0.00', kind: 'bnb' },
]

const screenshotWatchlist = [
  { token: walletTokens[3], value: '$1,893.85' },
  { token: walletTokens[1], value: '$63,701.45' },
  { token: walletTokens[4], value: '$604.54' },
]

const promoSlides: Array<{ title: string; subtitle: string; icon: 'hyperliquid' | 'markets' }> = [
  { title: 'Explore Hyperliquid: 200+ markets live', subtitle: 'Explore now', icon: 'hyperliquid' },
  { title: 'Trade faster with live crypto prices', subtitle: 'Discover markets now', icon: 'markets' },
]

type MarketAsset = {
  symbol: string
  base: string
  name: string
  cmcId: number
  color: string
  price: number | null
  change24h: number | null
  volume24h?: number | null
  logoUrl?: string
  points?: number[]
}

const preferredSymbols = ['ETH', 'BNB', 'SOL', 'BTC', 'XRP', 'ADA', 'DOGE', 'TRX', 'AVAX', 'LINK']
const symbolColors: Record<string, string> = {
  ETH: '#7c8cff', BNB: '#f3bd24', SOL: '#6e6cff', BTC: '#f7931a', XRP: '#66717a',
  ADA: '#3365d4', DOGE: '#c2a633', TRX: '#e84142', AVAX: '#e84142', LINK: '#2a5ada',
}

const cmcApiBase = '/api/cmc'
const chartCachePrefix = 'orbit-cmc-chart-v1:'
const cmcPersistentCachePrefix = 'orbit-cmc-response-v1:'
const marketListingsPath = '/v1/cryptocurrency/listings/latest?start=1&limit=250&convert=USD'
const walletTokenQuotesPath = '/v2/cryptocurrency/quotes/latest?symbol=USDT,BTC,TRX,ETH,BNB&convert=USD'
const chartCacheTtl = 5 * 60 * 1000
const chartRequests = new Map<string, Promise<number[]>>()
const cmcRequestCache = new Map<string, { expiresAt: number; value: unknown }>()
const cmcInFlight = new Map<string, Promise<unknown>>()
const cmcRequestTimes: number[] = []
let cmcRateQueue = Promise.resolve()
const cmcMinuteRateLimit = 50
const cmcResponseCacheTtl = 1_500

type CmcQuote = { price?: number; percent_change_24h?: number; volume_24h?: number }
type CmcListing = { id: number; name: string; symbol: string; quote?: { USD?: CmcQuote } }
type CmcHistoricalQuote = { quote?: { USD?: { price?: number } } }
type CmcHistoricalAsset = { quotes?: CmcHistoricalQuote[] }
type CmcLatestAsset = { quote?: { USD?: CmcQuote } }
type PersistentCmcCache<T> = { savedAt: number; value: T }

function readPersistentCmc<T>(path: string): PersistentCmcCache<T> | null {
  try {
    const raw = window.localStorage.getItem(`${cmcPersistentCachePrefix}${path}`)
    if (!raw) return null
    const cached = JSON.parse(raw) as PersistentCmcCache<T>
    return typeof cached.savedAt === 'number' && cached.value ? cached : null
  } catch {
    return null
  }
}

function writePersistentCmc<T>(path: string, value: T) {
  try {
    window.localStorage.setItem(`${cmcPersistentCachePrefix}${path}`, JSON.stringify({ savedAt: Date.now(), value }))
  } catch {
    // Storage can be unavailable or full; the in-memory cache still protects the session.
  }
}

function shouldPersistCmc(path: string) {
  return path.startsWith('/v1/cryptocurrency/listings/latest') || path.startsWith('/v2/cryptocurrency/quotes/latest')
}

async function cmcFetch<T>(path: string) {
  const now = Date.now()
  const cached = cmcRequestCache.get(path)
  if (cached && cached.expiresAt > now) return cached.value as T

  const activeRequest = cmcInFlight.get(path)
  if (activeRequest) return activeRequest as Promise<T>

  const request = new Promise<T>((resolve, reject) => {
    cmcRateQueue = cmcRateQueue.then(async () => {
      try {
        const currentTime = Date.now()
        while (cmcRequestTimes.length && currentTime - cmcRequestTimes[0] >= 60_000) cmcRequestTimes.shift()
        if (cmcRequestTimes.length >= cmcMinuteRateLimit) {
          const waitFor = 60_000 - (Date.now() - cmcRequestTimes[0]) + 50
          await new Promise((resume) => window.setTimeout(resume, waitFor))
          while (cmcRequestTimes.length && Date.now() - cmcRequestTimes[0] >= 60_000) cmcRequestTimes.shift()
        }
        cmcRequestTimes.push(Date.now())
        const response = await fetch(`${cmcApiBase}${path}`)
        if (!response.ok) throw new Error(`CoinMarketCap ${response.status}`)
        const value = await response.json() as T
        cmcRequestCache.set(path, { expiresAt: Date.now() + cmcResponseCacheTtl, value })
        if (shouldPersistCmc(path)) writePersistentCmc(path, value)
        resolve(value)
      } catch (error) {
        const stale = shouldPersistCmc(path) ? readPersistentCmc<T>(path) : null
        if (stale) {
          cmcRequestCache.set(path, { expiresAt: Date.now() + cmcResponseCacheTtl, value: stale.value })
          resolve(stale.value)
        } else {
          reject(error)
        }
      }
    }).catch(reject)
  }).finally(() => cmcInFlight.delete(path))

  cmcInFlight.set(path, request)
  return request
}

function mapCmcListingsToAssets(listings: CmcListing[], previous: MarketAsset[] = [], includeCachedCharts = false) {
  const preferred = new Map(preferredSymbols.map((symbol, index) => [symbol, index]))
  const previousAssets = new Map(previous.map((asset) => [asset.symbol, asset]))
  const ordered = [...listings].sort((left, right) => (preferred.get(left.symbol) ?? 999) - (preferred.get(right.symbol) ?? 999))

  return ordered.map((item) => ({
    symbol: item.symbol,
    base: item.symbol,
    name: item.name,
    cmcId: item.id,
    color: symbolColors[item.symbol] ?? `hsl(${item.id % 360} 62% 52%)`,
    price: item.quote?.USD?.price ?? previousAssets.get(item.symbol)?.price ?? null,
    change24h: item.quote?.USD?.percent_change_24h ?? previousAssets.get(item.symbol)?.change24h ?? null,
    volume24h: item.quote?.USD?.volume_24h ?? previousAssets.get(item.symbol)?.volume24h ?? null,
    points: previousAssets.get(item.symbol)?.points ?? (includeCachedCharts ? readChartCache(item.symbol)?.points : undefined),
  }))
}

function readChartCache(id: string) {
  try {
    const raw = window.localStorage.getItem(`${chartCachePrefix}${id}`)
    if (!raw) return null
    const cached = JSON.parse(raw) as { savedAt: number; points: number[] }
    return typeof cached.savedAt === 'number' && Array.isArray(cached.points) && cached.points.length ? cached : null
  } catch {
    return null
  }
}

function writeChartCache(symbol: string, points: number[]) {
  try {
    window.localStorage.setItem(`${chartCachePrefix}${symbol}`, JSON.stringify({ savedAt: Date.now(), points }))
  } catch {
    // The chart remains available in memory when browser storage is unavailable.
  }
}

async function getChartPoints(symbol: string) {
  const cached = readChartCache(symbol)
  if (cached && Date.now() - cached.savedAt < chartCacheTtl) return cached.points
  const pending = chartRequests.get(symbol)
  if (pending) return pending
  const request = cmcFetch<{ data?: Record<string, CmcHistoricalAsset | CmcHistoricalAsset[]> }>(`/v2/cryptocurrency/quotes/historical?symbol=${encodeURIComponent(symbol)}&convert=USD&interval=1h&count=168`)
    .then((body) => {
      const rawRecords = body.data?.[symbol]
      const records = Array.isArray(rawRecords) ? rawRecords : rawRecords ? [rawRecords] : []
      const points = records.flatMap((record) => record.quotes ?? []).map((item) => item.quote?.USD?.price ?? NaN).filter((value) => Number.isFinite(value))
      if (!points.length) throw new Error('No chart data')
      const trimmed = points.length > 72 ? points.filter((_, index) => index % Math.ceil(points.length / 72) === 0) : points
      writeChartCache(symbol, trimmed)
      return trimmed
    })
    .catch((error) => {
      const stale = readChartCache(symbol)
      if (stale) return stale.points
      throw error
    })
    .finally(() => chartRequests.delete(symbol))
  chartRequests.set(symbol, request)
  return request
}

function formatUsd(value: number | null) {
  if (value === null) return '—'
  if (value >= 1000) return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
  if (value >= 1) return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
  return `$${value.toLocaleString('en-US', { maximumFractionDigits: 6 })}`
}

function formatPercent(value: number | null) {
  if (value === null || !Number.isFinite(value)) return '—'
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

function Sparkline({ points, positive = false }: { points?: number[]; positive?: boolean }) {
  if (!points?.length) return <span className="sparkline-empty" aria-label="Chart loading" />
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const coords = points.map((point, index) => `${(index / Math.max(points.length - 1, 1)) * 100},${44 - ((point - min) / range) * 37}`).join(' ')
  return <svg className={`sparkline ${positive ? 'positive' : ''}`} viewBox="0 0 100 48" preserveAspectRatio="none" aria-hidden="true"><polygon points={`0,48 ${coords} 100,48`} /><polyline points={coords} /></svg>
}

function CryptoMark({ asset, large = false }: { asset: MarketAsset; large?: boolean }) {
  return <span className={`crypto-mark${large ? ' large' : ''}`} style={{ '--coin-color': asset.color } as CSSProperties}><img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${asset.cmcId}.png`} alt="" onError={(event) => { event.currentTarget.style.display = 'none' }} /><span>{asset.base === 'ETH' ? '◆' : asset.base === 'BTC' ? '₿' : asset.base.slice(0, 1)}</span></span>
}

function useMarketData() {
  const [assets, setAssets] = useState<MarketAsset[]>(() => {
    const cached = readPersistentCmc<{ data?: CmcListing[] }>(marketListingsPath)
    return mapCmcListingsToAssets(cached?.value.data ?? [], [], true)
  })
  const [isLoading, setIsLoading] = useState(() => {
    const cached = readPersistentCmc<{ data?: CmcListing[] }>(marketListingsPath)
    return !(cached?.value.data?.length)
  })
  const [error, setError] = useState('')

  const refresh = async () => {
    try {
      const body = await cmcFetch<{ data?: CmcListing[] }>(marketListingsPath)
      const listings = body.data ?? []
      setAssets((current) => mapCmcListingsToAssets(listings, current))
      setError('')
    } catch {
      setError('CoinMarketCap prices are temporarily unavailable')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void refresh()
    const timer = window.setInterval(() => void refresh(), 10_000)
    return () => window.clearInterval(timer)
  }, [])

  return { assets, setAssets, isLoading, error, refresh }
}

function MarketChart({ points, positive }: { points?: number[]; positive: boolean }) {
  if (!points?.length) return <div className="detail-chart-loading">Loading live chart…</div>
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const coords = points.map((point, index) => `${(index / Math.max(points.length - 1, 1)) * 100},${260 - ((point - min) / range) * 220}`).join(' ')
  return <svg className={`detail-chart ${positive ? 'positive' : ''}`} viewBox="0 0 100 280" preserveAspectRatio="none" aria-label="7 day price chart"><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#35e89a" stopOpacity=".2" /><stop offset="1" stopColor="#35e89a" stopOpacity="0" /></linearGradient></defs><polygon points={`0,280 ${coords} 100,280`} /><polyline points={coords} /></svg>
}

function MarketsScreen({ onSelect }: { onSelect: (asset: MarketAsset) => void }) {
  const { assets, setAssets, isLoading, error, refresh } = useMarketData()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Trending')
  const previewRequested = useRef(new Set<string>())
  const previewSymbols = assets.filter((asset) => !asset.points).slice(0, 6).map((asset) => asset.symbol).join('|')

  useEffect(() => {
    let cancelled = false
    const loadPreviews = async () => {
      const visible = assets.filter((asset) => !previewRequested.current.has(asset.symbol)).slice(0, 6)
      await Promise.all(visible.map(async (asset) => {
        previewRequested.current.add(asset.symbol)
        try {
          const points = await getChartPoints(asset.symbol)
          if (cancelled) return
          setAssets((current) => current.map((item) => item.symbol === asset.symbol ? { ...item, points } : item))
        } catch { /* The detail screen can retry and still shows the current price. */ }
      }))
    }
    if (previewSymbols) void loadPreviews()
    return () => { cancelled = true }
  }, [previewSymbols])

  const visibleAssets = assets.filter((asset) => `${asset.name} ${asset.base}`.toLowerCase().includes(search.toLowerCase()))
  const topAssets = assets.slice(0, 3)

  return <section className="markets-screen">
    <header className="markets-heading"><h1>Markets</h1><button className="search-circle" onClick={() => setSearch((current) => current ? '' : ' ')} aria-label="Search markets"><Icon name="search" size="md" /></button></header>
    {search !== '' && <input autoFocus className="market-search" value={search.trim()} onChange={(event) => setSearch(event.target.value)} placeholder="Search coins" />}
    <div className="market-promos"><button><span className="promo-icon">▱</span>Predictions</button><button><span className="promo-icon">◈</span>Meme Rush</button></div>
    <h2 className="market-section-title">Top traded <span>(24h)</span></h2>
    <div className="top-traded-row">{topAssets.map((asset) => <button className="top-card" key={asset.base} onClick={() => onSelect(asset)}><div className="top-card-name"><span>{asset.name}</span><CryptoMark asset={asset} /></div><strong>{formatUsd(asset.price)}</strong><span className={`market-change ${asset.change24h !== null && asset.change24h >= 0 ? 'positive-text' : ''}`}>{formatPercent(asset.change24h)}</span><Sparkline points={asset.points} positive={(asset.change24h ?? -1) >= 0} /></button>)}</div>
    <div className="market-filters"><button className="filter-star"><Icon name="star" size="sm" /></button>{['Trending', 'bStocks', 'Ondo', 'Stock Meme', 'Popular'].map((item) => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div>
    <div className="market-sort"><button>Network <Icon name="chevron" size="xs" /></button><button>Volume (24h) <span>↓</span></button><button>24h <Icon name="chevron" size="xs" /></button></div>
    {error && <button className="market-error" onClick={() => void refresh()}>{error} · Retry</button>}
    <div className="market-list">{isLoading && assets.every((asset) => asset.price === null) ? Array.from({ length: 5 }).map((_, index) => <div className="market-row skeleton-row" key={index} />) : visibleAssets.map((asset) => <button className="market-row" key={asset.base} onClick={() => onSelect(asset)}><div className="market-row-main"><CryptoMark asset={asset} /><div><strong>{asset.name}</strong><span>{asset.base}/USDT · MCap</span></div></div><div className="market-row-price"><strong>{formatUsd(asset.price)}</strong><span className={(asset.change24h ?? -1) >= 0 ? 'positive-text' : ''}>{formatPercent(asset.change24h)}</span></div><Sparkline points={asset.points} positive={(asset.change24h ?? -1) >= 0} /></button>)}</div>
    <button className="swap-cta"><Icon name="swap" size="md" />Swap</button>
  </section>
}

function MarketDetail({ asset, onBack }: { asset: MarketAsset; onBack: () => void }) {
  const [points, setPoints] = useState(asset.points)
  const [currentPrice, setCurrentPrice] = useState(asset.price)
  const [loading, setLoading] = useState(!asset.points)
  const [chartError, setChartError] = useState(false)
  useEffect(() => {
    let cancelled = false
    const refreshPrice = async () => {
      try {
        const body = await cmcFetch<{ data?: Record<string, CmcLatestAsset | CmcLatestAsset[]> }>(`/v2/cryptocurrency/quotes/latest?symbol=${encodeURIComponent(asset.symbol)}&convert=USD`)
        const quoteAsset = body.data?.[asset.symbol]
        const result = (Array.isArray(quoteAsset) ? quoteAsset[0] : quoteAsset)?.quote?.USD?.price
        if (!cancelled && typeof result === 'number') setCurrentPrice(result)
      } catch { /* Keep the latest known price while the network is unavailable. */ }
    }
    void refreshPrice()
    const timer = window.setInterval(() => void refreshPrice(), 10_000)
    return () => { cancelled = true; window.clearInterval(timer) }
  }, [asset.symbol])
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getChartPoints(asset.symbol).then((result) => { if (!cancelled) setPoints(result) }).catch(() => { if (!cancelled) setChartError(true) }).finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [asset.symbol])
  const old = points?.[Math.max(0, (points?.length ?? 1) - 25)]
  const change = old && currentPrice ? ((currentPrice - old) / old) * 100 : asset.change24h
  const changeValue = old && currentPrice ? currentPrice - old : null
  const positive = (change ?? -1) >= 0
  return <section className="detail-screen"><header className="detail-heading"><button className="back-circle" onClick={onBack} aria-label="Back">‹</button><button className="favorite-button" aria-label="Add to favorites"><Icon name="star" size="md" /></button></header><div className="detail-identity"><CryptoMark asset={asset} large /><div><strong>{asset.base}</strong><span>{asset.name}</span></div><div className="detail-price"><strong>{formatUsd(currentPrice)}</strong><span className={positive ? 'positive-text' : 'negative-text'}>{changeValue !== null ? `${changeValue >= 0 ? '+' : '-'}${formatUsd(Math.abs(changeValue))} ` : ''}({formatPercent(change)})</span></div></div><div className="detail-chart-wrap">{loading && !points ? <div className="detail-chart-loading">Loading live chart…</div> : <MarketChart points={points} positive={positive} />}</div><div className="range-tabs">{['LIVE', '1m', '1H', '1D', '1W', '1M'].map((item) => <button className={item === '1H' ? 'active' : ''} key={item}>{item}</button>)}<Icon name="activity" size="md" /></div>{chartError && <span className="chart-note">Chart temporarily unavailable · showing cached data when available</span>}<div className="balance-block"><div><strong>Your balance</strong><span>$0.00</span></div><small>0.00 {asset.base}</small></div><div className="detail-actions"><button><Icon name="scan" size="md" />Send</button><button><Icon name="qr" size="md" />Receive</button></div><section className="ai-summary"><h2>✦ AI Summary</h2><p>{asset.name} is a decentralised digital asset traded on global markets. Its price and chart above are updated from live market data.</p><button>Ask AI <span>›</span></button></section><div className="trade-ticker">0xb0...067d sold <b>$3.50 {asset.base}</b> ↘</div><button className="trade-cta"><Icon name="refresh" size="md" />Trade</button></section>
}

function LegacyLockScreen({ onUnlock }: { onUnlock: () => void }) {
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
          <Icon name="fingerprint" size="hero" />
        </button>
        <span className="lock-hint">Tap to unlock</span>
      </div>
      <span className="lock-footer"><Icon name="wallet" size="xs" /> Your wallet is secured locally</span>
    </main>
  )
}

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [passcode, setPasscode] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isBiometricHolding, setIsBiometricHolding] = useState(false)
  const biometricHoldTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  const addDigit = (digit: string) => {
    const next = `${passcode}${digit}`.slice(0, 6)
    setPasscode(next)
    if (next.length === 6) window.setTimeout(onUnlock, 240)
  }

  const removeDigit = () => setPasscode((current) => current.slice(0, -1))

  const beginBiometricHold = (event: PointerEvent<HTMLButtonElement>) => {
    if (biometricHoldTimer.current !== null) return
    event.currentTarget.setPointerCapture?.(event.pointerId)
    setIsBiometricHolding(true)
    biometricHoldTimer.current = window.setTimeout(() => {
      biometricHoldTimer.current = null
      onUnlock()
    }, 330)
  }

  const cancelBiometricHold = () => {
    if (biometricHoldTimer.current === null) return
    window.clearTimeout(biometricHoldTimer.current)
    biometricHoldTimer.current = null
    setIsBiometricHolding(false)
  }

  useEffect(() => () => {
    if (biometricHoldTimer.current !== null) window.clearTimeout(biometricHoldTimer.current)
  }, [])

  if (isAuthenticating) {
    return <main className="lock-screen auth-lock-screen"><button type="button" className="auth-dismiss-backdrop" onClick={() => setIsAuthenticating(false)} aria-label="Use passcode instead" /><div className="auth-background-trust-mark"><TrustWalletGreenMark /></div><div className="auth-sheet"><button type="button" className="auth-passcode-zone" onClick={() => setIsAuthenticating(false)} aria-label="Use passcode instead" /><h1>Authentication required</h1><p>Trust Wallet</p><button type="button" className={`auth-touch-button${isBiometricHolding ? ' holding' : ''}`} onPointerDown={beginBiometricHold} onPointerUp={cancelBiometricHold} onPointerCancel={cancelBiometricHold} onPointerLeave={cancelBiometricHold} aria-label="Hold the fingerprint sensor for half a second"><span>Touch the fingerprint sensor</span><PasscodeFingerprintImage className="auth-fingerprint-image" /></button><button type="button" className="auth-cancel" onClick={() => setIsAuthenticating(false)}>PIN</button></div></main>
  }

  return <main className="lock-screen passcode-lock-screen"><div className="passcode-container"><div className="main-content"><h2>Enter passcode</h2><div className="passcode-inputs" aria-label="Passcode progress">{Array.from({ length: 6 }).map((_, index) => <span className={`input-box${index < passcode.length ? ' filled' : ''}`} key={index}>{index < passcode.length && <span className="passcode-dot" aria-hidden="true" />}</span>)}</div><button type="button" className="touch-id-button" onClick={() => setIsAuthenticating(true)} aria-label="Use Touch ID"><span className="biometric-icon"><RiFingerprint2Line className="ri-fingerprint-2-line" aria-hidden="true" /></span>Use Touch ID</button></div><div className="keypad-container">{digits.map((digit) => <button type="button" className="key" key={digit} onClick={() => addDigit(digit)} aria-label={`Number ${digit}`}>{digit}</button>)}<button type="button" className="key key-action fingerprint-key" onClick={() => setIsAuthenticating(true)} aria-label="Use Touch ID"><span className="fingerprint-icon"><PasscodeFingerprintImage className="passcode-keypad-fingerprint-image" /></span></button><button type="button" className="key" onClick={() => addDigit('0')} aria-label="Number 0">0</button><button type="button" className="key key-action" onClick={removeDigit} aria-label="Delete passcode"><span className="backspace-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" /><line x1="18" y1="9" x2="12" y2="15" /><line x1="12" y1="9" x2="18" y2="15" /></svg></span></button></div></div></main>
}

type DappItem = { name: string; description: string; className: string; mark: string }

const dapps: DappItem[] = [
  { name: 'Lido', description: 'Liquid staking for Ethereum and Polygon. Daily…', className: 'lido-dapp', mark: '◆' },
  { name: 'Aave', description: 'Aave is an Open Source and Non-Custodial pr…', className: 'aave-dapp', mark: 'A' },
  { name: 'Uniswap', description: 'Swap, earn, and build on the leading decentrali…', className: 'uniswap-dapp', mark: '🦄' },
  { name: 'PancakeSwap', description: 'Trade. Earn. Win. NFT.', className: 'pancake-dapp', mark: '🐰' },
  { name: 'Pendle', description: 'Pendle Finance is a protocol that enables the t…', className: 'pendle-dapp', mark: '◐' },
]

function DiscoverScreen() {
  const categories = ['Featured', 'DEX', 'Lending', 'Yield', 'Staking']
  return <section className="discover-screen"><header className="discover-heading"><h1>Discover</h1></header><div className="dapp-search"><Icon name="search" size={22} /><span>Search or enter dApp URL</span></div><div className="dapp-banner"><div><strong>Claim bStocks<br />campaign rewards<br />now</strong><div className="dapp-banner-dots"><span className="active" /><span /></div></div><div className="banner-coins"><i>EW</i><b>↗</b></div><span className="banner-arrow">›</span></div><h2 className="explore-title">Explore dApps <Icon name="chevron" size={25} /></h2><div className="dapp-categories">{categories.map((category, index) => <button className={index === 0 ? 'active' : ''} key={category}>{category}</button>)}</div><div className="dapp-list">{dapps.map((dapp) => <div className="dapp-row" key={dapp.name}><span className={`dapp-icon ${dapp.className}`}>{dapp.mark}</span><div><strong>{dapp.name}</strong><span>{dapp.description}</span></div></div>)}</div><button className="view-dapps-button">View all <span>›</span></button></section>
}

function SettingsScreen({ onClose }: { onClose: () => void }) {
  const [darkMode, setDarkMode] = useState(false)
  const groups: { icon: SettingsMenuIconName; label: string; alert?: boolean }[][] = [
    [
      { icon: 'address-book', label: 'Address Book' },
      { icon: 'extension', label: 'Sync to Extension' },
      { icon: 'handle', label: 'Trust handles' },
      { icon: 'scan', label: 'Scan QR code' },
      { icon: 'wallet-connect', label: 'WalletConnect' },
    ],
    [
      { icon: 'preferences', label: 'Preferences' },
      { icon: 'security', label: 'Security', alert: true },
      { icon: 'notifications', label: 'Notifications' },
    ],
    [
      { icon: 'support', label: 'Support' },
      { icon: 'about', label: 'About' },
    ],
    [
      { icon: 'x', label: 'X' },
      { icon: 'telegram', label: 'Telegram' },
      { icon: 'facebook', label: 'Facebook' },
      { icon: 'reddit', label: 'Reddit' },
      { icon: 'youtube', label: 'Youtube' },
      { icon: 'instagram', label: 'Instagram' },
      { icon: 'tiktok', label: 'TikTok' },
    ],
  ]

  return <section className="settings-screen" aria-labelledby="settings-title">
    <header className="settings-header">
      <button type="button" className="settings-back-button" onClick={onClose} aria-label="Back to wallets"><BackArrowIcon /></button>
      <h1 id="settings-title">Settings</h1>
      <span aria-hidden="true" />
    </header>
    <div className="settings-group settings-dark-mode-group">
      <button type="button" className="settings-row settings-dark-mode-row" onClick={() => setDarkMode((current) => !current)} aria-pressed={darkMode}>
        <SettingsMenuIcon name="moon" />
        <span>Dark Mode</span>
        <i className={`settings-switch${darkMode ? ' enabled' : ''}`} aria-hidden="true" />
      </button>
    </div>
    {groups.map((group, groupIndex) => <div className="settings-group" key={group[0].label}>
      {groupIndex > 0 && <div className="settings-divider" />}
      {group.map((item) => <button type="button" className="settings-row" key={item.label}>
        <SettingsMenuIcon name={item.icon} />
        <span>{item.label}</span>
        {item.alert && <i className="settings-alert-dot" aria-label="Requires attention" />}
      </button>)}
    </div>)}
  </section>
}

type CelebrationParticle = {
  color: string
  delay: number
  gravity: number
  opacity: number
  phase: number
  rotation: number
  size: number
  spin: number
  type: 'dot' | 'ring' | 'ribbon'
  velocityX: number
  velocityY: number
  x: number
  y: number
}

function WalletReadyConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const colors = ['#1515f4', '#249eee', '#3bef9a', '#ffeb52', '#f39eec']
    const random = (minimum: number, maximum: number) => minimum + Math.random() * (maximum - minimum)
    let animationFrame = 0
    let previousFrameTime = 0
    let startTime = 0
    let particles: CelebrationParticle[] = []
    let width = 0
    let height = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const launch = () => {
      particles = Array.from({ length: 192 }, (_, index) => {
        const type = index % 7 === 0 ? 'ribbon' : index % 4 === 0 ? 'ring' : 'dot'
        const size = type === 'ribbon' ? random(4.5, 6.5) : type === 'ring' ? random(7, 11) : random(4.5, 9)
        const sourceX = random(width * .07, width * .93)
        const heightBand = index % 9
        const launchSpeed = heightBand < 4 ? random(13, 16) : heightBand < 8 ? random(17, 21) : random(24, 28)
        return {
          color: colors[index % colors.length],
          delay: random(0, 230),
          gravity: random(.1375, .18125),
          opacity: random(.72, 1),
          phase: random(0, Math.PI * 2),
          rotation: random(0, Math.PI * 2),
          size: size * 2,
          spin: random(-.12, .12),
          type,
          velocityX: (width * .5 - sourceX) * random(-.004375, .004375) + random(-1.375, 1.375),
          velocityY: -launchSpeed,
          x: sourceX,
          y: height + random(12, 42),
        }
      })
      startTime = performance.now()
    }

    const drawParticle = (particle: CelebrationParticle, alpha: number) => {
      if (particle.y < -44 || particle.y > height + 52 || particle.x < -44 || particle.x > width + 44) return
      context.save()
      context.globalAlpha = alpha * particle.opacity
      context.translate(particle.x, particle.y)
      context.rotate(particle.rotation)
      context.fillStyle = particle.color
      if (particle.type === 'ribbon') {
        context.strokeStyle = particle.color
        context.lineCap = 'round'
        context.lineWidth = particle.size * .62
        context.beginPath()
        context.moveTo(0, -particle.size * 1.9)
        context.quadraticCurveTo(particle.size * 1.05, 0, 0, particle.size * 1.9)
        context.stroke()
      } else if (particle.type === 'ring') {
        context.strokeStyle = particle.color
        context.lineWidth = 1.45
        context.beginPath()
        context.arc(0, 0, particle.size * .5, 0, Math.PI * 2)
        context.stroke()
      } else {
        context.beginPath()
        context.arc(0, 0, particle.size * .5, 0, Math.PI * 2)
        context.fill()
      }
      context.restore()
    }

    const animate = (now: number) => {
      const elapsed = now - startTime
      const frameDelta = previousFrameTime ? Math.min((now - previousFrameTime) / (1000 / 60), 2) : 1
      const fade = Math.max(0, Math.min(1, (6400 - elapsed) / 640))
      previousFrameTime = now
      context.clearRect(0, 0, width, height)
      particles.forEach((particle) => {
        if (elapsed < particle.delay) return
        particle.velocityY += particle.gravity * frameDelta
        particle.velocityX *= Math.pow(.998, frameDelta)
        particle.x += (particle.velocityX + Math.sin(elapsed * .0065 + particle.phase) * .24) * frameDelta
        particle.y += particle.velocityY * frameDelta
        particle.rotation += particle.spin * frameDelta
        drawParticle(particle, fade)
      })
      if (elapsed < 6400) animationFrame = window.requestAnimationFrame(animate)
    }

    resize()
    launch()
    animationFrame = window.requestAnimationFrame(animate)
    window.addEventListener('resize', resize)
    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="wallet-ready-confetti" aria-hidden="true" />
}

function WalletReadyScreen({ onContinue }: { onContinue: () => void }) {
  return <section className="wallet-ready-screen" aria-labelledby="wallet-ready-title">
    <WalletReadyConfetti />
    <button type="button" className="wallet-ready-skip" onClick={onContinue}>Skip</button>
    <div className="wallet-ready-art"><img className="wallet-ready-illustration" src="/illustration-2-wallet.svg" alt="" /><span className="wallet-ready-bug-trail" aria-hidden="true"><i /><i /><i /><i /></span><span className="wallet-ready-bug-orbit" aria-hidden="true"><img src="/illustration-1-bow-1.svg" alt="" /></span></div>
    <div className="wallet-ready-copy"><h1 id="wallet-ready-title">Brilliant! your wallet is ready!</h1><p>Add funds to get started</p></div>
    <button type="button" className="wallet-ready-fund" onClick={onContinue}>Fund your wallet</button>
  </section>
}

function WalletsScreen({ onClose, onOpenSettings }: { onClose: () => void; onOpenSettings: () => void }) {
  const [showAddWallet, setShowAddWallet] = useState(false)
  const [isCreatingWallet, setIsCreatingWallet] = useState(false)
  const [showWalletCreated, setShowWalletCreated] = useState(false)
  const walletCreationTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null)
  const walletNames = ['Main Wallet 1', 'Main Wallet 2', 'Main Wallet 3', 'Main Wallet 4']
  const closeAddWallet = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (walletCreationTimer.current !== null) window.clearTimeout(walletCreationTimer.current)
    walletCreationTimer.current = null
    setIsCreatingWallet(false)
    setShowAddWallet(false)
  }

  const createWallet = () => {
    if (isCreatingWallet) return
    setIsCreatingWallet(true)
    walletCreationTimer.current = window.setTimeout(() => {
      walletCreationTimer.current = null
      setShowAddWallet(false)
      setShowWalletCreated(true)
      setIsCreatingWallet(false)
    }, 1000)
  }

  useEffect(() => () => {
    if (walletCreationTimer.current !== null) window.clearTimeout(walletCreationTimer.current)
  }, [])

  if (showWalletCreated) return <WalletReadyScreen onContinue={() => setShowWalletCreated(false)} />

  return <section className="wallets-screen"><header className="wallets-screen-header"><button type="button" className="wallet-back-button" onClick={onClose} aria-label="Close wallet manager"><BackArrowIcon /></button><h1>Wallets</h1><button type="button" className="wallet-settings-button" onClick={onOpenSettings} aria-label="Open settings"><WalletSettingsIcon /></button></header><h2>Multi-coin wallets</h2><div className="wallet-card-list">{walletNames.map((name, index) => <article className="main-wallet-card" key={name}><div className="main-wallet-title"><span className="wallet-shield"><TrustWalletBadge /></span><div><strong>{name}</strong></div><b>⋮</b></div>{index === 3 && <span className="wallet-selected">✓</span>}</article>)}</div><div className="wallets-bottom-actions"><button type="button" onClick={() => setShowAddWallet(true)}>Add wallet</button><button type="button"><ExtensionQrIcon />Sync to Extension</button></div>{showAddWallet && <div className="add-wallet-overlay" onClick={() => !isCreatingWallet && setShowAddWallet(false)}><section className="add-wallet-sheet" onClick={(event) => event.stopPropagation()}><button type="button" className="add-wallet-close" onClick={closeAddWallet} aria-label="Close add wallet"><Icon name="close" size={26} /></button><div className="wallet-illustration"><img src="/illustration-3-wallet-coins.svg" alt="" /></div><button type="button" className={`add-wallet-option${isCreatingWallet ? ' creating' : ''}`} onClick={createWallet} disabled={isCreatingWallet}><span className="add-option-icon create-icon"><RiSparkling2Line aria-hidden="true" /></span><span><strong>{isCreatingWallet ? 'Creating wallet…' : 'Create new wallet'}</strong><small>Secret phrase</small></span><b>›</b></button><button type="button" className="add-wallet-option" disabled={isCreatingWallet}><span className="add-option-icon import-icon"><RiDownload2Line aria-hidden="true" /></span><span><strong>Add existing wallet</strong><small>Import, restore or view-only</small></span><b>›</b></button></section></div>}</section>
}

function App() {
  const [isLocked, setIsLocked] = useState(true)
  const [promoIndex, setPromoIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'home' | 'markets' | 'discover'>('home')
  const [selectedMarket, setSelectedMarket] = useState<MarketAsset | null>(null)
  const [showWallets, setShowWallets] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [walletChanges, setWalletChanges] = useState<Record<string, number | null>>({})

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [activeTab, selectedMarket, showWallets, showSettings])

  useEffect(() => {
    const promoTimer = window.setInterval(() => {
      setPromoIndex((currentIndex) => (currentIndex + 1) % promoSlides.length)
    }, 2000)

    return () => window.clearInterval(promoTimer)
  }, [])

  useEffect(() => {
    if (isLocked || activeTab !== 'home' || selectedMarket || showWallets) return
    let cancelled = false

    const refreshWalletChanges = async () => {
      try {
        const body = await cmcFetch<{ data?: Record<string, CmcLatestAsset | CmcLatestAsset[]> }>(walletTokenQuotesPath)
        const nextChanges: Record<string, number | null> = {}
        walletTokens.forEach((token) => {
          const rawAsset = body.data?.[token.symbol]
          const asset = Array.isArray(rawAsset) ? rawAsset[0] : rawAsset
          nextChanges[token.symbol] = asset?.quote?.USD?.percent_change_24h ?? null
        })
        if (!cancelled) setWalletChanges(nextChanges)
      } catch {
        // Keep the latest real value; if none exists, the UI shows an em dash instead of fake data.
      }
    }

    void refreshWalletChanges()
    const timer = window.setInterval(() => void refreshWalletChanges(), 10_000)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [activeTab, isLocked, selectedMarket, showWallets])

  if (isLocked) return <LockScreen onUnlock={() => setIsLocked(false)} />

  if (showSettings) {
    return <main className="app-shell light-app-shell"><div className="wallet-app light-wallet-app"><SettingsScreen onClose={() => setShowSettings(false)} /></div></main>
  }

  if (showWallets) {
    return <main className="app-shell light-app-shell"><div className="wallet-app light-wallet-app"><WalletsScreen onClose={() => setShowWallets(false)} onOpenSettings={() => setShowSettings(true)} /></div></main>
  }

  if (selectedMarket) {
    return <main className="app-shell"><div className="wallet-app"><MarketDetail asset={selectedMarket} onBack={() => setSelectedMarket(null)} /></div></main>
  }

  return (
    <main className="app-shell">
      <div className="wallet-app">
        {activeTab === 'markets' ? <MarketsScreen onSelect={setSelectedMarket} /> : activeTab === 'discover' ? <DiscoverScreen /> : <>
        <header className="wallet-header">
          <button className="wallet-chip" onClick={() => setShowWallets(true)} aria-label="Open wallets">
            <WalletGlyph />
            <div className="wallet-chip-copy"><strong>Morse</strong></div>
          </button>
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
            <button className="start-action"><McapBadge /><span>Deposit from<br />Binance</span></button>
            <button className="start-action"><CardBadge /><span>Buy with<br />Cards</span></button>
          </div>
        </section>

        <section className="token-section">
          <h2>Tokens <Icon name="chevron" size={25} /></h2>
          <div className="token-list">
            {walletTokens.map((token) => (
              <div className="token-row" key={token.id}>
                <div className="token-leading"><TokenMark token={token} /><div className="token-copy"><strong>{token.name}</strong><span>{token.balance} {token.symbol}</span></div></div>
                <div className="token-price"><strong>{token.value}</strong>{(() => { const change = walletChanges[token.symbol] ?? null; return <span className={change !== null && change >= 0 ? 'positive-text' : change !== null ? 'negative-text' : ''}>{formatPercent(change)}</span> })()}</div>
              </div>
            ))}
          </div>
          <button className="view-all-button">View all <Icon name="chevron" size={24} /></button>
        </section>

        <section className="perps-section">
          <h2>Perps <Icon name="chevron" size={25} /></h2>
          <div className="perps-card-row">
            <article className="perps-card">
              <div className="perps-card-icon"><TokenMark token={walletTokens[1]} /><PerpsVenueBadge /></div>
              <div className="perps-card-title"><strong>BTC</strong><span>40x</span></div>
              <span className="perps-volume">$1.82B Vol</span>
            </article>
            <article className="perps-card">
              <div className="perps-card-icon"><TokenMark token={walletTokens[3]} /><PerpsVenueBadge /></div>
              <div className="perps-card-title"><strong>ETH</strong><span>25x</span></div>
              <span className="perps-volume">$805.22M Vol</span>
            </article>
          </div>
        </section>

        <section className="earn-section">
          <h2>Earn <Icon name="chevron" size={25} /></h2>
          <div className="earn-card-row">
            <article className="earn-card"><SolanaEarnMark /><strong>41.34% APY</strong><span>on SOL</span></article>
            <article className="earn-card"><JunoEarnMark /><strong>24.07% APY</strong><span>on JUNO</span></article>
          </div>
        </section>

        <button className="ai-banner"><span className="ai-banner-label"><AiSparkle /><strong>Trust Wallet AI</strong></span><span className="ai-banner-action">Ask anything <Icon name="chevron" size={22} /></span></button>

        <section className="watchlist-section">
          <h2>Watchlist <Icon name="chevron" size={25} /></h2>
          <div className="watchlist-list">
            {screenshotWatchlist.map(({ token, value }) => (
              <div className="watchlist-row" key={token.id}>
                <TokenMark token={token} />
                <div className="watchlist-name"><strong>{token.name}</strong></div>
                <div className="watchlist-price"><strong>{value}</strong>{(() => { const change = walletChanges[token.symbol] ?? null; return <span className={change !== null && change >= 0 ? 'positive-text' : change !== null ? 'negative-text' : ''}>{formatPercent(change)}</span> })()}</div>
              </div>
            ))}
          </div>
        </section>

        </>}
        <nav className="bottom-dock" aria-label="Main navigation">
          <div className="nav-pill">
            <button className={`nav-item${activeTab === 'home' ? ' active' : ''}`} onClick={() => { setActiveTab('home'); setSelectedMarket(null) }}><Icon name="home" size={22} /></button>
            <button className={`nav-item${activeTab === 'markets' ? ' active' : ''}`} onClick={() => { setActiveTab('markets'); setSelectedMarket(null) }}><Icon name="chart" size={22} /></button>
            <button className="nav-item"><Icon name="infinity" size={23} /></button>
            <button className={`nav-item${activeTab === 'discover' ? ' active' : ''}`} onClick={() => { setActiveTab('discover'); setSelectedMarket(null) }}><Icon name="compass" size={22} /></button>
          </div>
          <button className="nav-search" aria-label="Search" onClick={() => setActiveTab('markets')}><Icon name="search" size={27} /></button>
        </nav>
      </div>
    </main>
  )
}

export default App
