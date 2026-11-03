import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  TrendingUp,
  Table,
  Coins,
} from 'lucide-react';
import { FinSectorData, FinTicker, FinStock } from '../../types/financials';

interface FinSectorWorkspaceProps {
  data: FinSectorData;
  activeTicker: FinTicker;
  onSelectTicker: (t: FinTicker) => void;
}

export const FinSectorWorkspace: React.FC<FinSectorWorkspaceProps> = ({
  data,
  activeTicker,
  onSelectTicker,
}) => {
  const [activeTab, setActiveTab] = useState<'categories' | 'table' | 'spreads' | 'returns'>('categories');
  const stocksList = Object.values(data.stocks);

  const categories = [
    { id: 'MONEY_CENTER', name: '대형 상업은행 (NII / 대출)', tickers: ['JPM', 'BAC', 'WFC', 'C'] },
    { id: 'INVESTMENT_BANK', name: '글로벌 투자은행 (IB / M&A / 트레이딩)', tickers: ['GS', 'MS'] },
    { id: 'ASSET_MANAGEMENT', name: '자산운용 및 지주 (AUM / 복합금융)', tickers: ['BLK', 'BRK.B'] },
    { id: 'PAYMENTS_RAIL', name: '글로벌 결제 네트워크 (무신용위험 통행세)', tickers: ['V', 'MA'] },
  ];

  const scrollToSection = (tabId: 'categories' | 'table' | 'spreads' | 'returns', domId: string) => {
    setActiveTab(tabId);
    const el = document.getElementById(domId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm mb-8 space-y-8">
      {/* Workspace Header & Quick Jump Ribbon */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              Sector Workspace
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              풀스크롤 인텔리전스 팩트시트
            </span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
            금융 10강 전술 비교 분석실
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
            은행·IB·자산운용·결제망 4대 하위 섹터별 PBR, ROTCE, 자본비율(CET1), 금리 민감도 정밀 점검 (스크롤하여 전체 열람)
          </p>
        </div>

        {/* Quick Jump Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl self-start md:self-auto overflow-x-auto max-w-full shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('categories', 'sec-fin-categories')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'categories'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            4대 하위 섹터별
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('table', 'sec-fin-table')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'table'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Table className="w-3.5 h-3.5 text-sky-500" />
            10개사 전수 매트릭스
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('spreads', 'sec-fin-spreads')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'spreads'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Coins className="w-3.5 h-3.5 text-emerald-500" />
            NIM & 금리 사이클
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('returns', 'sec-fin-returns')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'returns'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-purple-500" />
            주주환원 (배당+자사주)
          </button>
        </div>
      </div>

      {/* Section 1: 4 Sub-themes Grid */}
      <section id="sec-fin-categories" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Layers className="w-4 h-4" />
            </span>
            1. 글로벌 금융 4대 하위 비즈니스 모델 & 대표주 분해
          </h3>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            상업은행 · IB · 자산운용 · 결제망
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-700">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  {cat.name}
                </h4>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {cat.tickers.length}개 대표주
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cat.tickers.map((ticker) => {
                  const st = data.stocks[ticker as FinTicker];
                  const isSelected = activeTicker === ticker;
                  return (
                    <div
                      key={ticker}
                      onClick={() => onSelectTicker(ticker as FinTicker)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-white dark:bg-zinc-900 shadow-xs'
                          : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 bg-white/60 dark:bg-zinc-900/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">{st.name}</span>
                        <span className="text-[10px] font-mono font-bold text-zinc-500">{st.ticker}</span>
                      </div>
                      <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium truncate">
                        {st.coreBusinessFocus}
                      </p>
                      <div className="flex justify-between items-center text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                        <span>PBR {st.pbr}x</span>
                        <span>ROTCE {st.rotce}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: 10-Stock Full Comparison Table */}
      <section id="sec-fin-table" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="p-1 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
              <Table className="w-4 h-4" />
            </span>
            2. 금융 10대 핵심 유니버스 종합 비교 매트릭스
          </h3>
          <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold">
            ROTCE · CET1 · PBR Multiples
          </span>
        </div>

        <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="p-3 font-semibold">종목 (티커)</th>
                <th className="p-3 font-semibold">업종 분류</th>
                <th className="p-3 font-semibold">시가총액</th>
                <th className="p-3 font-semibold">PBR</th>
                <th className="p-3 font-semibold">Fwd P/E</th>
                <th className="p-3 font-semibold">ROTCE</th>
                <th className="p-3 font-semibold">CET1 비율</th>
                <th className="p-3 font-semibold">배당수익률</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {stocksList.map((st: FinStock) => (
                <tr 
                  key={st.ticker}
                  onClick={() => onSelectTicker(st.ticker)}
                  className={`cursor-pointer transition-colors ${
                    activeTicker === st.ticker
                      ? 'bg-amber-50/50 dark:bg-amber-950/20'
                      : 'hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40'
                  }`}
                >
                  <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: st.brandColor }} />
                    {st.name} ({st.ticker})
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px]">
                      {st.categoryLabel}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-medium text-zinc-800 dark:text-zinc-200">{st.marketCap}</td>
                  <td className={`p-3 font-mono font-bold ${st.pbr < 1.0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-800 dark:text-zinc-200'}`}>
                    {st.pbr}x
                  </td>
                  <td className="p-3 font-mono text-zinc-700 dark:text-zinc-300">{st.forwardPE}x</td>
                  <td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400">{st.rotce}</td>
                  <td className="p-3 font-mono text-sky-600 dark:text-sky-400">{st.cet1Ratio}</td>
                  <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {st.dividendYield > 0 ? `${st.dividendYield}%` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: NIM & Interest Rate Cycles */}
      <section id="sec-fin-spreads" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <Coins className="w-4 h-4" />
            </span>
            3. 금리 인하 사이클과 순이자마진(NIM) & IB 딜 수수료 레버리지
          </h3>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            Yield Curve & Fee Leverage
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40">
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-500" />
              금리 인하 사이클과 상업은행 순이자마진(NIM)
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2">
              연준의 기준금리 인하 사이클 진입 시, 은행의 단기 예금 조달 비용(Cost of Deposits)이 즉각 하락하여 순이자마진(NIM) 스프레드가 개선됩니다. 또한 장단기 금리 역전 해소(Un-inversion)로 장기 대출 이자수익 마진이 복원되며, 만기보유증권(HTM)에 묶여있던 채권 평가 손실이 급속히 만회됩니다 (BAC, JPM 최대 수혜).
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40">
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-500" />
              글로벌 자본시장 딜(Deal)과 IB 수수료 레버리지
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              금리 하향 안정화는 사모펀드(PE)의 인수금융(LBO) 재개와 기업들의 M&A, 빅테크 AI 자금 조달 채권 발행을 촉진합니다. 골드만삭스(GS)와 모건스탠리(MS)는 고정비가 높은 비즈니스 모델 특성상 IB 자문 수수료 매출이 20~30%만 반등해도 영업이익이 50%+ 폭증하는 강력한 영업 레버리지를 누립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Capital Return (Buyback + Dividend) */}
      <section id="sec-fin-returns" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="p-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
              <TrendingUp className="w-4 h-4" />
            </span>
            4. 주주환원(자사주 매입+배당) 머신 & 버크셔 현금 실탄
          </h3>
          <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold">
            Shareholder Yield & Dry Powder
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40">
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              대형 금융주의 자사주 매입(Buyback) 머신
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              연준의 스트레스 테스트(CCAR) 통과 후 대형 은행들은 규제 자본(CET1) 초과분을 매년 대규모 자사주 소각에 투입합니다. 특히 Visa와 Mastercard는 연간 잉여현금흐름(FCF)의 80% 이상을 배당과 자사주 매입에 쏟아부어 발행주식수를 지속적으로 줄여나가며 주당 가치를 극대화합니다.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40">
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              버크셔 해서웨이의 $3,200억 현금 실탄
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              버크셔(BRK.B)는 배당을 지급하지 않는 대신 무위험 단기 국채(T-Bills)로 연간 $150억 이상의 안정적 현금 이자 수익을 벌어들이고 있습니다. 이는 향후 금융위기나 급격한 시장 조정 국면에서 금융/에너지/제조업 전반의 우량 자산을 독점 헐값에 쇼핑할 수 있는 거대한 옵션 가치를 내포합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};