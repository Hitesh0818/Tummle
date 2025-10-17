import { useState, useRef, useEffect } from "react"; // 🚨 Added useEffect
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import {
  Check,
  Zap,
  Clock,
  Heart,
  DollarSign,
  MessageCircle,
  TrendingUp,
  Lock,
  ArrowRight,
  Target,
  Users,
  User,
  Menu,
  X,
  Rocket,
  Play,
  Star
} from "lucide-react";

// Components
import { JobSeekerForm } from "./components/JobSeekerForm";
import { EmployerWaitlistForm } from "./components/EmployerWaitlistForm";
import { Footer } from "./components/Footer";
import { FaviconHandler } from "./components/FaviconHandler";
import { ImprintPage } from "./components/ImprintPage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { TermsAndConditionsPage } from "./components/TermsAndConditionsPage";
import { CookiePolicyPage } from "./components/CookiePolicyPage";
import { CTAButton } from "./components/common/CTAButton";
import { LanguageToggle } from "./components/common/LanguageToggle";

// Constants and Types
import { translations } from "./constants/translations";
import { COLORS } from "./constants/colors";
import type { FormType, Language } from "./types";
import { getCurrentScrollPosition, restoreScrollPosition, scrollToTop } from "./utils/navigation";

// Assets (🚨 Ensure all figma:asset imports are fixed to @/assets)
import logoImage from "@/assets/4cfd463b1380bb2fa69d95e0b6157e3dc2be26a2.png";
import heroImage from "@/assets/5ad8a9d5cc5ee93c07b1d414ba2c84cc581de69a.png";
import howItWorksImage from "@/assets/8af298e8ee0a79576b997833aa1c4e834973fae1.png";
import whoItsForImage from "@/assets/fcce1fb5b1fde396ab87e3f8522610b0e21f58c8.png";

