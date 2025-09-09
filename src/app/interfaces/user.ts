export interface Holding {
  symbol: string;
  share: number;
}

export interface User {
  equity: number;
  holdings: Holding[];
}
