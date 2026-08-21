import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { RiAtLine, RiContactsBook2Line, RiCustomerService2Line, RiDownload2Line, RiLockPasswordLine, RiMoonLine, RiNotification3Line, RiPlug2Line, RiQrScan2Line, RiScan2Line, RiSettings3Line, RiShieldCheckLine, RiSparkling2Line } from 'react-icons/ri'
import { uiFeatureConfig } from './feature-config'
import { walletDefinitions, walletTokenDefinitions, type WalletDefinition, type WalletTokenKind } from './wallet-data'

type IconName =
  | 'activity'
  | 'apple'
  | 'chart'
  | 'chevron'
  | 'clock'
  | 'close'
  | 'compass'
  | 'copy'
  | 'fingerprint'
  | 'home'
  | 'infinity'
  | 'info'
  | 'qr'
  | 'refresh'
  | 'search'
  | 'scan'
  | 'settings'
  | 'share'
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
    copy: <><rect x="8.5" y="8.5" width="11" height="11" rx="1.5" /><path d="M15.5 8.5V6.2A1.7 1.7 0 0 0 13.8 4.5H6.2a1.7 1.7 0 0 0-1.7 1.7v7.6a1.7 1.7 0 0 0 1.7 1.7h2.3" /></>,
    fingerprint: <><path d="M12 3a9 9 0 0 0-9 9" /><path d="M12 3a9 9 0 0 1 9 9c0 3.2-.6 6.2-1.6 9" /><path d="M12 5.5A6.5 6.5 0 0 0 5.5 12c0 4-.7 7-2 9" /><path d="M12 5.5a6.5 6.5 0 0 1 6.5 6.5c0 3.5-.5 6.7-1.4 9" /><path d="M12 8a4 4 0 0 0-4 4c0 4.8-.5 7.6-1.5 10" /><path d="M12 8a4 4 0 0 1 4 4c0 2.9-.2 5.5-.7 7.8" /><path d="M12 10.5A1.5 1.5 0 0 0 10.5 12c0 3.4-.2 6.1-.8 8.5" /><path d="M12 10.5c.8 0 1.5.7 1.5 1.5 0 2.3.1 4.3.4 6.1" /></>,
    home: <><path fill="currentColor" stroke="none" d="m2.8 10.4 8.1-6.8a1.7 1.7 0 0 1 2.2 0l8.1 6.8a1.4 1.4 0 0 1 .5 1.1v7.3a2.2 2.2 0 0 1-2.2 2.2H4.5a2.2 2.2 0 0 1-2.2-2.2v-7.3a1.4 1.4 0 0 1 .5-1.1Z" /><path d="M10 20.8v-4.6h4v4.6" fill="#37383a" stroke="none" /><path d="M10.9 18.7h2.2" stroke="#fff" strokeWidth="1.05" strokeLinecap="round" /></>,
    infinity: <path d="M7.2 7.5c-2.2 0-3.7 1.7-3.7 4.5s1.5 4.5 3.7 4.5c3 0 6.6-9 9.6-9 2.2 0 3.7 1.7 3.7 4.5s-1.5 4.5-3.7 4.5c-3 0-6.6-9-9.6-9Z" />,
    info: <><circle cx="12" cy="12" r="8.5" /><path d="M12 10.7v5" /><circle cx="12" cy="7.7" r=".55" fill="currentColor" stroke="none" /></>,
    qr: <><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" /><path d="M14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z" /></>,
    refresh: <><path d="M20 11a8 8 0 0 0-14.7-3L4 10" /><path d="M4 5v5h5" /><path d="M4 13a8 8 0 0 0 14.7 3L20 14" /><path d="M20 19v-5h-5" /></>,
    search: <><circle cx="10.7" cy="10.7" r="6.7" /><path d="m16 16 4.5 4.5" /></>,
    scan: <><path d="M5 9V5a1 1 0 0 1 1-1h4" /><path d="M15 4h3a2 2 0 0 1 2 2v3" /><path d="M20 15v3a2 2 0 0 1-2 2h-3" /><path d="M9 20H6a2 2 0 0 1-2-2v-3" /><path d="M6 12h12" /></>,
    settings: <path fill="currentColor" fillRule="evenodd" stroke="none" d="M19.43 12.98c.04-.32.06-.65.06-.98s-.02-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.37-.31-.6-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.49.49 0 0 0 14 2h-4a.49.49 0 0 0-.49.42L9.13 5.07c-.61.25-1.18.59-1.69.98l-2.49-1c-.23-.08-.48 0-.6.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.08.65-.08.98s.03.66.08.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.37.31.6.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.49.42h4c.24 0 .45-.18.49-.42l.38-2.65c.61-.25 1.18-.59 1.69-.98l2.49 1c.23.08.48 0 .6-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.1-1.65ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z" />,
    share: <><circle cx="18" cy="5.5" r="2" fill="currentColor" stroke="none" /><circle cx="6" cy="12" r="2" fill="currentColor" stroke="none" /><circle cx="18" cy="18.5" r="2" fill="currentColor" stroke="none" /><path d="m7.8 11 8.4-4.4M7.8 13l8.4 4.4" /></>,
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
  return <span className="trust-wallet-icon" aria-hidden="true"><img src="/trust-wallet-icon.webp" alt="" /></span>
}

function TrustWalletGreenMark() {
  return <span className="auth-trust-mark" aria-hidden="true"><img src="/trust-wallet-icon.webp" alt="" /></span>
}

function BackArrowIcon() {
  return <svg className="back-arrow-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M26 16H6M6 16l8-8M6 16l8 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function SecretInfoIcon() {
  return <svg className="secret-info-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#66676a" /><path d="M12 10.8v5" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" /><circle cx="12" cy="7.8" r=".65" fill="#fff" /></svg>
}

function WalletMoreIcon() {
  return <svg className="wallet-more-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="5" r="1.65" /><circle cx="12" cy="12" r="1.65" /><circle cx="12" cy="19" r="1.65" /></svg>
}

function WalletTrashIcon() {
  return <svg className="wallet-trash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.5 7h15M9 7V4.5h6V7m-8.5 0 .8 12h9.4l.8-12M10 11v4.5m4-4.5v4.5" /></svg>
}

function GoogleDriveBackupIcon() {
  return <img className="wallet-backup-icon wallet-google-drive-icon" src="/googledrive.png" alt="" />
}

