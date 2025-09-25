#!/bin/bash

echo "Starting ERP System build for Render.com..."
echo "Current directory: $(pwd)"
echo "Listing contents:"
ls -la

# Ensure we're in the right directory
if [ ! -f "package.json" ]; then
  echo "Error: package.json not found in current directory"
  exit 1
fi

if [ ! -d "public" ]; then
  echo "Error: public directory not found"
  exit 1
fi

if [ ! -f "public/index.html" ]; then
  echo "Error: public/index.html not found"
  exit 1
fi

echo "✅ All required files found"

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Set CI=false to prevent treating warnings as errors
export CI=false

# Build React app
echo "Building React frontend..."
npm run build

# Verify build was successful
if [ ! -d "build" ]; then
  echo "❌ Build directory not created"
  exit 1
fi

if [ ! -f "build/index.html" ]; then
  echo "❌ Build index.html not created"
  exit 1
fi

echo "✅ Frontend build successful"

# Install backend dependencies
echo "Installing backend dependencies..."
cd server
npm install
echo "✅ Backend dependencies installed"

echo "🎉 Build completed successfully!"