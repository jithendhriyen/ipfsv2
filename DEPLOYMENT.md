# IPFS++ Deployment Guide for Render

This guide will help you deploy your IPFS++ application on Render.

## Prerequisites

1. A GitHub account with your code pushed to a repository
2. A Render account (sign up at [render.com](https://render.com))
3. A Supabase account for database and authentication

## Deployment Steps

### 1. Prepare Your Repository

Make sure your repository contains all the necessary files:
- `requirements.txt` - Python dependencies
- `package.json` - Node.js dependencies
- `render.yaml` - Render configuration
- `Procfile` - Process configuration
- `next.config.mjs` - Next.js configuration (updated for static export)

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your Supabase dashboard, go to Settings > API
3. Copy your Project URL and anon key
4. Run the SQL scripts in the `scripts/` folder in your Supabase SQL editor:
   - `001_create_profiles.sql`
   - `002_create_saved_items.sql`

### 3. Deploy Backend (Flask API)

1. Go to [render.com](https://render.com) and sign in
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `ipfspp-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn server3:app --bind 0.0.0.0:$PORT`
   - **Plan**: Free (or choose a paid plan)

5. Add Environment Variables:
   ```
   FLASK_ENV=production
   PORT=10000
   ```

6. Click "Create Web Service"

### 4. Deploy Frontend (Next.js)

1. In Render, click "New +" and select "Static Site"
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `ipfspp-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `out`
   - **Plan**: Free (or choose a paid plan)

4. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```

5. Click "Create Static Site"

### 5. Update Backend CORS Settings

In your `server3.py`, make sure CORS is configured to allow your frontend domain:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://your-frontend-url.onrender.com"])
```

### 6. Configure Custom Domains (Optional)

1. In Render, go to your service settings
2. Add a custom domain if you have one
3. Update your environment variables with the new URLs

## Environment Variables Reference

### Backend Environment Variables:
- `FLASK_ENV=production`
- `PORT=10000`
- `SECRET_KEY=your_secret_key`
- `DATABASE_URL=your_database_url` (if using external database)

### Frontend Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL=your_supabase_url`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key`
- `NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com`

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check that all dependencies are in `requirements.txt` and `package.json`
2. **CORS Errors**: Ensure your backend allows your frontend domain
3. **Database Issues**: Make sure your Supabase tables are created correctly
4. **Static Export Issues**: Verify `next.config.mjs` has `output: 'export'`

### Logs:
- Check Render logs in the dashboard for detailed error messages
- Backend logs: Service > Logs
- Frontend logs: Service > Logs

## Post-Deployment

1. Test your application by visiting the frontend URL
2. Verify that the backend API is accessible
3. Test IPFS functionality
4. Check that user authentication works
5. Monitor the Render dashboard for any issues

## Scaling

- Free tier has limitations (sleeps after 15 minutes of inactivity)
- Consider upgrading to a paid plan for production use
- Monitor usage and performance in the Render dashboard

## Security Considerations

1. Use environment variables for all sensitive data
2. Never commit API keys or secrets to your repository
3. Configure CORS properly
4. Use HTTPS in production
5. Regularly update dependencies

## Support

- Render Documentation: [render.com/docs](https://render.com/docs)
- Supabase Documentation: [supabase.com/docs](https://supabase.com/docs)
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)