function ManualBackupIcon() {
  return <img className="wallet-backup-icon wallet-manual-icon" src="/manuel.png" alt="" />
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
  switch (name) {
    case 'moon': return <RiMoonLine className="settings-row-icon" aria-hidden="true" />
    case 'address-book': return <RiContactsBook2Line className="settings-row-icon" aria-hidden="true" />
    case 'extension': return <ExtensionQrIcon className="settings-row-icon" />
    case 'handle': return <RiAtLine className="settings-row-icon" aria-hidden="true" />
    case 'scan': return <RiScan2Line className="settings-row-icon" aria-hidden="true" />
    case 'wallet-connect': return <RiPlug2Line className="settings-row-icon" aria-hidden="true" />
    case 'preferences': return <RiSettings3Line className="settings-row-icon" aria-hidden="true" />
    case 'security': return <RiLockPasswordLine className="settings-row-icon" aria-hidden="true" />
    case 'notifications': return <RiNotification3Line className="settings-row-icon" aria-hidden="true" />
    case 'support': return <RiCustomerService2Line className="settings-row-icon" aria-hidden="true" />
    case 'about': return <RiShieldCheckLine className="settings-row-icon" aria-hidden="true" />
  }

  let glyph: ReactNode

  switch (name) {
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

function ExtensionQrIcon({ className = 'extension-qr-icon' }: { className?: string } = {}) {
  return <svg className={className} viewBox="0 0 28 28" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="3.5" width="7" height="7" rx="1" /><rect x="17.5" y="3.5" width="7" height="7" rx="1" /><rect x="3.5" y="17.5" width="7" height="7" rx="1" /></g><g fill="currentColor"><circle cx="19" cy="19" r="1.35" /><circle cx="22.5" cy="19" r="1.35" /><circle cx="20.75" cy="20.75" r="1.35" /><circle cx="19" cy="22.5" r="1.35" /><circle cx="22.5" cy="22.5" r="1.35" /></g></svg>
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

function HomeTransferArrow({ direction }: { direction: 'send' | 'receive' }) {
  return <svg className="home-balance-action-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d={direction === 'send' ? 'M8 24 24 8M12 8h12v12' : 'M16 7v18M10 19l6 6 6-6'} stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function HomeSwapIcon() {
  return <svg className="home-balance-action-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M25 13a10 10 0 0 0-18-4" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" /><path d="M7 6v4h4M7 19a10 10 0 0 0 18 4" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" /><path d="M25 26v-4h-4" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function HomeBuyIcon() {
  return <svg className="home-balance-action-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 7v18M7 16h18" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
  </svg>
}

function HyperliquidGlyph() {
  return <span className="hyperliquid-glyph" aria-hidden="true"><img src="/binahat.png" alt="" /></span>
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
  cmcId: number
  balance: number
  fallbackPrice: number
  kind: WalletTokenKind
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

function TetherLogo() {
  return <svg className="tether-logo" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M14 10h20v5.5h-6.8v17.8c0 1.8-1.4 3.2-3.2 3.2s-3.2-1.4-3.2-3.2V15.5H14V10Z" fill="currentColor" /><path d="M11.5 17.3c3.2 1.5 7.5 2.3 12.5 2.3s9.3-.8 12.5-2.3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
}

function TronLogo() {
  return <svg className="tron-logo" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="m9.2 11.1 29.7 4.2-9.1 23.1L9.2 11.1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="m9.2 11.1 14.2 8.2 15.5-4M23.4 19.3l6.4 19.1M9.2 11.1l20.6 27.3" stroke="currentColor" strokeWidth="1.55" strokeLinejoin="round" /></svg>
}

function TetherTronMark() {
  return <><TetherLogo /><span className="tether-network-badge"><TronLogo /></span></>
}

const walletTokenCmcIds: Record<string, number> = { USDT: 825, BTC: 1, TRX: 1958, ETH: 1027, BNB: 1839 }

function TokenMark({ token }: { token: WalletToken }) {
  const cmcId = token.cmcId ?? walletTokenCmcIds[token.symbol]
  if (token.symbol === 'USDT') return <span className="token-mark tether-mark tether-network-mark" aria-hidden="true"><TetherTronMark /></span>
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

const legacyWalletTokens = [
  { id: 'tether', name: 'Tether', symbol: 'USDT', cmcId: 825, balance: '1,013,452.76', value: '$1,013,452.76', kind: 'tether' },
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', cmcId: 1, balance: '15.42', value: '$1,026,784.32', kind: 'bitcoin' },
  { id: 'tron', name: 'TRON', symbol: 'TRX', balance: '0.000002', value: '$0.0₆541', kind: 'tron' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', cmcId: 1027, balance: '0', value: '$0.00', kind: 'ethereum' },
  { id: 'bnb', name: 'BNB Smart Chain', symbol: 'BNB', cmcId: 1839, balance: '0', value: '$0.00', kind: 'bnb' },
]

const screenshotWatchlist = [
  { token: legacyWalletTokens[3], value: '$1,893.85' },
  { token: legacyWalletTokens[1], value: '$63,701.45' },
  { token: legacyWalletTokens[4], value: '$604.54' },
]

function getWalletTokens(wallet: WalletDefinition): WalletToken[] {
  return walletTokenDefinitions.map((token) => ({ ...token, balance: wallet.balances[token.symbol] ?? 0 }))
}

function formatTokenBalance(value: number) {
  if (value === 0) return '0'
  if (value >= 1) return value.toLocaleString('en-US', { maximumFractionDigits: 4 })
  return value.toLocaleString('en-US', { maximumFractionDigits: 8 })
}

function getWalletTokenValue(token: WalletToken, prices: Record<string, number>) {
  return token.balance * (prices[token.symbol] ?? token.fallbackPrice)
}

function getWalletTotal(wallet: WalletDefinition, prices: Record<string, number>) {
  return getWalletTokens(wallet).reduce((total, token) => total + getWalletTokenValue(token, prices), 0)
}

const persistedWalletBalancesKey = 'trust-wallet-dashboard:wallet-balances:v1'
const persistedWalletsKey = 'trust-wallet-dashboard:wallets:v2'
const persistedDeletedWalletsKey = 'trust-wallet-dashboard:deleted-wallets:v1'
const selectedWalletStorageKey = 'trust-wallet-dashboard:selected-wallet:v1'
const unlockedSessionKey = 'trust-wallet-dashboard:unlocked-session:v1'
const walletHistoryStorageKey = 'trust-wallet-dashboard:history:v1'
const manualBackupStatusStorageKey = 'trust-wallet-dashboard:manual-backup-status:v1'
const manualBackupVerificationStorageKey = 'trust-wallet-dashboard:manual-backup-verification:v1'
const configuredWalletIds = new Set(walletDefinitions.map((wallet) => wallet.id))

type WalletHistoryDirection = 'send' | 'receive'
type WalletHistoryEntry = {
  id: string
  walletId: string
  direction: WalletHistoryDirection
  symbol: string
  amount: number
  counterparty: string
  createdAt: number
}

const secretPhraseWordBank = [
  'wolf', 'include', 'relax', 'behind', 'need', 'air', 'three', 'lazy', 'food', 'define', 'shell', 'ugly',
  'bright', 'river', 'orange', 'planet', 'garden', 'copper', 'future', 'honest', 'velvet', 'window', 'yellow', 'forest',
  'anchor', 'bridge', 'cactus', 'dawn', 'ember', 'feather', 'globe', 'harbor', 'island', 'jungle', 'kitten', 'lemon',
  'maple', 'novel', 'ocean', 'pencil', 'quiet', 'rocket', 'silver', 'thunder', 'urban', 'violet', 'whisper', 'zebra',
]

function getWalletSecretPhrase(wallet: WalletDefinition) {
  const seed = Array.from(`${wallet.id}:${wallet.address}`).reduce((total, character, index) => total + character.charCodeAt(0) * (index + 17), 0)
  const phrase: string[] = []
  let offset = 0
  while (phrase.length < 12) {
    const index = (seed + offset * 19 + phrase.length * 7) % secretPhraseWordBank.length
    const word = secretPhraseWordBank[index]
    if (!phrase.includes(word)) phrase.push(word)
    offset += 1
  }
  return phrase
}

function readManualBackupStatuses() {
  try {
    const raw = window.localStorage.getItem(manualBackupStatusStorageKey)
    const parsed: unknown = raw ? JSON.parse(raw) : {}
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {} as Record<string, boolean>
    return Object.fromEntries(Object.entries(parsed).filter(([, value]) => value === true)) as Record<string, boolean>
  } catch {
    return {} as Record<string, boolean>
  }
}

function isManualBackupCompleted(walletId: string) {
  return readManualBackupStatuses()[walletId] === true
}

function markManualBackupCompleted(walletId: string) {
  const statuses = readManualBackupStatuses()
  statuses[walletId] = true
  try {
    window.localStorage.setItem(manualBackupStatusStorageKey, JSON.stringify(statuses))
  } catch {
    // The completed state remains available in the current session.
  }
}

function readManualBackupVerification(walletId: string, phraseLength: number) {
  try {
    const raw = window.localStorage.getItem(manualBackupVerificationStorageKey)
    const parsed: unknown = raw ? JSON.parse(raw) : {}
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null
    const value = (parsed as Record<string, unknown>)[walletId]
    if (!Array.isArray(value)) return null
    const indexes = value.filter((item): item is number => typeof item === 'number' && Number.isInteger(item) && item >= 0 && item < phraseLength)
    return indexes.length === 4 && new Set(indexes).size === 4 ? indexes : null
  } catch {
    return null
  }
}

function saveManualBackupVerification(walletId: string, indexes: number[]) {
  try {
    const raw = window.localStorage.getItem(manualBackupVerificationStorageKey)
    const parsed: unknown = raw ? JSON.parse(raw) : {}
    const values = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {}
    values[walletId] = indexes
    window.localStorage.setItem(manualBackupVerificationStorageKey, JSON.stringify(values))
  } catch {
    // The current flow still keeps its verification order in memory.
  }
}

function getStableManualBackupVerification(wallet: WalletDefinition, phraseLength: number) {
  const seed = Array.from(`${wallet.id}:${wallet.address}:verification`).reduce((total, character, index) => total + character.charCodeAt(0) * (index + 23), 0)
  const indexes: number[] = []
  let offset = 0
  while (indexes.length < 4) {
    const candidate = (seed + offset * 13 + indexes.length * 5) % phraseLength
    if (!indexes.includes(candidate)) indexes.push(candidate)
    offset += 1
  }
  return indexes.sort((left, right) => left - right)
}

function cloneConfiguredWallets() {
  return walletDefinitions.map((wallet) => ({ ...wallet, balances: { ...wallet.balances } }))
}

function sanitizeWalletBalances(value: unknown): WalletDefinition['balances'] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const storedBalances = value as Record<string, unknown>
  const balances: WalletDefinition['balances'] = {}
  walletTokenDefinitions.forEach((token) => {
    const balance = storedBalances[token.symbol]
    if (typeof balance === 'number' && Number.isFinite(balance) && balance >= 0) balances[token.symbol] = balance
  })
  return balances
}

function restoreWallet(wallet: WalletDefinition, balanceValue: unknown, nameValue?: unknown): WalletDefinition {
  const storedName = typeof nameValue === 'string' ? nameValue.trim() : ''
  return { ...wallet, name: storedName || wallet.name, balances: { ...wallet.balances, ...sanitizeWalletBalances(balanceValue) } }
}

function readCustomWallet(value: unknown): WalletDefinition | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const wallet = value as Record<string, unknown>
  if (typeof wallet.id !== 'string' || typeof wallet.name !== 'string' || typeof wallet.address !== 'string') return null
  const id = wallet.id.trim()
  const name = wallet.name.trim()
  const address = wallet.address.trim()
  if (!id || !name || !address) return null
  return { id, name, address, balances: sanitizeWalletBalances(wallet.balances) }
}

function sanitizeWalletIdList(value: unknown) {
  if (!Array.isArray(value)) return [] as string[]
  return value.filter((item): item is string => typeof item === 'string' && Boolean(item.trim())).map((item) => item.trim())
}

function readPersistedDeletedWalletIds() {
  try {
    const raw = window.localStorage.getItem(persistedDeletedWalletsKey)
    return raw ? sanitizeWalletIdList(JSON.parse(raw)) : []
  } catch {
    return [] as string[]
  }
}

function markWalletDeleted(walletId: string) {
  const deletedWalletIds = new Set(readPersistedDeletedWalletIds())
  deletedWalletIds.add(walletId)
  try {
    window.localStorage.setItem(persistedDeletedWalletsKey, JSON.stringify([...deletedWalletIds]))
  } catch {
    // The wallet can still be removed from the current session.
  }
}

function readPersistedWallets() {
  const configuredWallets = cloneConfiguredWallets()
  try {
    // Keep the legacy key as a migration fallback. The dedicated key makes the
    // complete wallet list durable independently from balance-only data.
    const raw = window.localStorage.getItem(persistedWalletsKey) ?? window.localStorage.getItem(persistedWalletBalancesKey)
    if (!raw) return configuredWallets
    const stored = JSON.parse(raw) as { balances?: Record<string, unknown>; names?: Record<string, unknown>; wallets?: unknown; deletedWalletIds?: unknown }
    const deletedWalletIds = new Set([...readPersistedDeletedWalletIds(), ...sanitizeWalletIdList(stored.deletedWalletIds)])
    const storedBalances = stored.balances && typeof stored.balances === 'object' ? stored.balances : {}
    const storedNames = stored.names && typeof stored.names === 'object' ? stored.names : {}
    // Configured wallets always use the source-of-truth balances from
    // wallet-data.ts, so every browser starts with the same portfolio totals.
    const savedWallets = configuredWallets.map((wallet) => restoreWallet(wallet, undefined, storedNames[wallet.id])).filter((wallet) => !deletedWalletIds.has(wallet.id))
    if (!Array.isArray(stored.wallets)) return savedWallets

    const existingIds = new Set(savedWallets.map((wallet) => wallet.id))
    const customWallets: WalletDefinition[] = []
    stored.wallets.forEach((value) => {
      const wallet = readCustomWallet(value)
      if (!wallet || configuredWalletIds.has(wallet.id) || existingIds.has(wallet.id)) return
      existingIds.add(wallet.id)
      customWallets.push(restoreWallet(wallet, storedBalances[wallet.id], storedNames[wallet.id]))
    })
    return [...savedWallets, ...customWallets].filter((wallet) => !deletedWalletIds.has(wallet.id))
  } catch {
    return configuredWallets
  }
}

function persistWalletBalances(wallets: WalletDefinition[]) {
  try {
    // Do not persist balances for the 11 configured wallets. Local storage is
    // reserved for deletion/name state and custom wallets.
    const balances = Object.fromEntries(wallets.filter((wallet) => !configuredWalletIds.has(wallet.id)).map((wallet) => [wallet.id, wallet.balances]))
    const names = Object.fromEntries(wallets.map((wallet) => [wallet.id, wallet.name]))
    const customWallets = wallets.filter((wallet) => !configuredWalletIds.has(wallet.id))
    const deletedWalletIds = readPersistedDeletedWalletIds()
    const payload = JSON.stringify({ version: 4, balances, names, wallets: customWallets, deletedWalletIds })
    window.localStorage.setItem(persistedWalletsKey, payload)
    // Keep existing installs compatible with the previous storage key.
    window.localStorage.setItem(persistedWalletBalancesKey, payload)
    window.localStorage.setItem(persistedDeletedWalletsKey, JSON.stringify(deletedWalletIds))
  } catch {
    // The app remains usable when browser storage is unavailable.
  }
}

function createInitialWalletHistory(wallets: WalletDefinition[]) {
  const sourceWallet = walletDefinitions[0]
  if (!sourceWallet) return []

  const availableWalletIds = new Set(wallets.map((wallet) => wallet.id))
  const totalInitialBalance = walletDefinitions.reduce((total, wallet) => total + (wallet.balances.USDT ?? 0), 0)
  const initialDayStart = getInitialHistoryDayStart()
  const entries: WalletHistoryEntry[] = []

  // Wallet 1 is the source wallet: it receives the complete initial pool and
  // distributes the configured balance of every other wallet from there.
  if (availableWalletIds.has(sourceWallet.id) && totalInitialBalance > 0) {
    entries.push({
      id: `initial-funding-${sourceWallet.id}`,
      walletId: sourceWallet.id,
      direction: 'receive',
      symbol: 'USDT',
      amount: totalInitialBalance,
      counterparty: 'Initial funding',
      createdAt: getHistoryTimestamp(initialDayStart, 9, 12),
    })
  }

  walletDefinitions.slice(1).forEach((recipientWallet, index) => {
    const amount = recipientWallet.balances.USDT ?? 0
    if (amount <= 0) return
    const transferMinute = 20 + index * 4

    if (availableWalletIds.has(sourceWallet.id)) {
      entries.push({
        id: `initial-distribution-send-${recipientWallet.id}`,
        walletId: sourceWallet.id,
        direction: 'send',
        symbol: 'USDT',
        amount,
        counterparty: recipientWallet.address,
        createdAt: getHistoryTimestamp(initialDayStart, 9, transferMinute),
      })
    }

    if (availableWalletIds.has(recipientWallet.id)) {
      entries.push({
        id: `initial-distribution-receive-${recipientWallet.id}`,
        walletId: recipientWallet.id,
        direction: 'receive',
        symbol: 'USDT',
        amount,
        counterparty: sourceWallet.address,
        createdAt: getHistoryTimestamp(initialDayStart, 9, transferMinute + 1),
      })
    }
  })

  return entries
}

function readWalletHistory(wallets: WalletDefinition[]) {
  try {
    const raw = window.localStorage.getItem(walletHistoryStorageKey)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    const stored = Array.isArray(parsed) ? parsed.filter((item): item is WalletHistoryEntry => {
      if (!item || typeof item !== 'object') return false
      const entry = item as Partial<WalletHistoryEntry>
      return typeof entry.id === 'string' && typeof entry.walletId === 'string' && (entry.direction === 'send' || entry.direction === 'receive') && typeof entry.symbol === 'string' && typeof entry.amount === 'number' && Number.isFinite(entry.amount) && entry.amount > 0 && typeof entry.counterparty === 'string' && typeof entry.createdAt === 'number' && Number.isFinite(entry.createdAt) && entry.createdAt > 0
    }).map((entry) => ({ ...entry, createdAt: normalizeHistoryTimestamp(entry.createdAt) })) : []
    const initialEntries = createInitialWalletHistory(wallets)
    // Replace the old per-wallet initial records with the source-wallet
    // distribution model, while keeping all user-created transfer records.
    const userEntries = stored.filter((entry) => !entry.id.startsWith('initial-'))
    return [...userEntries, ...initialEntries].sort((left, right) => right.createdAt - left.createdAt)
  } catch {
    return createInitialWalletHistory(wallets)
  }
}

function writeWalletHistory(entries: WalletHistoryEntry[]) {
  try {
    window.localStorage.setItem(walletHistoryStorageKey, JSON.stringify(entries))
  } catch {
    // History remains available in memory when storage is unavailable.
  }
}

function applyWalletHistoryToBalances(wallets: WalletDefinition[], entries: WalletHistoryEntry[]) {
  const balancesByWallet = new Map(wallets.map((wallet) => [wallet.id, { ...wallet.balances }]))
  entries.forEach((entry) => {
    // Configured wallet balances stay defined in wallet-data.ts. Transfer
    // history is the durable delta applied on top of those starting values.
    // Custom wallet balances are already persisted with the wallet itself.
    if (entry.id.startsWith('initial-') || !configuredWalletIds.has(entry.walletId)) return
    const walletBalances = balancesByWallet.get(entry.walletId)
    if (!walletBalances) return
    const currentBalance = walletBalances[entry.symbol as keyof typeof walletBalances] ?? 0
    const nextBalance = entry.direction === 'send' ? currentBalance - entry.amount : currentBalance + entry.amount
    walletBalances[entry.symbol as keyof typeof walletBalances] = Math.max(0, nextBalance)
  })
  return wallets.map((wallet) => ({ ...wallet, balances: balancesByWallet.get(wallet.id) ?? { ...wallet.balances } }))
}

function readWalletsWithHistory() {
  const wallets = readPersistedWallets()
  return applyWalletHistoryToBalances(wallets, readWalletHistory(wallets))
}

function createWalletAddress() {
  const bytes = new Uint8Array(20)
  if (typeof globalThis.crypto?.getRandomValues === 'function') globalThis.crypto.getRandomValues(bytes)
  else bytes.forEach((_, index) => { bytes[index] = Math.floor(Math.random() * 256) })
  return `0x${Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')}`
}

function createNewWallet(wallets: WalletDefinition[]): WalletDefinition {
  const walletIds = new Set(wallets.map((wallet) => wallet.id))
  let number = wallets.length + 1
  let id = `wallet-${String(number).padStart(2, '0')}`
  while (walletIds.has(id)) {
    number += 1
    id = `wallet-${String(number).padStart(2, '0')}`
  }

  const walletAddresses = new Set(wallets.map((wallet) => wallet.address.toLowerCase()))
  let address = createWalletAddress()
  while (walletAddresses.has(address.toLowerCase())) address = createWalletAddress()
  return { id, name: `Main Wallet ${number}`, address, balances: {} }
}

function readSelectedWalletId(wallets: WalletDefinition[]) {
  try {
    const savedWalletId = window.localStorage.getItem(selectedWalletStorageKey)
    if (savedWalletId && wallets.some((wallet) => wallet.id === savedWalletId)) return savedWalletId
  } catch {
    // Fall back to the first configured wallet when storage is unavailable.
  }
  return wallets[0]?.id ?? walletDefinitions[0].id
}

function isSessionUnlocked() {
  try {
    return window.sessionStorage.getItem(unlockedSessionKey) === '1'
  } catch {
    return false
  }
}

function persistUnlockedSession() {
  try {
    window.sessionStorage.setItem(unlockedSessionKey, '1')
  } catch {
    // Session unlock still works until the next refresh if storage is unavailable.
  }
}

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
  marketCap?: number | null
  logoUrl?: string
  points?: number[]
  walletBalance?: number
}

const preferredSymbols = ['ETH', 'BNB', 'SOL', 'BTC', 'XRP', 'ADA', 'DOGE', 'TRX', 'AVAX', 'LINK']
const symbolColors: Record<string, string> = {
  USDT: '#26a17b', ETH: '#7c8cff', BNB: '#f3bd24', SOL: '#6e6cff', BTC: '#f7931a', XRP: '#66717a',
  ADA: '#3365d4', DOGE: '#c2a633', TRX: '#e84142', AVAX: '#e84142', LINK: '#2a5ada',
}

const cmcApiBase = '/api/cmc'
// A versioned cache prevents malformed/downsampled chart data from older builds
// from being reused after the chart pipeline changes.
const chartCachePrefix = 'orbit-cmc-chart-v2:'
const cmcPersistentCachePrefix = 'orbit-cmc-response-v1:'
const marketListingsPath = '/v1/cryptocurrency/listings/latest?start=1&limit=250&convert=USD'
const topTrendingListingsPath = '/v3/cryptocurrency/listings/latest?start=1&limit=500&convert=USD'
const walletTokenQuotesPath = '/wallet-quotes?symbol=USDT,BTC,TRX,ETH,BNB&convert=USD'
const chartCacheTtl = 5 * 60 * 1000
const chartRequests = new Map<string, Promise<number[]>>()
const cmcRequestCache = new Map<string, { expiresAt: number; value: unknown }>()
const cmcInFlight = new Map<string, Promise<unknown>>()
const cmcRequestTimes: number[] = []
let cmcRateQueue = Promise.resolve()
const cmcMinuteRateLimit = 50
const cmcResponseCacheTtl = 1_500
const cmcListingsCacheTtl = 60_000

type CmcQuote = { id?: number; symbol?: string; price?: number; percent_change_24h?: number; percent_change_7d?: number; volume_24h?: number; market_cap?: number }
type CmcListing = { id: number; name: string; symbol: string; tags?: string[]; quote?: { USD?: CmcQuote } | CmcQuote[] }
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
  return path.includes('/cryptocurrency/listings/latest') || path.startsWith('/v2/cryptocurrency/quotes/latest') || path.startsWith('/wallet-quotes')
}

function getCmcResponseCacheTtl(path: string) {
  return path.includes('/cryptocurrency/listings/latest') ? cmcListingsCacheTtl : cmcResponseCacheTtl
}

function getCmcUsdQuote(listing: CmcListing) {
  const quote = listing.quote
  if (Array.isArray(quote)) return quote.find((item) => item.symbol === 'USD' || item.id === 2781) ?? null
  return quote?.USD ?? null
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
        cmcRequestCache.set(path, { expiresAt: Date.now() + getCmcResponseCacheTtl(path), value })
        if (shouldPersistCmc(path)) writePersistentCmc(path, value)
        resolve(value)
      } catch (error) {
        const stale = shouldPersistCmc(path) ? readPersistentCmc<T>(path) : null
        if (stale) {
          cmcRequestCache.set(path, { expiresAt: Date.now() + getCmcResponseCacheTtl(path), value: stale.value })
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

  return ordered.map((item) => {
    const previousAsset = previousAssets.get(item.symbol)
    const quote = getCmcUsdQuote(item)
    const price = quote?.price ?? previousAsset?.price ?? null
    const cachedPoints = includeCachedCharts ? readChartCache(item.symbol)?.points : undefined
    return {
      symbol: item.symbol,
      base: item.symbol,
      name: item.name,
      cmcId: item.id,
      color: symbolColors[item.symbol] ?? `hsl(${item.id % 360} 62% 52%)`,
      price,
      change24h: quote?.percent_change_24h ?? previousAsset?.change24h ?? null,
      volume24h: quote?.volume_24h ?? previousAsset?.volume24h ?? null,
      marketCap: quote?.market_cap ?? previousAsset?.marketCap ?? null,
      points: syncChartWithLatestPrice(previousAsset?.points ?? cachedPoints, price),
    }
  })
}

type TrendingMarketAsset = MarketAsset & { trendingScore: number }

const stablecoinSymbols = new Set([
  'USDT', 'USDC', 'DAI', 'USDE', 'USDS', 'USD1', 'FDUSD', 'USDD', 'PYUSD', 'TUSD', 'USDP', 'FRAX', 'GUSD', 'LUSD', 'USDB', 'BUSD', 'CUSD', 'USDX', 'USDY', 'USD0', 'USDG',
])

function normalizeTrendingMetric(values: number[]) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min
  return values.map((value) => range === 0 ? .5 : (value - min) / range)
}

function isStablecoin(listing: CmcListing) {
  const tags = listing.tags ?? []
  return stablecoinSymbols.has(listing.symbol.toUpperCase()) || tags.some((tag) => /stablecoin|stable-asset/i.test(tag))
}

function buildTopTrendingAssets(listings: CmcListing[], previous: TrendingMarketAsset[] = []): TrendingMarketAsset[] {
  const candidates = listings.flatMap((listing) => {
    const quote = getCmcUsdQuote(listing)
    const marketCap = quote?.market_cap
    const volume24h = quote?.volume_24h
    const change24h = quote?.percent_change_24h
    const change7d = quote?.percent_change_7d
    if (
      isStablecoin(listing)
      || !Number.isFinite(marketCap)
      || !Number.isFinite(volume24h)
      || !Number.isFinite(change24h)
      || !Number.isFinite(change7d)
      || (marketCap ?? 0) < 10_000_000
      || (volume24h ?? 0) < 1_000_000
    ) return []

    return [{ listing, marketCap: marketCap as number, volume24h: volume24h as number, change24h: change24h as number, change7d: change7d as number, volumeToMarketCap: (volume24h as number) / (marketCap as number) }]
  })

  if (!candidates.length) return previous.slice(0, 10)

  const normalizedChange24h = normalizeTrendingMetric(candidates.map((item) => item.change24h))
  const normalizedChange7d = normalizeTrendingMetric(candidates.map((item) => item.change7d))
  const normalizedVolumeRatio = normalizeTrendingMetric(candidates.map((item) => item.volumeToMarketCap))
  const normalizedVolume24h = normalizeTrendingMetric(candidates.map((item) => item.volume24h))
  const previousBySymbol = new Map(previous.map((asset) => [asset.symbol, asset]))

  return candidates.map((candidate, index) => {
    const previousAsset = previousBySymbol.get(candidate.listing.symbol)
    const price = getCmcUsdQuote(candidate.listing)?.price ?? previousAsset?.price ?? null
    return {
      symbol: candidate.listing.symbol,
      base: candidate.listing.symbol,
      name: candidate.listing.name,
      cmcId: candidate.listing.id,
      color: symbolColors[candidate.listing.symbol] ?? `hsl(${candidate.listing.id % 360} 62% 52%)`,
      price,
      change24h: candidate.change24h,
      volume24h: candidate.volume24h,
      marketCap: candidate.marketCap,
      points: syncChartWithLatestPrice(previousAsset?.points ?? readChartCache(candidate.listing.symbol)?.points, price),
      trendingScore: (normalizedChange24h[index] * .35 + normalizedChange7d[index] * .25 + normalizedVolumeRatio[index] * .25 + normalizedVolume24h[index] * .15) * 100,
    }
  }).sort((left, right) => right.trendingScore - left.trendingScore).slice(0, 10)
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
  const request = cmcFetch<{ data?: Record<string, CmcHistoricalAsset | CmcHistoricalAsset[]> }>(`/wallet-history?symbol=${encodeURIComponent(symbol)}&convert=USD&interval=1h&count=168`)
    .then((body) => {
      const rawRecords = body.data?.[symbol]
      const records = Array.isArray(rawRecords) ? rawRecords : rawRecords ? [rawRecords] : []
      const points = records.flatMap((record) => record.quotes ?? []).map((item) => item.quote?.USD?.price ?? NaN).filter((value) => Number.isFinite(value))
      if (points.length < 6) throw new Error('Not enough chart data')
      const sampled = sampleChartPoints(points)
      writeChartCache(symbol, sampled)
      return sampled
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

function sampleChartPoints(points: number[], maximumPoints = 72) {
  if (points.length <= maximumPoints) return points

  // Sampling by a fixed modulo could discard the most recent price. Keeping both
  // endpoints makes the final segment reflect the latest historical observation.
  return Array.from({ length: maximumPoints }, (_, index) => {
    const sourceIndex = Math.round(index * (points.length - 1) / (maximumPoints - 1))
    return points[sourceIndex]
  })
}

function createSparklinePoints(points: number[], maximumPoints = 26) {
  if (points.length <= maximumPoints) return points

  // Sparklines have very little horizontal space. Keeping the local high and low
  // from each time bucket preserves real peaks and troughs instead of allowing
  // tightly packed points to collapse into a line that appears flat.
  const bucketCount = Math.max(1, Math.floor((maximumPoints - 2) / 2))
  const interiorCount = points.length - 2
  const result = [points[0]]

  for (let bucket = 0; bucket < bucketCount; bucket += 1) {
    const start = 1 + Math.floor(bucket * interiorCount / bucketCount)
    const end = 1 + Math.floor((bucket + 1) * interiorCount / bucketCount)
    let lowIndex = start
    let highIndex = start

    for (let index = start + 1; index < end; index += 1) {
      if (points[index] < points[lowIndex]) lowIndex = index
      if (points[index] > points[highIndex]) highIndex = index
    }

    if (lowIndex <= highIndex) result.push(points[lowIndex], points[highIndex])
    else result.push(points[highIndex], points[lowIndex])
  }

  result.push(points[points.length - 1])
  return result
}

function getChartDisplayPoints(points?: number[], fallbackPoints?: number[]) {
  const candidate = points?.length ? points : fallbackPoints
  if (!candidate?.length) return undefined
  if (candidate.length < 2) return candidate

  const minimum = Math.min(...candidate)
  const maximum = Math.max(...candidate)
  const variation = maximum - minimum
  const scale = Math.max(Math.abs(maximum), Math.abs(minimum), 1)
  if (variation > scale * 0.0000001 || !fallbackPoints?.length) return candidate

  // A stale/partial cache can contain identical points. Use the deterministic
  // local fallback until a real historical series arrives from the API.
  return fallbackPoints
}

function formatCompactUsd(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '—'
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(value >= 10_000_000_000 ? 0 : 1)}B`
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`
  return formatUsd(value)
}

function walletTokenToMarketAsset(token: WalletToken, prices: Record<string, number>, changes: Record<string, number | null>): MarketAsset {
  return {
    symbol: token.symbol,
    base: token.symbol,
    name: token.name,
    cmcId: token.cmcId,
    color: symbolColors[token.symbol] ?? '#77787d',
    price: prices[token.symbol] ?? token.fallbackPrice,
    change24h: changes[token.symbol] ?? null,
    walletBalance: token.balance,
  }
}

function readCachedWalletQuoteValues() {
  const cachedQuotes = readPersistentCmc<{ data?: Record<string, CmcLatestAsset | CmcLatestAsset[]> }>(walletTokenQuotesPath)?.value.data ?? {}
  const cachedListings = readPersistentCmc<{ data?: CmcListing[] }>(topTrendingListingsPath)?.value.data ?? []
  const cachedAssets = mapCmcListingsToAssets(cachedListings)
  const cachedAssetsBySymbol = new Map(cachedAssets.map((asset) => [asset.symbol.toUpperCase(), asset]))
  const changes: Record<string, number | null> = {}
  const prices: Record<string, number> = {}

  walletTokenDefinitions.forEach((token) => {
    const rawAsset = cachedQuotes[token.symbol] ?? cachedQuotes[token.symbol.toUpperCase()]
    const quoteAsset = Array.isArray(rawAsset) ? rawAsset[0] : rawAsset
    const fallbackAsset = cachedAssetsBySymbol.get(token.symbol)
    changes[token.symbol] = quoteAsset?.quote?.USD?.percent_change_24h ?? fallbackAsset?.change24h ?? null
    prices[token.symbol] = quoteAsset?.quote?.USD?.price ?? fallbackAsset?.price ?? token.fallbackPrice
  })

  return { changes, prices }
}

type AppRouteKind = 'home' | 'markets' | 'perps' | 'discover' | 'tokens' | 'history' | 'wallets' | 'wallet-edit' | 'settings' | 'search' | 'swap' | 'asset' | 'send' | 'receive' | 'unlock'
type AppRoute = { kind: AppRouteKind; symbol?: string; walletId?: string }
type AppNavigationState = { asset?: MarketAsset; returnTo?: string; appRoute?: true }
type AppLocation = { pathname: string; state: AppNavigationState | null }
type AppNavigate = (pathname: string, state?: Omit<AppNavigationState, 'appRoute'>) => void

const searchHistoryStorageKey = 'orbit-search-history-v1'
const searchWatchlistStorageKey = 'orbit-search-watchlist-v1'

function toSavedSearchAsset(asset: MarketAsset): MarketAsset {
  return {
    symbol: asset.symbol,
    base: asset.base,
    name: asset.name,
    cmcId: asset.cmcId,
    color: asset.color,
    price: asset.price,
    change24h: asset.change24h,
    volume24h: asset.volume24h ?? null,
    marketCap: asset.marketCap ?? null,
    logoUrl: asset.logoUrl,
  }
}

function readSavedSearchAssets(key: string) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return [] as MarketAsset[]
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return [] as MarketAsset[]
    return parsed.filter((item): item is MarketAsset => {
      if (!item || typeof item !== 'object') return false
      const asset = item as Partial<MarketAsset>
      return typeof asset.symbol === 'string' && typeof asset.base === 'string' && typeof asset.name === 'string' && typeof asset.cmcId === 'number' && typeof asset.color === 'string'
    }).map(toSavedSearchAsset)
  } catch {
    return [] as MarketAsset[]
  }
}

function writeSavedSearchAssets(key: string, assets: MarketAsset[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(assets.map(toSavedSearchAsset)))
  } catch {
    // Search stays usable even if local storage is unavailable.
  }
}

const routeAssetDefaults: Record<string, Pick<MarketAsset, 'name' | 'cmcId'>> = {
  SOL: { name: 'Solana', cmcId: 5426 }, XRP: { name: 'XRP', cmcId: 52 }, ADA: { name: 'Cardano', cmcId: 2010 },
  DOGE: { name: 'Dogecoin', cmcId: 74 }, AVAX: { name: 'Avalanche', cmcId: 5805 }, LINK: { name: 'Chainlink', cmcId: 1975 },
}

function normalizePathname(pathname: string) {
  const clean = pathname.replace(/\/+$/, '')
  return clean || '/'
}

function readAppLocation(): AppLocation {
  return { pathname: normalizePathname(window.location.pathname), state: window.history.state as AppNavigationState | null }
}

function parseAppRoute(pathname: string): AppRoute {
  const segments = normalizePathname(pathname).split('/').filter(Boolean)
  if (!segments.length) return { kind: 'home' }
  if (segments[0] === 'markets') return { kind: 'markets' }
  if (segments[0] === 'perps') return { kind: 'perps' }
  if (segments[0] === 'discover') return { kind: 'discover' }
  if (segments[0] === 'tokens') return { kind: 'tokens' }
  if (segments[0] === 'history') return { kind: 'history' }
  if (segments[0] === 'wallets' && segments[1] && segments[2] === 'edit') return { kind: 'wallet-edit', walletId: decodeURIComponent(segments[1]) }
  if (segments[0] === 'wallets') return { kind: 'wallets' }
  if (segments[0] === 'settings') return { kind: 'settings' }
  if (segments[0] === 'search') return { kind: 'search' }
  if (segments[0] === 'swap') return { kind: 'swap' }
  if (segments[0] === 'unlock') return { kind: 'unlock' }
  if ((segments[0] === 'asset' || segments[0] === 'send' || segments[0] === 'receive') && segments[1]) {
    return { kind: segments[0], symbol: decodeURIComponent(segments[1]).toUpperCase() }
  }
  return { kind: 'home' }
}

function createRouteAsset(symbol: string, navigationState: AppNavigationState | null, activeTokens: WalletToken[], prices: Record<string, number>, changes: Record<string, number | null>): MarketAsset {
  const routeAsset = navigationState?.asset
  const token = activeTokens.find((item) => item.symbol === symbol)
  if (routeAsset && routeAsset.symbol === symbol) return { ...routeAsset, walletBalance: token?.balance ?? routeAsset.walletBalance ?? 0 }
  if (token) return walletTokenToMarketAsset(token, prices, changes)
  const definition = walletTokenDefinitions.find((item) => item.symbol === symbol)
  if (definition) return walletTokenToMarketAsset({ ...definition, balance: 0 }, prices, changes)
  const fallback = routeAssetDefaults[symbol]
  return {
    symbol,
    base: symbol,
    name: fallback?.name ?? symbol,
    cmcId: fallback?.cmcId ?? 0,
    color: symbolColors[symbol] ?? '#77787d',
    price: null,
    change24h: null,
    walletBalance: 0,
  }
}

function Sparkline({ points, positive = false, fallbackPoints }: { points?: number[]; positive?: boolean; fallbackPoints?: number[] }) {
  const displayPoints = getChartDisplayPoints(points, fallbackPoints)
  if (!displayPoints?.length) return <span className="sparkline-empty" aria-label="Chart loading" />
  const chartPoints = createSparklinePoints(displayPoints)
  const min = Math.min(...chartPoints)
  const max = Math.max(...chartPoints)
  const range = max - min || 1
  const coords = chartPoints.map((point, index) => `${(index / Math.max(chartPoints.length - 1, 1)) * 100},${44 - ((point - min) / range) * 37}`).join(' ')
  return <svg className={`sparkline ${positive ? 'positive' : ''}`} viewBox="0 0 100 48" preserveAspectRatio="none" aria-hidden="true"><polygon points={`0,48 ${coords} 100,48`} /><polyline points={coords} /></svg>
}

function CryptoMark({ asset, large = false }: { asset: MarketAsset; large?: boolean }) {
  if (asset.base === 'USDT') return <span className={`crypto-mark${large ? ' large' : ''} tether-network-mark`} style={{ '--coin-color': '#26a17b' } as CSSProperties}><TetherTronMark /></span>
  return <span className={`crypto-mark${large ? ' large' : ''}`} style={{ '--coin-color': asset.color } as CSSProperties}><img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${asset.cmcId}.png`} alt="" onError={(event) => { event.currentTarget.style.display = 'none' }} /><span>{asset.base === 'ETH' ? '◆' : asset.base === 'BTC' ? '₿' : asset.base.slice(0, 1)}</span></span>
}

type PerpsMarket = {
  id: string
  symbol: string
  leverage: string
  volume: string
  price: string
  change: string
  positive?: boolean
  mark: 'bitcoin' | 'ethereum' | 'spcx' | 'skhynix'
  points: number[]
}

function syncChartWithLatestPrice(points: number[] | undefined, price: number | null) {
  if (!points?.length || price === null || !Number.isFinite(price)) return points
  const sanitized = points.filter((point) => Number.isFinite(point))
  if (!sanitized.length) return points
  const latest = sanitized[sanitized.length - 1]
  const tolerance = Math.max(Math.abs(price) * 0.00000001, 0.00000001)
  if (Math.abs(latest - price) <= tolerance) return sanitized

  // The last historical point represents the open/current interval. Replacing it
  // avoids repeatedly appending nearly identical live prices, which produced a
  // flat tail followed by a visually abrupt final jump.
  const next = sanitized.slice(-72)
  next[next.length - 1] = price
  return next
}

function createFallbackChartPoints(symbol: string, price: number | null, change: number | null, count = 28) {
  let seed = Array.from(symbol).reduce((total, character, index) => (total + character.charCodeAt(0) * (index + 11)) >>> 0, 0)
  const end = price && Number.isFinite(price) && price > 0 ? price : Math.max(1, (seed % 900) + 100)
  const trend = Math.max(-0.65, Math.min(0.65, (change ?? 0) / 100))
  const start = end / (1 + trend || 1)
  const volatility = Math.max(.006, Math.min(.065, Math.abs(trend) * .42 + .012))
  const primaryPhase = (seed % 29) / 29 * Math.PI * 2
  const secondaryPhase = (seed % 17) / 17 * Math.PI * 2

  return Array.from({ length: count }, (_, index) => {
    if (index === 0) return start
    if (index === count - 1) return end
    seed = (seed * 1664525 + 1013904223) >>> 0
    const progress = index / (count - 1)
    const randomOffset = (seed / 4294967295 - .5) * .34
    const wave = Math.sin(progress * Math.PI * 5 + primaryPhase) * .72
      + Math.sin(progress * Math.PI * 10 + secondaryPhase) * .28
      + randomOffset
    const envelope = Math.sin(progress * Math.PI)
    const baseline = start + (end - start) * progress
    return Math.max(end * .02, baseline + end * volatility * envelope * wave)
  })
}

const perpsMarkets: PerpsMarket[] = [
  { id: 'btc-40', symbol: 'BTC', leverage: '40x', volume: '$1.52B Vol', price: '$63,629', change: '-0.74%', mark: 'bitcoin', points: [92, 38, 47, 36, 53, 38, 48, 43, 52, 40, 51, 63, 78, 70, 46, 61, 47] },
  { id: 'eth-25', symbol: 'ETH', leverage: '25x', volume: '$596.75M Vol', price: '$1,887.8', change: '-1.22%', mark: 'ethereum', points: [91, 38, 49, 33, 41, 26, 37, 32, 27, 48, 63, 67, 49, 35, 50, 37] },
  { id: 'btc-200', symbol: 'BTC', leverage: '200x', volume: '$569.36M Vol', price: '$63,618', change: '-0.60%', mark: 'bitcoin', points: [91, 26, 49, 31, 43, 27, 42, 51, 45, 61, 78, 64, 45, 58, 37, 48] },
  { id: 'spcx-20', symbol: 'SPCX', leverage: '20x', volume: '$443.04M Vol', price: '$146.49', change: '+8.79%', positive: true, mark: 'spcx', points: [16, 31, 48, 69, 63, 78, 66, 67, 64, 70, 68, 72, 68, 65, 70, 64, 58] },
  { id: 'skhynix-10', symbol: 'SKHYNIX', leverage: '10x', volume: '$435.63M Vol', price: '$1,110.9', change: '+1.87%', positive: true, mark: 'skhynix', points: [19, 36, 34, 50, 48, 64, 61, 89, 92, 74, 45, 49, 32, 38, 33, 38] },
]

const perpsPopularMetadata: Record<PerpsMarket['mark'], Pick<MarketAsset, 'name' | 'cmcId' | 'color'>> = {
  bitcoin: { name: 'Bitcoin', cmcId: 1, color: '#f7931a' },
  ethereum: { name: 'Ethereum', cmcId: 1027, color: '#7c8cff' },
  spcx: { name: 'SpaceX Tokenized Stock', cmcId: 0, color: '#131519' },
  skhynix: { name: 'SK hynix Tokenized Stock', cmcId: 0, color: '#e73834' },
}

function toPerpsMarketAsset(market: PerpsMarket): MarketAsset {
  const metadata = perpsPopularMetadata[market.mark]
  return {
    symbol: market.symbol,
    base: market.symbol,
    name: metadata.name,
    cmcId: metadata.cmcId,
    color: metadata.color,
    price: Number(market.price.replace(/[$,]/g, '')),
    change24h: Number(market.change.replace('%', '')),
    points: market.points,
  }
}

const perpsCategorySeeds: Record<'crypto' | 'stocks' | 'commodities', MarketAsset[]> = {
  crypto: [
    { symbol: 'BTC', base: 'BTC', name: 'Bitcoin', cmcId: 1, color: '#f7931a', price: null, change24h: null },
    { symbol: 'ETH', base: 'ETH', name: 'Ethereum', cmcId: 1027, color: '#7c8cff', price: null, change24h: null },
    { symbol: 'BNB', base: 'BNB', name: 'BNB', cmcId: 1839, color: '#f3bd24', price: null, change24h: null },
    { symbol: 'SOL', base: 'SOL', name: 'Solana', cmcId: 5426, color: '#6e6cff', price: null, change24h: null },
    { symbol: 'XRP', base: 'XRP', name: 'XRP', cmcId: 52, color: '#66717a', price: null, change24h: null },
    { symbol: 'ADA', base: 'ADA', name: 'Cardano', cmcId: 2010, color: '#3365d4', price: null, change24h: null },
  ],
  stocks: [
    { symbol: 'AAPLX', base: 'AAPLx', name: 'Apple xStock', cmcId: 0, color: '#29313b', price: null, change24h: null },
    { symbol: 'TSLAX', base: 'TSLAx', name: 'Tesla xStock', cmcId: 0, color: '#df2935', price: null, change24h: null },
    { symbol: 'NVDAX', base: 'NVDAx', name: 'NVIDIA xStock', cmcId: 0, color: '#76b900', price: null, change24h: null },
    { symbol: 'MSTRX', base: 'MSTRx', name: 'Strategy xStock', cmcId: 0, color: '#ff7f27', price: null, change24h: null },
    { symbol: 'COINX', base: 'COINx', name: 'Coinbase xStock', cmcId: 0, color: '#145ee8', price: null, change24h: null },
    { symbol: 'CRCLX', base: 'CRCLx', name: 'Circle xStock', cmcId: 0, color: '#1f6cff', price: null, change24h: null },
  ],
  commodities: [
    { symbol: 'PAXG', base: 'PAXG', name: 'PAX Gold', cmcId: 3330, color: '#d7af4b', price: null, change24h: null },
    { symbol: 'XAUT', base: 'XAUT', name: 'Tether Gold', cmcId: 5176, color: '#c79729', price: null, change24h: null },
    { symbol: 'KAU', base: 'KAU', name: 'Kinesis Gold', cmcId: 0, color: '#d8b24b', price: null, change24h: null },
    { symbol: 'KAG', base: 'KAG', name: 'Kinesis Silver', cmcId: 0, color: '#a8b2bb', price: null, change24h: null },
    { symbol: 'CGO', base: 'CGO', name: 'Comtech Gold', cmcId: 0, color: '#c69e32', price: null, change24h: null },
    { symbol: 'MCAU', base: 'MCAU', name: 'Meld Gold', cmcId: 0, color: '#d2a73e', price: null, change24h: null },
  ],
}

function toPerpsCategoryAsset(item: CmcListing): MarketAsset {
  const quote = getCmcUsdQuote(item)
  return {
    symbol: item.symbol,
    base: item.symbol,
    name: item.name,
    cmcId: item.id,
    color: symbolColors[item.symbol] ?? `hsl(${item.id % 360} 62% 52%)`,
    price: quote?.price ?? null,
    change24h: quote?.percent_change_24h ?? null,
  }
}

function selectPerpsCategory(listings: CmcListing[], category: keyof typeof perpsCategorySeeds) {
  const bySymbol = new Map(listings.map((item) => [item.symbol.toUpperCase(), item]))
  const liveSeeds: MarketAsset[] = []
  const fallbacks: MarketAsset[] = []
  perpsCategorySeeds[category].forEach((seed) => {
    const item = bySymbol.get(seed.symbol.toUpperCase())
    if (item) liveSeeds.push(toPerpsCategoryAsset(item))
    else fallbacks.push(seed)
  })
  const isMatch = (item: CmcListing) => {
    const tags = (item.tags ?? []).join(' ').toLowerCase()
    const name = item.name.toLowerCase()
    if (category === 'stocks') return tags.includes('stock') || tags.includes('equity') || name.includes('xstock')
    if (category === 'commodities') return tags.includes('commodity') || tags.includes('gold') || tags.includes('silver') || /gold|silver|oil/.test(name)
    return false
  }
  const extras = listings.filter(isMatch).map(toPerpsCategoryAsset)
  const unique = new Map<string, MarketAsset>()
  ;[...liveSeeds, ...extras, ...fallbacks].forEach((asset) => unique.set(asset.symbol, asset))
  return [...unique.values()].slice(0, 6)
}

type PerpsCategories = Record<keyof typeof perpsCategorySeeds, MarketAsset[]>

function buildPerpsCategories(listings: CmcListing[], previous?: PerpsCategories): PerpsCategories {
  const buildCategory = (category: keyof typeof perpsCategorySeeds) => {
    const previousBySymbol = new Map((previous?.[category] ?? []).map((asset) => [asset.symbol, asset]))
    return selectPerpsCategory(listings, category).map((asset) => ({
      ...asset,
      points: syncChartWithLatestPrice(previousBySymbol.get(asset.symbol)?.points ?? readChartCache(asset.symbol)?.points, asset.price),
    }))
  }
  return { crypto: buildCategory('crypto'), stocks: buildCategory('stocks'), commodities: buildCategory('commodities') }
}

function usePerpsCategoryAssets() {
  const cachedListings = readPersistentCmc<{ data?: CmcListing[] }>(marketListingsPath)?.value.data ?? []
  const [categories, setCategories] = useState<PerpsCategories>(() => buildPerpsCategories(cachedListings))
  const requestedCharts = useRef(new Set<string>())

  useEffect(() => {
    let cancelled = false
    const refresh = async () => {
      try {
        const body = await cmcFetch<{ data?: CmcListing[] }>(marketListingsPath)
        if (!cancelled) setCategories((current) => buildPerpsCategories(body.data ?? [], current))
      } catch { /* Keep the most recent live or cached prices visible. */ }
    }
    void refresh()
    const timer = window.setInterval(() => void refresh(), cmcListingsCacheTtl)
    return () => { cancelled = true; window.clearInterval(timer) }
  }, [])

  const chartCandidates = Object.values(categories).flat().filter((asset) => asset.cmcId > 0 && asset.price !== null && !asset.points && !requestedCharts.current.has(asset.symbol))
  const chartKey = chartCandidates.map((asset) => asset.symbol).sort().join('|')
  useEffect(() => {
    let cancelled = false
    const loadCharts = async () => {
      await Promise.all(chartCandidates.map(async (asset) => {
        requestedCharts.current.add(asset.symbol)
        try {
          const points = await getChartPoints(asset.symbol)
          if (cancelled) return
          setCategories((current) => ({
            crypto: current.crypto.map((item) => item.symbol === asset.symbol ? { ...item, points: syncChartWithLatestPrice(points, item.price) } : item),
            stocks: current.stocks.map((item) => item.symbol === asset.symbol ? { ...item, points: syncChartWithLatestPrice(points, item.price) } : item),
            commodities: current.commodities.map((item) => item.symbol === asset.symbol ? { ...item, points: syncChartWithLatestPrice(points, item.price) } : item),
          }))
        } catch { /* The fallback chart remains visible when historical data is unavailable. */ }
      }))
    }
    if (chartKey) void loadCharts()
    return () => { cancelled = true }
  }, [chartKey])

  return categories
}

function PerpsHeroMark() {
  return <span className="perps-hero-mark" aria-hidden="true"><img src="/binahat.png" alt="" /></span>
}

function PerpsAssetMark({ mark }: { mark: PerpsMarket['mark'] }) {
  if (mark === 'bitcoin') return <span className="perps-asset-mark perps-bitcoin-mark" aria-hidden="true">₿</span>
  if (mark === 'ethereum') return <span className="perps-asset-mark perps-ethereum-mark" aria-hidden="true"><svg viewBox="0 0 28 38" fill="none"><path d="m14 1 13 20.4L14 28.5 1 21.4 14 1Z" fill="#273239" /><path d="m14 1-13 20.4L14 28.5V1Z" fill="#8d969b" /><path d="m14 30.8 13-7L14 38 1 23.8l13 7Z" fill="#253139" /><path d="m14 30.8-13-7L14 38V30.8Z" fill="#a5afb4" /></svg></span>
  if (mark === 'spcx') return <span className="perps-asset-mark perps-spcx-mark" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="M8 31.5 40 16.8M8 16.8 40 31.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><path d="m19.1 19.8 10.1 8.4M19.1 28.2l10.1-8.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg></span>
  return <span className="perps-asset-mark perps-skhynix-mark" aria-hidden="true"><svg viewBox="0 0 52 38" fill="none"><path d="m3 6 20 9.4-8.1 7.4L3 6Z" fill="#e73834" /><path d="m5.2 29.8 9.7-7.4 8.1 9.9-17.8-2.5Z" fill="#f1ad18" /><path d="m24 15.4 14.9-9.8 9.2 13.1-12 8L24 15.4Z" fill="#f2ad19" /><path d="m23.2 31.9 12.5-5.2 10.9 4.9-23.4.3Z" fill="#e73834" /></svg></span>
}

function PerpsMiniChart({ points, positive = false, compact = false, fallbackPoints }: { points?: number[]; positive?: boolean; compact?: boolean; fallbackPoints?: number[] }) {
  const displayPoints = getChartDisplayPoints(points, fallbackPoints)
  if (!displayPoints?.length) return <span className={`perps-mini-chart perps-mini-chart-loading${compact ? ' compact' : ''}`} aria-label="Chart loading" />
  const chartPoints = createSparklinePoints(displayPoints)
  const min = Math.min(...chartPoints)
  const max = Math.max(...chartPoints)
  const range = max - min || 1
  const coords = chartPoints.map((point, index) => `${(index / Math.max(chartPoints.length - 1, 1)) * 112},${58 - ((point - min) / range) * 49}`).join(' ')
  const lastPoint = chartPoints[chartPoints.length - 1]
  return <svg className={`perps-mini-chart${positive ? ' positive' : ''}${compact ? ' compact' : ''}`} viewBox="0 0 112 64" preserveAspectRatio="none" aria-hidden="true"><polygon points={`0,64 ${coords} 112,64`} /><polyline points={coords} /><circle cx="112" cy={58 - ((lastPoint - min) / range) * 49} r="3.4" /></svg>
}

function PerpsCategorySection({ title, assets, onSelect }: { title: string; assets: MarketAsset[]; onSelect: (asset: MarketAsset) => void }) {
  return <section className="perps-category-section" aria-labelledby={`perps-${title.toLowerCase().replaceAll(' ', '-')}`}>
    <h2 id={`perps-${title.toLowerCase().replaceAll(' ', '-')}`}>{title} <Icon name="chevron" size={21} /></h2>
    <div className="perps-category-list">{assets.map((asset) => <button type="button" className="perps-category-row" key={`${title}-${asset.symbol}`} onClick={() => onSelect(asset)} aria-label={`View ${asset.name}`}><CryptoMark asset={asset} /><span className="perps-category-identity"><strong>{asset.base}</strong><small>{asset.name}</small></span><PerpsMiniChart points={asset.points} fallbackPoints={createFallbackChartPoints(asset.symbol, asset.price, asset.change24h)} positive={(asset.change24h ?? -1) >= 0} compact /><span className={`perps-category-price${asset.change24h !== null && asset.change24h >= 0 ? ' positive' : ''}`}><strong>{formatUsd(asset.price)}</strong><small>{formatPercent(asset.change24h)}</small></span></button>)}</div>
  </section>
}

function PerpsScreen({ onOpenSettings, onOpenSearch, onOpenHistory, onSelect }: { onOpenSettings: () => void; onOpenSearch: () => void; onOpenHistory: () => void; onSelect: (asset: MarketAsset) => void }) {
  const categories = usePerpsCategoryAssets()

  return <section className="perps-trading-screen" aria-labelledby="perps-title">
    <header className="perps-header">
      <div className="perps-header-actions"><button type="button" className="perps-header-button" onClick={onOpenHistory} aria-label="Open Perps history"><Icon name="clock" size={22} /></button><button type="button" className="perps-header-button" onClick={onOpenSettings} aria-label="Open settings"><Icon name="settings" size={22} /></button></div>
      <h1 id="perps-title">Perps</h1>
      <button type="button" className="perps-header-button perps-search-button" onClick={onOpenSearch} aria-label="Search assets"><Icon name="search" size={22} /></button>
    </header>
    <section className="perps-deposit-promo" aria-label="Fund your first perpetual position"><div><h2>Deposit to fund your<br />first position</h2><button type="button" className="perps-deposit-button">Deposit</button></div><PerpsHeroMark /></section>
    <section className="perps-popular-section" aria-labelledby="popular-perps-title"><h2 id="popular-perps-title">Popular <Icon name="chevron" size={23} /></h2><div className="perps-market-list">{perpsMarkets.map((market) => <button type="button" className="perps-market-row" key={market.id} onClick={() => onSelect(toPerpsMarketAsset(market))} aria-label={`View ${market.symbol}`}><div className="perps-market-identity"><span className="perps-market-icon"><PerpsAssetMark mark={market.mark} /><PerpsVenueBadge /></span><span className="perps-market-copy"><span><strong>{market.symbol}</strong><em>{market.leverage}</em></span><small>{market.volume}</small></span></div><PerpsMiniChart points={market.points} positive={market.positive} /><span className={`perps-market-price${market.positive ? ' positive' : ''}`}><strong>{market.price}</strong><small>{market.change}</small></span></button>)}</div></section>
    <PerpsCategorySection title="Crypto" assets={categories.crypto} onSelect={onSelect} />
    <PerpsCategorySection title="Crypto Stocks" assets={categories.stocks} onSelect={onSelect} />
    <PerpsCategorySection title="Commodities" assets={categories.commodities} onSelect={onSelect} />
    <div className="perps-trade-actions" aria-label="Trade direction"><button type="button" className="perps-long-button">Long <span>↗</span></button><button type="button" className="perps-short-button">Short <span>↘</span></button></div>
  </section>
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
    const timer = window.setInterval(() => void refresh(), cmcListingsCacheTtl)
    return () => window.clearInterval(timer)
  }, [])

  return { assets, setAssets, isLoading, error, refresh }
}

function useTopTrendingAssets() {
  const cachedListings = readPersistentCmc<{ data?: CmcListing[] }>(topTrendingListingsPath)?.value.data ?? []
  const [assets, setAssets] = useState<TrendingMarketAsset[]>(() => buildTopTrendingAssets(cachedListings))

  useEffect(() => {
    let cancelled = false
    const refresh = async () => {
      try {
        const body = await cmcFetch<{ data?: CmcListing[] }>(topTrendingListingsPath)
        if (!cancelled) setAssets((current) => buildTopTrendingAssets(body.data ?? [], current))
      } catch {
        // Keep the latest cached Top Trending list visible while CMC is unavailable.
      }
    }

    void refresh()
    const timer = window.setInterval(() => void refresh(), cmcListingsCacheTtl)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  return assets
}

function useSearchAssetCache() {
  const cachedListings = readPersistentCmc<{ data?: CmcListing[] }>(topTrendingListingsPath)?.value.data ?? []
  const [assets, setAssets] = useState<MarketAsset[]>(() => mapCmcListingsToAssets(cachedListings, [], true))

  useEffect(() => {
    let cancelled = false
    const refresh = async () => {
      try {
        const body = await cmcFetch<{ data?: CmcListing[] }>(topTrendingListingsPath)
        if (!cancelled) setAssets((current) => mapCmcListingsToAssets(body.data ?? [], current, true))
      } catch {
        // Keep the cached list ready for offline search if CMC is temporarily unavailable.
      }
    }

    void refresh()
    const timer = window.setInterval(() => void refresh(), cmcListingsCacheTtl)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  return assets
}

function MarketChart({ points, positive }: { points?: number[]; positive: boolean }) {
  if (!points?.length) return <div className="detail-chart-loading">Loading live chart…</div>
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const coords = points.map((point, index) => `${(index / Math.max(points.length - 1, 1)) * 100},${260 - ((point - min) / range) * 220}`).join(' ')
  const chartColor = positive ? '#008a38' : '#b40029'
  return <svg className={`detail-chart ${positive ? 'positive' : ''}`} viewBox="0 0 100 280" preserveAspectRatio="none" aria-label="7 day price chart"><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={chartColor} stopOpacity=".38" /><stop offset="1" stopColor={chartColor} stopOpacity="0" /></linearGradient></defs><polygon points={`0,280 ${coords} 100,280`} /><polyline points={coords} /></svg>
}

function MarketTopCardSkeleton() {
  return <div className="top-card top-card-skeleton" aria-hidden="true"><span className="market-skeleton-line top-skeleton-name" /><span className="market-skeleton-line top-skeleton-price" /><span className="market-skeleton-line top-skeleton-change" /><span className="top-skeleton-chart" /></div>
}

function MarketRowSkeleton() {
  return <div className="market-row market-row-skeleton" aria-hidden="true"><div className="market-row-main"><span className="market-skeleton-avatar" /><span className="market-skeleton-copy"><i className="market-skeleton-line" /><i className="market-skeleton-line" /></span></div><span className="market-skeleton-chart" /><span className="market-skeleton-price"><i className="market-skeleton-line" /><i className="market-skeleton-line" /></span></div>
}

function MarketsScreen({ onSelect, onOpenSearch, onOpenSwap }: { onSelect: (asset: MarketAsset) => void; onOpenSearch: () => void; onOpenSwap: () => void }) {
  const { assets, setAssets, isLoading, error, refresh } = useMarketData()
  const topTrendingAssets = useTopTrendingAssets()
  const [filter, setFilter] = useState('Trending')
  const previewRequested = useRef(new Set<string>())
  const [previewBatch, setPreviewBatch] = useState(0)
  const previewCandidates = assets.filter((asset) => !asset.points && !previewRequested.current.has(asset.symbol)).slice(0, 6)
  const previewSymbols = previewCandidates.map((asset) => asset.symbol).join('|')

  useEffect(() => {
    let cancelled = false
    const loadPreviews = async () => {
      await Promise.all(previewCandidates.map(async (asset) => {
        previewRequested.current.add(asset.symbol)
        try {
          const points = await getChartPoints(asset.symbol)
          if (cancelled) return
          setAssets((current) => current.map((item) => item.symbol === asset.symbol ? { ...item, points } : item))
        } catch { /* The fallback chart remains visible when historical data is unavailable. */ }
      }))
      if (!cancelled) setPreviewBatch((current) => current + 1)
    }
    if (previewSymbols) void loadPreviews()
    return () => { cancelled = true }
  }, [previewBatch, previewSymbols])

  const visibleAssets = assets
  const topAssets = topTrendingAssets.length ? topTrendingAssets : assets.slice(0, 10)
  const showTopSkeleton = !topTrendingAssets.length && isLoading
  const showMarketSkeleton = !visibleAssets.length && isLoading

  return <section className="markets-screen" aria-busy={isLoading || showTopSkeleton}>
    <header className="markets-heading"><h1>Markets</h1><button className="search-circle" onClick={onOpenSearch} aria-label="Search assets"><Icon name="search" size="md" /></button></header>
    <div className="market-promos"><button><span className="promo-icon market-promo-predictions" aria-hidden="true" />Predictions</button><button><span className="promo-icon market-promo-meme-rush" aria-hidden="true" />Meme Rush</button></div>
    <h2 className="market-section-title">Top Trending</h2>
    <div className="top-traded-row">{showTopSkeleton ? Array.from({ length: 4 }, (_, index) => <MarketTopCardSkeleton key={index} />) : topAssets.map((asset) => <button className="top-card" key={asset.base} onClick={() => onSelect(asset)}><div className="top-card-name"><span>{asset.name}</span><CryptoMark asset={asset} /></div><strong>{formatUsd(asset.price)}</strong><span className={`market-change ${asset.change24h !== null && asset.change24h >= 0 ? 'positive-text' : ''}`}>{formatPercent(asset.change24h)}</span><Sparkline points={asset.points} fallbackPoints={createFallbackChartPoints(asset.symbol, asset.price, asset.change24h)} positive={(asset.change24h ?? -1) >= 0} /></button>)}</div>
    <div className="market-filter-panel">
      <div className="market-filters"><button className="filter-star"><Icon name="star" size="sm" /></button>{['Trending', 'bStocks', 'Ondo', 'Stock Meme', 'Popular'].map((item) => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <div className="market-sort"><button>Network <Icon name="chevron" size="xs" /></button><button>Volume (24h) <span>↓</span></button><button>24h <Icon name="chevron" size="xs" /></button></div>
    </div>
    {error && <button className="market-error" onClick={() => void refresh()}>{error} · Retry</button>}
    <div className="market-list">{showMarketSkeleton ? Array.from({ length: 8 }, (_, index) => <MarketRowSkeleton key={index} />) : visibleAssets.map((asset) => <button className="market-row" key={asset.base} onClick={() => onSelect(asset)}><div className="market-row-main"><CryptoMark asset={asset} /><div><strong>{asset.name}</strong><span>{asset.base}/USDT · MCap</span></div></div><span className="market-row-chart"><Sparkline points={asset.points} fallbackPoints={createFallbackChartPoints(asset.symbol, asset.price, asset.change24h)} positive={(asset.change24h ?? -1) >= 0} /></span><div className="market-row-price"><strong>{formatUsd(asset.price)}</strong><span className={(asset.change24h ?? -1) >= 0 ? 'positive-text' : ''}>{formatPercent(asset.change24h)}</span></div></button>)}</div>
    <button type="button" className="swap-cta" onClick={onOpenSwap}><Icon name="swap" size="md" />Swap</button>
  </section>
}

function matchesAssetSearch(asset: MarketAsset, query: string) {
  return `${asset.name} ${asset.base} ${asset.symbol}`.toLowerCase().includes(query)
}

function SearchAssetRow({ asset, isWatched, onSelect, onToggleWatchlist }: { asset: MarketAsset; isWatched: boolean; onSelect: (asset: MarketAsset) => void; onToggleWatchlist: (asset: MarketAsset) => void }) {
  return <article className="search-result-row">
    <button type="button" className="search-result-main" onClick={() => onSelect(asset)} aria-label={`View ${asset.name}`}><CryptoMark asset={asset} /><span className="search-result-copy"><strong>{asset.name}</strong><small>{asset.base} · {formatCompactUsd(asset.marketCap)} MCap</small></span><span className={`search-result-price${(asset.change24h ?? -1) >= 0 ? ' positive' : ''}`}><strong>{formatUsd(asset.price)}</strong><small>{formatPercent(asset.change24h)}</small></span></button>
    <button type="button" className={`search-result-star${isWatched ? ' active' : ''}`} onClick={() => onToggleWatchlist(asset)} aria-label={isWatched ? `Remove ${asset.name} from watchlist` : `Add ${asset.name} to watchlist`} aria-pressed={isWatched}><Icon name="star" size={23} /></button>
  </article>
}

function SearchScreen({ assets, history, watchlist, watchedSymbols, onClose, onSelect, onToggleWatchlist, onClearHistory }: {
  assets: MarketAsset[]
  history: MarketAsset[]
  watchlist: MarketAsset[]
  watchedSymbols: ReadonlySet<string>
  onClose: () => void
  onSelect: (asset: MarketAsset) => void
  onToggleWatchlist: (asset: MarketAsset) => void
  onClearHistory: () => void
}) {
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const assetsBySymbol = new Map(assets.map((asset) => [asset.symbol, asset]))
  const recents = history.map((asset) => assetsBySymbol.get(asset.symbol) ?? asset)
  const visibleWatchlist = watchlist.map((asset) => assetsBySymbol.get(asset.symbol) ?? asset).filter((asset) => !normalizedQuery || matchesAssetSearch(asset, normalizedQuery))
  const searchResults = normalizedQuery
    ? assets.filter((asset) => !watchedSymbols.has(asset.symbol) && matchesAssetSearch(asset, normalizedQuery)).sort((left, right) => {
      const leftKey = `${left.name} ${left.base} ${left.symbol}`.toLowerCase()
      const rightKey = `${right.name} ${right.base} ${right.symbol}`.toLowerCase()
      const leftRank = left.base.toLowerCase() === normalizedQuery ? 0 : leftKey.startsWith(normalizedQuery) ? 1 : 2
      const rightRank = right.base.toLowerCase() === normalizedQuery ? 0 : rightKey.startsWith(normalizedQuery) ? 1 : 2
      return leftRank - rightRank || (right.volume24h ?? 0) - (left.volume24h ?? 0)
    }).slice(0, 50)
    : assets.filter((asset) => !watchedSymbols.has(asset.symbol)).sort((left, right) => (right.volume24h ?? 0) - (left.volume24h ?? 0)).slice(0, 20)

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), 2400)
    return () => window.clearTimeout(timer)
  }, [notice])

  const selectAsset = (asset: MarketAsset) => onSelect(asset)
  const toggleWatchlist = (asset: MarketAsset) => {
    const isWatched = watchedSymbols.has(asset.symbol)
    onToggleWatchlist(asset)
    setNotice(isWatched ? 'Removed from Watchlist' : 'Added to Watchlist')
  }

  return <section className="search-screen" aria-labelledby="search-title">
    {notice && <div className="search-toast" role="status">{notice}</div>}
    <header className="search-screen-header">
      <label className="global-search-input" id="search-title"><Icon name="search" size={24} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tokens, stocks, dApps, address…" aria-label="Search tokens, stocks, dApps, or addresses" /></label>
      <button type="button" className="global-search-close" onClick={onClose} aria-label="Close search"><Icon name="close" size={23} /></button>
    </header>

    {visibleWatchlist.length > 0 && <section className="search-watchlist" aria-labelledby="watchlist-title">
      <div className="search-section-heading"><h2 id="watchlist-title">Watchlist</h2><span>{visibleWatchlist.length}</span></div>
      <div className="search-results-list search-watchlist-list">{visibleWatchlist.map((asset) => <SearchAssetRow asset={asset} isWatched key={asset.symbol} onSelect={selectAsset} onToggleWatchlist={toggleWatchlist} />)}</div>
    </section>}

    {recents.length > 0 && <section className="search-recents" aria-labelledby="recents-title">
      <div className="search-section-heading"><h2 id="recents-title">Recents</h2><button type="button" onClick={onClearHistory}>Clear all</button></div>
      <div className="search-recents-list">{recents.map((asset) => <button type="button" className="search-recent-item" key={asset.symbol} onClick={() => selectAsset(asset)}><CryptoMark asset={asset} /><span>{asset.name}</span></button>)}</div>
    </section>}

    <section className="search-results-section" aria-labelledby="search-results-title">
      <h2 id="search-results-title">{normalizedQuery ? 'Results' : 'Trending'}</h2>
      {searchResults.length ? <div className="search-results-list">{searchResults.map((asset) => <SearchAssetRow asset={asset} isWatched={false} key={asset.symbol} onSelect={selectAsset} onToggleWatchlist={toggleWatchlist} />)}</div> : <p className="search-empty-state">No matching assets in the cached list.</p>}
    </section>
  </section>
}

function TokenFilterIcon() {
  return <svg className="tokens-filter-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M4 8h20M4 20h20M11 8a3 3 0 1 0-6 0 3 3 0 0 0 6 0ZM23 20a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
}

function MainBottomDock({ activeTab, onNavigate }: { activeTab: 'home' | 'markets' | 'perps' | 'discover'; onNavigate: AppNavigate }) {
  return <nav className="bottom-dock" aria-label="Main navigation">
    <div className="nav-pill">
      <button className={`nav-item${activeTab === 'home' ? ' active' : ''}`} onClick={() => onNavigate('/')} aria-label="Home"><Icon name="home" size={22} /></button>
      <button className={`nav-item${activeTab === 'markets' ? ' active' : ''}`} onClick={() => onNavigate('/markets')} aria-label="Markets"><Icon name="chart" size={22} /></button>
      <button className={`nav-item perps-nav-item${activeTab === 'perps' ? ' active' : ''}`} onClick={() => onNavigate('/perps')} aria-label="Open Perps"><Icon name="infinity" size={21} /></button>
      <button className={`nav-item${activeTab === 'discover' ? ' active' : ''}`} onClick={() => onNavigate('/discover')} aria-label="Discover"><Icon name="compass" size={22} /></button>
    </div>
    <button className="nav-search" aria-label="Search" onClick={() => onNavigate('/search', { returnTo: window.location.pathname })}><Icon name="search" size={27} /></button>
  </nav>
}

function TokensScreen({ tokens, prices, onBack, onSelect, onNavigate }: { tokens: WalletToken[]; prices: Record<string, number>; onBack: () => void; onSelect: (token: WalletToken) => void; onNavigate: AppNavigate }) {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const visibleTokens = tokens.filter((token) => !normalizedQuery || `${token.name} ${token.symbol}`.toLowerCase().includes(normalizedQuery))

  return <section className="tokens-screen" aria-labelledby="tokens-title">
    <header className="tokens-screen-header">
      <button type="button" className="tokens-back-button" onClick={onBack} aria-label="Back to home"><BackArrowIcon /></button>
      <h1 id="tokens-title">Tokens</h1>
      <button type="button" className="tokens-filter-button" aria-label="Token filters"><TokenFilterIcon /></button>
    </header>
    <label className="tokens-search-field"><Icon name="search" size={25} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search tokens" /></label>
    <div className="tokens-screen-list">
      {visibleTokens.length ? visibleTokens.map((token) => {
        const value = getWalletTokenValue(token, prices)
        return <button type="button" className="tokens-screen-row" key={token.id} onClick={() => onSelect(token)} aria-label={`Open ${token.name}`}>
          <TokenMark token={token} />
          <span className="tokens-screen-copy"><strong>{token.name}</strong><small>{formatTokenBalance(token.balance)} {token.symbol}</small></span>
          <span className="tokens-screen-value"><strong>{formatUsd(value)}</strong><small>{formatUsd(value)}</small></span>
        </button>
      }) : <p className="tokens-empty-state">No tokens found.</p>}
    </div>
    <MainBottomDock activeTab="home" onNavigate={onNavigate} />
  </section>
}

function shortenWalletAddress(value: string) {
  if (value === 'Initial wallet balance' || value.length <= 14) return value
  return `${value.slice(0, 6)}...${value.slice(-4)}`
}

function getHistoryDayStart(timestamp: number) {
  const date = new Date(timestamp)
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

function getInitialHistoryDayStart() {
  const date = new Date(2026, 7, 13)
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

function getHistoryTimestamp(dayStart: number, hour: number, minute: number) {
  const date = new Date(dayStart)
  date.setHours(hour, minute, 0, 0)
  return date.getTime()
}

function normalizeHistoryTimestamp(timestamp: number) {
  // A few older builds stored Unix seconds instead of milliseconds.
  return timestamp < 1_000_000_000_000 ? timestamp * 1000 : timestamp
}

function formatHistoryDay(timestamp: number) {
  const dayStart = getHistoryDayStart(timestamp)
  const todayStart = getHistoryDayStart(Date.now())
  if (dayStart === todayStart) return 'Today'
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function formatHistoryTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function formatHistoryDateTime(timestamp: number) {
  const date = new Date(timestamp)
  return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} ${formatHistoryTime(timestamp)}`
}

function HistoryDirectionIcon({ direction }: { direction: WalletHistoryDirection }) {
  const isSent = direction === 'send'
  return <svg className={`history-direction-arrow ${isSent ? 'sent' : 'received'}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d={isSent ? 'M12 19V5M6.5 10.5 12 5l5.5 5.5' : 'M12 5v14M6.5 13.5 12 19l5.5-5.5'} stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

function HistoryTokenIcon({ symbol }: { symbol: string }) {
  const definition = walletTokenDefinitions.find((token) => token.symbol === symbol)
  if (definition) return <TokenMark token={{ ...definition, balance: 0 }} />
  return <span className="history-token-fallback" aria-hidden="true">{symbol.slice(0, 1)}</span>
}

function getHistoryNetworkDetails(entry: WalletHistoryEntry) {
  const hashSeed = Array.from(entry.id).reduce((total, character, index) => total + character.charCodeAt(0) * (index + 11), 0)
  const isSent = entry.direction === 'send'
  const fee = isSent ? 0 : 0.00000568
  return {
    fee,
    feeUsd: fee * 600,
    nonce: isSent ? 4 + (hashSeed % 8) : 638790 + (hashSeed % 120),
  }
}

function HistoryDetailsSheet({ entry, usdtPrice, onClose }: { entry: WalletHistoryEntry; usdtPrice: number; onClose: () => void }) {
  const isSent = entry.direction === 'send'
  const usdValue = entry.symbol === 'USDT' ? entry.amount * usdtPrice : entry.amount * (walletTokenDefinitions.find((token) => token.symbol === entry.symbol)?.fallbackPrice ?? 0)
  const network = getHistoryNetworkDetails(entry)
  const partyLabel = isSent ? 'Recipient' : 'Sender'

  return <div className="history-detail-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="history-detail-sheet" role="dialog" aria-modal="true" aria-labelledby="history-detail-title">
      <header className="history-detail-header">
        <button type="button" className="history-detail-icon-button" onClick={() => undefined} aria-label="Share transaction"><Icon name="share" size={24} /></button>
        <h2 id="history-detail-title">{isSent ? 'Sent' : 'Received'}</h2>
        <button type="button" className="history-detail-icon-button" onClick={onClose} aria-label="Close transaction details"><Icon name="close" size={27} /></button>
      </header>

      <div className="history-detail-summary">
        <strong>≈ {formatUsd(usdValue)}</strong>
        <span>{isSent ? '-' : '+'}{formatTokenBalance(entry.amount)} {entry.symbol}</span>
      </div>

      <div className="history-detail-card">
        <div className="history-detail-row"><span>Date</span><strong>{formatHistoryDateTime(entry.createdAt)}</strong></div>
        <div className="history-detail-row"><span>Status <Icon name="info" size={18} /></span><strong className="history-detail-success">Completed</strong></div>
        <div className="history-detail-row"><span>{partyLabel}</span><strong>{shortenWalletAddress(entry.counterparty)}</strong></div>
      </div>

      <div className="history-detail-card history-detail-network-card">
        <div className="history-detail-row"><span>Network fee <Icon name="info" size={18} /></span><div className="history-detail-value"><strong>{network.fee === 0 ? '0 BNB' : `${network.fee.toFixed(8)} BNB`}</strong>{network.fee > 0 && <small>≈ {formatUsd(network.feeUsd)}</small>}</div></div>
        <div className="history-detail-row"><span>Nonce</span><strong>{network.nonce.toLocaleString('en-US')}</strong></div>
      </div>

      <button type="button" className="history-detail-explorer" onClick={() => undefined}>View on block explorer</button>
    </section>
  </div>
}

function HistoryScreen({ wallet, entries, usdtPrice, onBack }: { wallet: WalletDefinition; entries: WalletHistoryEntry[]; usdtPrice: number; onBack: () => void }) {
  const [selectedEntry, setSelectedEntry] = useState<WalletHistoryEntry | null>(null)
  const walletEntries = entries.filter((entry) => entry.walletId === wallet.id).sort((left, right) => right.createdAt - left.createdAt)
  const historyGroups = walletEntries.reduce((groups, entry) => {
    const dayKey = new Date(entry.createdAt).toDateString()
    const group = groups.get(dayKey)
    if (group) group.push(entry)
    else groups.set(dayKey, [entry])
    return groups
  }, new Map<string, WalletHistoryEntry[]>())

  useEffect(() => {
    if (!selectedEntry) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedEntry(null)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedEntry])

  return <section className="history-screen" aria-labelledby="history-title">
    <header className="history-header">
      <button type="button" className="history-back-button" onClick={onBack} aria-label="Back to home"><BackArrowIcon /></button>
      <h1 id="history-title">History</h1>
      <span className="history-header-spacer" aria-hidden="true" />
    </header>

    <div className="history-tabs" role="tablist" aria-label="History sections">
      <button type="button" className="history-tab active" role="tab" aria-selected="true">Transaction History</button>
      <button type="button" className="history-tab" role="tab" aria-selected="false">Orders</button>
      <button type="button" className="history-tab" role="tab" aria-selected="false">Order History</button>
    </div>

    <div className="history-filters">
      <button type="button" className="history-filter-button">Filters <Icon name="chevron" size={17} /></button>
      <button type="button" className="history-filter-button">All Networks <Icon name="chevron" size={17} /></button>
    </div>

    <div className="history-list">
      {walletEntries.length ? Array.from(historyGroups.values()).map((group) => <section className="history-day-group" key={group[0].createdAt}>
        <h2 className="history-day-heading">{formatHistoryDay(group[0].createdAt)}</h2>
        {group.map((entry) => {
          const isSent = entry.direction === 'send'
          const amount = `${isSent ? '-' : '+'}${formatTokenBalance(entry.amount)} ${entry.symbol}`
          const usdValue = entry.symbol === 'USDT' ? entry.amount * usdtPrice : entry.amount * (walletTokenDefinitions.find((token) => token.symbol === entry.symbol)?.fallbackPrice ?? 0)
          return <button type="button" className="history-entry" key={entry.id} onClick={() => setSelectedEntry(entry)} aria-label={`View ${isSent ? 'sent' : 'received'} transaction details`}>
            <div className={`history-entry-icon ${isSent ? 'sent' : 'received'}`}><HistoryDirectionIcon direction={entry.direction} /></div>
            <HistoryTokenIcon symbol={entry.symbol} />
            <div className="history-entry-copy"><strong>{isSent ? 'Sent' : 'Received'}</strong><span>{isSent ? 'To: ' : 'From: '}{shortenWalletAddress(entry.counterparty)} · {formatHistoryTime(entry.createdAt)}</span></div>
            <div className={`history-entry-value ${isSent ? 'sent' : 'received'}`}><strong>{amount}</strong><small>{formatUsd(usdValue)}</small></div>
          </button>
        })}
      </section>) : <p className="history-empty-state">No transactions yet.</p>}
    </div>
    {selectedEntry && <HistoryDetailsSheet entry={selectedEntry} usdtPrice={usdtPrice} onClose={() => setSelectedEntry(null)} />}
  </section>
}

type SwapCurrency = 'hype' | 'whale'

const swapCurrencies: Record<SwapCurrency, { symbol: string; label: string; usdPrice: number }> = {
  hype: { symbol: 'HYPE', label: 'HYPE', usdPrice: 12.84 },
  whale: { symbol: 'WHALE', label: '大鱼 🐟', usdPrice: .84 },
}

function SwapTokenMark({ currency }: { currency: SwapCurrency }) {
  return <span className={`swap-token-mark ${currency}`} aria-hidden="true">{currency === 'hype'
    ? <svg viewBox="0 0 34 34" fill="none"><path d="M5 19.7c3.6-7.8 7-10.3 10.2-7.3 2.8 2.7 3 8.1 5.7 8.1 2.4 0 3.7-4 5.1-7.6" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" /><path d="M5.1 19.6c3.8 4.3 7.5 6 10.2 3.3 2.7-2.7 3.3-8.2 5.7-8.2 2.5 0 3.9 2.4 5.1 5" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" /></svg>
    : <svg viewBox="0 0 34 34" fill="none"><path d="M7 17.4c3.6-6.5 12.7-8 18.2-2.8-1 5.4-5.7 9.5-11.2 9.5-3.2 0-5.6-1.2-7-3.2 1.9-.2 3.6-1.7 4.1-3.5-1.2.6-2.6.6-4.1 0Z" fill="currentColor" /><path d="M25.2 14.6 29 11v8l-3.8-2.8" fill="currentColor" /><circle cx="18.4" cy="15.8" r="1.2" fill="#fff" /></svg>}</span>
}

function SwapControlsIcon() {
  return <svg className="swap-controls-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M5 8h18M5 20h18M10.5 8a2.6 2.6 0 1 0-5.2 0 2.6 2.6 0 0 0 5.2 0ZM22.7 20a2.6 2.6 0 1 0-5.2 0 2.6 2.6 0 0 0 5.2 0Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
}

function SwapBackspaceIcon() {
  return <svg className="swap-backspace-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M24.5 5.5H9.1c-.7 0-1.4.35-1.8.95L2.2 13.4a1.1 1.1 0 0 0 0 1.2l5.1 6.95c.4.6 1.1.95 1.8.95h15.4c.85 0 1.55-.7 1.55-1.55v-13.9c0-.85-.7-1.55-1.55-1.55Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" /><path d="m12.4 10.7 6.8 6.6m0-6.6-6.8 6.6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" /></svg>
}

function formatSwapQuantity(value: number) {
  if (!Number.isFinite(value) || value <= 0) return '0'
  return value.toLocaleString('en-US', { maximumFractionDigits: 6 })
}

function SwapScreen({ onBack }: { onBack: () => void }) {
  const [amount, setAmount] = useState('')
  const [isReversed, setIsReversed] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const fromKey: SwapCurrency = isReversed ? 'whale' : 'hype'
  const toKey: SwapCurrency = isReversed ? 'hype' : 'whale'
  const from = swapCurrencies[fromKey]
  const to = swapCurrencies[toKey]
  const amountValue = Number(amount)
  const validAmount = Number.isFinite(amountValue) && amountValue > 0 ? amountValue : 0
  const outputAmount = validAmount * from.usdPrice / to.usdPrice
  const inputUsd = validAmount * from.usdPrice
  const outputUsd = outputAmount * to.usdPrice
  const hasInsufficientBalance = validAmount > 0

  const addKey = (key: string) => {
    setAmount((current) => {
      if (key === '.') return current.includes('.') ? current : `${current || '0'}.`
      if (current === '0') return key
      return `${current}${key}`.slice(0, 14)
    })
  }

  const updatePercentage = (value: number) => {
    setPercentage(value)
    // The demonstration pair starts with zero balance, matching the reference state.
    setAmount('')
  }

  const reversePair = () => {
    setIsReversed((current) => !current)
    setAmount('')
    setPercentage(0)
  }

  const keypad = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  return <section className="swap-screen" aria-labelledby="swap-title">
    <header className="swap-header"><button type="button" className="swap-round-button" onClick={onBack} aria-label="Back"><BackArrowIcon /></button><h1 id="swap-title">Swap</h1><button type="button" className="swap-market-button">Market <Icon name="chevron" size={19} /></button><button type="button" className="swap-round-button" aria-label="Swap settings"><SwapControlsIcon /></button></header>
    <section className="swap-form" aria-label="Swap form">
      <div className="swap-amount-card">
        <button type="button" className="swap-amount-display" onClick={() => setAmount((current) => current)} aria-label={`Amount of ${from.symbol}`}><strong>{amount || '0'}</strong>{!amount && <i aria-hidden="true" />}</button>
        <button type="button" className="swap-token-picker" aria-label={`From ${from.symbol}`}><SwapTokenMark currency={fromKey} /><strong>{from.label}</strong></button>
        <span className="swap-usd-value">${inputUsd.toFixed(2)} <Icon name="refresh" size={16} /></span>
        <span className="swap-available"><Icon name="wallet" size={16} /> 0</span>
      </div>
      <button type="button" className="swap-direction-button" onClick={reversePair} aria-label="Reverse swap direction"><Icon name="chevron" size={24} /></button>
      <div className="swap-amount-card swap-output-card">
        <div className="swap-amount-display" aria-label={`Estimated amount of ${to.symbol}`}><strong>{formatSwapQuantity(outputAmount)}</strong></div>
        <button type="button" className="swap-token-picker" aria-label={`To ${to.symbol}`}><SwapTokenMark currency={toKey} /><strong>{to.label}</strong></button>
        <span className="swap-usd-value">${outputUsd.toFixed(2)}</span>
        <span className="swap-available"><Icon name="wallet" size={16} /> 0</span>
      </div>
    </section>
    {hasInsufficientBalance && <p className="swap-balance-warning" role="status">Not enough {from.symbol} balance</p>}
    <section className="swap-keypad-area" aria-label="Amount controls">
      <div className="swap-range-labels"><strong>Min</strong><strong>Max</strong></div>
      <input className="swap-range" type="range" min="0" max="100" step="25" value={percentage} onChange={(event) => updatePercentage(Number(event.target.value))} aria-label="Percentage of available balance" />
      <div className="swap-range-marks"><span>25%</span><span>50%</span><span>75%</span></div>
      <div className="swap-keypad">{keypad.map((key) => <button type="button" key={key} onClick={() => addKey(key)}>{key}</button>)}<button type="button" onClick={() => addKey('.')} aria-label="Decimal point">.</button><button type="button" onClick={() => addKey('0')}>0</button><button type="button" onClick={() => setAmount((current) => current.slice(0, -1))} aria-label="Delete amount"><SwapBackspaceIcon /></button></div>
    </section>
    <button type="button" className="swap-submit" disabled={hasInsufficientBalance || !validAmount}>Tap to Swap</button>
  </section>
}

type TransferMode = 'send' | 'receive'

function QrFallback({ value }: { value: string }) {
  const size = 29
  const seed = Array.from(value).reduce((total, character, index) => (total + character.charCodeAt(0) * (index + 17)) >>> 0, 0)
  const inFinder = (x: number, y: number, left: number, top: number) => {
    if (x < left || x > left + 6 || y < top || y > top + 6) return false
    const localX = x - left
    const localY = y - top
    return localX === 0 || localX === 6 || localY === 0 || localY === 6 || (localX >= 2 && localX <= 4 && localY >= 2 && localY <= 4)
  }
  const cells = Array.from({ length: size * size }, (_, index) => {
    const x = index % size
    const y = Math.floor(index / size)
    const finder = inFinder(x, y, 0, 0) || inFinder(x, y, size - 7, 0) || inFinder(x, y, 0, size - 7)
    const protectedArea = (x < 8 && y < 8) || (x > size - 9 && y < 8) || (x < 8 && y > size - 9)
    const mixed = ((seed ^ (index * 1103515245) ^ ((x + 3) * (y + 5) * 2654435761)) >>> 0) % 7
    return (finder || (!protectedArea && mixed < 3)) ? <rect key={index} x={x} y={y} width="1" height="1" rx=".12" /> : null
  })
  return <svg className="receive-qr-fallback" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="QR code preview">{cells}</svg>
}

const receiveQrImageCache = new Map<string, HTMLImageElement>()

function getReceiveQrUrl(value: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=500x500&format=svg&margin=0&data=${encodeURIComponent(value)}`
}

function preloadReceiveQr(value: string) {
  const url = getReceiveQrUrl(value)
  if (receiveQrImageCache.has(url)) return url
  const image = new Image()
  image.decoding = 'sync'
  image.src = url
  receiveQrImageCache.set(url, image)
  return url
}

function ReceiveQrCode({ value }: { value: string }) {
  const [failed, setFailed] = useState(false)
  const url = getReceiveQrUrl(value)
  useEffect(() => {
    preloadReceiveQr(value)
    setFailed(false)
  }, [value])
  if (failed) return <QrFallback value={value} />
  return <img className="receive-qr-image" src={url} alt="QR code for wallet address" decoding="sync" onError={() => setFailed(true)} />
}

function TransferHeader({ title, onBack, showInfo, onInfo }: { title: string; onBack: () => void; showInfo?: boolean; onInfo?: () => void }) {
  return <header className="transfer-heading"><button type="button" className="transfer-back-button" onClick={onBack} aria-label="Back to asset"><BackArrowIcon /></button><h1>{title}</h1>{showInfo ? <button type="button" className="transfer-info-button" onClick={onInfo} aria-label="About this receiving address"><Icon name="info" size="md" /></button> : <span aria-hidden="true" />}</header>
}

function TransferAsset({ asset }: { asset: MarketAsset }) {
  const assetType = asset.symbol === 'USDT' ? 'TOKEN' : 'COIN'
  return <div className="transfer-asset"><CryptoMark asset={asset} /><strong>{asset.base}</strong><span>{assetType}</span></div>
}

function fallbackCopyText(value: string) {
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  textarea.style.left = '-9999px'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  textarea.setSelectionRange(0, value.length)
  let copied = false
  try {
    copied = document.execCommand('copy')
  } finally {
    textarea.remove()
  }
  return copied
}

async function copyTextToClipboard(value: string) {
  try {
    if (typeof navigator.clipboard?.writeText === 'function') {
      await navigator.clipboard.writeText(value)
      return true
    }
  } catch {
    // Continue with the legacy browser fallback below.
  }
  try {
    return fallbackCopyText(value)
  } catch {
    return false
  }
}

function ReceiveScreen({ asset, wallet, onBack }: { asset: MarketAsset; wallet: WalletDefinition; onBack: () => void }) {
  const address = wallet.address
  const [feedback, setFeedback] = useState('')
  const [showAmount, setShowAmount] = useState(false)
  const [amount, setAmount] = useState('')
  const [showInfo, setShowInfo] = useState(false)

  const copyAddress = async () => {
    const copied = await copyTextToClipboard(address)
    setFeedback(copied ? 'Address copied' : 'Copy the address manually')
    window.setTimeout(() => setFeedback(''), 2200)
  }

  const shareAddress = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: `Receive ${asset.base}`, text: address })
        return
      }
    } catch {
      // Closing the native share sheet should not be treated as an error.
      return
    }
    void copyAddress()
  }

  return <section className="transfer-screen receive-screen">
    <TransferHeader title="Receive" onBack={onBack} showInfo onInfo={() => setShowInfo((current) => !current)} />
    <div className="receive-warning" role="note"><Icon name="info" size="sm" /><p>Only send <strong>{asset.base}</strong> assets to this address. Other assets will be lost forever.</p></div>
    {showInfo && <p className="transfer-info-note">This identifier belongs to {wallet.name}.</p>}
    <TransferAsset asset={asset} />
    <div className="receive-qr"><ReceiveQrCode value={amount ? `${address}?amount=${amount}` : address} /></div>
    <p className="receive-address">{address}</p>
    <p className="receive-memo">No memo required · {wallet.name}</p>
    <div className="receive-actions">
      <button type="button" onClick={() => void copyAddress()}><span><Icon name="copy" size="lg" /></span><strong>Copy</strong></button>
      <button type="button" onClick={() => setShowAmount((current) => !current)} aria-expanded={showAmount}><span className={showAmount ? 'selected' : ''}>#</span><strong>Set Amount</strong></button>
      <button type="button" onClick={() => void shareAddress()}><span><Icon name="share" size="lg" /></span><strong>Share</strong></button>
    </div>
    {showAmount && <label className="receive-amount-field"><span>Requested amount</span><div><input value={amount} onChange={(event) => setAmount(event.target.value.replace(/[^0-9.]/g, ''))} inputMode="decimal" placeholder="0" aria-label={`Requested ${asset.base} amount`} /><b>{asset.base}</b></div></label>}
    <span className="transfer-feedback" aria-live="polite">{feedback}</span>
  </section>
}

