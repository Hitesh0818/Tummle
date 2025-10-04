import { Mail, Facebook, Linkedin, Instagram } from "lucide-react";
import logoImage from 'figma:asset/4cfd463b1380bb2fa69d95e0b6157e3dc2be26a2.png';

interface FooterProps {
  language: 'de' | 'en';
  onJobSeekerClick: () => void;
  onEmployerClick: () => void;
  onFeedbackClick?: () => void;
  onSupportClick?: () => void;
  onLegalClick?: (page: "imprint" | "privacy" | "terms" | "cookies") => void;
}

const translations = {
  de: {
    // Navigation Links
    jobSeekerForm: "Für Jobsuchende",
    forEmployers: "Für Arbeitgeber", 
    feedback: "Feedback",
    support: "Support",
    
    // Legal
    legal: "Rechtliches",
    legalImprint: "Impressum",
    legalPrivacy: "Datenschutzerklärung",
    legalTerms: "Allgemeine Geschäftsbedingungen",
    legalCookies: "Cookie-Richtlinie",
    followUs: "Folge uns",
    copyright: "© 2024 TUMMLE. Alle Rechte vorbehalten.",
    
    // Contact
    contactEmail: "support@tummle.com"
  },
  en: {
    // Navigation Links
    jobSeekerForm: "For Jobseekers",
    forEmployers: "For Employers",
    feedback: "Feedback", 
    support: "Support",
    
    // Legal
    legal: "Legal",
    legalImprint: "Imprint",
    legalPrivacy: "Privacy Policy",
    legalTerms: "Terms and Conditions",
    legalCookies: "Cookie Policy",
    followUs: "Follow Us",
    copyright: "© 2024 TUMMLE. All rights reserved.",
    
    // Contact
    contactEmail: "support@tummle.com"
  }
};

export function Footer({ 
  language, 
  onJobSeekerClick, 
  onEmployerClick, 
  onFeedbackClick, 
  onSupportClick,
  onLegalClick 
}: FooterProps) {
  const t = translations[language];

  const handleFeedbackClick = () => {
    if (onFeedbackClick) {
      onFeedbackClick();
    } else {
      // Default feedback action - could open email or a form
      window.location.href = `mailto:${t.contactEmail}?subject=Feedback`;
    }
  };

  const handleSupportClick = () => {
    if (onSupportClick) {
      onSupportClick();
    } else {
      // Default support action - could open email or a form  
      window.location.href = `mailto:${t.contactEmail}?subject=Support`;
    }
  };

  return (
    <footer className="w-full bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company & Contact */}
          <div className="space-y-4">
            <img
              src={logoImage}
              alt="TUMMLE Logo"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Mail className="w-4 h-4" />
                <a 
                  href={`mailto:${t.contactEmail}`}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-white">Navigation</h4>
            <div className="space-y-2">
              <button
                onClick={onJobSeekerClick}
                className="block text-sm text-white/80 hover:text-white transition-colors text-left"
              >
                {t.jobSeekerForm}
              </button>
              <button
                onClick={onEmployerClick}
                className="block text-sm text-white/80 hover:text-white transition-colors text-left"
              >
                {t.forEmployers}
              </button>
              <button
                onClick={handleFeedbackClick}
                className="block text-sm text-white/80 hover:text-white transition-colors text-left"
              >
                {t.feedback}
              </button>
              <button
                onClick={handleSupportClick}
                className="block text-sm text-white/80 hover:text-white transition-colors text-left"
              >
                {t.support}
              </button>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-medium text-white">{t.legal}</h4>
            <div className="space-y-2">
              <button
                onClick={() => onLegalClick?.("imprint")}
                className="block text-sm text-white/80 hover:text-white transition-colors cursor-pointer text-left"
              >
                {t.legalImprint}
              </button>
              <button
                onClick={() => onLegalClick?.("privacy")}
                className="block text-sm text-white/80 hover:text-white transition-colors cursor-pointer text-left"
              >
                {t.legalPrivacy}
              </button>
              <button
                onClick={() => onLegalClick?.("terms")}
                className="block text-sm text-white/80 hover:text-white transition-colors cursor-pointer text-left"
              >
                {t.legalTerms}
              </button>
              <button
                onClick={() => onLegalClick?.("cookies")}
                className="block text-sm text-white/80 hover:text-white transition-colors cursor-pointer text-left"
              >
                {t.legalCookies}
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-medium text-white">{t.followUs}</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center hover:bg-secondary/30 transition-colors cursor-pointer"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center hover:bg-secondary/30 transition-colors cursor-pointer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center hover:bg-secondary/30 transition-colors cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="text-center">
            <div className="text-sm text-white/60">{t.copyright}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}