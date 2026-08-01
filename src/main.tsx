import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/css/globals.css';
import App from './App.tsx';
import Spinner from './views/spinner/Spinner.tsx';
import { ThemeProvider } from './context/shadcntheme/ThemeContext.tsx';

const STALE_CHUNK_RELOAD_KEY = 'tenderpilot-stale-chunk-reload';

function recoverFromStaleChunk() {
  const lastReload = Number(sessionStorage.getItem(STALE_CHUNK_RELOAD_KEY) ?? 0);

  if (Date.now() - lastReload > 10_000) {
    sessionStorage.setItem(STALE_CHUNK_RELOAD_KEY, String(Date.now()));
    window.location.reload();
  }
}

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  recoverFromStaleChunk();
});

window.addEventListener('unhandledrejection', (event) => {
  const message = String(event.reason?.message ?? event.reason ?? '');

  if (
    /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
      message,
    )
  ) {
    event.preventDefault();
    recoverFromStaleChunk();
  }
});

async function deferRender() {
  const { worker } = await import('./api/mocks/browser.ts');
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

deferRender().then(() => {
  createRoot(document.getElementById('root')!).render(
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    </ThemeProvider>,
  );
});