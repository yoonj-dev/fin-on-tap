import React, { useRef, useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Landmark,
  Sparkles,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { FinSectorData, FinTicker } from '../../types/financials';

interface FinSectorHeroProps {
  data: FinSectorData;
  activeTicker: FinTicker;
  onSelectTicker: (t: FinTicker) => void;
}

export const FinSectorHero: React.FC<FinSectorHeroProps> = ({
  data,
  activeTicker,
  onSelectTicker,
}) => {
  const { stocks, totalUniverseMarketCap, sectorAverageYield, macroMetrics } = data;
  const current = stocks[activeTicker];

  const prevPriceRef = useRef<number>(current.currentPrice);
  const [glow, setGlow] = useState<'UP' | 'DOWN' | null>(null);

  useEffect(() => {
    if (prevPriceRef.current !== current.currentPrice && prevPriceRef.current > 0) {
      setGlow(current.currentPrice > prevPriceRef.current ? 'UP' : 'DOWN');
      const timer = setTimeout(() => setGlow(null), 1200);
      prevPriceRef.current = current.currentPrice;
      return () => clearTimeout(timer);
    }
    prevPriceRef.current = current.currentPrice;
  }, [current.currentPrice]);

  return (
    <div className="fintech-card p-4 sm:p-6 space-y-6">
      {/* 1. Header Info & Sector Macro Drivers */}
      <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
              <Landmark className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200">
              글로벌 금융 10대 지배적 유니버스
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
            <span>유니버스 합산 시총</span>
            <span className="font-bold text-slate-800 dark:text-zinc-200">{totalUniverseMarketCap}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 font-mono">
              섹터 평균 배당률 {sectorAverageYield}%
            </span>
          </div>
        </div>

        {/* Macro Banking & Financial Drivers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {macroMetrics.map((macro, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-200/60 dark:border-zinc-800 text-xs">
              <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-zinc-200 mb-0.5">
                <span>{macro.name}</span>
                <span className="text-[10px] px-1 rounded text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40">
                  {macro.value}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">
                {macro.impactSummary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 10-Stock Interactive Sector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {(Object.keys(stocks) as FinTicker[]).map((ticker) => {
          const s = stocks[ticker];
          const isSelected = activeTicker === ticker;
          const isPos = s.changePercent >= 0;

          return (
            <button
              key={ticker}
              type="button"
              onClick={() => onSelectTicker(ticker)}
              className={`p-2.5 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/20 shadow-xs ring-1 ring-amber-500/30'
                  : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                  {s.ticker}
                </span>
                <span className="text-[9px] px-1 rounded font-medium bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 truncate max-w-[65px]">
                  {s.categoryLabel}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold font-mono text-slate-900 dark:text-zinc-100">
                  ${s.currentPrice}
                </span>
                <span className={`text-[10px] font-bold ${isPos ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isPos ? '+' : ''}{s.changePercent.toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-zinc-500 mt-1 pt-1 border-t border-slate-100 dark:border-zinc-800">
                <span>시총 {s.marketCap}</span>
                <span>PBR {s.pbr}x</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Detailed Spotlight of Active Financial Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: current.brandColor }} />
                <h3 className="text-xl font-black text-slate-900 dark:text-zinc-100">
                  {current.name}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 font-bold">
                  NYSE: {current.ticker}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                {current.koreanName} · {current.categoryLabel}
              </p>
            </div>

            <div className={`p-2 rounded-xl transition-colors duration-700 ${
              glow === 'UP' ? 'bg-emerald-500/20' : glow === 'DOWN' ? 'bg-red-500/20' : 'bg-transparent'
            }`}>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono tracking-tight text-slate-900 dark:text-zinc-100">
                  ${current.currentPrice}
                </span>
                <span className={`text-sm font-bold flex items-center ${
                  current.change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {current.change >= 0 ? <TrendingUp className="w-4 h-4 mr-0.5" /> : <TrendingDown className="w-4 h-4 mr-0.5" />}
                  {current.change >= 0 ? '+' : ''}{current.change} ({current.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Core Business & Moat Summary */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                핵심 비즈니스 모델 & 금융 해자
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200">
                ROTCE: {current.rotce}
              </span>
            </div>
            <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
              {current.coreBusinessFocus}
            </p>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              {current.moatSummary}
            </p>
          </div>

          {/* Key Catalysts Bullets */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              주요 주가 촉매 & 사이클 모멘텀 (Catalysts)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {current.catalysts.map((cat, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-700 dark:text-zinc-300 font-medium flex items-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Banking Capital & Valuation Panel */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/60 dark:bg-zinc-900/40 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
              자본 건전성 & 밸류에이션
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-zinc-800">
                <span className="text-slate-600 dark:text-zinc-400">시가총액</span>
                <span className="font-bold text-slate-900 dark:text-zinc-100 font-mono">{current.marketCap}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-zinc-800">
                <span className="text-slate-600 dark:text-zinc-400">PBR (주가순자산비율)</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">{current.pbr}x</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-zinc-800">
                <span className="text-slate-600 dark:text-zinc-400">12M 선행 P/E (Fwd P/E)</span>
                <span className="font-bold text-slate-900 dark:text-zinc-100 font-mono">{current.forwardPE}x</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-zinc-800">
                <span className="text-slate-600 dark:text-zinc-400">배당수익률</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {current.dividendYield > 0 ? `${current.dividendYield}%` : '자사주 위주'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-zinc-400">CET1 보통주 자본비율</span>
                <span className="font-bold text-sky-600 dark:text-sky-400 font-mono">{current.cet1Ratio}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800 text-[11px] text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>CET1 12% 이상은 위기 시에도 배당 및 자사주 매입이 보장되는 안전선입니다.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