function SendScreen({ asset, onBack, senderWallet, wallets, onComplete }: { asset: MarketAsset; onBack: () => void; senderWallet: WalletDefinition; wallets: WalletDefinition[]; onComplete: (recipientWalletId: string, amount: number, senderWalletId: string) => void }) {
  const balance = asset.walletBalance ?? 0
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const amountValue = Number(amount)
  const recipientWallet = wallets.find((wallet) => wallet.address.toLowerCase() === recipient.trim().toLowerCase() || wallet.id.toLowerCase() === recipient.trim().toLowerCase())
  const recipientError = recipient && !recipientWallet ? 'Wallet ID was not found.' : recipientWallet?.id === senderWallet.id ? 'Choose a different wallet ID.' : ''
  const amountError = amount && (!Number.isFinite(amountValue) || amountValue <= 0) ? 'Enter an amount greater than zero.' : amountValue > balance ? 'Not enough balance' : ''
  const error = recipientError || amountError
  const canContinue = Boolean(recipientWallet) && recipientWallet?.id !== senderWallet.id && Number.isFinite(amountValue) && amountValue > 0 && amountValue <= balance
  const amountInUsd = amountValue > 0 ? amountValue * (asset.price ?? 0) : 0
  const readClipboardText = async () => {
    try {
      const value = await navigator.clipboard?.readText()
      if (value) return value
    } catch {
      // Some browsers reject clipboard reads even when the button was clicked.
    }

    // Legacy fallback for browsers that expose paste through execCommand.
    const textarea = document.createElement('textarea')
    textarea.value = ''
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.focus()
    try {
      document.execCommand('paste')
      return textarea.value
    } catch {
      return ''
    } finally {
      textarea.remove()
    }
  }

  const pasteAddress = async () => {
    try {
      const value = await readClipboardText()
      if (value) {
        setRecipient(value.trim())
        setMessage('')
      } else {
        setMessage('Clipboard is empty or paste permission is blocked.')
      }
    } catch {
      setMessage('Paste is unavailable in this browser.')
    }
  }
  const copyRecipient = async () => {
    if (!recipient) return
    try {
      if (navigator.clipboard) await navigator.clipboard.writeText(recipient)
      setMessage('Wallet ID copied.')
    } catch {
      setMessage('Copy is unavailable in this browser.')
    }
  }
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canContinue || !recipientWallet) {
      setMessage(error || 'Enter a valid wallet ID and amount.')
      return
    }
    onComplete(recipientWallet.id, amountValue, senderWallet.id)
  }

  return <section className="transfer-screen send-screen">
    <TransferHeader title={`Send ${asset.base}`} onBack={onBack} />
    <form className="send-form" onSubmit={submit}>
      <label className="send-field"><span>Address or Domain Name</span><div className="send-address-input"><input value={recipient} onChange={(event) => { setRecipient(event.target.value); setMessage('') }} onPaste={(event) => { const value = event.clipboardData.getData('text'); if (value) { event.preventDefault(); setRecipient(value.trim()); setMessage('') } }} placeholder="Search or Enter" autoCapitalize="off" autoCorrect="off" spellCheck="false" aria-label="Destination wallet identifier" /><button type="button" className="send-paste-button" onClick={() => void pasteAddress()}>Paste</button><button type="button" className="send-inline-icon" onClick={() => void copyRecipient()} aria-label="Copy wallet identifier"><Icon name="copy" size="lg" /></button><button type="button" className="send-inline-icon" onClick={() => setMessage('Use the recipient wallet identifier.')} aria-label="Scan destination QR code"><Icon name="scan" size="lg" /></button></div>{recipientWallet && recipientWallet.id !== senderWallet.id && <small className="wallet-id-match">Destination: {recipientWallet.name}</small>}{recipientError && <em role="alert">{recipientError}</em>}</label>
      <section className="destination-network"><h2>Destination network</h2><div><CryptoMark asset={asset} /><strong>{asset.name}</strong><Icon name="chevron" size="sm" /></div></section>
      <label className="send-field send-amount-field"><span>Amount</span><div className="send-amount-input"><input value={amount} onChange={(event) => { setAmount(event.target.value.replace(/[^0-9.]/g, '')); setMessage('') }} inputMode="decimal" placeholder="0" aria-label={`Amount of ${asset.base}`} /><button type="button" className="send-clear-button" onClick={() => { setAmount(''); setMessage('') }} aria-label="Clear amount"><Icon name="close" size="xs" /></button><strong>{asset.base}</strong><button type="button" className="send-max-button" onClick={() => { setAmount(balance ? String(balance) : ''); setMessage('') }}>Max</button></div><small>≈ {formatUsd(amountInUsd)}</small>{amountError && <em role="alert">{amountError}</em>}</label>
      <button type="submit" className="send-continue" disabled={!canContinue}>Next</button>
      <p className="transfer-feedback send-feedback" aria-live="polite">{message}</p>
    </form>
  </section>
}

