# Deployment & Admin Setup Guide

## 🚀 Quick Deployment to Netlify

### 1. Push to GitHub

```bash
git add .
git commit -m "Portfolio with Decap CMS integration"
git push origin main
```

### 2. Deploy on Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository: `VeronikaHurska/margo-portfolio`
4. Netlify will auto-detect settings from `netlify.toml`
5. Click "Deploy site"

### 3. Enable Netlify Identity (for Admin Authentication)

1. In your Netlify site dashboard, go to **Site settings** → **Identity**
2. Click "Enable Identity"
3. Under **Registration**, select "Invite only" (recommended)
4. Under **Services** → **Git Gateway**, click "Enable Git Gateway"

### 4. Access Your Admin Panel

1. Once deployed, go to: `https://your-site.netlify.app/admin`
2. Click "Login with Netlify Identity"
3. Create your admin account (first user is auto-admin)

---

## 📝 How to Add Projects

### Via Admin Panel (Recommended)

1. Navigate to `https://your-site.netlify.app/admin`
2. Login with your credentials
3. Click "Projects" in the left sidebar
4. Click "New Projects"
5. Fill in the fields:
   - **Title**: Project name
   - **Description**: Short overview (shown when card is collapsed)
   - **Challenge**: What problem were you solving?
   - **Solution**: How did you approach it?
   - **Results**: List of achievements/metrics (click "+ Add result" for each)
   - **Tags**: Technologies/skills used (press Enter after each tag)
   - **Images**: Upload project images (click "+ Add image" for multiple)
   - **Project Link**: External URL (optional)
6. Click "Publish" → "Publish now"

The project will:
- Create a JSON file in `src/data/projects/`
- Commit to your repository
- Trigger automatic rebuild on Netlify
- Appear on your live site in ~1-2 minutes!

### Data Structure

Projects are stored as JSON files in `src/data/projects/`:

```json
{
  "title": "Project Name",
  "description": "Short description",
  "details": {
    "challenge": "Problem statement",
    "solution": "Your approach",
    "results": ["Achievement 1", "Achievement 2", "Achievement 3"]
  },
  "tags": ["React", "Node.js", "PostgreSQL"],
  "images": ["/uploads/project-screenshot-1.png", "/uploads/diagram.jpg"],
  "link": "https://project-url.com"
}
```

---

## 🔄 How It Works

### Frontend (React)
- **Projects.jsx** dynamically imports all JSON files from `src/data/projects/`
- Uses Vite's `import.meta.glob()` to load files at build time
- Shows loading/error/empty states appropriately
- Sorts projects alphabetically by title

### Admin (Decap CMS)
- Git-based CMS - no database needed
- Saves directly to your GitHub repository
- Each project = one JSON file
- Images uploaded to `public/uploads/`
- Every save triggers a new deployment

### Deployment Flow

```
1. Add/edit project in admin
   ↓
2. Decap CMS commits to GitHub
   ↓
3. Netlify detects commit
   ↓
4. Automatic rebuild & deploy
   ↓
5. Project appears on live site
```

---

## ✅ Production Checklist

- [x] Decap CMS configured (`public/admin/config.yml`)
- [x] Projects load dynamically from `src/data/projects/`
- [x] Loading, error, and empty states implemented
- [x] Image uploads configured to `public/uploads/`
- [x] Git-based workflow (no backend API needed)
- [x] Automatic deployments on content changes
- [ ] Enable Netlify Identity (do this after deploying)
- [ ] Invite yourself as admin user
- [ ] Test adding a project from admin panel

---

## 🎨 Customization

### Change Sorting Order

Edit `src/components/Projects.jsx`:

```javascript
// Sort by title (current)
const sortedProjects = projectsData.sort((a, b) =>
  (a.title || '').localeCompare(b.title || '')
);

// Or add a date field in CMS and sort by newest first
const sortedProjects = projectsData.sort((a, b) =>
  new Date(b.date) - new Date(a.date)
);
```

### Add More Fields

Edit `public/admin/config.yml` and add fields like:

```yaml
- { label: "Date", name: "date", widget: "datetime" }
- { label: "Client", name: "client", widget: "string", required: false }
- { label: "Category", name: "category", widget: "select", options: ["Web", "Mobile", "Design"] }
```

Then update `PortfolioCard.jsx` to display them.

---

## 🐛 Troubleshooting

### "No projects yet" message shows
- Check if JSON files exist in `src/data/projects/`
- Ensure files are valid JSON
- Check browser console for errors

### Can't login to admin
- Verify Netlify Identity is enabled
- Check if Git Gateway is enabled
- Make sure you're accessing `/admin` on the deployed site (not localhost)

### Projects don't appear after publishing
- Wait 1-2 minutes for Netlify rebuild
- Check Netlify deploy logs for errors
- Verify the JSON file was committed to GitHub

### Images don't load
- Images are uploaded to `public/uploads/`
- Paths in JSON should be `/uploads/filename.jpg`
- Rebuild the site after uploading images

---

## 🔐 Security Notes

- Set Identity registration to "Invite only"
- Only invite trusted users as admins
- Admin panel only works on deployed Netlify site (requires Netlify Identity)
- All changes are tracked in Git history

---

## 📦 Files Structure

```
src/
├── data/
│   └── projects/          # JSON files created by admin
│       ├── project-1.json
│       └── project-2.json
├── components/
│   ├── PortfolioCard.jsx  # Displays individual project
│   └── Projects.jsx       # Loads and lists all projects
└── ...

public/
├── admin/
│   ├── index.html         # Admin panel entry
│   └── config.yml         # CMS configuration
└── uploads/               # Images uploaded via admin
```

Everything is now fully production-ready! 🎉
