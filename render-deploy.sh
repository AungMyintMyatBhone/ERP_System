#!/bin/bash

echo "=== ERP System Build Script ==="
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

echo ""
echo "=== Checking React App Structure ==="
if [ ! -f "package.json" ]; then
  echo "❌ ERROR: package.json not found in root"
  exit 1
fi

if [ ! -d "public" ]; then
  echo "❌ ERROR: public directory not found"
  exit 1
fi

if [ ! -f "public/index.html" ]; then
  echo "❌ ERROR: public/index.html not found"
  exit 1
fi

if [ ! -d "src" ]; then
  echo "❌ ERROR: src directory not found"
  exit 1
fi

echo "✅ React app structure is correct"
echo "Public folder contents:"
ls -la public/

echo ""
echo "=== Installing Frontend Dependencies ==="
npm install

if [ $? -ne 0 ]; then
  echo "❌ Frontend dependency installation failed"
  exit 1
fi

echo ""
echo "=== Setting Build Environment ==="
export CI=false
export GENERATE_SOURCEMAP=false
export PUBLIC_URL=""

echo "Environment variables:"
echo "CI=$CI"
echo "GENERATE_SOURCEMAP=$GENERATE_SOURCEMAP"
echo "PUBLIC_URL=$PUBLIC_URL"

echo ""
echo "=== Building React Application ==="
npm run build

if [ $? -ne 0 ]; then
  echo "❌ React build failed"
  exit 1
fi

if [ ! -d "build" ]; then
  echo "❌ Build directory was not created"
  exit 1
fi

echo "✅ React build successful"
echo "Build folder contents:"
ls -la build/

echo ""
echo "=== Installing Backend Dependencies ==="
cd server

if [ ! -f "package.json" ]; then
  echo "❌ ERROR: server/package.json not found"
  exit 1
fi

npm install

if [ $? -ne 0 ]; then
  echo "❌ Backend dependency installation failed"
  exit 1
fi

echo ""
echo "🎉 Build completed successfully!"
echo "Frontend build: $(pwd)/../build"
echo "Backend server: $(pwd)/server.js"