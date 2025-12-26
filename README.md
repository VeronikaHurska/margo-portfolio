# Margo Portfolio

A modern, beautiful portfolio website built with React and Vite.

## Features

- ✨ Beautiful glassmorphism design with animated gradient backgrounds
- 🎨 Orange and pink color theme throughout
- 📱 Fully responsive layout
- 🖼️ Portfolio cards with expandable details and image galleries
- ⚡ Fast loading with optimized images
- 🎭 Smooth animations and transitions

## Portfolio Card Structure

Each project uses the following data structure:

```javascript
{
  title: "Project Name",
  description: "Short description visible in collapsed state",
  details: {
    challenge: "The problem you were solving",
    solution: "How you approached and solved it",
    results: ["Metric 1", "Metric 2", "Achievement 3"]
  },
  tags: ["Skill1", "Technology2", "Tool3"],
  images: ["image1.jpg", "image2.jpg", "image3.jpg"],
  link: "https://project-url.com" // optional
}
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Netlify

### Option 1: Connect Git Repository (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Log in to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Netlify will auto-detect build settings from `netlify.toml`
6. Click "Deploy site"

### Option 2: Manual Deploy

```bash
# Build the project
npm run build

# Drag and drop the 'dist' folder to Netlify
```

The site will be automatically deployed and you'll get a live URL!

## Adding Projects from Admin

When you build your admin panel, save projects as JSON following the structure above. You can:

1. Store in a CMS (Netlify CMS, Strapi, etc.)
2. Use a headless CMS API
3. Store in a JSON file and import it
4. Fetch from a backend API

Simply replace the `projects` array in `src/components/Projects.jsx` with your data source.

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx           # Header/intro section
│   ├── PortfolioCard.jsx  # Individual project card
│   └── Projects.jsx       # Projects grid container
├── App.jsx                # Main app component
└── index.css              # All styles
```

## Tech Stack

- React 19.2
- Vite 7.2
- Pure CSS (no framework needed!)
