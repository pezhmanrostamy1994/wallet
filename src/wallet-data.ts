/**
 * Wallet balances are intentionally kept in this file so they can be edited
 * without touching the UI. Amounts are token units, not USD values.
 */
export type WalletTokenKind = 'bitcoin' | 'tether' | 'tron' | 'ethereum' | 'bnb'

export type WalletTokenDefinition = {
  id: string
  name: string
  symbol: 'USDT' | 'BTC' | 'TRX' | 'ETH' | 'BNB'
  cmcId: number
  kind: WalletTokenKind
  fallbackPrice: number
}

export const walletTokenDefinitions: WalletTokenDefinition[] = [
  { id: 'tether', name: 'Tether', symbol: 'USDT', cmcId: 825, kind: 'tether', fallbackPrice: 1 },
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', cmcId: 1, kind: 'bitcoin', fallbackPrice: 67_000 },
  { id: 'tron', name: 'TRON', symbol: 'TRX', cmcId: 1958, kind: 'tron', fallbackPrice: 0.13 },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', cmcId: 1027, kind: 'ethereum', fallbackPrice: 1_800 },
  { id: 'bnb', name: 'BNB Smart Chain', symbol: 'BNB', cmcId: 1839, kind: 'bnb', fallbackPrice: 600 },
]

export type WalletBalances = Partial<Record<WalletTokenDefinition['symbol'], number>>

export type WalletDefinition = {
  id: string
  name: string
  /** Wallet-specific receive/send identifier. Edit these values to use your own IDs. */
  address: string
  balances: WalletBalances
}

// Edit `address` or `balances` to change the wallet identifiers and amounts shown in the app.
export const walletDefinitions: WalletDefinition[] = [
  { id: 'wallet-01', name: 'Main Wallet 1', address: '0x9b7D6e37D5F0A1c1B8e9F02F5A6dB4c37E9a1c52', balances: { USDT: 214_780 } },
  { id: 'wallet-02', name: 'Main Wallet 2', address: '0x3E8b5fA1c2D4e6F8091aBcD2e3F4a5b6C7d8E9f0', balances: { USDT: 203_740 } },
  { id: 'wallet-03', name: 'Main Wallet 3', address: '0x7aB2c4D6e8F0012a3B4c5D6e7F8091a2b3C4d5E6', balances: { USDT: 213_690 } },
  { id: 'wallet-04', name: 'Main Wallet 4', address: '0x1cD3e5F709aB2c4D6e8F0012a3B4c5D6e7F8091A', balances: { USDT: 207_450 } },
  { id: 'wallet-05', name: 'Main Wallet 5', address: '0x5F0a1B2c3D4e5F60718293a4B5c6D7e8F9012aB3', balances: { USDT: 211_860 } },
  { id: 'wallet-06', name: 'Main Wallet 6', address: '0x8dE4f6A809bC1d2E3f4A5b6C7d8E9f0A1b2C3d4E', balances: { USDT: 210_320 } },
  { id: 'wallet-07', name: 'Main Wallet 7', address: '0x2B7c9D1e3F5a7B9c0D2e4F6a8B0c2D4e6F8a0B2c', balances: { USDT: 212_780 } },
  { id: 'wallet-08', name: 'Main Wallet 8', address: '0x4e6F8a0B2c4D6e8F0a1B3c5D7e9F1a2B4c6D8e0F', balances: { USDT: 204_690 } },
  { id: 'wallet-09', name: 'Main Wallet 9', address: '0x9C1d3E5f7A9b0C2d4E6f8A0b2C4d6E8f0A1b3C5d', balances: { USDT: 210_500 } },
  { id: 'wallet-10', name: 'Main Wallet 10', address: '0x6f8A0b2C4d6E8f0A1b3C5d7E9f1A2b4C6d8E0f2A', balances: { USDT: 205_370 } },
  { id: 'wallet-11', name: 'Main Wallet 11', address: '0x1A3c5D7e9F0a2B4c6D8e0F2a4B6d8E0f1A3c5D7e', balances: { USDT: 204_820 } },
]
