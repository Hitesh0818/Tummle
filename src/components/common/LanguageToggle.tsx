import { Button } from "../ui/button";
import { Languages } from "lucide-react";
import { Language } from "../../types";

interface LanguageToggleProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  variant?: 'desktop' | 'mobile';
}

export function LanguageToggle({ language, onLanguageChange, variant = 'desktop' }: LanguageToggleProps) {
  const toggleLanguage = () => {
    onLanguageChange(language === "de" ? "en" : "de");
  };

  if (variant === 'mobile') {
    return (
      <Button
        variant="ghost"
        onClick={toggleLanguage}
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
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="relative overflow-hidden group flex items-center gap-2 border-primary/20 hover:bg-primary/5 min-h-[44px] px-3 hover:border-primary/40 transition-all duration-500 hover:shadow-xl rounded-xl touch-manipulation cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <Languages className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
      <span className="text-sm uppercase font-medium relative z-10">
        {language === "de" ? "EN" : "DE"}
      </span>
    </Button>
  );
}