import React, { useState } from 'react';
import {
  Landmark,
  MoreVertical,
  Beer,
  ExternalLink,
  RefreshCw,
  Cpu,
  Layers,
  Activity,
} from 'lucide-react';
import { Theme } from '../../lib/theme';
import { FinTicker, FinStock } from '../../types/financials';

interface HeaderProps {
  currentTheme: Theme;
  onThemeChanged: (theme: Theme) => void;
  stocks: Record<FinTicker, FinStock>;
  activeTicker: FinTicker;
  onSelectTicker: (t: FinTicker) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  onThemeChanged,
  stocks,
  activeTicker,
  onSelectTicker,
  isRefreshing,
  onRefresh,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDonate = () => {
    if (typeof window !== 'undefined' && (window as any).BrandUI?.openDonate) {
      (window as any).BrandUI.openDonate();
    } else {
      window.open('https://brand-ui.on-tap.xyz/donate', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-sky-600 flex items-center justify-center text-white shadow-xs">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-zinc-100">
                  Fin on Tap
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  글로벌 금융 10선
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
                대형은행 · 투자은행(IB) · 자산운용 · 결제망
              </p>
            </div>
          </div>

          {/* Quick Ticker Switcher Pills */}
          <div className="hidden xl:flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl overflow-x-auto max-w-xl">
            {(Object.keys(stocks) as FinTicker[]).map((t) => {
              const stock = stocks[t];
              const isSelected = activeTicker === t;
              return (
                <button
                  key={t}
                  onClick={() => onSelectTicker(t)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stock.brandColor }} />
                  <span>{stock.ticker}</span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    ${stock.currentPrice}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Action Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="데이터 새로고침"
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-600' : ''}`} />
            </button>

            {/* 3-Dot Context Menu */}
            <div className="relative">
              <button
                type="button"
                data-brand-context-menu="true"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="더보기 메뉴"
                className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl py-2 z-50 text-xs">
                    {/* Theme Mode Selector */}
                    <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
                      <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-2">
                        화면 테마 설정
                      </span>
                      <div className="grid grid-cols-3 gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
                        {(['auto', 'light', 'dark'] as Theme[]).map((t) => (
                          <button
                            key={t}
                            onClick={() => {
                              onThemeChanged(t);
                              setMenuOpen(false);
                            }}
                            className={`py-1 rounded-lg text-center font-medium capitalize transition-colors ${
                              currentTheme === t
                                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                            }`}
                          >
                            {t === 'auto' ? '자동' : t === 'light' ? '라이트' : '다크'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* On Tap Ecosystem Hubs */}
                    <div className="py-1 border-b border-zinc-100 dark:border-zinc-800">
                      <span className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                        On Tap 세트 메뉴 & 허브
                      </span>
                      <a
                        href="https://pharma.on-tap.xyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-between text-zinc-700 dark:text-zinc-300"
                      >
                        <span className="flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-rose-500" />
                          <span>Pharma on Tap (제약/바이오 10선)</span>
                        </span>
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </a>
                      <a
                        href="https://memory.on-tap.xyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-between text-zinc-700 dark:text-zinc-300"
                      >
                        <span className="flex items-center gap-2">
                          <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Memory on Tap (메모리 5강)</span>
                        </span>
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </a>
                      <a
                        href="https://cloud.on-tap.xyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-between text-zinc-700 dark:text-zinc-300"
                      >
                        <span className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-sky-500" />
                          <span>Cloud on Tap (하이퍼스케일러 3강)</span>
                        </span>
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </a>
                    </div>

                    {/* Support & Ecosystem */}
                    <div className="py-1">
                      <span className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                        Support & Ecosystem
                      </span>
                      <button
                        type="button"
                        data-brand-open-donate="true"
                        onClick={() => {
                          setMenuOpen(false);
                          handleDonate();
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-medium"
                      >
                        <Beer className="w-4 h-4 text-amber-500" />
                        <span>🍺 Buy me a beer (후원하기)</span>
                      </button>
                      <a
                        href="https://dev.on-tap.xyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-between text-zinc-700 dark:text-zinc-300"
                      >
                        <span>🚀 개발자 페이지 (On Tap)</span>
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
