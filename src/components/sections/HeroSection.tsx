import { Button } from "../ui/button";
import { Rocket, Play, ArrowRight, Star, Users } from "lucide-react";
import { CTAButton } from "../common/CTAButton";
import { translations } from "../../constants/translations";
import { Language } from "../../types";
import heroImage from "@/assets/5ad8a9d5cc5ee93c07b1d414ba2c84cc581de69a.png";

interface HeroSectionProps {
  language: Language;
  onJobSeekerClick: () => void;
  jobSeekerSectionRef: React.RefObject<HTMLElement>;
}

export function HeroSection({ language, onJobSeekerClick, jobSeekerSectionRef }: HeroSectionProps) {
  const t = translations[language];

  return (
    <section className="w-full relative overflow-hidden min-h-[100dvh] flex items-center safe-area-bottom" ref={jobSeekerSectionRef}>
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1 text-center lg:text-left">
            <div className="flex items-center gap-2 mb-4 animate-fade-in">
              <div className="relative">
                <Rocket className="w-5 h-5 text-accent animate-bounce" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping"></div>
              </div>
              <span className="text-accent font-medium text-sm uppercase tracking-wide bg-accent/10 px-3 py-1 rounded-full">
                {t.revolutionary}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight animate-fade-in-up">
              {t.heroTitle}
            </h1>
            
            <h2 className="text-lg sm:text-xl lg:text-2xl text-primary/70 leading-relaxed max-w-prose mx-auto lg:mx-0 font-light animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              {t.heroSubtitle}
            </h2>
            
            <div className="flex justify-center lg:justify-start animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <CTAButton onClick={onJobSeekerClick} icon="play">
                {t.cta}
              </CTAButton>
            </div>
            
            {/* Key Benefits */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-6 pt-8 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="text-center group min-h-[44px] touch-manipulation">
                <div className="text-lg font-bold text-primary group-hover:animate-pulse transition-all duration-500">
                  ✨ {t.highlySuccessful}
                </div>
                <div className="text-sm text-primary/60 group-hover:text-primary transition-colors duration-300">
                  {t.bestMatchingRate}
                </div>
              </div>
              <div className="text-center group min-h-[44px] touch-manipulation">
                <div className="text-lg font-bold text-primary group-hover:animate-bounce transition-all duration-500">
                  ⚡ {t.lightningFast}
                </div>
                <div className="text-sm text-primary/60 group-hover:text-primary transition-colors duration-300">
                  {t.instantRegistration}
                </div>
              </div>
              <div className="text-center group min-h-[44px] touch-manipulation">
                <div className="text-lg font-bold text-primary group-hover:animate-spin transition-all duration-1000">
                  🎯 {t.free}
                </div>
                <div className="text-sm text-primary/60 group-hover:text-primary transition-colors duration-300">
                  {t.alwaysFree}
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2 animate-fade-in-right">
            {/* Animated background glow */}
            <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-3xl opacity-60 animate-pulse"></div>
            
            {/* Main image container */}
            <div className="relative group">
              <div className="relative rounded-3xl aspect-square w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm transition-all duration-700 group-hover:scale-105 group-hover:rotate-2">
                <img
                  src={heroImage}
                  alt="Three diverse young professionals in work uniforms - delivery person, server, and trades worker"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
              </div>
            </div>
            
            {/* Interactive floating badges */}
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-3 sm:p-4 animate-float border border-green-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-bold text-primary whitespace-nowrap">
                  {t.liveMatches}
                </span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-3 sm:p-4 animate-float border border-primary/20" style={{animationDelay: '1s'}}>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-primary whitespace-nowrap">
                  {t.manyJobs}
                </span>
              </div>
            </div>
            
            <div className="absolute top-1/2 -right-4 sm:-right-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-2 sm:p-3 animate-float border border-accent/20" style={{animationDelay: '2s'}}>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-accent fill-current" />
                <span className="text-xs sm:text-sm font-bold text-primary whitespace-nowrap">{t.topRated}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}