import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Building2, CheckCircle, Languages, Sparkles, Users, ArrowRight, Menu, X } from "lucide-react";
import logoImage from '@/assets/4cfd463b1380bb2fa69d95e0b6157e3dc2be26a2.png'; 
import { Footer } from './Footer';

interface EmployerWaitlistFormProps {
  language: 'de' | 'en';
  onHome: () => void;
  onSwitchToJobSeeker: () => void;
  onLanguageChange?: (language: 'de' | 'en') => void;
  onLegalClick?: (page: "imprint" | "privacy" | "terms" | "cookies") => void;
}

const translations = {
  de: {
    // Header
    backToHome: "Zurück zur Startseite",
    jobSeekerButton: "Jobsucher",
    waitlistForm: "Warteliste für Arbeitgeber",
    
    // Fields
    email: "Email",
    name: "Name",
    phone: "Telefonnummer",
    
    // Placeholders
    emailPlaceholder: "ihre.email@unternehmen.de",
    namePlaceholder: "Ihr Name oder Firmenname",
    phonePlaceholder: "+49 123 456789",
    
    // Buttons
    submit: "Zur Warteliste hinzufügen",
    submitting: "Wird gesendet...",
    
    // Validation
    required: "Dieses Feld ist erforderlich",
    invalidEmail: "Bitte gültige E-Mail-Adresse eingeben",
    
    // Success
    successTitle: "Erfolgreich zur Warteliste hinzugefügt!",
    successMessage: "Vielen Dank für Ihr Interesse. Wir werden Sie kontaktieren, sobald TUMMLE für Arbeitgeber verfügbar ist.",
    backToWebsite: "Zurück zur Startseite",
    
    // Description
    description: "Melden Sie sich für unsere Warteliste an und erhalten Sie frühzeitigen Zugang zu TUMMLE für Arbeitgeber. Wir informieren Sie, sobald die Plattform verfügbar ist.",
    
    // Employer Section
    employerSectionTitle: "Bereit für die Zukunft der Personalsuche?",
    employerSectionDescription: "Entdecken Sie, wie TUMMLE auch Ihr Unternehmen revolutionieren kann. Effizienter, kostengünstiger, zielgerichteter.",
    joinWaitlist: "Warteliste für Arbeitgeber",
    exclusiveAccess: "Exklusiver Früh-Zugang",
    manyCompanies: "Viele Unternehmen",
    alreadyInterested: "bereits interessiert",
    massive: "Massive",
    timeSavings: "Zeitersparnis",
    significant: "Große",
    costReduction: "Kostenreduktion",
    forCompanies: "Für Unternehmen"
  },
  en: {
    // Header
    backToHome: "Back to Home",
    jobSeekerButton: "Job Seeker",
    waitlistForm: "Employer Waitlist",
    
    // Fields
    email: "Email",
    name: "Name",
    phone: "Phone Number",
    
    // Placeholders
    emailPlaceholder: "your.email@company.com",
    namePlaceholder: "Your name or company name",
    phonePlaceholder: "+49 123 456789",
    
    // Buttons
    submit: "Join Waitlist",
    submitting: "Submitting...",
    
    // Validation
    required: "This field is required",
    invalidEmail: "Please enter a valid email address",
    
    // Success
    successTitle: "Successfully Added to Waitlist!",
    successMessage: "Thank you for your interest. We will contact you as soon as TUMMLE for employers is available.",
    backToWebsite: "Back to Homepage",
    
    // Description
    description: "Join our waitlist to get early access to TUMMLE for employers. We'll notify you as soon as the platform is available.",
    
    // Employer Section
    employerSectionTitle: "Ready for the future of recruitment?",
    employerSectionDescription: "Discover how TUMMLE can revolutionize your company too. More efficient, cost-effective, targeted.",
    joinWaitlist: "Employer Waitlist",
    exclusiveAccess: "Exclusive Early Access",
    manyCompanies: "Many Companies",
    alreadyInterested: "already interested",
    massive: "Massive",
    timeSavings: "Time Savings",
    significant: "Significant",
    costReduction: "Cost Reduction",
    forCompanies: "For Companies"
  }
};

