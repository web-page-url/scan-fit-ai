const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputImage = path.join(__dirname, '..', 'public', 'scan-fit.png');
const outputDir = path.join(__dirname, '..', 'public');

// Favicon sizes to generate
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon.ico' }, // Standard favicon
  { size: 64, name: 'favicon-64x64.png' },
  { size: 128, name: 'favicon-128x128.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
];

async function generateFavicons() {
  console.log('Generating favicons from scan-fit.png...');

  // Check if input image exists
  if (!fs.existsSync(inputImage)) {
    console.error('Error: scan-fit.png not found in public directory');
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Read the input image
    const image = sharp(inputImage);

    // Generate all favicon sizes
    const promises = sizes.map(async ({ size, name }) => {
      const outputPath = path.join(outputDir, name);

      if (name === 'favicon.ico') {
        // Special handling for .ico format
        await image
          .resize(size, size, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .png()
          .toFile(outputPath.replace('.ico', '.png'));

        // For .ico, we'll use the 32x32 version
        const icoPath = path.join(outputDir, 'favicon.ico');
        await image
          .resize(32, 32, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .png()
          .toFile(icoPath);
      } else {
        await image
          .resize(size, size, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .png()
          .toFile(outputPath);
      }

      console.log(`✓ Generated ${name} (${size}x${size})`);
    });

    await Promise.all(promises);

    // Generate web app manifest
    const manifest = {
      name: 'ScanFit - AI-Powered Job & Resume Matcher',
      short_name: 'ScanFit',
      description: 'Let AI scan your resume, fit your dream job. Analyze job descriptions and resumes with intelligent matching and optimization suggestions.',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      theme_color: '#00e0ff',
      background_color: '#0f0f1a',
      display: 'standalone',
      start_url: '/',
      scope: '/'
    };

    fs.writeFileSync(
      path.join(outputDir, 'site.webmanifest'),
      JSON.stringify(manifest, null, 2)
    );

    console.log('✓ Generated site.webmanifest');
    console.log('\n🎉 All favicons generated successfully!');
    console.log('📁 Files created in public/ directory');

  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();