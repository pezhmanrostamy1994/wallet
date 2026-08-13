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
  balances: WalletBalances
}

// Edit `balances` to change the amount shown everywhere in the app.
export const walletDefinitions: WalletDefinition[] = [
  { id: 'wallet-01', name: 'Main Wallet 1', balances: { USDT: 203.74 } },
  { id: 'wallet-02', name: 'Main Wallet 2', balances: { USDT: 217.18 } },
  { id: 'wallet-03', name: 'Main Wallet 3', balances: { USDT: 231.63 } },
  { id: 'wallet-04', name: 'Main Wallet 4', balances: { USDT: 246.91 } },
  { id: 'wallet-05', name: 'Main Wallet 5', balances: { USDT: 259.76 } },
  { id: 'wallet-06', name: 'Main Wallet 6', balances: { USDT: 268.25 } },
  { id: 'wallet-07', name: 'Main Wallet 7', balances: { USDT: 274.38 } },
  { id: 'wallet-08', name: 'Main Wallet 8', balances: { USDT: 282.84 } },
  { id: 'wallet-09', name: 'Main Wallet 9', balances: { USDT: 289.57 } },
  { id: 'wallet-10', name: 'Main Wallet 10', balances: { USDT: 271.69 } },
  { id: 'wallet-11', name: 'Main Wallet 11', balances: { USDT: 283.44 } },
]
