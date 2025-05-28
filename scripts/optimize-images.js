import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { glob } from 'glob';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to scan for images
const directories = [
  path.join(__dirname, '../src/asset'),
  path.join(__dirname, '../public/asset')
];

// Function to convert image to WebP
async function convertToWebP(filePath) {
  const outputPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  
  try {
    await sharp(filePath)
      .webp({ quality: 80 }) // Adjust quality as needed
      .toFile(outputPath);
    
    console.log(`Converted: ${path.basename(filePath)} → ${path.basename(outputPath)}`);
    
    // Get file sizes for comparison
    const originalSize = fs.statSync(filePath).size;
    const webpSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(2);
    
    console.log(`Size reduction: ${savings}% (${(originalSize/1024).toFixed(2)}KB → ${(webpSize/1024).toFixed(2)}KB)`);
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error);
  }
}

// Function to process all images in a directory
async function processDirectory(directory) {
  console.log(`\nProcessing directory: ${directory}`);
  
  try {
    // Find all PNG, JPG, and JPEG files
    const imageFiles = await glob(`${directory}/**/*.{png,jpg,jpeg}`);
    
    if (imageFiles.length === 0) {
      console.log('No images found in this directory.');
      return;
    }
    
    console.log(`Found ${imageFiles.length} images to process.`);
    
    // Process each image
    for (const file of imageFiles) {
      await convertToWebP(file);
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
  }
}

// Main function
async function main() {
  console.log('🖼️ Image Optimization Script');
  console.log('============================');
  
  // Install sharp if not already installed
  if (!fs.existsSync(path.join(__dirname, '../node_modules/sharp'))) {
    console.log('Sharp package not found. Please install it first:');
    console.log('npm install sharp glob --save-dev');
    return;
  }
  
  // Process each directory
  for (const dir of directories) {
    await processDirectory(dir);
  }
  
  console.log('\n✅ Image optimization complete!');
  console.log('Now update your code to use .webp images instead of the original formats.');
}

main().catch(console.error); 