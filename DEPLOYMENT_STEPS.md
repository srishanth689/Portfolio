# Complete Deployment Guide - MERN Portfolio

## Overview
- **Backend**: Deploy to Render
- **Frontend**: Deploy to Vercel
- **Database**: MongoDB Atlas (already connected)

---

## PART 1: BACKEND DEPLOYMENT (Render)

### Step 1: Prepare Your Backend

1. **Ensure `server/package.json` has a `start` script:**

```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

✅ Already configured in your repo.

2. **Verify `.env` file is NOT committed:**
   - Check if `server/.env` is in `.gitignore` ✅ (it is)

3. **Push latest code to GitHub:**
```powershell
cd d:\mern-portfolio
git add .
git commit -m "Final backend setup"
git push origin main
```

---

### Step 2: Create Render Account & Deploy Backend

1. **Go to https://render.com** and sign up (free)

2. **Create a new Web Service:**
   - Click "New +" → "Web Service"
   - Select "Build and deploy from a Git repository"
   - Click "Connect GitHub"
   - Authorize Render to access your GitHub
   - Select repository: `srishanth689/Portfolio`

3. **Configure Deployment Settings:**

   | Field | Value |
   |-------|-------|
   | **Name** | `mern-portfolio-backend` (or any name) |
   | **Environment** | `Node` |
   | **Region** | `Oregon` (or closest to you) |
   | **Branch** | `main` |
   | **Root Directory** | `server` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |

4. **Add Environment Variables:**
   - Scroll down to "Environment"
   - Click "Add Environment Variable"
   - Add each variable from your `server/.env`:

   ```
   MONGO_URI = mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mern-portfolio?retryWrites=true&w=majority
   JWT_SECRET = your_super_secret_key_change_in_production
   ADMIN_EMAIL = admin@example.com
   ADMIN_PASSWORD = ChangeMe123!
   CLIENT_URL = https://your-vercel-domain.vercel.app (add later after frontend deployment)
   PORT = (leave empty - Render auto-assigns)
   SMTP_HOST = smtp.gmail.com (optional)
   SMTP_PORT = 587 (optional)
   SMTP_USER = your_email@gmail.com (optional)
   SMTP_PASS = your_app_password (optional)
   ```

   **Important:** Replace `mongodb+srv://...` with your actual MongoDB Atlas connection string.

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for build to complete (2-3 minutes)
   - You'll get a URL like: `https://mern-portfolio-backend-xxxxx.onrender.com`
   - **Copy this URL** - you'll need it for frontend

6. **Test Backend:**
   ```powershell
   curl https://mern-portfolio-backend-xxxxx.onrender.com/api/health
   ```
   Should return: `{"status":"Server is running"}`

---

## PART 2: INITIALIZE ADMIN ON RENDER

Once backend is deployed and running:

```powershell
curl -X POST "https://mern-portfolio-backend-xxxxx.onrender.com/api/auth/init-admin" `
  -H "Content-Type: application/json" `
  -d "{\"email\":\"admin@example.com\",\"password\":\"ChangeMe123!\"}"
```

Response should be:
```json
{"message":"Admin user created successfully","userId":"xxxxx"}
```

---

## PART 3: UPDATE BACKEND ENVIRONMENT VARIABLE