function TransferScreen({ mode, asset, onBack, senderWallet, wallets, onSendComplete }: { mode: TransferMode; asset: MarketAsset; onBack: () => void; senderWallet: WalletDefinition; wallets: WalletDefinition[]; onSendComplete: (recipientWalletId: string, amount: number, senderWalletId: string) => void }) {
  return mode === 'receive' ? <ReceiveScreen asset={asset} wallet={senderWallet} onBack={onBack} /> : <SendScreen asset={asset} onBack={onBack} senderWallet={senderWallet} wallets={wallets} onComplete={onSendComplete} />
}

function MarketDetail({ asset, onBack, onTransfer }: { asset: MarketAsset; onBack: () => void; onTransfer: (mode: TransferMode, asset: MarketAsset) => void }) {
  const [points, setPoints] = useState(asset.points)
  const [currentPrice, setCurrentPrice] = useState(asset.price)
  const [loading, setLoading] = useState(!asset.points)
  const [chartError, setChartError] = useState(false)
  useEffect(() => {
    let cancelled = false
    const refreshPrice = async () => {
      try {
        const body = await cmcFetch<{ data?: Record<string, CmcLatestAsset | CmcLatestAsset[]> }>(`/wallet-quotes?symbol=${encodeURIComponent(asset.symbol)}&convert=USD`)
        const quoteAsset = body.data?.[asset.symbol]
        const result = (Array.isArray(quoteAsset) ? quoteAsset[0] : quoteAsset)?.quote?.USD?.price
        if (!cancelled && typeof result === 'number') {
          setCurrentPrice(result)
          setPoints((current) => syncChartWithLatestPrice(current, result))
        }
      } catch { /* Keep the latest known price while the network is unavailable. */ }
    }
    void refreshPrice()
    const timer = window.setInterval(() => void refreshPrice(), 10_000)
    return () => { cancelled = true; window.clearInterval(timer) }
  }, [asset.symbol])
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getChartPoints(asset.symbol).then((result) => { if (!cancelled) setPoints(result) }).catch(() => {
      if (!cancelled) {
        setChartError(true)
        setPoints((current) => current?.length ? current : createFallbackChartPoints(asset.symbol, asset.price, asset.change24h, 40))
      }
    }).finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [asset.symbol])
  const old = points?.[Math.max(0, (points?.length ?? 1) - 25)]
  const change = old && currentPrice ? ((currentPrice - old) / old) * 100 : asset.change24h
  const changeValue = old && currentPrice ? currentPrice - old : null
  const positive = (change ?? -1) >= 0
  const tokenBalance = asset.walletBalance ?? 0
  const balanceValue = tokenBalance * (currentPrice ?? asset.price ?? 0)
  return <section className="detail-screen"><header className="detail-heading"><button className="back-circle" onClick={onBack} aria-label="Back">‹</button><button className="favorite-button" aria-label="Add to favorites"><Icon name="star" size="md" /></button></header><div className="detail-identity"><CryptoMark asset={asset} large /><div><strong>{asset.base}</strong><span>{asset.name}</span></div><div className="detail-price"><strong>{formatUsd(currentPrice)}</strong><span className={positive ? 'positive-text' : 'negative-text'}>{changeValue !== null ? `${changeValue >= 0 ? '+' : '-'}${formatUsd(Math.abs(changeValue))} ` : ''}({formatPercent(change)})</span></div></div><div className="detail-chart-wrap">{loading && !points ? <div className="detail-chart-loading">Loading live chart…</div> : <MarketChart points={points} positive={positive} />}</div><div className="range-tabs">{['LIVE', '1m', '1H', '1D', '1W', '1M'].map((item) => <button className={item === '1H' ? 'active' : ''} key={item}>{item}</button>)}<Icon name="activity" size="md" /></div>{chartError && <span className="chart-note">Chart temporarily unavailable · showing cached data when available</span>}<div className="balance-block"><div><strong>Your balance</strong><span>{formatUsd(balanceValue)}</span></div><small>{formatTokenBalance(tokenBalance)} {asset.base}</small></div><div className="detail-actions"><button type="button" onClick={() => onTransfer('send', asset)}><Icon name="scan" size="md" />Send</button><button type="button" onClick={() => onTransfer('receive', asset)}><Icon name="qr" size="md" />Receive</button></div><section className="ai-summary"><h2>✦ AI Summary</h2><p>{asset.name} is a decentralised digital asset traded on global markets. Its price and chart above are updated from live market data.</p><button>Ask AI <span>›</span></button></section><div className="trade-ticker">0xb0...067d sold <b>$3.50 {asset.base}</b> ↘</div><button className="trade-cta"><Icon name="refresh" size="md" />Trade</button></section>
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
  const [hasPasscodeError, setHasPasscodeError] = useState(false)
  const resetTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null)
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  const isVerified = passcode.length === 6

  useEffect(() => () => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
  }, [])

  const addDigit = (digit: string) => {
    if (hasPasscodeError) return
    const next = `${passcode}${digit}`.slice(0, 6)
    setPasscode(next)
    if (next.length !== 6) return
    if (next === '351213') {
      window.setTimeout(onUnlock, 240)
      return
    }
    setHasPasscodeError(true)
    resetTimer.current = window.setTimeout(() => {
      resetTimer.current = null
      setPasscode('')
      setHasPasscodeError(false)
    }, 320)
  }

  const removeDigit = () => {
    if (hasPasscodeError) return
    setPasscode((current) => current.slice(0, -1))
  }

  return <main className="lock-screen passcode-lock-screen"><div className="passcode-container"><div className="main-content"><h2>Enter passcode</h2><div className={`passcode-inputs${isVerified ? ' verified' : ''}${hasPasscodeError ? ' error shake' : ''}`} aria-label={hasPasscodeError ? 'Incorrect passcode' : isVerified ? 'Passcode accepted' : 'Passcode progress'} aria-live="polite">{Array.from({ length: 6 }).map((_, index) => <span className={`input-box${index < passcode.length ? ' filled' : ''}`} key={index}>{index < passcode.length && <span className="passcode-dot" aria-hidden="true" />}</span>)}</div></div><div className="keypad-container">{digits.map((digit) => <button type="button" className="key" key={digit} onClick={() => addDigit(digit)} aria-label={`Number ${digit}`}>{digit}</button>)}<button type="button" className="key key-action fingerprint-key" disabled aria-disabled="true" aria-label="Fingerprint sign-in unavailable"><span className="fingerprint-icon"><PasscodeFingerprintImage className="passcode-keypad-fingerprint-image" /></span></button><button type="button" className="key" onClick={() => addDigit('0')} aria-label="Number 0">0</button><button type="button" className="key key-action" onClick={removeDigit} aria-label="Delete passcode"><span className="backspace-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path className="backspace-shape" d="M21.5 3.5H7.7c-.62 0-1.2.31-1.53.82L1.58 11.6a.75.75 0 0 0 0 .8l4.59 7.28c.33.51.91.82 1.53.82h13.8c.83 0 1.5-.67 1.5-1.5V5c0-.83-.67-1.5-1.5-1.5Z" /><path className="backspace-close" d="m10.7 8.8 5.6 6.4m0-6.4-5.6 6.4" /></svg></span></button></div></div></main>
}

