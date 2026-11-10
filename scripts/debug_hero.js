import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  await page.goto('http://localhost:3000/');
  
  await new Promise(r => setTimeout(r, 4500));
  
  const elInfo = await page.evaluate(() => {
    const getInfo = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const s = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        rect: { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) },
        opacity: s.opacity,
        transform: s.transform,
        display: s.display,
        visibility: s.visibility,
        text: el.textContent ? el.textContent.trim().slice(0, 40) : ''
      };
    };
    return {
      section: getInfo('#overview'),
      h1: getInfo('h1'),
      h1_spans: Array.from(document.querySelectorAll('h1 span')).map(s => ({
        text: s.textContent.trim(),
        rect: s.getBoundingClientRect(),
        opacity: window.getComputedStyle(s).opacity,
        transform: window.getComputedStyle(s).transform
      })),
      cta: getInfo('a[href="#projects"]'),
      telemetry: getInfo('[class*="border-t border-white/[0.08]"]')
    };
  });
  console.log('EL INFO:\n', JSON.stringify(elInfo, null, 2));
  await browser.close();
}

main().catch(console.error);