Once frontend is deployed (you'll have the Vercel URL), update the backend:

1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment"
4. Update `CLIENT_URL` to your Vercel frontend URL (e.g., `https://myportfolio.vercel.app`)
5. Click "Save Changes"
6. Service will auto-redeploy

---

## PART 4: FRONTEND DEPLOYMENT (Vercel)

### Step 1: Prepare Your Frontend

1. **Ensure `client/.env` has the backend URL:**

```env
VITE_API_URL=https://mern-portfolio-backend-xxxxx.onrender.com/api
```

2. **Test locally first:**
```powershell
cd d:\mern-portfolio\client
npm run build
```

Should create a `dist/` folder with no errors.

3. **Push to GitHub:**
```powershell
cd d:\mern-portfolio
git add .
git commit -m "Update frontend config for production"
git push origin main
```

---

### Step 2: Deploy to Vercel

1. **Go to https://vercel.com** and sign up (free)

2. **Import Your Repository:**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Select "GitHub"
   - Search for `Portfolio` repo
   - Click "Import"

3. **Configure Project Settings:**

   | Field | Value |
   |-------|-------|
   | **Project Name** | `mern-portfolio` (or any name) |
   | **Framework Preset** | `Vite` |
   | **Root Directory** | `client` |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `dist` |

4. **Add Environment Variables:**
   - Under "Environment Variables"
   - Add: `VITE_API_URL` = `https://mern-portfolio-backend-xxxxx.onrender.com/api`
   - Click "Add"

5. **Deploy:**
   - Click "Deploy"
   - Wait for build (1-2 minutes)
   - You'll get a URL like: `https://mern-portfolio-xxxxx.vercel.app`
   - **Copy this URL**

6. **Test Frontend:**
   - Open `https://mern-portfolio-xxxxx.vercel.app` in browser
   - You should see your portfolio homepage

---

## PART 5: FINALIZE - UPDATE BACKEND WITH FRONTEND URL

1. Go to Render dashboard
2. Select backend service
3. Go to "Environment"
4. Update `CLIENT_URL` to your Vercel URL
5. Click "Save Changes"
6. Service auto-redeploys

---

## PART 6: TEST EVERYTHING

### Test Public Website
```
https://your-vercel-url.vercel.app/
```
Should show portfolio with all sections loading.

### Test Admin Login
```
https://your-vercel-url.vercel.app/admin/login
Email: admin@example.com
Password: ChangeMe123!
```

### Test Admin Dashboard
After login, you should see CRUD panels for Projects, Skills, etc.

### Test Contact Form
Fill out contact form on public site - should submit to backend.

### Test API Endpoints
```powershell
curl https://your-render-backend-url.onrender.com/api/projects
curl https://your-render-backend-url.onrender.com/api/skills
```

---

## PART 7: CUSTOM DOMAIN (Optional)

### Add Custom Domain to Vercel Frontend

1. On Vercel project dashboard, go to "Settings" → "Domains"
2. Enter your domain (e.g., `myportfolio.com`)
3. Update DNS records at your domain registrar:
   - Add CNAME record pointing to Vercel

### Add Custom Domain to Render Backend

1. On Render service dashboard, go to "Settings" → "Custom Domains"
2. Add your backend domain (e.g., `api.myportfolio.com`)
3. Update DNS records

---

## TROUBLESHOOTING

### Backend not starting on Render
- Check build logs in Render dashboard
- Verify all environment variables are set
- Ensure MongoDB Atlas connection string is correct
- Check `.gitignore` doesn't exclude important files

### Frontend shows blank or errors
- Check browser console (F12) for errors
- Verify `VITE_API_URL` is set correctly
- Ensure backend URL is accessible

### Admin login not working
- Verify admin was created: `POST /api/auth/init-admin`
- Check MongoDB connection is working
- Try logging in with exact credentials from `.env`

### CORS errors
- Backend has CORS configured for `CLIENT_URL`
- Ensure `CLIENT_URL` in backend `.env` matches frontend domain exactly

### Build fails on Vercel
- Run `npm run build` locally to check for errors
- Verify no `.env` files are being committed
- Check `package.json` dependencies are correct

---

## SUMMARY

✅ **You now have:**
1. Frontend deployed to Vercel (publicly accessible)
2. Backend deployed to Render (API endpoints live)
3. Admin panel working
4. Database connected to MongoDB Atlas
5. Everything integrated and production-ready

---

## URLS TO REMEMBER

- **Frontend:** `https://mern-portfolio-xxxxx.vercel.app`
- **Backend API:** `https://mern-portfolio-backend-xxxxx.onrender.com/api`
- **Admin Login:** `https://your-frontend-url/admin/login`

---

## NEXT STEPS

1. Customize your portfolio content via admin dashboard
2. Add more projects, skills, experience
3. Set up custom domain (optional)
4. Monitor analytics on Vercel & Render dashboards
5. Make updates: push to GitHub → auto-deploy

Enjoy your live portfolio! 🚀
