import { Holding } from './user';

export enum StockType {
  STOCK = 'stock',
  ETF = 'etf',
}

export interface StockDetails {
  id: string;
  symbol: string;
  type: StockType;
  fullName: string;
  logo: string;
  volume: number;
  marketCap: number;
}

export interface StockPrice {
  id: string;
  symbol: string;
  open: number;
  close: number;
  ask: number;
  high: number;
  low: number;
}

export type Stock = StockDetails & StockPrice;

export type Instrument = Stock & Holding;