type DappItem = { name: string; description: string; className: string; mark: string }

const dapps: DappItem[] = [
  { name: 'Lido', description: 'Liquid staking for Ethereum and Polygon. Daily…', className: 'lido-dapp', mark: '◆' },
  { name: 'Aave', description: 'Aave is an Open Source and Non-Custodial pr…', className: 'aave-dapp', mark: 'A' },
  { name: 'Uniswap', description: 'Swap, earn, and build on the leading decentrali…', className: 'uniswap-dapp', mark: '🦄' },
  { name: 'PancakeSwap', description: 'Trade. Earn. Win. NFT.', className: 'pancake-dapp', mark: '🐰' },
  { name: 'Pendle', description: 'Pendle Finance is a protocol that enables the t…', className: 'pendle-dapp', mark: '◐' },
]

function DiscoverScreen({ onOpenSearch }: { onOpenSearch: () => void }) {
  const categories = ['Featured', 'DEX', 'Lending', 'Yield', 'Staking']
  return <section className="discover-screen"><header className="discover-heading"><h1>Discover</h1></header><button type="button" className="dapp-search" onClick={onOpenSearch} aria-label="Search assets"><Icon name="search" size={22} /><span>Search or enter dApp URL</span></button><div className="dapp-banner"><img className="dapp-explore-image" src="/explore.png" alt="" fetchPriority="high" /><div><strong>Claim bStocks<br />campaign rewards<br />now</strong></div><span className="banner-arrow" aria-hidden="true"><Icon name="chevron" size={28} /></span></div><h2 className="explore-title">Explore dApps <Icon name="chevron" size={25} /></h2><div className="dapp-categories">{categories.map((category, index) => <button className={index === 0 ? 'active' : ''} key={category}>{category}</button>)}</div><div className="dapp-list">{dapps.map((dapp) => <div className="dapp-row" key={dapp.name}><span className={`dapp-icon ${dapp.className}`}>{dapp.mark}</span><div><strong>{dapp.name}</strong><span>{dapp.description}</span></div></div>)}</div><button className="view-dapps-button">View all <Icon name="chevron" size={20} /></button></section>
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

type WalletDeleteStep = 'closed' | 'confirm' | 'backup'
type WalletManualBackupStep = 'closed' | 'warning' | 'phrase' | 'verify'
type GoogleBackupStep = 'processing' | 'error'

function ManualBackupCheck({ checked }: { checked: boolean }) {
  return <span className={`manual-backup-check${checked ? ' checked' : ''}`} aria-hidden="true">{checked ? '✓' : ''}</span>
}

function GoogleDriveBackupFlow({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<GoogleBackupStep>('processing')

  useEffect(() => {
    if (step !== 'processing') return
    const timer = window.setTimeout(() => setStep('error'), 4000)
    return () => window.clearTimeout(timer)
  }, [step])

  return <section className="google-backup-flow" aria-live="polite" aria-labelledby="google-backup-title">
    <header className="google-backup-header">
      <button type="button" onClick={onClose} aria-label="Back to wallet backups"><BackArrowIcon /></button>
      <h1 id="google-backup-title">{step === 'processing' ? 'Processing...' : 'Backup failed'}</h1>
      <span aria-hidden="true" />
    </header>
    {step === 'processing' ? <div className="google-backup-processing" role="status" aria-label="Backing up wallet">
      <div className="google-backup-loader" aria-hidden="true"><span /><span /><span /><span /></div>
    </div> : <div className="google-backup-error" role="alert">
      <span className="google-backup-error-icon" aria-hidden="true">!</span>
      <h2>Something went wrong</h2>
      <p>We couldn’t back up your wallet to Google Drive. Please try again.</p>
      <button type="button" className="google-backup-retry" onClick={() => setStep('processing')}>Try again</button>
      <button type="button" className="google-backup-close" onClick={onClose}>Close</button>
    </div>}
  </section>
}

function getVerificationOptions(phrase: string[], index: number) {
  const options = [phrase[index]]
  let offset = index + 3
  while (options.length < 3) {
    const word = secretPhraseWordBank[(index * 11 + offset * 7) % secretPhraseWordBank.length]
    if (!options.includes(word)) options.push(word)
    offset += 1
  }
  return options.sort((left, right) => left.localeCompare(right))
}

function WalletManualBackupFlow({ wallet, onClose, onComplete }: { wallet: WalletDefinition; onClose: () => void; onComplete: () => void }) {
  const [step, setStep] = useState<WalletManualBackupStep>('warning')
  const [acknowledgements, setAcknowledgements] = useState([false, false])
  const [verificationIndexes, setVerificationIndexes] = useState<number[]>([])
  const [selectedWords, setSelectedWords] = useState<Record<number, string>>({})
  const [verificationError, setVerificationError] = useState(false)
  const phrase = getWalletSecretPhrase(wallet)

  const toggleAcknowledgement = (index: number) => {
    setAcknowledgements((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))
  }

  const openVerification = () => {
    const savedIndexes = readManualBackupVerification(wallet.id, phrase.length)
    const nextIndexes = savedIndexes ?? getStableManualBackupVerification(wallet, phrase.length)
    if (!savedIndexes) {
      saveManualBackupVerification(wallet.id, nextIndexes)
    }
    setVerificationIndexes(nextIndexes)
    setSelectedWords({})
    setVerificationError(false)
    setStep('verify')
  }

  const completeVerification = () => {
    const isCorrect = verificationIndexes.every((index) => selectedWords[index] === phrase[index])
    if (!isCorrect) {
      setVerificationError(true)
      return
    }
    markManualBackupCompleted(wallet.id)
    onComplete()
    onClose()
  }

  if (step === 'warning') return <div className="wallet-manual-backup-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="wallet-manual-warning-sheet" role="dialog" aria-modal="true" aria-labelledby="manual-backup-title" onMouseDown={(event) => event.stopPropagation()}>
      <button type="button" className="wallet-backup-close" onClick={onClose} aria-label="Close manual backup"><Icon name="close" size={28} /></button>
      <div className="wallet-backup-art"><img src="/phrase.png" alt="" /></div>
      <p className="wallet-manual-eyebrow">⚠ &nbsp;For your eyes only!</p>
      <h2 id="manual-backup-title">This secret phrase unlocks<br />your wallet</h2>
      <div className="wallet-manual-acknowledgements">
        <button type="button" className="wallet-manual-acknowledgement" onClick={() => toggleAcknowledgement(0)} aria-pressed={acknowledgements[0]}><ManualBackupCheck checked={acknowledgements[0]} /><span>Trust wallet does not have access to this key.</span></button>
        <button type="button" className="wallet-manual-acknowledgement" onClick={() => toggleAcknowledgement(1)} aria-pressed={acknowledgements[1]}><ManualBackupCheck checked={acknowledgements[1]} /><span>Don’t save this in any digital format, write it on paper and store securely.</span></button>
      </div>
      <button type="button" className="wallet-manual-primary" disabled={!acknowledgements.every(Boolean)} onClick={() => setStep('phrase')}>Continue</button>
    </section>
  </div>

  if (step === 'phrase') return <section className="wallet-manual-backup-screen" aria-labelledby="manual-phrase-title">
    <header className="wallet-manual-backup-header wallet-manual-light-header">
      <button type="button" onClick={() => setStep('warning')} aria-label="Back to backup reminder"><BackArrowIcon /></button>
      <h1 id="manual-phrase-title">Secret phrase</h1>
      <button type="button" aria-label="Secret phrase information"><SecretInfoIcon /></button>
    </header>
    <div className="wallet-secret-grid">{phrase.map((word, index) => <div className="wallet-secret-word" key={`${word}-${index}`}><span>{index + 1}.</span><strong>{word}</strong></div>)}</div>
    <div className="wallet-manual-footer-warning" role="note">
      <Icon name="info" size={18} />
      <div>
        <p>Never share your secret phrase with anyone, and<br />store it securely!</p>
        <button type="button">Learn more</button>
      </div>
    </div>
    <button type="button" className="wallet-manual-primary wallet-manual-screen-continue" onClick={openVerification}>Continue</button>
  </section>

  return <section className="wallet-manual-backup-screen wallet-manual-verify-screen" aria-labelledby="manual-verify-title">
    <header className="wallet-manual-backup-header wallet-manual-light-header">
      <button type="button" onClick={() => setStep('phrase')} aria-label="Back to secret phrase"><BackArrowIcon /></button>
      <h1 id="manual-verify-title">Confirm secret phrase</h1>
      <span aria-hidden="true" />
    </header>
    <div className="wallet-manual-verify-copy"><p>Please tap on the correct answer of the below<br />seed phrases.</p></div>
    <div className="wallet-verification-list">{verificationIndexes.map((index) => <div className="wallet-verification-row" key={index}><strong>Word #{index + 1}</strong><div className="wallet-verification-options">{getVerificationOptions(phrase, index).map((word) => <button type="button" className={selectedWords[index] === word ? 'selected' : ''} key={word} onClick={() => { setSelectedWords((current) => ({ ...current, [index]: word })); setVerificationError(false) }}>{word}</button>)}</div></div>)}</div>
    {verificationError && <p className="wallet-verification-error">Some words are incorrect. Try again.</p>}
    <button type="button" className="wallet-manual-primary wallet-manual-screen-continue" disabled={verificationIndexes.some((index) => !selectedWords[index])} onClick={completeVerification}>Continue</button>
  </section>
}

function WalletEditScreen({ wallet, onBack, onRename, onDelete }: { wallet: WalletDefinition; onBack: () => void; onRename: (walletId: string, name: string) => void; onDelete: (walletId: string) => void }) {
  const [draftName, setDraftName] = useState(wallet.name)
  const [deleteStep, setDeleteStep] = useState<WalletDeleteStep>('closed')
  const [manualBackupStep, setManualBackupStep] = useState<WalletManualBackupStep>('closed')
  const [googleBackupStep, setGoogleBackupStep] = useState<GoogleBackupStep | 'closed'>('closed')
  const [manualBackupCompleted, setManualBackupCompleted] = useState(() => isManualBackupCompleted(wallet.id))

  useEffect(() => {
    setDraftName(wallet.name)
    setManualBackupCompleted(isManualBackupCompleted(wallet.id))
  }, [wallet.id, wallet.name])

  const saveName = () => {
    const nextName = draftName.trim().replace(/\s+/g, ' ')
    if (!nextName) {
      setDraftName(wallet.name)
      return
    }
    if (nextName !== wallet.name) onRename(wallet.id, nextName)
  }

  const closeEditor = () => {
    saveName()
    onBack()
  }

  const closeDeleteFlow = () => setDeleteStep('closed')

  return <section className="wallet-edit-screen" aria-labelledby="wallet-edit-title">
    <header className="wallet-edit-header">
      <button type="button" className="wallet-edit-back" onClick={closeEditor} aria-label="Back to wallets"><BackArrowIcon /></button>
      <h1 id="wallet-edit-title">{draftName.trim() || wallet.name}</h1>
      <button type="button" className="wallet-edit-delete" onClick={() => setDeleteStep('confirm')} aria-label={`Delete ${wallet.name}`}><WalletTrashIcon /></button>
    </header>
    <form className="wallet-edit-form" onSubmit={(event) => { event.preventDefault(); saveName() }}>
      <label className="wallet-name-label" htmlFor="wallet-name-input">Name</label>
      <div className="wallet-name-input-wrap">
        <input id="wallet-name-input" value={draftName} onChange={(event) => setDraftName(event.target.value)} onBlur={saveName} autoComplete="off" maxLength={48} aria-describedby="wallet-name-save-note" />
        {draftName && <button type="button" className="wallet-name-clear" onClick={() => setDraftName('')} aria-label="Clear wallet name"><Icon name="close" size={22} /></button>}
      </div>
      <span id="wallet-name-save-note" className="wallet-name-save-note">Changes save when you leave this field.</span>
    </form>
    <section className="wallet-backups" aria-labelledby="wallet-backups-title">
      <h2 id="wallet-backups-title">Secret phrase backups</h2>
      <button type="button" className="wallet-backup-row wallet-google-backup-row" onClick={() => setGoogleBackupStep('processing')}><GoogleDriveBackupIcon /><strong>Google Drive</strong><span>Back up now</span></button>
      <button type="button" className="wallet-backup-row wallet-manual-backup-row" onClick={() => setManualBackupStep('warning')} aria-label="Back up manually">
        <ManualBackupIcon /><strong>Manual</strong>{manualBackupCompleted ? <span className="wallet-backup-active">Active</span> : <span>Back up now</span>}
      </button>
    </section>
    {googleBackupStep !== 'closed' && <GoogleDriveBackupFlow onClose={() => setGoogleBackupStep('closed')} />}
    {manualBackupStep !== 'closed' && <WalletManualBackupFlow wallet={wallet} onClose={() => setManualBackupStep('closed')} onComplete={() => setManualBackupCompleted(true)} />}
    {deleteStep !== 'closed' && <div className={`wallet-delete-overlay ${deleteStep === 'backup' ? 'backup-open' : 'confirm-open'}`} onClick={closeDeleteFlow}>
      {deleteStep === 'confirm' ? <section className="wallet-delete-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-wallet-title" onClick={(event) => event.stopPropagation()}>
        <h2 id="delete-wallet-title">Are you sure you would like to<br />delete this wallet?</h2>
        <p>Make sure you have backup of your<br />wallet.</p>
        <div className="wallet-delete-dialog-actions"><button type="button" className="wallet-delete-cancel" onClick={closeDeleteFlow}>Cancel</button><button type="button" className="wallet-delete-confirm" onClick={() => setDeleteStep('backup')}>Delete</button></div>
      </section> : <section className="wallet-backup-sheet" role="dialog" aria-modal="true" aria-labelledby="backup-wallet-title" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="wallet-backup-close" onClick={closeDeleteFlow} aria-label="Close backup reminder"><Icon name="close" size={28} /></button>
        <div className="wallet-backup-art"><img src="/delete_part.png" alt="" /></div>
        <h2 id="backup-wallet-title">Back up your seed phrase</h2>
        <p>Protect your assets by backing up your seed<br />phrase now.</p>
        <button type="button" className="wallet-backup-primary" onClick={() => { closeDeleteFlow(); setManualBackupStep('warning') }}>Back up manually</button>
        <button type="button" className="wallet-backup-secondary" onClick={closeDeleteFlow}>Back up to Google Drive</button>
        <button type="button" className="wallet-proceed-anyway" onClick={() => onDelete(wallet.id)}>Proceed anyway</button>
      </section>}
    </div>}
  </section>
}

function WalletsScreen({ onClose, onOpenSettings, wallets, selectedWalletId, prices, onSelectWallet, onCreateWallet, onOpenWalletEditor }: { onClose: () => void; onOpenSettings: () => void; wallets: WalletDefinition[]; selectedWalletId: string; prices: Record<string, number>; onSelectWallet: (walletId: string) => void; onCreateWallet: () => void; onOpenWalletEditor: (walletId: string) => void }) {
  const [showAddWallet, setShowAddWallet] = useState(false)
  const [isCreatingWallet, setIsCreatingWallet] = useState(false)
  const [showWalletCreated, setShowWalletCreated] = useState(false)
  const walletCreationTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null)
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
      onCreateWallet()
      setShowAddWallet(false)
      setShowWalletCreated(true)
      setIsCreatingWallet(false)
    }, 1000)
  }

  useEffect(() => () => {
    if (walletCreationTimer.current !== null) window.clearTimeout(walletCreationTimer.current)
  }, [])

  if (showWalletCreated) return <WalletReadyScreen onContinue={() => setShowWalletCreated(false)} />

  return <section className="wallets-screen"><header className="wallets-screen-header"><button type="button" className="wallet-back-button" onClick={onClose} aria-label="Close wallet manager"><BackArrowIcon /></button><h1>Wallets</h1><button type="button" className="wallet-settings-button" onClick={onOpenSettings} aria-label="Open settings"><WalletSettingsIcon /></button></header><h2>Multi-coin wallets</h2><div className="wallet-card-list">{wallets.map((wallet) => <article className="main-wallet-card" key={wallet.id}><button type="button" className="wallet-card-select" onClick={() => onSelectWallet(wallet.id)} aria-pressed={wallet.id === selectedWalletId} aria-label={`Select ${wallet.name}`}><div className="main-wallet-title"><span className="wallet-shield"><TrustWalletBadge /></span><div><strong>{wallet.name}</strong><span>{formatUsd(wallet.balances.USDT ?? 0)}</span></div></div></button><button type="button" className="wallet-card-menu" onClick={() => onOpenWalletEditor(wallet.id)} aria-label={`Edit ${wallet.name}`}><WalletMoreIcon /></button>{wallet.id === selectedWalletId && <span className="wallet-selected">✓</span>}</article>)}</div><div className="wallets-bottom-actions"><button type="button" onClick={() => setShowAddWallet(true)}>Add wallet</button><button type="button"><ExtensionQrIcon />Sync to Extension</button></div>{showAddWallet && <div className="add-wallet-overlay" onClick={() => !isCreatingWallet && setShowAddWallet(false)}><section className="add-wallet-sheet" onClick={(event) => event.stopPropagation()}><button type="button" className="add-wallet-close" onClick={closeAddWallet} aria-label="Close add wallet"><Icon name="close" size={26} /></button><div className="wallet-illustration"><img src="/illustration-3-wallet-coins.svg" alt="" /></div><button type="button" className={`add-wallet-option${isCreatingWallet ? ' creating' : ''}`} onClick={createWallet} disabled={isCreatingWallet}><span className="add-option-icon create-icon"><RiSparkling2Line aria-hidden="true" /></span><span><strong>{isCreatingWallet ? 'Creating wallet…' : 'Create new wallet'}</strong><small>Secret phrase</small></span><b>›</b></button><button type="button" className="add-wallet-option" disabled={isCreatingWallet}><span className="add-option-icon import-icon"><RiDownload2Line aria-hidden="true" /></span><span><strong>Add existing wallet</strong><small>Import, restore or view-only</small></span><b>›</b></button></section></div>}</section>
}

