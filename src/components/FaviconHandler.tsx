import { useEffect } from 'react';
import faviconImage from 'figma:asset/ff8e33c66bea863f12622ae01e6afbda269ceb8c.png';

export function FaviconHandler() {
  useEffect(() => {
    // Create a canvas to resize the image for favicon
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Set canvas size for favicon (32x32 is standard)
      canvas.width = 32;
      canvas.height = 32;
      
      if (ctx) {
        // Draw the image resized to 32x32
        ctx.drawImage(img, 0, 0, 32, 32);
        
        // Convert to data URL
        const faviconUrl = canvas.toDataURL('image/png');
        
        // Update favicon
        let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
        if (!favicon) {
          favicon = document.createElement('link');
          favicon.rel = 'icon';
          favicon.type = 'image/png';
          document.head.appendChild(favicon);
        }
        favicon.href = faviconUrl;
        
        // Also update apple-touch-icon with larger size
        canvas.width = 180;
        canvas.height = 180;
        ctx.drawImage(img, 0, 0, 180, 180);
        const appleTouchUrl = canvas.toDataURL('image/png');
        
        let appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
        if (!appleTouchIcon) {
          appleTouchIcon = document.createElement('link');
          appleTouchIcon.rel = 'apple-touch-icon';
          appleTouchIcon.type = 'image/png';
          document.head.appendChild(appleTouchIcon);
        }
        appleTouchIcon.href = appleTouchUrl;
      }
    };
    
    img.crossOrigin = 'anonymous';
    img.src = faviconImage;
  }, []);

  return null; // This component doesn't render anything
}