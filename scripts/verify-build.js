/**
 * Build Security Verification Script
 * 
 * This script checks the built files for potential security issues.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

// List of sensitive patterns to check for
const sensitivePatterns = [
  /API_KEY\s*[:=]\s*["']([^"']+)["']/i,
  /SECRET\s*[:=]\s*["']([^"']+)["']/i,
  /PASSWORD\s*[:=]\s*["']([^"']+)["']/i,
  /supabase\.createClient\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']/i,
  // Supabase URL pattern
  /https:\/\/[a-z0-9-]+\.supabase\.co/i,
  // Add more patterns as needed
];

// Allowed domains for security
const allowedDomains = [
  'zantaku.com',
  'api.zantaku.com',
  'cdn.zantaku.com'
];

const checkFile = (filePath) => {
  console.log(`Checking file: ${filePath}`);
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check for sensitive patterns
    for (const pattern of sensitivePatterns) {
      const matches = content.match(pattern);
      if (matches) {
        console.error(`\x1b[31mWARNING: Potential sensitive information found in ${filePath}: ${pattern}\x1b[0m`);
      }
    }
    
    // Check for external domains
    const domainPattern = /https?:\/\/([^\/\s]+)/g;
    let match;
    while ((match = domainPattern.exec(content)) !== null) {
      const domain = match[1].toLowerCase();
      if (!allowedDomains.some(allowed => domain.includes(allowed) || domain === 'localhost')) {
        console.warn(`\x1b[33mExternal domain found in ${filePath}: ${domain}\x1b[0m`);
      }
    }
    
    // Check for unobfuscated React components
    if (filePath.endsWith('.js') && !filePath.includes('vendor')) {
      // Looking for typical React component patterns that should be obfuscated
      const reactComponentPattern = /function\s+([A-Z][a-zA-Z0-9]+)\s*\(/g;
      while ((match = reactComponentPattern.exec(content)) !== null) {
        console.warn(`\x1b[33mPotentially unobfuscated React component found in ${filePath}: ${match[1]}\x1b[0m`);
      }
      
      // Check for console.log statements
      if (content.includes('console.log')) {
        console.warn(`\x1b[33mConsole.log found in ${filePath}. These should be removed in production.\x1b[0m`);
      }
    }
    
  } catch (error) {
    console.error(`\x1b[31mError checking file ${filePath}: ${error.message}\x1b[0m`);
  }
};

const traverseDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      traverseDirectory(fullPath);
    } else {
      // Only check JS and HTML files
      if (fullPath.endsWith('.js') || fullPath.endsWith('.html')) {
        checkFile(fullPath);
      }
    }
  }
};

console.log('\x1b[36m%s\x1b[0m', 'Starting build security verification...');

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('\x1b[31mError: dist directory not found. Run npm run build first.\x1b[0m');
  process.exit(1);
}

// Start the verification
traverseDirectory(distDir);

// Verify CSP in HTML
const indexHtmlPath = path.join(distDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  const htmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');
  if (!htmlContent.includes('Content-Security-Policy')) {
    console.error('\x1b[31mWARNING: No Content-Security-Policy found in index.html\x1b[0m');
  } else {
    console.log('\x1b[32mContent-Security-Policy found in index.html\x1b[0m');
  }
}

console.log('\x1b[36m%s\x1b[0m', 'Build security verification completed.'); 