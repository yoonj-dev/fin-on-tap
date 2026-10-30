import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { FinSectorHero } from './components/sector/FinSectorHero';
import { FinSectorWorkspace } from './components/sector/FinSectorWorkspace';
import { TradingViewFinComparison } from './components/sector/TradingViewFinComparison';
import { Footer } from './components/layout/Footer';
import { Theme, getInitialTheme, applyThemeToDom, resolveTheme } from './lib/theme';
import { FinTicker } from './types/financials';
import { INITIAL_FIN_DATA } from './data/financialsData';

export const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<Theme>(getInitialTheme());
  const [finData, setFinData] = useState(INITIAL_FIN_DATA);
  const [activeTicker, setActiveTicker] = useState<FinTicker>('JPM');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    applyThemeToDom(themeMode);
    setEffectiveTheme(resolveTheme(themeMode));

    if (themeMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        applyThemeToDom('auto');
        setEffectiveTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [themeMode]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setFinData((prev) => {
        const next = { ...prev };
        const randVariation = (Math.random() - 0.49) * 0.5;
        const current = next.stocks[activeTicker];
        const newPrice = Number((current.currentPrice + randVariation).toFixed(2));
        next.stocks[activeTicker] = {
          ...current,
          currentPrice: newPrice,
          change: Number((newPrice - (current.currentPrice - current.change)).toFixed(2)),
        };
        return next;
      });
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans transition-colors selection:bg-amber-500 selection:text-white">
      <Header 
        currentTheme={themeMode} 
        onThemeChanged={setThemeMode}
        stocks={finData.stocks}
        activeTicker={activeTicker}
        onSelectTicker={setActiveTicker}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Sector Overview Hero & Spotlight */}
        <FinSectorHero 
          data={finData}
          activeTicker={activeTicker}
          onSelectTicker={setActiveTicker}
        />

        {/* Deep Analysis Sector Workspace */}
        <FinSectorWorkspace 
          data={finData}
          activeTicker={activeTicker}
          onSelectTicker={setActiveTicker}
        />

        {/* Normalized TradingView Comparison */}
        <TradingViewFinComparison theme={effectiveTheme} />
      </main>

      <Footer />
    </div>
  );
};

export default App;
