import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/games/.gemini/antigravity/brain/d83909d6-a13f-4cb3-b030-3b3770e560e1';
const EDGE_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

async function run() {
  console.log('Launching browser with Edge...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Emulate full motion preference
  await page.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'no-preference' }
  ]);

  console.log('1. Navigating to http://localhost:3000/ to capture Intro...');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  
  // Capture at 600ms (mid-intro with AS monogram and elegant progress line)
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_01_intro.png') });
  console.log('Captured verify_01_intro.png');

  // Wait for intro upward wipe and Hero entrance
  console.log('2. Waiting for intro completion and Hero entrance...');
  await new Promise(r => setTimeout(r, 2200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_02_hero_revealed.png') });
  console.log('Captured verify_02_hero_revealed.png');

  // Move mouse onto the page to activate custom magnetic cursor
  await page.mouse.move(720, 450);
  await new Promise(r => setTimeout(r, 200));

  // 3. Hover "Explore Projects" CTA button to show magnetic attraction
  console.log('3. Hovering Explore Projects CTA button...');
  const ctaBtn = await page.$('a[href="#projects"]');
  if (ctaBtn) {
    const box = await ctaBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await new Promise(r => setTimeout(r, 350));
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_03_cta_magnetic_hover.png') });
      console.log('Captured verify_03_cta_magnetic_hover.png');
    }
  }

  // 4. Scroll to About
  console.log('4. Scrolling to About section...');
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_04_about_editorial.png') });
  console.log('Captured verify_04_about_editorial.png');

  // 5. Scroll to Stack / Apparatus
  console.log('5. Scrolling to Stack section...');
  await page.evaluate(() => {
    const el = document.getElementById('stack');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_05_stack_interactive.png') });
  console.log('Captured verify_05_stack_interactive.png');

  // 6. Scroll to Projects
  console.log('6. Scrolling to Projects section...');
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_06_projects_showcase.png') });
  console.log('Captured verify_06_projects_showcase.png');

  // 7. Hover 3D Project Card
  console.log('7. Hovering 3D Project Card...');
  const projectCard = await page.$('.card-3d-target');
  if (projectCard) {
    const box = await projectCard.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width * 0.55, box.y + box.height * 0.45);
      await new Promise(r => setTimeout(r, 450));
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_07_project_card_3d_cursor.png') });
      console.log('Captured verify_07_project_card_3d_cursor.png');
    }
  }

  // 8. Scroll to Contact
  console.log('8. Scrolling to Contact section...');
  await page.evaluate(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_08_contact_gateway.png') });
  console.log('Captured verify_08_contact_gateway.png');

  await browser.close();
  console.log('All verification captures completed successfully!');
}

run().catch(err => {
  console.error('Error in capture run:', err);
  process.exit(1);
});
