# Tummle Architecture Documentation

This document outlines the technical architecture and design decisions for the Tummle landing page.

## 🏗️ System Architecture

### Overview
Tummle is a modern React-based single-page application (SPA) built with TypeScript and styled with Tailwind CSS v4. The application follows a component-based architecture with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                        │
├─────────────────────────────────────────────────────────────┤
│                   React Application                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │    App.tsx  │  │ Components  │  │    UI Library       │  │
│  │  (Main App) │  │ (Business)  │  │   (Shadcn/UI)       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                  Styling & Assets                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Tailwind v4 │  │    Figma    │  │     Static Assets   │  │
│  │    (CSS)    │  │   Assets    │  │   (Icons, Images)   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                   Build & Development                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │    Vite     │  │ TypeScript  │  │      ESLint         │  │
│  │ (Bundler)   │  │ (Types)     │  │   (Code Quality)    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

### Core Structure
```
tummle-landing-page/
├── src/                        # Source files (minimal, main entry)
│   ├── main.tsx               # React DOM render
│   └── vite-env.d.ts         # Vite type definitions
├── components/                # React components
│   ├── ui/                   # Shadcn/UI components
│   ├── figma/               # Figma-specific components
│   ├── JobSeekerForm.tsx    # Job seeker registration
│   ├── EmployerWaitlistForm.tsx # Employer signup
│   ├── Footer.tsx           # Universal footer
│   └── GooglePlacesAutocomplete.tsx # Location picker
├── styles/                  # Global styles
│   └── globals.css         # Tailwind + custom CSS
├── public/                 # Static assets
│   ├── manifest.json      # PWA manifest
│   └── favicon.ico       # Favicon and icons
├── App.tsx               # Main application component
└── index.html           # HTML entry point
```

### Component Architecture
```
App.tsx (Main Router)
├── Header (Navigation)
├── Landing Page Content
│   ├── Hero Section
│   ├── Why Us Section
│   ├── How It Works Section
│   └── Who It's For Section
├── JobSeekerForm (Registration)
│   ├── GooglePlacesAutocomplete
│   ├── Multi-select Components
│   └── Form Validation
├── EmployerWaitlistForm (Signup)
└── Footer (Universal)
```

## 🔧 Technology Stack

### Frontend Framework
- **React 18**: Latest React with concurrent features
- **TypeScript**: Strong typing for better developer experience
- **Vite**: Fast build tool with HMR (Hot Module Replacement)

### Styling & UI
- **Tailwind CSS v4**: Utility-first CSS framework (latest version)
- **Shadcn/UI**: Accessible, customizable UI components
- **Radix UI**: Headless UI primitives for accessibility
- **Lucide React**: Beautiful, customizable icons

### Development Tools
- **ESLint**: Code linting and formatting
- **TypeScript Compiler**: Type checking
- **Vite Dev Server**: Development server with HMR

### Browser Support
- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 88+
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🎨 Design System

### Color System
```css
:root {
  --primary: #005478;      /* Deep Blue - Trust, Professionalism */
  --secondary: #4D81B3;    /* Medium Blue - Reliability */
  --accent: #67b6c4;       /* Light Teal - Innovation, Freshness */
  --background: #ffffff;    /* Clean, Modern */
  --foreground: #1a1a1a;   /* High Contrast Text */
}
```

### Typography Scale
- **Responsive Typography**: Scales from mobile to desktop
- **System Fonts**: Performance-optimized font stack
- **Accessibility**: WCAG 2.1 AA compliant contrast ratios

### Spacing System
- **Consistent Scale**: 4px base unit (0.25rem)
- **Mobile-First**: Optimized for touch interfaces
- **Safe Areas**: iOS notch and Android navigation support

## 🌐 Internationalization (i18n)

### Language Support
```typescript
interface Translations {
  de: { [key: string]: string };  // German (default)
  en: { [key: string]: string };  // English
}
```

### Translation Structure
- **Namespace Organization**: Grouped by component/section
- **Fallback System**: Defaults to German if translation missing
- **SEO Optimization**: Proper lang attributes and meta tags

### Content Management
- **Static Translations**: Embedded in code for performance
- **Type Safety**: TypeScript ensures translation completeness
- **Easy Extension**: Simple to add new languages

## 📱 Mobile-First Design

### Responsive Breakpoints
```css
/* Mobile First Approach */
@media screen and (min-width: 640px)  { /* Small tablets */ }
@media screen and (min-width: 768px)  { /* Tablets */ }
@media screen and (min-width: 1024px) { /* Desktop */ }
@media screen and (min-width: 1280px) { /* Large desktop */ }
```

