import sharp from 'sharp';

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#fbfaf8"/>
  <rect width="1200" height="12" fill="#1c6b5a"/>
  <g transform="translate(90, 150)">
    <rect width="88" height="88" rx="18" fill="#1c6b5a"/>
    <path d="M20 48h14l8-19 11 33 9-25 6 11h20" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="90" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="700" fill="#1c1b19">Wellness Med Care</text>
  <text x="90" y="410" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="#5f5b54">Healthcare is confusing on purpose.</text>
  <text x="90" y="458" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="#5f5b54">We explain it - bills, insurance, lab reports, prices.</text>
  <text x="90" y="560" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="600" fill="#1c6b5a">wellnessmedcare.com</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og-default.png');

// Raster brand set: Organization logo for structured data, favicon fallback for
// search result favicons, and the iOS home-screen icon.
const mark = `<svg width="512" height="512" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="7" fill="#1c6b5a"/>
  <path d="M8 17.5h3.2l1.9-4.6 2.6 8.1 2.3-6.1 1.4 2.6H24"
        fill="none" stroke="#ffffff" stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
await sharp(Buffer.from(mark)).resize(512, 512).png().toFile('public/logo-512.png');
await sharp(Buffer.from(mark)).resize(96, 96).png().toFile('public/favicon-96.png');
await sharp(Buffer.from(mark)).resize(180, 180).png().toFile('public/apple-touch-icon.png');
console.log('og-default.png, logo-512.png, favicon-96.png, apple-touch-icon.png written');