interface FormData {
  email: string;
  name: string;
  phone: string;
}

export function EmployerWaitlistForm({ language, onHome, onSwitchToJobSeeker, onLanguageChange, onLegalClick }: EmployerWaitlistFormProps) {
  const t = translations[language];
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    phone: ''
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email is required
    if (!formData.email) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 🚨 Actual Backend API Call for Employer Waitlist
      const response = await fetch('https://tummle-be-git-main-hiteshs-projects-52ac4287.vercel.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle 409 Conflict (Duplicate Email)
        if (response.status === 409 && errorData.error.includes('Email already on waitlist')) {
          setErrors(prev => ({ ...prev, email: errorData.error }));
        } else {
          // General failure
          throw new Error(errorData.error || 'Waitlist submission failed');
        }
        
        // Return early on error
        return;
      }

      // Success
      setSubmitted(true);
      // Scroll to top to show success message clearly
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error('Employer Submission Error:', error);
      alert(language === 'de' 
        ? 'Ein Netzwerkfehler ist aufgetreten. Bitte versuchen Sie es später erneut.' 
        : 'A network error occurred. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <header className="w-full bg-white border-b border-primary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-7xl">
            <img 
              src={logoImage} 
              alt="TUMMLE Logo" 
              className="h-8 w-auto object-contain cursor-pointer"
              onClick={onHome}
            />
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-2xl">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-accent" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-medium text-primary">{t.successTitle}</h1>
              <p className="text-lg text-primary/80 leading-relaxed">
                {t.successMessage}
              </p>
            </div>

            <Button 
              onClick={onHome}
              className="bg-primary text-white hover:bg-primary/90 px-8 py-3 text-lg rounded-md"
            >
              {t.backToWebsite}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <Footer
          language={language}
          onJobSeekerClick={onSwitchToJobSeeker}
          onEmployerClick={onHome}
          onLegalClick={onLegalClick}
        />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-gray-50 safe-area-bottom">
      <header className="w-full bg-white border-b border-primary/10 sticky top-0 z-50 safe-area-top">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 max-w-7xl flex justify-between items-center">
          <img 
            src={logoImage} 
            alt="TUMMLE Logo" 
            className="h-7 sm:h-8 w-auto object-contain cursor-pointer touch-manipulation"
            onClick={onHome}
          />
          
          {/* Mobile Hamburger Menu */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] px-2 touch-manipulation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newLanguage = language === "de" ? "en" : "de";
                if (onLanguageChange) {
                  onLanguageChange(newLanguage);
                }
              }}
              className="relative overflow-hidden group flex items-center gap-2 border-primary/20 hover:bg-primary/5 min-h-[44px] px-3 hover:border-primary/40 transition-all duration-500 hover:shadow-xl rounded-xl touch-manipulation cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Languages className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm uppercase font-medium relative z-10">
                {language === "de" ? "EN" : "DE"}
              </span>
            </Button>
            <button
              onClick={onSwitchToJobSeeker}
              className="text-sm lg:text-base font-medium underline hover:no-underline min-h-[48px] px-4 flex items-center touch-manipulation transition-colors duration-300 rounded-lg hover:bg-primary/5"
              style={{ color: '#005478' }}
            >
              {t.jobSeekerButton}
            </button>
            <Button
              onClick={onHome}
              className="relative overflow-hidden group text-white px-6 lg:px-8 py-3 text-sm lg:text-base rounded-xl transition-all duration-500 min-h-[48px] shadow-2xl transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2 touch-manipulation cursor-pointer"
              style={{ backgroundColor: ': #0078ab' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = ': #0078ab';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(255, 119, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ': #0078ab';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
              }}
            >
              <ArrowLeft className="w-4 h-4 relative z-10 group-hover:-translate-x-2 transition-transform duration-300" />
              <span className="relative z-10 whitespace-nowrap">{t.backToHome}</span>
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Dropdown Content */}
            <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-primary/10 shadow-lg z-50 sm:hidden animate-fade-in-up">
              <div className="container mx-auto px-3 py-4 space-y-1">
                {/* Language Selector */}
                <Button
                  variant="ghost"
                  onClick={() => {
                    const newLanguage = language === "de" ? "en" : "de";
                    if (onLanguageChange) {
                      onLanguageChange(newLanguage);
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start h-12 px-4 text-left hover:bg-primary/5 transition-colors duration-300 touch-manipulation cursor-pointer"
                >
                  <Languages className="w-5 h-5 mr-3 text-primary" />
                  <span className="flex-1 text-primary font-medium">
                    {language === 'de' ? 'English' : 'Deutsch'}
                  </span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {language === "de" ? "EN" : "DE"}
                  </span>
                </Button>

                {/* Job Seeker Link */}
                <Button
                  variant="ghost"
                  onClick={() => {
                    onSwitchToJobSeeker();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start h-12 px-4 text-left hover:bg-primary/5 transition-colors duration-300 touch-manipulation"
                >
                  <Sparkles className="w-5 h-5 mr-3 text-secondary" />
                  <span className="flex-1 text-primary font-medium">
                    {t.jobSeekerButton}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary/60" />
                </Button>

                {/* Back to Homepage */}
                <Button
                  variant="ghost"
                  onClick={() => {
                    onHome();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start h-12 px-4 text-left hover:bg-primary/5 transition-colors duration-300 touch-manipulation"
                >
                  <ArrowLeft className="w-5 h-5 mr-3 text-primary" />
                  <span className="flex-1 text-primary font-medium">
                    {t.backToHome}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary/60" />
                </Button>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Employer Benefits Section */}
      <section className="w-full bg-gradient-to-r from-primary via-secondary to-accent relative overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i}s`,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 max-w-4xl relative">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="relative">
                  <Sparkles className="w-6 h-6 text-white/80 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/60 rounded-full animate-ping"></div>
                </div>
                <span className="text-white/80 font-medium text-sm uppercase tracking-wide bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  {t.forCompanies}
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in-up">
                {t.employerSectionTitle}
              </h2>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                {t.employerSectionDescription}
              </p>
            </div>
            
            <div className="flex justify-center items-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <Button
                onClick={() => {
                  const formSection = document.querySelector('.registration-form-section');
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="relative overflow-hidden group bg-white text-primary hover:text-white px-6 sm:px-8 py-4 text-base sm:text-lg rounded-2xl transition-all duration-500 min-h-[56px] shadow-2xl hover:shadow-white/20 transform hover:scale-110 hover:-translate-y-2 flex items-center gap-3 font-bold touch-manipulation w-full sm:w-auto max-w-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse relative z-10"></div>
                <span className="relative z-10 text-center flex-1">{t.exclusiveAccess}</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </div>
            
            {/* Interactive trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-white/60">
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-lg font-bold text-white group-hover:text-accent transition-colors duration-300">
                  🏢 {t.manyCompanies}
                </div>
                <div className="text-sm group-hover:text-white transition-colors duration-300">
                  {t.alreadyInterested}
                </div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-lg font-bold text-white group-hover:text-accent transition-colors duration-300">
                  ⚡ {t.massive}
                </div>
                <div className="text-sm group-hover:text-white transition-colors duration-300">
                  {t.timeSavings}
                </div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-lg font-bold text-white group-hover:text-accent transition-colors duration-300">
                  💰 {t.significant}
                </div>
                <div className="text-sm group-hover:text-white transition-colors duration-300">
                  {t.costReduction}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <div className="registration-form-section container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-medium text-primary mb-4">{t.waitlistForm}</h1>
          <p className="text-lg text-primary/80 leading-relaxed max-w-prose mx-auto">
            {t.description}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary justify-center">
              <Building2 className="w-5 h-5" />
              {t.waitlistForm}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-primary font-medium">
                  {t.email} *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Name Field */}
              <div className="space-y-3">
                <Label htmlFor="name" className="text-primary font-medium">
                  {t.name}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-primary font-medium">
                  {t.phone}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white hover:bg-primary/90 w-full py-3 text-lg rounded-md min-h-[56px] touch-manipulation"
                >
                  {isSubmitting ? t.submitting : t.submit}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Footer
        language={language}
        onJobSeekerClick={onSwitchToJobSeeker}
        onEmployerClick={onHome}
        onLegalClick={onLegalClick}
      />
    </div>
  );
}