### Touch Optimization
- **Minimum Touch Targets**: 44px minimum for accessibility
- **Touch Gestures**: Optimized swipe and tap interactions
- **Performance**: Hardware-accelerated animations

### Progressive Web App (PWA)
- **Manifest**: App-like installation experience
- **Service Worker Ready**: Prepared for offline functionality
- **Mobile-First**: Designed primarily for mobile usage

## 🔍 SEO & Performance

### Search Engine Optimization
- **Semantic HTML**: Proper heading hierarchy and structure
- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Schema Markup**: Ready for structured data implementation
- **URL Structure**: Clean, semantic URLs

### Performance Optimization
- **Code Splitting**: Dynamic imports for large components
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Vite bundle analyzer integration
- **Critical CSS**: Inlined critical styles in HTML

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s target
- **FID (First Input Delay)**: < 100ms target
- **CLS (Cumulative Layout Shift)**: < 0.1 target

## 🔒 Security & Privacy

### Security Measures
- **XSS Protection**: React's built-in XSS prevention
- **Content Security Policy**: Prepared for CSP implementation
- **HTTPS Enforcement**: Production deployment with HTTPS only
- **Input Validation**: Client and server-side validation

### Privacy Compliance
- **GDPR Ready**: Consent management system
- **Data Minimization**: Only collect necessary information
- **Transparent Data Usage**: Clear privacy policy integration
- **User Control**: Easy data deletion and modification

## 🧪 Testing Strategy

### Testing Pyramid
```
┌─────────────────────────────────────┐
│           E2E Tests (Few)           │ ← User journey testing
├─────────────────────────────────────┤
│       Integration Tests (Some)      │ ← Component interaction
├─────────────────────────────────────┤
│        Unit Tests (Many)            │ ← Function/component logic
└─────────────────────────────────────┘
```

### Testing Tools (Recommended)
- **Unit Testing**: Vitest + React Testing Library
- **E2E Testing**: Playwright or Cypress
- **Visual Testing**: Chromatic or Percy
- **Performance Testing**: Lighthouse CI

## 🚀 Deployment Architecture

### Build Process
1. **TypeScript Compilation**: Type checking and transpilation
2. **CSS Processing**: Tailwind CSS compilation and optimization
3. **Asset Optimization**: Image compression and optimization
4. **Bundle Generation**: Vite production build
5. **Static File Generation**: Ready for CDN deployment

### Hosting Options
- **Static Hosting**: Vercel, Netlify, GitHub Pages
- **CDN Deployment**: Global edge distribution
- **Serverless Functions**: For form submissions (if needed)

### CI/CD Pipeline
```yaml
Build → Test → Deploy
  ├── Lint code
  ├── Type check
  ├── Run tests
  ├── Build production
  ├── Performance audit
  └── Deploy to hosting
```

## 🔄 State Management

### Current Approach
- **Local State**: React hooks (useState, useEffect)
- **Form State**: Controlled components with validation
- **Global State**: Context API for language selection
- **URL State**: React Router for navigation (if needed)

### Scalability Considerations
- **State Management**: Ready for Redux Toolkit or Zustand
- **API State**: Prepared for React Query or SWR
- **Cache Management**: Service worker for offline support

## 📊 Analytics & Monitoring

### Performance Monitoring
- **Core Web Vitals**: Real User Monitoring (RUM)
- **Error Tracking**: JavaScript error monitoring
- **Bundle Analysis**: Regular bundle size monitoring

### User Analytics
- **Privacy-First**: Anonymous usage tracking
- **Conversion Tracking**: Form submission success rates
- **A/B Testing**: Ready for experimentation platform

## 🔮 Future Considerations

### Scalability
- **Micro-frontend Architecture**: Component federation ready
- **API Integration**: GraphQL or REST API integration
- **Real-time Features**: WebSocket support preparation

### Performance
- **Server-Side Rendering**: Next.js migration path
- **Edge Computing**: Vercel Edge Functions integration
- **Advanced Caching**: Redis or CDN-based caching

### Features
- **Authentication**: OAuth2/OIDC integration ready
- **Payment Processing**: Stripe or similar integration
- **Advanced Forms**: Multi-step form wizard
- **File Uploads**: Image and document upload support

---

This architecture is designed to be maintainable, scalable, and performant while providing an excellent user experience across all devices and languages.