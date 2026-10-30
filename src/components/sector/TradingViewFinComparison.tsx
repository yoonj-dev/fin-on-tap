import React, { useEffect, useRef } from 'react';
import { LineChart, ExternalLink } from 'lucide-react';

interface TradingViewFinComparisonProps {
  theme?: 'light' | 'dark';
}

export const TradingViewFinComparison: React.FC<TradingViewFinComparisonProps> = ({ theme = 'light' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        ['JPMorgan', 'NYSE:JPM|1D'],
        ['Berkshire Hathaway', 'NYSE:BRK.B|1D'],
        ['Bank of America', 'NYSE:BAC|1D'],
        ['Goldman Sachs', 'NYSE:GS|1D'],
        ['Morgan Stanley', 'NYSE:MS|1D'],
        ['BlackRock', 'NYSE:BLK|1D']
      ],
      chartOnly: false,
      width: '100%',
      height: 480,
      locale: 'kr',
      colorTheme: theme,
      autosize: true,
      showVolume: false,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: 'right',
      scaleMode: 'Percentage',
      fontFamily: '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif',
      fontSize: '10',
      noTimeScale: false,
      valuesTracking: '1',
      changeMode: 'price-and-percent',
      chartType: 'area',
      headerFontSize: 'medium',
      lineType: 0,
      dateRanges: [
        '1d|1',
        '1m|30',
        '3m|60',
        '12m|1D',
        '60m|1W',
        'all|1M'
      ]
    });

    containerRef.current.appendChild(script);
  }, [theme]);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
              <LineChart className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              글로벌 금융 빅6 주가 상대 강도 비교
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            동일 시점 기준 % 수익률 정규화 차트 (JPM vs BRK.B vs BAC vs GS vs MS vs BLK)
          </p>
        </div>
        <a
          href="https://kr.tradingview.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors self-start sm:self-auto"
        >
          <span>TradingView 제공</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="w-full min-h-[480px] rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-800/40">
        <div ref={containerRef} className="tradingview-widget-container w-full h-[480px]" />
      </div>
    </div>
  );
};
