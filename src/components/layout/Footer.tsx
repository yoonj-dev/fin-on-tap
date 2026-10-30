import React from 'react';
import { Landmark, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-sky-600 flex items-center justify-center text-white shadow-xs">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                Fin on Tap
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block">
                글로벌 금융 10대 핵심 유니버스 섹터 인텔리전스
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600 dark:text-zinc-400">
            <a
              href="https://pharma.on-tap.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
            >
              <span>Pharma on Tap (제약/바이오 10선)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://pay.on-tap.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
            >
              <span>Pay on Tap (결제 3총사)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://cloud.on-tap.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
            >
              <span>Cloud on Tap (하이퍼스케일러 3강)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://dev.on-tap.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1 font-semibold"
            >
              <span>On Tap 생태계</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-3">
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>by Yoonj · On Tap Ecosystem</span>
          </p>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
            본 사이트의 데이터는 투자 권유가 아니며 정보 제공만을 목적으로 합니다.
          </p>
        </div>
      </div>
    </footer>
  );
};
