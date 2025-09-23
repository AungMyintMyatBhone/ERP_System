#!/bin/bash

echo "Building ERP System for Production..."

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Build React frontend
echo "Building React frontend..."
npm run build

# Install backend dependencies
echo "Installing backend dependencies..."
cd server
npm install

echo "Build completed successfully!"
echo "Frontend build: /build"
echo "Backend server: server/server.js"