type BarcodeDetectorLike = new (options?: { formats?: string[] }) => { detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue?: string }>> }

function DeviceScanner({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fallbackInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const [result, setResult] = useState('')

  useEffect(() => {
    let cancelled = false
    let stream: MediaStream | null = null
    let scanTimer: number | null = null

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error('Camera access is unavailable in this browser.')
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false })
        if (cancelled || !videoRef.current) return
        videoRef.current.srcObject = stream
        await videoRef.current.play()

        const BarcodeDetector = (globalThis as typeof globalThis & { BarcodeDetector?: BarcodeDetectorLike }).BarcodeDetector
        if (!BarcodeDetector) return
        const detector = new BarcodeDetector({ formats: ['qr_code'] })
        const detectQr = async () => {
          if (cancelled || !videoRef.current || videoRef.current.readyState < 2) return
          try {
            const codes = await detector.detect(videoRef.current)
            const rawValue = codes[0]?.rawValue?.trim()
            if (rawValue) {
              setResult(rawValue)
              return
            }
          } catch {
            // Keep the camera open while the QR frame is not readable yet.
          }
          if (!cancelled) scanTimer = window.setTimeout(() => void detectQr(), 250)
        }
        void detectQr()
      } catch (cameraError) {
        if (!cancelled) setError(cameraError instanceof Error ? cameraError.message : 'Camera access was blocked.')
      }
    }

    void startCamera()
    return () => {
      cancelled = true
      if (scanTimer !== null) window.clearTimeout(scanTimer)
      stream?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  return <div className="scanner-overlay" role="dialog" aria-modal="true" aria-label="Scan QR code">
    <div className="scanner-panel">
      <header className="scanner-header"><h2>Scan</h2><button type="button" onClick={onClose} aria-label="Close scanner"><Icon name="close" size={24} /></button></header>
      <div className="scanner-camera-frame">
        <video ref={videoRef} autoPlay muted playsInline aria-label="Camera preview" />
        <span className="scanner-corner top-left" /><span className="scanner-corner top-right" /><span className="scanner-corner bottom-left" /><span className="scanner-corner bottom-right" />
        {!error && !result && <p>Point your camera at a QR code</p>}
      </div>
      {error && <div className="scanner-error"><p>{error}</p><button type="button" onClick={() => fallbackInputRef.current?.click()}>Open device camera</button></div>}
      {result && <div className="scanner-result"><strong>QR code detected</strong><span>{result}</span><button type="button" onClick={onClose}>Done</button></div>}
      <input ref={fallbackInputRef} className="scanner-fallback-input" type="file" accept="image/*" capture="environment" aria-label="Capture QR code" onChange={() => setError('Image captured. Close the scanner to continue.')} />
    </div>
  </div>
}

