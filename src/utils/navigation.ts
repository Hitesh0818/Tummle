import { FormType } from '../types';

export const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
  window.scrollTo({ top: 0, behavior });
};

export const getCurrentScrollPosition = (): number => {
  return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
};

export const restoreScrollPosition = (position: number, delay: number = 100) => {
  if (position > 0) {
    window.scrollTo(0, position);
  }
  
  setTimeout(() => {
    if (position > 0) {
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
  }, delay);
};