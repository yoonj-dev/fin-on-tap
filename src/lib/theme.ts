export type Theme = 'auto' | 'light' | 'dark';

export const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'auto';
  const saved = localStorage.getItem('fin_theme') as Theme | null;
  if (saved === 'light' || saved === 'dark' || saved === 'auto') {
    return saved;
  }
  return 'auto';
};

export const resolveTheme = (theme: Theme): 'light' | 'dark' => {
  if (theme === 'light') return 'light';
  if (theme === 'dark') return 'dark';
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const applyThemeToDom = (theme: Theme, persist = true) => {
  if (typeof window === 'undefined') return;
  const resolved = resolveTheme(theme);
  const root = document.documentElement;
  const body = document.body;

  if (resolved === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
    root.setAttribute('data-theme', 'dark');
    body.classList.add('dark');
    body.classList.remove('light');
    body.setAttribute('data-theme', 'dark');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    body.classList.add('light');
    body.classList.remove('dark');
    body.setAttribute('data-theme', 'light');
  }

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', resolved === 'dark' ? '#0f172a' : '#f59e0b');
  }

  if (persist) {
    localStorage.setItem('fin_theme', theme);
  }
};
