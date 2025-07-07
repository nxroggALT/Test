#!/usr/bin/env node

// Simple build script for Vercel deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building Rain Esports website for Vercel...');

try {
  // Build the frontend
  console.log('Building frontend...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Ensure dist/public exists
  if (!fs.existsSync('dist/public')) {
    throw new Error('Build failed: dist/public directory not found');
  }
  
  // Check if index.html exists
  if (!fs.existsSync('dist/public/index.html')) {
    throw new Error('Build failed: index.html not found in dist/public');
  }
  
  console.log('✅ Build completed successfully!');
  console.log('✅ Frontend built to dist/public');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}