# Tummle Deployment Guide

This guide covers deploying the Tummle landing page to various hosting platforms.

## 🚀 Quick Deploy Options

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

## 📋 Pre-Deployment Checklist

### Environment Setup
- [ ] Node.js 18+ installed
- [ ] All dependencies installed (`npm install`)
- [ ] Build completes without errors (`npm run build`)
- [ ] All tests pass (`npm run lint`)

### Performance Optimization
- [ ] Images optimized (WebP format where possible)
- [ ] Bundle size checked (use `npm run build` and check dist size)
- [ ] Critical CSS inlined in HTML
- [ ] Lazy loading implemented for images

### SEO & Meta Tags
- [ ] All meta tags properly configured in `index.html`
- [ ] Open Graph images exist in `public` folder
- [ ] Manifest.json configured for PWA
- [ ] Favicon and app icons present

### Content Review
- [ ] All German translations complete and accurate
- [ ] All English translations complete and accurate
- [ ] Contact information up to date
- [ ] Legal links functional (Privacy Policy, Terms, etc.)

## 🔧 Build Configuration

### Environment Variables
Create a `.env` file for environment-specific settings:
```env
VITE_GOOGLE_PLACES_API_KEY=your_api_key_here
VITE_ANALYTICS_ID=your_analytics_id
VITE_APP_VERSION=1.0.0
```

### Production Build
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# Run linting
npm run lint

# Build for production
npm run build

# Preview build locally
npm run preview
```

## 🌐 Domain Configuration

### Custom Domain Setup
1. Update `manifest.json` with production URL
2. Configure DNS records:
   - A record: `@` → hosting provider IP
   - CNAME record: `www` → your-domain.com
3. Enable HTTPS (most providers do this automatically)

### Redirects Configuration
Create `public/_redirects` file for Netlify:
```
/*    /index.html   200
```

For Vercel, create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 📊 Monitoring & Analytics

### Performance Monitoring
- Set up Google Analytics or similar
- Configure Google Search Console
- Monitor Core Web Vitals

### Error Tracking
- Implement error boundary in React
- Set up error tracking (Sentry, LogRocket, etc.)
- Monitor 404 errors and broken links

## 🔒 Security Considerations

### Headers Configuration
Add security headers (via hosting provider or server config):
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

### HTTPS
- Ensure HTTPS is enabled
- Configure HSTS headers
- Check for mixed content issues

## 📱 PWA Deployment

### Service Worker
The app is PWA-ready but needs a service worker for full functionality:
```javascript
// In public/sw.js
self.addEventListener('fetch', event => {
  // Cache strategy implementation
});
```

### App Store Submission
For mobile app stores, use tools like:
- PWA Builder (Microsoft)
- Capacitor (Ionic)
- Cordova

## 🧪 Testing Production Build

### Local Testing
```bash
# Build and serve locally
npm run build
npm run preview

# Test on different devices/browsers
# Use browser dev tools to simulate mobile
```

### Automated Testing
```bash
# Lighthouse CI for performance testing
npm install -g @lhci/cli
lhci autorun
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📈 Post-Deployment

### Launch Checklist
- [ ] Test all functionality on production URL
- [ ] Verify forms submit correctly
- [ ] Check responsive design on real devices
- [ ] Test language switching
- [ ] Verify all links work
- [ ] Test PWA installation
- [ ] Check page load speeds

### Ongoing Maintenance
- Monitor error logs
- Update dependencies regularly
- Monitor performance metrics
- Update content as needed
- Backup configuration and data

## 🆘 Troubleshooting

### Common Issues
- **Build fails**: Check Node.js version, clear node_modules
- **Images not loading**: Verify image paths and formats
- **Styling issues**: Check Tailwind CSS build process
- **Mobile issues**: Test safe area insets and viewport

### Performance Issues
- Use browser dev tools to identify bottlenecks
- Check bundle size with `npm run build`
- Optimize images (use WebP format)
- Enable compression on hosting provider

### Support
For technical issues, check:
1. Browser console for JavaScript errors
2. Network tab for failed requests
3. Lighthouse audit for performance issues
4. Hosting provider documentation

---

**Note**: Always test thoroughly before deploying to production!