export default function App() {
  // State
  const [language, setLanguage] = useState<Language>("de");
  const [currentForm, setCurrentForm] = useState<FormType>("none");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Removed savedScrollPosition state as history API will track it
  const [isReturning, setIsReturning] = useState(false);

  // Refs
  const jobSeekerSectionRef = useRef<HTMLElement>(null);

  // Translation helper
  const t = translations[language];
  
  // Helper to map state to URL path
  const formToPath = (form: FormType) => form === 'none' ? '/' : `/${form}`;

  // 1. PUSH STATE: Use useEffect to update the URL when the form state changes
  useEffect(() => {
    const path = formToPath(currentForm);
    
    // Get current scroll position to save to history state
    const currentScrollY = window.scrollY;
    
    // Check to prevent pushing duplicate states or the initial load (unless changing from none)
    if (window.location.pathname !== path) {
      // Use pushState for genuine navigation
      window.history.pushState({ form: currentForm, scrollY: currentScrollY }, '', path);
    }
    

  }, [currentForm]);

  // 2. POP STATE: Use useEffect to listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state as { form: FormType, scrollY: number };
      
      if (state && state.form) {
        // Restore form state from history
        setCurrentForm(state.form);
        
        // Restore scroll position for the homepage/main view
        if (state.form === 'none' && state.scrollY > 0) {
          setIsReturning(true);
          // Use a slight delay to ensure the component renders before scrolling
          setTimeout(() => {
            window.scrollTo(0, state.scrollY);
            setIsReturning(false);
          }, 50);
        }
      } else if (window.location.pathname === '/') {
        // Handle direct navigation back to home ('/') when state is empty (e.g., initial state)
        setCurrentForm('none');
        scrollToTop('instant');
      }
    };

    // Replace the initial state to capture the current scroll position for returning home
    window.history.replaceState({ form: currentForm, scrollY: window.scrollY }, '', formToPath(currentForm));

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []); // Run only once on mount

  // Navigation handlers (simplified, relying on useEffect for history management)
  const handleJobSeekerClick = () => {
    // Scroll position is captured by the pushState useEffect
    setCurrentForm("jobseeker");
    setMobileMenuOpen(false);
  };

  const handleEmployerWaitlistClick = () => {
    // Scroll position is captured by the pushState useEffect
    setCurrentForm("employer");
    setMobileMenuOpen(false);
  };

  const handleBackToHome = () => {
    // This uses a replaceState logic since we are navigating "back" from a form/legal page
    // and want the browser history to handle the scroll restoration on the main page.
    setCurrentForm("none");
    setMobileMenuOpen(false);
  };

  const handleBackToHomepageTop = () => {
    setCurrentForm("none");
    setMobileMenuOpen(false);
    scrollToTop();
  };

  const scrollToJobSeekerSection = () => {
    if (currentForm !== "none") {
      setCurrentForm("none");
      setTimeout(() => {
        jobSeekerSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      jobSeekerSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToEmployerSection = () => {
    setCurrentForm("employer");
  };

  const handleLegalPageNavigation = (page: "imprint" | "privacy" | "terms" | "cookies") => {
    // Scroll position is captured by the pushState useEffect
    setCurrentForm(page);
    scrollToTop('instant');
  };

  // Render legal pages
  if (currentForm === "imprint") {
    return (
      <ImprintPage
        language={language}
        onBack={handleBackToHomepageTop}
        onLanguageChange={setLanguage}
        onLegalClick={handleLegalPageNavigation}
      />
    );
  }

  if (currentForm === "privacy") {
    return (
      <PrivacyPolicyPage
        language={language}
        onBack={handleBackToHomepageTop}
        onLanguageChange={setLanguage}
        onLegalClick={handleLegalPageNavigation}
      />
    );
  }

  if (currentForm === "terms") {
    return (
      <TermsAndConditionsPage
        language={language}
        onBack={handleBackToHomepageTop}
        onLanguageChange={setLanguage}
        onLegalClick={handleLegalPageNavigation}
      />
    );
  }

  if (currentForm === "cookies") {
    return (
      <CookiePolicyPage
        language={language}
        onBack={handleBackToHomepageTop}
        onLanguageChange={setLanguage}
        onLegalClick={handleLegalPageNavigation}
      />
    );
  }

  // Render forms
  if (currentForm === "jobseeker") {
    return (
      <JobSeekerForm
        language={language}
        onHome={handleBackToHome}
        onSwitchToEmployer={scrollToEmployerSection}
        onLanguageChange={setLanguage}
        onLegalClick={handleLegalPageNavigation}
      />
    );
  }

  if (currentForm === "employer") {
    return (
      <EmployerWaitlistForm
        language={language}
        onHome={handleBackToHome}
        onSwitchToJobSeeker={scrollToJobSeekerSection}
        onLanguageChange={setLanguage}
        onLegalClick={handleLegalPageNavigation}
      />
    );
  }

  // Main landing page
  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-white via-primary/5 to-secondary/10 overflow-x-hidden relative safe-area-bottom">
      <FaviconHandler />
      
      {/* Returning indicator */}
      {isReturning && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg">
          <span className="text-sm font-medium">
            {t.returningToPrevious}
          </span>
        </div>
      )}

      {/* Header */}
      <header className="w-full sticky top-0 bg-white/95 backdrop-blur-xl border-b border-primary/10 z-50 shadow-lg safe-area-top">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 flex justify-between items-center max-w-7xl">
          <img
            src={logoImage}
            alt="Logo"
            className="h-7 sm:h-8 w-auto object-contain cursor-pointer transition-all duration-300 hover:scale-110 touch-manipulation"
            onClick={handleBackToHome}
          />
          
          {/* Mobile Hamburger Menu */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] px-2 touch-manipulation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleEmployerWaitlistClick}
              className="text-sm font-medium underline hover:no-underline min-h-[44px] px-3 flex items-center touch-manipulation transition-colors duration-300"
              style={{ color: COLORS.PRIMARY }}
              onMouseEnter={(e) => e.currentTarget.style.color = COLORS.PRIMARY_HOVER}
              onMouseLeave={(e) => e.currentTarget.style.color = COLORS.PRIMARY}
            >
              {t.forEmployers}
            </button>
            <LanguageToggle language={language} onLanguageChange={setLanguage} />
            <CTAButton onClick={handleJobSeekerClick} size="sm">
              {t.cta}
            </CTAButton>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-primary/10 shadow-lg z-50 sm:hidden">
              <div className="container mx-auto px-3 py-4 space-y-1">
                <LanguageToggle 
                  language={language} 
                  onLanguageChange={(lang) => {
                    setLanguage(lang);
                    setMobileMenuOpen(false);
                  }} 
                  variant="mobile" 
                />

                <Button
                  variant="ghost"
                  onClick={handleEmployerWaitlistClick}
                  className="w-full justify-start h-12 px-4 text-left transition-colors duration-300 touch-manipulation"
                  style={{ color: COLORS.PRIMARY }}
                >
                  <Users className="w-5 h-5 mr-3" />
                  <span className="flex-1 font-medium">{t.forEmployers}</span>
                  <ArrowRight className="w-4 h-4 opacity-60" />
                </Button>

                <div className="border-t border-primary/10 my-3" />

                <CTAButton onClick={handleJobSeekerClick} fullWidth>
                  {t.cta}
                </CTAButton>

                <div className="pt-2 pb-1">
                  <div className="flex justify-center items-center gap-4 text-primary/60 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{t.free}</span>
                    </div>
                    <div className="w-px h-3 bg-primary/20"></div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>{t.lightningFast}</span>
                    </div>
                    <div className="w-px h-3 bg-primary/20"></div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>{t.secure}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Hero Section */}
      <section className="w-full relative overflow-hidden min-h-[100dvh] flex items-center safe-area-bottom" ref={jobSeekerSectionRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1 text-center lg:text-left">
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="w-5 h-5 text-accent" />
                <span className="text-accent font-medium text-sm uppercase tracking-wide bg-accent/10 px-3 py-1 rounded-full">
                  {t.revolutionary}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
                {t.heroTitle}
              </h1>
              
              <h2 className="text-lg sm:text-xl lg:text-2xl text-primary/70 leading-relaxed max-w-prose mx-auto lg:mx-0 font-light">
                {t.heroSubtitle}
              </h2>
              
              <div className="flex justify-center lg:justify-start">
                <CTAButton onClick={handleJobSeekerClick} icon="play">
                  {t.cta}
                </CTAButton>
              </div>
              
              {/* Key Benefits */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-6 pt-8">
                <div className="text-center group min-h-[44px] touch-manipulation">
                  <div className="text-lg font-bold text-primary">
                    ✨ {t.highlySuccessful}
                  </div>
                  <div className="text-sm text-primary/60">
                    {t.bestMatchingRate}
                  </div>
                </div>
                <div className="text-center group min-h-[44px] touch-manipulation">
                  <div className="text-lg font-bold text-primary">
                    ⚡ {t.lightningFast}
                  </div>
                  <div className="text-sm text-primary/60">
                    {t.instantRegistration}
                  </div>
                </div>
                <div className="text-center group min-h-[44px] touch-manipulation">
                  <div className="text-lg font-bold text-primary">
                    🎯 {t.free}
                  </div>
                  <div className="text-sm text-primary/60">
                    {t.alwaysFree}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2">
              {/* Main image container */}
              <div className="relative group">
                <div className="relative rounded-3xl aspect-square w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
                  <img
                    src={heroImage}
                    alt="Three diverse young professionals in work uniforms - delivery person, server, and trades worker"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-3 sm:p-4 border border-green-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm font-bold text-primary whitespace-nowrap">
                    {t.liveMatches}
                  </span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-3 sm:p-4 border border-primary/20">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-bold text-primary whitespace-nowrap">
                    {t.manyJobs}
                  </span>
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-4 sm:-right-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-2 sm:p-3 border border-accent/20">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent fill-current" />
                  <span className="text-xs sm:text-sm font-bold text-primary whitespace-nowrap">{t.topRated}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="w-full bg-gradient-to-b from-white to-primary/5 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Target className="w-6 h-6 text-accent" />
              <span className="text-accent font-medium text-sm uppercase tracking-wide">{t.yourAdvantages}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6">
              {t.whyUsTitle}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-primary/70 leading-relaxed max-w-4xl mx-auto px-4">
              {t.whyUsDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Benefit Cards */}
            {[
              { icon: Clock, title: t.noEffort, desc: t.noEffortDesc, gradient: "from-primary to-secondary" },
              { icon: Heart, title: t.convenient, desc: t.convenientDesc, gradient: "from-secondary to-accent" },
              { icon: DollarSign, title: t.free, desc: t.freeDesc, gradient: "from-accent to-primary" },
              { icon: MessageCircle, title: t.noSpam, desc: t.noSpamDesc, gradient: "from-primary to-accent" },
              { icon: TrendingUp, title: t.successful, desc: t.successfulDesc, gradient: "from-secondary to-primary" },
              { icon: Lock, title: t.noMisuse, desc: t.noMisuseDesc, gradient: "from-accent to-secondary" },
            ].map((benefit, index) => (
              <Card key={index} className="group relative overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2" style={{ border: '2px solid #005478' }}>
                <CardContent className="relative p-8 text-center space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mx-auto transition-transform duration-300 shadow-lg`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">{benefit.title}</h3>
                  <p className="text-primary/60">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-gradient-to-r from-primary/10 via-white to-secondary/10 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 max-w-7xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <Zap className="w-5 h-5 text-accent" />
                <span className="text-accent font-medium text-sm uppercase tracking-wide bg-accent/10 px-3 py-1 rounded-full">
                  {t.smartMatching}
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                {t.howItWorksTitle}
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-primary/70 leading-relaxed">
                {t.howItWorksDescription}
              </p>
              
              {/* Process Steps */}
              <div className="space-y-4 pt-6">
                {[
                  { icon: User, text: t.createProfile, gradient: "from-primary to-secondary" },
                  { icon: Zap, text: t.autoMatching, gradient: "from-secondary to-accent" },
                  { icon: MessageCircle, text: t.employersContact, gradient: "from-accent to-primary" },
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 sm:p-6 bg-white/80 rounded-2xl shadow-lg backdrop-blur-sm">
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-primary font-medium flex-1 text-sm sm:text-base">
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
              
              <CTAButton onClick={handleJobSeekerClick} icon="rocket">
                {t.howItWorksCta}
              </CTAButton>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="relative group">
                <div className="relative rounded-3xl aspect-video w-full overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
                  <img
                    src={howItWorksImage}
                    alt="Professional office workers at desks using computers and phones"
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"></div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border-2 border-accent/20">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm font-bold text-primary">{t.smartTech}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="w-full bg-gradient-to-b from-accent/10 to-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <Users className="w-5 h-5 text-accent" />
                <span className="text-accent font-medium text-sm uppercase tracking-wide">{t.perfectForYou}</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                {t.whoItsForTitle}
              </h2>
              
              <p className="text-lg sm:text-xl text-primary/70 leading-relaxed">
                {t.whoItsForDescription}
              </p>
              
              <div className="relative">
                <div className="relative flex items-start gap-6 p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg text-primary/80 leading-relaxed">
                      {t.whoItsForPoint}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 pt-4">
                {[
                  { color: "bg-accent", text: t.studentsJobSeekers },
                  { color: "bg-secondary", text: t.partTimeWorkers },
                  { color: "bg-primary", text: t.seasonalWorkers },
                ].map((group, index) => (
                  <div key={index} className="flex items-center gap-3 text-primary/70">
                    <div className={`w-2 h-2 ${group.color} rounded-full`}></div>
                    <span>{group.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center relative">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden shadow-2xl border-8 border-white/50 backdrop-blur-sm">
                <img
                  src={whoItsForImage}
                  alt="Diverse team of professional office workers smiling together"
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent"></div>
              </div>
              
              <div className="absolute top-8 right-8 bg-white rounded-2xl shadow-xl p-3 transform rotate-12">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-bold text-primary">{t.perfectMatch}!</span>
                </div>
              </div>
              
              <div className="absolute bottom-12 left-8 bg-white rounded-2xl shadow-xl p-3 transform -rotate-6">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-accent" />
                  <span className="text-sm font-bold text-primary">{t.easyFast}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        language={language}
        onJobSeekerClick={handleJobSeekerClick}
        onEmployerClick={handleEmployerWaitlistClick}
        onLegalClick={handleLegalPageNavigation}
      />
    </div>
  );
}
