export type FinCategory = 
  | 'MONEY_CENTER'       // 대형 상업은행 (JPM, BAC, WFC, C)
  | 'INVESTMENT_BANK'    // 투자은행/자본시장 (GS, MS)
  | 'ASSET_MANAGEMENT'   // 자산운용 및 지주 (BLK, BRK.B)
  | 'PAYMENTS_RAIL';     // 글로벌 결제 인프라 (V, MA)

export type FinTicker = 
  | 'JPM' 
  | 'BRK.B' 
  | 'BAC' 
  | 'GS' 
  | 'MS' 
  | 'BLK' 
  | 'WFC' 
  | 'C' 
  | 'V' 
  | 'MA';

export interface FinStock {
  ticker: FinTicker;
  name: string;
  koreanName: string;
  category: FinCategory;
  categoryLabel: string;
  brandColor: string;
  badgeBg: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  marketCap: string;
  marketCapVal: number; // in Billion USD
  trailingPE: number;
  forwardPE: number;
  pbr: number; // Price to Book
  dividendYield: number; // percentage e.g. 2.4%
  
  // Banking & Financial Sector Metrics
  cet1Ratio: string; // 보통주 자본비율 e.g. "15.3%"
  rotce: string; // 유형자기자본이익률 e.g. "20.5%"
  coreBusinessFocus: string; // e.g. "NII & Treasury, M&A Advisory, AUM Fee"
  moatSummary: string;
  catalysts: string[];
}

export interface MacroFinancialMetric {
  name: string;
  value: string;
  trend: 'UP' | 'DOWN' | 'NEUTRAL';
  impactSummary: string;
}

export interface FinSectorData {
  asOfDate: string;
  totalUniverseMarketCap: string; // e.g. "$4.8T"
  sectorAverageYield: number; // e.g. 2.15%
  macroMetrics: MacroFinancialMetric[];
  stocks: Record<FinTicker, FinStock>;
}
