import { useState, useRef } from "react";
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

// Assets
import logoImage from "figma:asset/4cfd463b1380bb2fa69d95e0b6157e3dc2be26a2.png";
import heroImage from "figma:asset/5ad8a9d5cc5ee93c07b1d414ba2c84cc581de69a.png";
import howItWorksImage from "figma:asset/8af298e8ee0a79576b997833aa1c4e834973fae1.png";
import whoItsForImage from "figma:asset/fcce1fb5b1fde396ab87e3f8522610b0e21f58c8.png";

export default function App() {
  // State
  const [language, setLanguage] = useState<Language>("de");
  const [currentForm, setCurrentForm] = useState<FormType>("none");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);
  const [isReturning, setIsReturning] = useState(false);

  // Refs
  const jobSeekerSectionRef = useRef<HTMLElement>(null);

  // Translation helper
  const t = translations[language];

  // Navigation handlers
  const handleJobSeekerClick = () => {
    setSavedScrollPosition(getCurrentScrollPosition());
    setCurrentForm("jobseeker");
    setMobileMenuOpen(false);
  };

  const handleEmployerWaitlistClick = () => {
    setSavedScrollPosition(getCurrentScrollPosition());
    setCurrentForm("employer");
    setMobileMenuOpen(false);
  };

  const handleBackToHome = () => {
    setIsReturning(true);
    setCurrentForm("none");
    setMobileMenuOpen(false);
    
    const targetScrollPosition = savedScrollPosition;
    
    if (targetScrollPosition > 0) {
      window.scrollTo(0, targetScrollPosition);
    }
    
    setTimeout(() => {
      restoreScrollPosition(targetScrollPosition);
      setIsReturning(false);
    }, 100);
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
    setSavedScrollPosition(getCurrentScrollPosition());
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

      {/* Rest of sections remain the same but simplified... */}
      <Footer
        language={language}
        onJobSeekerClick={handleJobSeekerClick}
        onEmployerClick={handleEmployerWaitlistClick}
        onLegalClick={handleLegalPageNavigation}
      />
    </div>
  );
}