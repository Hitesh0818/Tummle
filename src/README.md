# Tummle Landing Page

A responsive, bilingual (German/English) landing page for Tummle - a revolutionary job matching platform that connects job seekers with employers efficiently.

## 🌟 Features

### Core Functionality
- **Bilingual Support**: Complete German/English translation system
- **Responsive Design**: Mobile-first approach, fully responsive across all devices
- **Job Seeker Registration**: Comprehensive form with location-based matching
- **Employer Waitlist**: Simple signup form for employers
- **Google Maps Integration**: Smart location selection with radius-based matching

### Technical Features
- **React 18** with TypeScript
- **Tailwind CSS v4** for styling
- **Radix UI** components for accessibility
- **Lucide React** icons
- **Vite** for fast development and building
- **Mobile Optimized**: Touch-friendly interface with safe area support

### Location System
- **Multi-location Selection**: Users can select multiple work locations
- **Smart Radius Handling**: 
  - Street addresses: 3km radius (required)
  - Cities/Districts: Optional radius
  - States/Countries: No radius applicable
- **Mock Google Places API**: Ready for real Google Places integration

### Form Features
- **Advanced Job Matching**: Role selection with experience levels
- **Time Availability**: Visual week schedule selector with shift options
- **Skills & Qualifications**: Education, languages, licenses, certifications
- **Social Media Integration**: Optional profile links
- **Privacy Compliant**: GDPR-ready consent system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tummle-landing-page
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
├── App.tsx                     # Main application component
├── components/
│   ├── JobSeekerForm.tsx      # Job seeker registration form
│   ├── EmployerWaitlistForm.tsx # Employer signup form
│   ├── Footer.tsx             # Universal footer component
│   ├── GooglePlacesAutocomplete.tsx # Location selection component
│   ├── figma/
│   │   └── ImageWithFallback.tsx # Image component with fallback
│   └── ui/                    # Shadcn/UI components
├── styles/
│   └── globals.css           # Global styles and Tailwind config
├── manifest.json             # PWA manifest
└── index.html               # HTML entry point
```

## 🎨 Design System

### Brand Colors
- **Primary**: `#005478` (Deep Blue)
- **Secondary**: `#4D81B3` (Medium Blue) 
- **Accent**: `#67b6c4` (Light Blue/Teal)

### Typography
- Responsive typography system
- Mobile-optimized font sizes
- Touch-friendly interactive elements

### Components
- **Shadcn/UI**: Accessible, customizable components
- **Custom Components**: Tailored for TUMMLE's specific needs
- **Mobile-First**: All components optimized for mobile

## 🌍 Internationalization

### Supported Languages
- **German (de)**: Default language
- **English (en)**: Full translation support

### Translation System
- Complete translation objects for all text
- Consistent terminology across components
- Easy to extend for additional languages

## 📱 Mobile Optimization

### Features
- **Safe Area Support**: Handles device notches and home bars
- **Touch Optimization**: Minimum 44px touch targets
- **Responsive Navigation**: Hamburger menu for mobile
- **Smooth Animations**: Hardware-accelerated transitions
- **Viewport Units**: Modern viewport unit support (`dvh`)

### Performance
- **Fast Loading**: Optimized assets and code splitting
- **Smooth Scrolling**: Native smooth scrolling support
- **Touch Gestures**: Proper touch-action configuration

## 🔧 Configuration

### Environment Setup
The application uses Vite with React and TypeScript. Key configurations:

- **Vite Config**: Modern build tool with HMR
- **TypeScript**: Strict type checking enabled
- **Tailwind v4**: Latest CSS framework features
- **ESLint**: Code quality and consistency

### Google Maps Integration
The app includes a mock Google Places API implementation. To use real Google Places:

1. Get a Google Places API key
2. Replace the mock data in `GooglePlacesAutocomplete.tsx`
3. Add your API key to environment variables

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Deployment Options
- **Static Hosting**: Vercel, Netlify, GitHub Pages
- **CDN**: Any static file hosting service
- **Docker**: Container-ready build output

### PWA Support
- Manifest file included
- Ready for service worker implementation
- Mobile app-like experience

## 🛠 Development

### Code Style
- **TypeScript**: Strict typing throughout
- **ESLint**: Consistent code formatting
- **Component Structure**: Logical separation of concerns
- **CSS Organization**: Tailwind utility classes with custom styles

### Best Practices
- **Accessibility**: WCAG 2.1 AA compliant components
- **Performance**: Optimized images and code splitting
- **SEO**: Semantic HTML structure
- **Security**: XSS protection and secure defaults

## 📄 License

This project is proprietary to Tummle. All rights reserved.

## 🤝 Contributing

This is a private project. For internal development guidelines, see the `guidelines/Guidelines.md` file.

## 📞 Support

For technical support or questions, contact the development team.

---

**Tummle** - Revolutionizing job matching, one connection at a time.