import { Button } from "../ui/button";
import { ArrowRight, Sparkles, Play, Rocket } from "lucide-react";
import { COLORS } from "../../constants/colors";

interface CTAButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'sparkles' | 'play' | 'rocket' | 'none';
  className?: string;
  fullWidth?: boolean;
}

const iconMap = {
  sparkles: Sparkles,
  play: Play,
  rocket: Rocket,
  none: null,
};

export function CTAButton({ 
  onClick, 
  children, 
  variant = 'primary',
  size = 'md',
  icon = 'sparkles',
  className = '',
  fullWidth = false 
}: CTAButtonProps) {
  const IconComponent = iconMap[icon];
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[44px]',
    md: 'px-6 py-3 text-lg min-h-[56px]',
    lg: 'px-8 py-4 text-lg min-h-[56px]',
  };

  const baseClasses = `
    relative overflow-hidden group text-white rounded-xl transition-all duration-500 
    shadow-2xl transform hover:scale-110 hover:-translate-y-2 flex items-center 
    justify-center gap-3 touch-manipulation cursor-pointer
    ${fullWidth ? 'w-full' : 'w-full sm:w-auto max-w-sm'}
    ${sizeClasses[size]}
    ${className}
  `;

  const backgroundColor = variant === 'primary' ? COLORS.ORANGE : COLORS.PRIMARY;
  const hoverColor = variant === 'primary' ? COLORS.ORANGE_HOVER : COLORS.PRIMARY_HOVER;

  return (
    <Button
      onClick={onClick}
      className={baseClasses}
      style={{ backgroundColor }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hoverColor;
        e.currentTarget.style.boxShadow = `0 25px 50px -12px ${backgroundColor}66`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = backgroundColor;
        e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
      }}
    >
      {IconComponent && (
        <IconComponent className="w-5 h-5 relative z-10 group-hover:rotate-180 group-hover:scale-125 transition-transform duration-500" />
      )}
      <span className="relative z-10">{children}</span>
      <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
    </Button>
  );
}