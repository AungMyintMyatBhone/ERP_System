# Render.com Deployment Configuration for ERP System

## Project Structure
```
ERP_System/
├── src/ (React frontend)
├── server/ (Node.js backend)
├── package.json (root)
└── server/package.json (backend)
```

## Deployment Options

### Option 1: Single Web Service (Recommended)

**Render.com Settings:**
- **Root Directory:** `.` (leave empty)
- **Build Command:** `npm install && npm run build && cd server && npm install`
- **Start Command:** `cd server && npm start`
- **Node Version:** 18.x or higher

**Environment Variables:**
- `MONGODB_URI`: mongodb+srv://ammbhone_db_user:aFP5dGEyrcpg31nE@cluster0.8cat7vu.mongodb.net/erp_system
- `JWT_SECRET`: your-secret-key-here
- `PORT`: 10000 (Render will set this automatically)
- `NODE_ENV`: production

### Option 2: Separate Services

**Frontend Service (Static Site):**
- **Root Directory:** `.`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `build`

**Backend Service (Web Service):**
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

## Build Scripts Available

1. `npm run build` - Builds React frontend
2. `npm start` - Starts backend server
3. `npm run dev` - Development mode (both frontend and backend)
4. `npm run heroku-postbuild` - Complete deployment build

## Troubleshooting

**Error: "react-scripts: not found"**
- Solution: Use Option 1 configuration above
- The build command installs frontend deps first, then backend deps

**Error: "Module not found"**
- Ensure all dependencies are in the correct package.json files
- Frontend deps in root package.json
- Backend deps in server/package.json

**Database Connection Issues:**
- Verify MONGODB_URI environment variable
- Check MongoDB Atlas IP whitelist (allow all: 0.0.0.0/0 for cloud deployment)
- Ensure database user has read/write permissions

## Testing Deployment

1. Visit your Render URL
2. Check browser console for any errors
3. Test API endpoints: `/api/health`, `/api/customers`, etc.
4. Verify database connectivity through the application

## Manual Deploy Command (if needed)
```bash
# In root directory
npm install
npm run build
cd server
npm install
npm start
```