import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { PNG } from 'pngjs';
import GIFEncoder from 'gif-encoder-2';

const ARTIFACT_DIR = 'C:/Users/games/.gemini/antigravity/brain/d83909d6-a13f-4cb3-b030-3b3770e560e1';
const EDGE_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

// Recording configuration
const WIDTH = 960;
const HEIGHT = 600;
const FPS = 10;
const FRAME_DELAY = 1000 / FPS; // 100ms per frame

async function record() {
  console.log('=== STARTING BROWSER RECORDING SESSION ===');
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
      } catch (e) {
        // Ignore during navigation or closing
      }
    }, FRAME_DELAY);
  };

  const stopCapturing = () => {
    isRecording = false;
    if (recordInterval) clearInterval(recordInterval);
  };

  // 1. OPEN WEBSITE & CAPTURE INTRO
  console.log('Step 1: Navigating to http://localhost:3000/ and recording Intro sequence...');
  startCapturing();
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  
  // Mid-intro screenshot
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'proof_01_intro_progress.png') });
  console.log('  Saved proof_01_intro_progress.png');

  // Wait for intro completion (2200ms total)
  await new Promise(r => setTimeout(r, 1800));

  // 2. HERO SECTION REVEALED
  console.log('Step 2: Hero section revealed with masked typography & WebGL shader...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'proof_02_hero_revealed.png') });
  console.log('  Saved proof_02_hero_revealed.png');

  // 3. MAGNETIC BUTTON & CURSOR INTERACTION
  console.log('Step 3: Moving cursor to test magnetic attraction on Explore Projects button...');
  // Move mouse gradually to button to demonstrate magnetic deflection
  const cta = await page.$('a[href="#projects"]');
  if (cta) {
    const box = await cta.boundingBox();
    if (box) {
      // Approach from top-right
      for (let i = 0; i <= 10; i++) {
        const mx = (WIDTH / 2) + ((box.x + box.width / 2) - (WIDTH / 2)) * (i / 10);
        const my = (HEIGHT / 2) + ((box.y + box.height / 2) - (HEIGHT / 2)) * (i / 10);
        await page.mouse.move(mx, my);
        await new Promise(r => setTimeout(r, 40));
      }
      await new Promise(r => setTimeout(r, 300));
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'proof_03_magnetic_button.png') });
      console.log('  Saved proof_03_magnetic_button.png');
    }
  }

  // 4. SCROLL TO ABOUT SECTION
  console.log('Step 4: Scrolling to About section...');
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'proof_04_about_section.png') });
  console.log('  Saved proof_04_about_section.png');

  // 3D Portrait hover
  const portrait = await page.$('.group.perspective-1000');
  if (portrait) {
    const box = await portrait.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.3);
      await new Promise(r => setTimeout(r, 400));
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'proof_04b_about_portrait_3d.png') });
      console.log('  Saved proof_04b_about_portrait_3d.png');
    }
  }

  // 5. SCROLL TO STACK (APPARATUS)
  console.log('Step 5: Scrolling to Stack (Apparatus) section...');
  await page.evaluate(() => {
    const el = document.getElementById('stack');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1400));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'proof_05_stack_entrance.png') });
  console.log('  Saved proof_05_stack_entrance.png');

  // 6. SCROLL TO PROJECTS
  console.log('Step 6: Scrolling to Projects section and testing 3D card tilt & cursor morph...');
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1400));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'proof_06_projects_showcase.png') });
  console.log('  Saved proof_06_projects_showcase.png');

  // Hover over the project card to trigger 3D perspective tilt
  const projectCard = await page.$('.card-3d-target');
  if (projectCard) {
    const box = await projectCard.boundingBox();
    if (box) {
      // Move cursor across card to show dynamic tilt
      await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.3);
      await new Promise(r => setTimeout(r, 300));
      await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.6);
      await new Promise(r => setTimeout(r, 400));
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'proof_07_project_card_3d_tilt.png') });
      console.log('  Saved proof_07_project_card_3d_tilt.png');
    }
  }

  // 7. SCROLL TO CONTACT
  console.log('Step 7: Scrolling to Contact section...');
  await page.evaluate(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'proof_08_contact_gateway.png') });
  console.log('  Saved proof_08_contact_gateway.png');

  // Hover over email button
  const mailBtn = await page.$('a[href^="mailto:"]');
  if (mailBtn) {
    const box = await mailBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await new Promise(r => setTimeout(r, 350));
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'proof_09_contact_hover.png') });
      console.log('  Saved proof_09_contact_hover.png');
    }
  }

  stopCapturing();
  await browser.close();

  console.log(`=== RECORDING COMPLETED. Total frames captured: ${frames.length} ===`);

  // ENCODE TO ANIMATED GIF
  console.log('Encoding frames to animated GIF...');
  const encoder = new GIFEncoder(WIDTH, HEIGHT);
  encoder.start();
  encoder.setRepeat(0); // Loop indefinitely
  encoder.setDelay(FRAME_DELAY);
  encoder.setQuality(10); // Lower is higher quality, 10 is balanced

  // Select every 1st or 2nd frame to keep GIF compact and high-performance
  const step = frames.length > 80 ? 2 : 1;
  encoder.setDelay(FRAME_DELAY * step);

  let processed = 0;
  for (let i = 0; i < frames.length; i += step) {
    const png = PNG.sync.read(frames[i]);
    encoder.addFrame(png.data);
    processed++;
    if (processed % 10 === 0) {
      console.log(`  Processed frame ${processed}/${Math.ceil(frames.length / step)}`);
    }
  }

  encoder.finish();
  const gifBuffer = encoder.out.getData();
  const gifPath = path.join(ARTIFACT_DIR, 'recording.gif');
  fs.writeFileSync(gifPath, gifBuffer);
  console.log(`=== ANIMATED GIF SUCCESSFULLY WRITTEN: ${gifPath} (${(gifBuffer.length / (1024 * 1024)).toFixed(2)} MB) ===`);
}

record().catch(err => {
  console.error('Fatal error during recording:', err);
  process.exit(1);
});
