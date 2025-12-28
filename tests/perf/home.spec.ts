import { test, expect } from '@playwright/test';

// Utility to capture LCP in the page context
async function observeLCP(page: import('@playwright/test').Page) {
  return await page.evaluate(async () => {
    return await new Promise<number>((resolve) => {
      let lcp = 0;
      try {
        const po = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const last = entries[entries.length - 1] as any;
          if (last && typeof last.renderTime === 'number') {
            lcp = last.renderTime || last.loadTime || 0;
          }
        });
        // @ts-ignore
        po.observe({ type: 'largest-contentful-paint', buffered: true });
        // Resolve shortly after load
        addEventListener('load', () => setTimeout(() => resolve(lcp), 1000));
        // Safety timeout (5s)
        setTimeout(() => resolve(lcp), 5000);
      } catch {
        resolve(0);
      }
    });
  });
}

test.describe('Home page performance and stability', () => {
  test('meets basic performance budgets and no console errors', async ({ page, context, baseURL }) => {
    // Start tracing
    await context.tracing.start({ screenshots: true, snapshots: true });

    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(baseURL || 'http://localhost:3000', { waitUntil: 'load' });

    // Observe LCP
    const lcp = await observeLCP(page);

    // Navigation timing
    const perf = await page.evaluate(() => {
      const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      return nav ? { ttfb: nav.responseStart, domContentLoaded: nav.domContentLoadedEventEnd, load: nav.loadEventEnd } : null;
    });

    // Budgets (tune as needed)
    // LCP under ~3500ms on dev (will be lower on prod)
    expect(lcp).toBeLessThan(3500);
    // No console errors
    expect(consoleErrors, 'Console errors: ' + consoleErrors.join('\n')).toHaveLength(0);
    // Basic load sanity
    if (perf) {
      expect(perf.domContentLoaded).toBeLessThan(4500);
      expect(perf.load).toBeLessThan(6000);
    }

    // Stop tracing and save
    await context.tracing.stop({ path: 'playwright-results/home-trace.zip' });
  });
});
