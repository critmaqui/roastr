import { useEffect } from 'react';

export const useAccessibility = () => {
  // Skip to main content
  useEffect(() => {
    const handleSkipToContent = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        const skipLink = document.querySelector('#skip-to-content');
        if (skipLink && document.activeElement === document.body) {
          (skipLink as HTMLElement).focus();
        }
      }
    };

    document.addEventListener('keydown', handleSkipToContent);
    return () => document.removeEventListener('keydown', handleSkipToContent);
  }, []);

  // Announce route changes
  const announceRouteChange = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return { announceRouteChange };
};

// Keyboard navigation hook
export const useKeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Escape key closes modals
      if (e.key === 'Escape') {
        const event = new CustomEvent('closeModal');
        window.dispatchEvent(event);
      }
      
      // Arrow keys for navigation
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const event = new CustomEvent('navigate', { 
          detail: { direction: e.key === 'ArrowLeft' ? 'prev' : 'next' } 
        });
        window.dispatchEvent(event);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);
};

// Focus trap for modals
export const useFocusTrap = (isActive: boolean, containerRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    firstFocusable?.focus();

    return () => document.removeEventListener('keydown', handleTab);
  }, [isActive, containerRef]);
}; 