function App() {
  const [isLocked, setIsLocked] = useState(() => !isSessionUnlocked())
  const [promoIndex, setPromoIndex] = useState(0)
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [location, setLocation] = useState<AppLocation>(() => readAppLocation())
  const [wallets, setWallets] = useState<WalletDefinition[]>(() => readWalletsWithHistory())
  const [selectedWalletId, setSelectedWalletId] = useState(() => readSelectedWalletId(readWalletsWithHistory()))
  const [walletHistory, setWalletHistory] = useState<WalletHistoryEntry[]>(() => readWalletHistory(readPersistedWallets()))
  const [walletChanges, setWalletChanges] = useState<Record<string, number | null>>(() => readCachedWalletQuoteValues().changes)
  const [walletPrices, setWalletPrices] = useState<Record<string, number>>(() => readCachedWalletQuoteValues().prices)
  const searchableAssets = useSearchAssetCache()
  const [searchHistory, setSearchHistory] = useState<MarketAsset[]>(() => readSavedSearchAssets(searchHistoryStorageKey))
  const [watchlistAssets, setWatchlistAssets] = useState<MarketAsset[]>(() => readSavedSearchAssets(searchWatchlistStorageKey))
  const route = parseAppRoute(location.pathname)
  const navigationState = location.state
  const navigate = (pathname: string, state: Omit<AppNavigationState, 'appRoute'> = {}) => {
    const nextPathname = normalizePathname(pathname)
    const nextState: AppNavigationState = { ...state, appRoute: true }
    window.history.pushState(nextState, '', nextPathname)
    setLocation({ pathname: nextPathname, state: nextState })
  }
  const goBack = (fallbackPathname: string) => navigate(navigationState?.returnTo ?? fallbackPathname)
  const selectedWallet = wallets.find((wallet) => wallet.id === selectedWalletId) ?? wallets[0]
  const activeWalletTokens = getWalletTokens(selectedWallet)
  const walletPortfolioTokens = activeWalletTokens
  const bitcoinToken = activeWalletTokens.find((token) => token.symbol === 'BTC') ?? activeWalletTokens[0]
  const ethereumToken = activeWalletTokens.find((token) => token.symbol === 'ETH') ?? activeWalletTokens[0]
  const receiveToken = activeWalletTokens.find((token) => token.symbol === 'USDT') ?? activeWalletTokens[0]
  const usdtValue = getWalletTokenValue(receiveToken, walletPrices)
  const usdtChange = walletChanges.USDT ?? 0
  const usdtChangeValue = usdtValue * (usdtChange / 100)
  const latestSearchAssetBySymbol = new Map(searchableAssets.map((asset) => [asset.symbol, asset]))
  const homeWatchlistAssets = watchlistAssets.map((asset) => latestSearchAssetBySymbol.get(asset.symbol) ?? asset)
  const routeAsset = route.symbol ? createRouteAsset(route.symbol, navigationState, activeWalletTokens, walletPrices, walletChanges) : null
  const selectedMarket = route.kind === 'asset' ? routeAsset : null
  const transferFlow = (route.kind === 'send' || route.kind === 'receive') && routeAsset ? { mode: route.kind, asset: routeAsset } : null
  const activeTab: 'home' | 'markets' | 'perps' | 'discover' = route.kind === 'markets' || route.kind === 'perps' || route.kind === 'discover' ? route.kind : 'home'
  const watchedSymbols = new Set(watchlistAssets.map((asset) => asset.symbol))
  const recordSearchHistory = (asset: MarketAsset) => {
    setSearchHistory((current) => [toSavedSearchAsset(asset), ...current.filter((item) => item.symbol !== asset.symbol)].slice(0, 8))
  }
  const toggleWatchlist = (asset: MarketAsset) => {
    setWatchlistAssets((current) => current.some((item) => item.symbol === asset.symbol)
      ? current.filter((item) => item.symbol !== asset.symbol)
      : [toSavedSearchAsset(asset), ...current].slice(0, 50))
  }
  const openAssetDetail = (asset: MarketAsset) => {
    const heldToken = activeWalletTokens.find((token) => token.symbol === asset.symbol)
    const routeAsset = { ...asset, walletBalance: heldToken?.balance ?? asset.walletBalance ?? 0 }
    navigate(`/asset/${encodeURIComponent(asset.symbol.toLowerCase())}`, { asset: routeAsset, returnTo: location.pathname })
  }
  const openWalletTokenDetail = (token: WalletToken) => openAssetDetail(walletTokenToMarketAsset(token, walletPrices, walletChanges))
  const openTransfer = (mode: TransferMode, asset: MarketAsset) => {
    const heldToken = activeWalletTokens.find((token) => token.symbol === asset.symbol)
    const routeAsset = { ...asset, walletBalance: heldToken?.balance ?? asset.walletBalance ?? 0 }
    navigate(`/${mode}/${encodeURIComponent(asset.symbol.toLowerCase())}`, { asset: routeAsset, returnTo: location.pathname })
  }
  const completeInternalTransfer = (recipientWalletId: string, amount: number, senderWalletId: string) => {
    const transferSymbol = transferFlow && walletTokenDefinitions.find((token) => token.symbol === transferFlow.asset.symbol)?.symbol
    if (!transferSymbol || !transferFlow) return
    const senderWallet = wallets.find((wallet) => wallet.id === senderWalletId)
    const recipientWallet = wallets.find((wallet) => wallet.id === recipientWalletId)
    if (!senderWallet || !recipientWallet || senderWallet.id === recipientWallet.id) return
    const createdAt = Date.now()
    const transferId = `transfer-${createdAt}-${senderWalletId}-${recipientWalletId}`
    const nextWallets = wallets.map((wallet) => {
      const currentBalance = wallet.balances[transferSymbol] ?? 0
      if (wallet.id === senderWalletId) return { ...wallet, balances: { ...wallet.balances, [transferSymbol]: currentBalance - amount } }
      if (wallet.id === recipientWalletId) return { ...wallet, balances: { ...wallet.balances, [transferSymbol]: currentBalance + amount } }
      return wallet
    })
    persistWalletBalances(nextWallets)
    setWallets(nextWallets)
    setWalletHistory((current) => [
      {
        id: `${transferId}-send`,
        walletId: senderWallet.id,
        direction: 'send',
        symbol: transferSymbol,
        amount,
        counterparty: recipientWallet.address,
        createdAt,
      },
      {
        id: `${transferId}-receive`,
        walletId: recipientWallet.id,
        direction: 'receive',
        symbol: transferSymbol,
        amount,
        counterparty: senderWallet.address,
        createdAt,
      },
      ...current,
    ])
    // Keep the wallet that opened the send flow active. The recipient is only
    // the destination and must never become the selected wallet.
    setSelectedWalletId(senderWalletId)
    navigate('/')
  }

  const addNewWallet = () => {
    const newWallet = createNewWallet(wallets)
    const nextWallets = [...wallets, newWallet]
    persistWalletBalances(nextWallets)
    setWallets(nextWallets)
    setSelectedWalletId(newWallet.id)
  }

  const renameWallet = (walletId: string, name: string) => {
    const nextName = name.trim().replace(/\s+/g, ' ')
    if (!nextName) return
    const nextWallets = wallets.map((wallet) => wallet.id === walletId ? { ...wallet, name: nextName } : wallet)
    persistWalletBalances(nextWallets)
    setWallets(nextWallets)
  }

  const deleteWallet = (walletId: string) => {
    if (wallets.length <= 1 || !wallets.some((wallet) => wallet.id === walletId)) return
    const nextWallets = wallets.filter((wallet) => wallet.id !== walletId)
    markWalletDeleted(walletId)
    persistWalletBalances(nextWallets)
    setWallets(nextWallets)
    if (selectedWalletId === walletId) setSelectedWalletId(nextWallets[0].id)
    navigate('/wallets')
  }

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  useEffect(() => {
    const syncLocation = () => setLocation(readAppLocation())
    window.addEventListener('popstate', syncLocation)
    return () => window.removeEventListener('popstate', syncLocation)
  }, [])

  useEffect(() => {
    persistWalletBalances(wallets)
  }, [wallets])

  useEffect(() => {
    writeWalletHistory(walletHistory)
  }, [walletHistory])

  useEffect(() => {
    try {
      window.localStorage.setItem(selectedWalletStorageKey, selectedWalletId)
    } catch {
      // The active wallet can remain in memory when browser storage is unavailable.
    }
  }, [selectedWalletId])

  useEffect(() => {
    writeSavedSearchAssets(searchHistoryStorageKey, searchHistory)
  }, [searchHistory])

  useEffect(() => {
    writeSavedSearchAssets(searchWatchlistStorageKey, watchlistAssets)
  }, [watchlistAssets])

  useEffect(() => {
    if (!searchableAssets.length || !watchlistAssets.length) return
    const latestBySymbol = new Map(searchableAssets.map((asset) => [asset.symbol, asset]))
    setWatchlistAssets((current) => current.map((asset) => {
      const latest = latestBySymbol.get(asset.symbol)
      return latest ? toSavedSearchAsset(latest) : asset
    }))
  }, [searchableAssets])

  useEffect(() => {
    wallets.forEach((wallet) => { preloadReceiveQr(wallet.address) })
  }, [wallets])

  useEffect(() => {
    const promoTimer = window.setInterval(() => {
      setPromoIndex((currentIndex) => (currentIndex + 1) % promoSlides.length)
    }, 2000)

    return () => window.clearInterval(promoTimer)
  }, [])

  useEffect(() => {
    if (isLocked) return
    let cancelled = false
    const fallbackAssets = new Map(searchableAssets.map((asset) => [asset.symbol.toUpperCase(), asset]))

    const applyFallbackWalletQuotes = () => {
      const nextChanges: Record<string, number | null> = {}
      const nextPrices: Record<string, number> = {}
      walletTokenDefinitions.forEach((token) => {
        const fallbackAsset = fallbackAssets.get(token.symbol)
        nextChanges[token.symbol] = fallbackAsset?.change24h ?? null
        nextPrices[token.symbol] = fallbackAsset?.price ?? token.fallbackPrice
      })
      if (!cancelled) {
        setWalletChanges(nextChanges)
        setWalletPrices(nextPrices)
      }
    }

    const refreshWalletChanges = async () => {
      try {
        const body = await cmcFetch<{ data?: Record<string, CmcLatestAsset | CmcLatestAsset[]> }>(walletTokenQuotesPath)
        const nextChanges: Record<string, number | null> = {}
        const nextPrices: Record<string, number> = {}
        walletTokenDefinitions.forEach((token) => {
          const rawAsset = body.data?.[token.symbol] ?? body.data?.[token.symbol.toUpperCase()]
          const asset = Array.isArray(rawAsset) ? rawAsset[0] : rawAsset
          const fallbackAsset = fallbackAssets.get(token.symbol)
          nextChanges[token.symbol] = asset?.quote?.USD?.percent_change_24h ?? fallbackAsset?.change24h ?? null
          nextPrices[token.symbol] = asset?.quote?.USD?.price ?? fallbackAsset?.price ?? token.fallbackPrice
        })
        if (!cancelled) {
          setWalletChanges(nextChanges)
          setWalletPrices(nextPrices)
        }
      } catch {
        // The market listing cache has the same live 24h values as wallet quotes.
        applyFallbackWalletQuotes()
      }
    }

    void refreshWalletChanges()
    const timer = window.setInterval(() => void refreshWalletChanges(), 10_000)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [isLocked, searchableAssets])

  if (isLocked) return <LockScreen onUnlock={() => { persistUnlockedSession(); setIsLocked(false); if (route.kind === 'unlock') navigate('/') }} />

  if (route.kind === 'settings') {
    return <main className="app-shell light-app-shell"><div className="wallet-app light-wallet-app"><SettingsScreen onClose={() => goBack('/')} /></div></main>
  }

  if (route.kind === 'wallets') {
    return <main className="app-shell light-app-shell"><div className="wallet-app light-wallet-app"><WalletsScreen onClose={() => goBack('/')} onOpenSettings={() => navigate('/settings', { returnTo: '/wallets' })} wallets={wallets} selectedWalletId={selectedWallet.id} prices={walletPrices} onSelectWallet={(walletId) => { setSelectedWalletId(walletId); navigate('/') }} onCreateWallet={addNewWallet} onOpenWalletEditor={(walletId) => navigate(`/wallets/${encodeURIComponent(walletId)}/edit`, { returnTo: '/wallets' })} /></div></main>
  }

  if (route.kind === 'wallet-edit') {
    const walletToEdit = wallets.find((wallet) => wallet.id === route.walletId)
    if (walletToEdit) return <main className="app-shell light-app-shell"><div className="wallet-app light-wallet-app"><WalletEditScreen wallet={walletToEdit} onBack={() => goBack('/wallets')} onRename={renameWallet} onDelete={deleteWallet} /></div></main>
  }

  if (route.kind === 'tokens') {
    return <main className="app-shell light-app-shell"><div className="wallet-app light-wallet-app tokens-wallet-app"><TokensScreen tokens={walletPortfolioTokens} prices={walletPrices} onBack={() => goBack('/')} onSelect={openWalletTokenDetail} onNavigate={navigate} /></div></main>
  }

  if (route.kind === 'history') {
    return <main className="app-shell light-app-shell"><div className="wallet-app light-wallet-app history-wallet-app"><HistoryScreen wallet={selectedWallet} entries={walletHistory} usdtPrice={walletPrices.USDT ?? 1} onBack={() => goBack('/')} /></div></main>
  }

  if (route.kind === 'search') {
    return <main className="app-shell light-app-shell"><div className="wallet-app light-wallet-app search-wallet-app"><SearchScreen assets={searchableAssets} history={searchHistory} watchlist={watchlistAssets} watchedSymbols={watchedSymbols} onClose={() => goBack('/markets')} onSelect={(asset) => { recordSearchHistory(asset); openAssetDetail(asset) }} onToggleWatchlist={toggleWatchlist} onClearHistory={() => setSearchHistory([])} /></div></main>
  }

  if (route.kind === 'swap') {
    return <main className="app-shell light-app-shell"><div className="wallet-app light-wallet-app swap-wallet-app"><SwapScreen onBack={() => goBack('/markets')} /></div></main>
  }

  if (transferFlow) {
    return <main className="app-shell"><div className="wallet-app transfer-wallet-app"><TransferScreen mode={transferFlow.mode} asset={transferFlow.asset} onBack={() => goBack(`/asset/${transferFlow.asset.symbol.toLowerCase()}`)} senderWallet={selectedWallet} wallets={wallets} onSendComplete={completeInternalTransfer} /></div></main>
  }

  if (selectedMarket) {
    return <main className="app-shell"><div className="wallet-app"><MarketDetail asset={selectedMarket} onBack={() => goBack('/')} onTransfer={openTransfer} /></div></main>
  }

  return (
    <main className="app-shell">
      <div className={`wallet-app${activeTab === 'markets' ? ' markets-wallet-app' : ''}`}>
        {activeTab === 'markets' ? <MarketsScreen onSelect={openAssetDetail} onOpenSearch={() => navigate('/search', { returnTo: '/markets' })} onOpenSwap={() => navigate('/swap', { returnTo: '/markets' })} /> : activeTab === 'perps' ? <PerpsScreen onOpenSettings={() => navigate('/settings', { returnTo: '/perps' })} onOpenSearch={() => navigate('/search', { returnTo: '/perps' })} onOpenHistory={() => navigate('/history', { returnTo: '/perps' })} onSelect={openAssetDetail} /> : activeTab === 'discover' ? <DiscoverScreen onOpenSearch={() => navigate('/search', { returnTo: '/discover' })} /> : <>
        <header className="wallet-header">
          <button className="wallet-chip" onClick={() => navigate('/wallets', { returnTo: location.pathname })} aria-label="Open wallets">
            <span className="wallet-header-wallet-icon" aria-hidden="true"><img src="/wallet_logo.png" alt="" /></span>
            <div className="wallet-chip-copy"><strong>{selectedWallet.name}</strong></div>
          </button>
          <div className="header-actions">
            <button className="round-button" aria-label="Transaction history" onClick={() => navigate('/history', { returnTo: location.pathname })}><Icon name="clock" size={22} /></button>
            <button className="round-button" aria-label="Scan QR code" onClick={() => setIsScannerOpen(true)}><Icon name="scan" size={22} /></button>
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

        {uiFeatureConfig.showHomeBalanceActions && <section className="home-balance-section" aria-labelledby="home-balance-title">
          <h1 id="home-balance-title">{formatUsd(usdtValue)}</h1>
          <p>{formatUsd(Math.abs(usdtChangeValue))} ({formatPercent(usdtChange)})</p>
          <div className="home-balance-actions">
            <button type="button" className="home-balance-action" onClick={() => openTransfer('send', walletTokenToMarketAsset(receiveToken, walletPrices, walletChanges))}><span className="home-balance-action-icon-wrap"><HomeTransferArrow direction="send" /></span><strong>Send</strong></button>
            <button type="button" className="home-balance-action" onClick={() => openTransfer('receive', walletTokenToMarketAsset(receiveToken, walletPrices, walletChanges))}><span className="home-balance-action-icon-wrap"><HomeTransferArrow direction="receive" /></span><strong>Receive</strong></button>
            <button type="button" className="home-balance-action swap" onClick={() => navigate('/swap', { returnTo: '/' })}><span className="home-balance-action-icon-wrap"><HomeSwapIcon /></span><strong>Swap</strong></button>
            <button type="button" className="home-balance-action" onClick={() => navigate('/markets', { returnTo: '/' })}><span className="home-balance-action-icon-wrap"><HomeBuyIcon /></span><strong>Buy</strong></button>
          </div>
        </section>}

        <section className="token-section">
          <h2>Tokens <Icon name="chevron" size={25} /></h2>
          <div className="token-list">
            {walletPortfolioTokens.map((token) => (
              <button type="button" className="token-row" key={token.id} onClick={() => openWalletTokenDetail(token)} aria-label={`Open ${token.name}`}>
                <div className="token-leading"><TokenMark token={token} /><div className="token-copy"><strong>{token.name}</strong><span>{formatTokenBalance(token.balance)} {token.symbol}</span></div></div>
                <div className="token-price"><strong>{formatUsd(getWalletTokenValue(token, walletPrices))}</strong>{(() => { const change = walletChanges[token.symbol] ?? null; return <span className={change !== null && change >= 0 ? 'positive-text' : change !== null ? 'negative-text' : ''}>{formatPercent(change)}</span> })()}</div>
              </button>
            ))}
          </div>
          <button type="button" className="view-all-button" onClick={() => navigate('/tokens', { returnTo: '/' })}>View all <Icon name="chevron" size={24} /></button>
        </section>

        <section className="perps-section">
          <button type="button" className="home-section-heading" onClick={() => navigate('/perps')} aria-label="Open Perps"><span>Perps</span><Icon name="chevron" size={25} /></button>
          <div className="perps-card-row">
            <article className="perps-card">
              <div className="perps-card-icon"><TokenMark token={bitcoinToken} /></div>
              <div className="perps-card-title"><strong>BTC</strong><span>40x</span></div>
              <span className="perps-volume">$1.82B Vol</span>
            </article>
            <article className="perps-card">
              <div className="perps-card-icon"><TokenMark token={ethereumToken} /></div>
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
            {homeWatchlistAssets.length ? homeWatchlistAssets.map((asset) => (
              <button type="button" className="watchlist-row" key={asset.symbol} onClick={() => openAssetDetail(asset)} aria-label={`Open ${asset.name}`}>
                <CryptoMark asset={asset} />
                <div className="watchlist-name"><strong>{asset.name}</strong></div>
                <div className="watchlist-price"><strong>{formatUsd(asset.price)}</strong><span className={(asset.change24h ?? -1) >= 0 ? 'positive-text' : 'negative-text'}>{formatPercent(asset.change24h)}</span></div>
              </button>
            )) : <p className="watchlist-empty-state">Star assets from Search to add them here.</p>}
          </div>
        </section>

        {isScannerOpen && <DeviceScanner onClose={() => setIsScannerOpen(false)} />}

        </>}
        <nav className="bottom-dock" aria-label="Main navigation">
          <div className="nav-pill">
            <button className={`nav-item${activeTab === 'home' ? ' active' : ''}`} onClick={() => navigate('/')}><Icon name="home" size={22} /></button>
            <button className={`nav-item${activeTab === 'markets' ? ' active' : ''}`} onClick={() => navigate('/markets')}><Icon name="chart" size={22} /></button>
            <button className={`nav-item perps-nav-item${activeTab === 'perps' ? ' active' : ''}`} onClick={() => navigate('/perps')} aria-label="Open Perps"><Icon name="infinity" size={21} /></button>
            <button className={`nav-item${activeTab === 'discover' ? ' active' : ''}`} onClick={() => navigate('/discover')}><Icon name="compass" size={22} /></button>
          </div>
          <button className="nav-search" aria-label="Search" onClick={() => navigate('/search', { returnTo: location.pathname })}><Icon name="search" size={27} /></button>
        </nav>
      </div>
    </main>
  )
}

export default App
