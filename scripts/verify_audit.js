import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { PNG } from 'pngjs';
import GIFEncoder from 'gif-encoder-2';

const ARTIFACT_DIR = 'C:/Users/games/.gemini/antigravity/brain/d83909d6-a13f-4cb3-b030-3b3770e560e1';
const EDGE_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

const WIDTH = 1200;
const HEIGHT = 750;
const FRAME_DELAY = 100; // 10 FPS for crisp, high-framerate gif

async function testAudit() {
  console.log('=== STARTING EXTENSIVE ANIMATION AUDIT VERIFICATION ===');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      `--window-size=${WIDTH},${HEIGHT}`,
      '--force-device-scale-factor=1'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT });
  await page.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'no-preference' }
  ]);

  const frames = [];
  let isRecording = false;
  let recordInterval = null;

  const startCapturing = () => {
    isRecording = true;
    recordInterval = setInterval(async () => {
      if (!isRecording) return;
      try {
        const buf = await page.screenshot({ type: 'png' });
        frames.push(buf);
      } catch (e) {}
    }, FRAME_DELAY);
  };

  const stopCapturing = () => {
    isRecording = false;
    if (recordInterval) clearInterval(recordInterval);
  };

  // 1. OPEN WEBSITE & RECORD INTRO
  console.log('1. Navigating to http://localhost:3000/ ...');
  startCapturing();
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  
  // Mid intro capture
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_01_intro.png') });
  console.log('   Captured audit_01_intro.png');

  // Wait for intro to finish wiping (2.2s total from start)
  await new Promise(r => setTimeout(r, 1600));

  // 2. HERO ENTRANCE IN PROGRESS (Title sliding out from mask)
  console.log('2. Capturing Hero entrance choreography in real-time...');
  await new Promise(r => setTimeout(r, 450));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_02_hero_revealing.png') });
  console.log('   Captured audit_02_hero_revealing.png (mid-reveal)');

  // Let Hero entrance complete with studio pacing (1.4s)
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_03_hero_settled.png') });
  console.log('   Captured audit_03_hero_settled.png (fully settled)');

  // 3. MAGNETIC BUTTON INTERACTION
  console.log('3. Testing physical magnetic button attraction on Explore Projects...');
  const ctaBtn = await page.$('a[href="#projects"]');
  if (ctaBtn) {
    const box = await ctaBtn.boundingBox();
    if (box) {
      for (let i = 0; i <= 8; i++) {
        const mx = (WIDTH / 2) + ((box.x + box.width * 0.45) - (WIDTH / 2)) * (i / 8);
        const my = (HEIGHT / 2) + ((box.y + box.height * 0.5) - (HEIGHT / 2)) * (i / 8);
        await page.mouse.move(mx, my);
        await new Promise(r => setTimeout(r, 30));
      }
      await new Promise(r => setTimeout(r, 300));
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_04_magnetic_hover.png') });
      console.log('   Captured audit_04_magnetic_hover.png');
    }
  }

  // 4. SCROLL TO ABOUT (triggering at top 75%)
  console.log('4. Scrolling to About section...');
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_05_about_revealed.png') });
  console.log('   Captured audit_05_about_revealed.png');

  // Hover portrait card to test 3D tilt with momentum
  const portrait = await page.$('.group.perspective-1000');
  if (portrait) {
    const box = await portrait.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.35);
      await new Promise(r => setTimeout(r, 400));
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_06_portrait_3d_tilt.png') });
      console.log('   Captured audit_06_portrait_3d_tilt.png');
    }
  }

  // 5. SCROLL TO TRAJECTORY
  console.log('5. Scrolling to Trajectory section...');
  await page.evaluate(() => {
    const el = document.getElementById('trajectory');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1400));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_07_trajectory.png') });
  console.log('   Captured audit_07_trajectory.png');

  // 6. SCROLL TO PROJECTS
  console.log('6. Scrolling to Projects section...');
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_08_projects_showcase.png') });
  console.log('   Captured audit_08_projects_showcase.png');

  // Test Project card 3D tilt
  const projectCard = await page.$('.card-3d-target');
  if (projectCard) {
    const box = await projectCard.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width * 0.35, box.y + box.height * 0.35);
      await new Promise(r => setTimeout(r, 300));
      await page.mouse.move(box.x + box.width * 0.68, box.y + box.height * 0.58);
      await new Promise(r => setTimeout(r, 450));
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_09_project_tilt_cursor.png') });
      console.log('   Captured audit_09_project_tilt_cursor.png');
    }
  }

  // 7. SCROLL TO STACK (APPARATUS)
  console.log('7. Scrolling to Stack (Apparatus) section...');
  await page.evaluate(() => {
    const el = document.getElementById('stack');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_10_stack_interactive.png') });
  console.log('   Captured audit_10_stack_interactive.png');

  // 8. SCROLL TO CONTACT
  console.log('8. Scrolling to Contact section...');
  await page.evaluate(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'audit_11_contact_gateway.png') });
  console.log('   Captured audit_11_contact_gateway.png');

  stopCapturing();
  await browser.close();

  console.log(`=== BROWSER SESSION FINISHED. Captured ${frames.length} frames. ===`);

  // ENCODE GIF
  console.log('Encoding animated GIF of the real browser session...');
  const encoder = new GIFEncoder(WIDTH, HEIGHT);
  encoder.start();
  encoder.setRepeat(0);
  encoder.setDelay(FRAME_DELAY * 2);
  encoder.setQuality(10);

  // Take every 2nd frame for a smooth, high-resolution recording
  let count = 0;
  for (let i = 0; i < frames.length; i += 2) {
    const png = PNG.sync.read(frames[i]);
    encoder.addFrame(png.data);
    count++;
    if (count % 10 === 0) {
      console.log(`  Encoded frame ${count}/${Math.ceil(frames.length / 2)}`);
    }
  }

  encoder.finish();
  const gifBuffer = encoder.out.getData();
  const gifPath = path.join(ARTIFACT_DIR, 'recording.gif');
  fs.writeFileSync(gifPath, gifBuffer);
  console.log(`=== ANIMATED RECORDING WRITTEN TO ${gifPath} (${(gifBuffer.length / 1024 / 1024).toFixed(2)} MB) ===`);
}

testAudit().catch(err => {
  console.error('Audit run error:', err);
  process.exit(1);
});
