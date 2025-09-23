# Render Deployment Configuration

# This file should be placed in the root directory for Render.com deployment
# Build command: npm install && npm run build
# Start command: npm start

# Install dependencies for both frontend and backend
echo "Installing frontend dependencies..."
npm install

echo "Installing backend dependencies..."
cd server && npm install && cd ..

echo "Building frontend application..."
npm run build

echo "Frontend build complete!"