/**
 * Visually-lossless image optimiser for public/images.
 *
 * Strategy:
 *   - JPG  -> mozjpeg q=85 progressive (re-encode in place).
 *   - PNG with alpha -> palette quantise (~256 colours) + max zlib (in place).
 *   - PNG without alpha (photos saved as PNG) -> mozjpeg q=88 progressive,
 *     written as .jpg.  The .png is deleted and the conversion is
 *     reported so callers can rewrite references.
 *   - WebP / AVIF / SVG  -> left alone.
 *
 * Originals are backed up to public/images/originals/<rel-path> before
 * any file is touched (only on the first run; existing backups are
 * preserved).
 *
 * Run from project root:
 *   node scripts/optimize-images.mjs
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const IMG_DIR = path.join(ROOT, 'public', 'images');
const ORIG_DIR = path.join(IMG_DIR, 'originals');

const SKIP_DIRS = new Set(['originals']);
const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg']);

const JPG_QUALITY = 85;
const PNG_TO_JPG_QUALITY = 88;

const conversions = []; // {from, to}
const stats = []; // {file, before, after, op}

async function walk(dir, base = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      out.push(...(await walk(path.join(dir, e.name), base)));
    } else if (e.isFile()) {
      const ext = path.extname(e.name).toLowerCase();
      if (RASTER_EXT.has(ext)) {
        out.push(path.relative(base, path.join(dir, e.name)));
      }
    }
  }
  return out;
}

async function backup(rel) {
  const src = path.join(IMG_DIR, rel);
  const dst = path.join(ORIG_DIR, rel);
  try {
    await fs.access(dst);
    return; // already backed up
  } catch {}
  await fs.mkdir(path.dirname(dst), { recursive: true });
  await fs.copyFile(src, dst);
}

async function processFile(rel) {
  const abs = path.join(IMG_DIR, rel);
  const ext = path.extname(rel).toLowerCase();
  const before = (await fs.stat(abs)).size;
  await backup(rel);

  if (ext === '.jpg' || ext === '.jpeg') {
    const buf = await sharp(abs)
      .rotate() // honour EXIF orientation, then strip it
      .jpeg({ quality: JPG_QUALITY, mozjpeg: true, progressive: true })
      .toBuffer();
    if (buf.length < before) {
      await fs.writeFile(abs, buf);
      stats.push({ file: rel, before, after: buf.length, op: 'jpg-recompress' });
    } else {
      // Re-encode would make it bigger (already heavily compressed). Skip.
      stats.push({ file: rel, before, after: before, op: 'jpg-skip' });
    }
    return;
  }

  if (ext === '.png') {
    const meta = await sharp(abs).metadata();
    const hasAlpha = meta.hasAlpha === true;

    // Always try optimised PNG.
    const pngBuf = await sharp(abs)
      .png({
        compressionLevel: 9,
        palette: true,
        quality: 90,
        effort: 10,
      })
      .toBuffer();

    if (hasAlpha) {
      // Cannot lossily convert to JPG — alpha would be lost.
      if (pngBuf.length < before) {
        await fs.writeFile(abs, pngBuf);
        stats.push({ file: rel, before, after: pngBuf.length, op: 'png-optim' });
      } else {
        stats.push({ file: rel, before, after: before, op: 'png-skip' });
      }
      return;
    }

    // No alpha — also try a JPG re-encode and pick the smallest of the three.
    const jpgBuf = await sharp(abs)
      .rotate()
      .jpeg({ quality: PNG_TO_JPG_QUALITY, mozjpeg: true, progressive: true })
      .toBuffer();

    const candidates = [
      { kind: 'png', size: pngBuf.length, buf: pngBuf },
      { kind: 'jpg', size: jpgBuf.length, buf: jpgBuf },
      { kind: 'orig', size: before, buf: null },
    ].sort((a, b) => a.size - b.size);
    const winner = candidates[0];

    if (winner.kind === 'orig') {
      stats.push({ file: rel, before, after: before, op: 'png-skip' });
      return;
    }
    if (winner.kind === 'png') {
      await fs.writeFile(abs, winner.buf);
      stats.push({ file: rel, before, after: winner.size, op: 'png-optim' });
      return;
    }
    // JPG wins — convert.
    const newRel = rel.replace(/\.png$/i, '.jpg');
    const newAbs = path.join(IMG_DIR, newRel);
    await fs.writeFile(newAbs, winner.buf);
    if (newAbs !== abs) await fs.unlink(abs);
    conversions.push({ from: rel, to: newRel });
    stats.push({ file: `${rel} -> ${newRel}`, before, after: winner.size, op: 'png-to-jpg' });
    return;
  }
}

function fmt(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

async function snapshotAll(dir, base = dir) {
  // Mirror EVERY file (not just rasters) from /public/images/ into
  // /public/images/originals/ on first sight. Lesson learned the hard
  // way: a partial backup means a "full restore from originals/" can
  // delete non-raster files (logo.avif, google-g.webp, SVGs, etc.)
  // that were never backed up in the first place. With a full mirror,
  // a `rsync -a originals/ ./` restore is always safe.
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      await snapshotAll(path.join(dir, e.name), base);
      continue;
    }
    if (!e.isFile()) continue;
    const rel = path.relative(base, path.join(dir, e.name));
    const dst = path.join(ORIG_DIR, rel);
    try {
      await fs.access(dst);
    } catch {
      await fs.mkdir(path.dirname(dst), { recursive: true });
      await fs.copyFile(path.join(dir, e.name), dst);
    }
  }
}

async function main() {
  await fs.mkdir(ORIG_DIR, { recursive: true });
  await snapshotAll(IMG_DIR);
  const files = await walk(IMG_DIR);
  console.log(`Found ${files.length} raster images to consider\n`);

  for (const rel of files) {
    try {
      await processFile(rel);
    } catch (e) {
      console.error(`!! ${rel}: ${e.message}`);
    }
  }

  // Report
  stats.sort((a, b) => (b.before - b.after) - (a.before - a.after));
  let totalBefore = 0, totalAfter = 0;
  console.log('file'.padEnd(60) + 'op'.padEnd(18) + 'before'.padStart(10) + '   ' + 'after'.padStart(10) + '   ' + 'saved');
  console.log('-'.repeat(120));
  for (const s of stats) {
    totalBefore += s.before;
    totalAfter += s.after;
    const saved = s.before - s.after;
    const pct = s.before ? ((saved / s.before) * 100).toFixed(0) : 0;
    console.log(
      s.file.padEnd(60).slice(0, 60) +
      s.op.padEnd(18) +
      fmt(s.before).padStart(10) + ' → ' +
      fmt(s.after).padStart(10) + '   ' +
      `${fmt(saved)} (-${pct}%)`
    );
  }
  console.log('-'.repeat(120));
  const totalSaved = totalBefore - totalAfter;
  const totalPct = totalBefore ? ((totalSaved / totalBefore) * 100).toFixed(1) : 0;
  console.log(
    'TOTAL'.padEnd(60) + ''.padEnd(18) +
    fmt(totalBefore).padStart(10) + ' → ' +
    fmt(totalAfter).padStart(10) + '   ' +
    `${fmt(totalSaved)} (-${totalPct}%)`
  );

  if (conversions.length) {
    console.log('\nExtension changes (update references):');
    for (const c of conversions) console.log(`  /${path.posix.join('images', c.from)}  ->  /${path.posix.join('images', c.to)}`);
    // Persist for the renamer step.
    await fs.writeFile(
      path.join(ROOT, 'scripts', 'image-conversions.json'),
      JSON.stringify(conversions, null, 2)
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
