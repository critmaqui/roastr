// Analytics wrapper for multiple providers
export const analytics = {
  // Track page views
  pageView: (path: string) => {
    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.VITE_GA_ID, {
        page_path: path,
      });
    }
    
    // Add other analytics providers here
  },

  // Track events
  event: (eventName: string, parameters?: Record<string, any>) => {
    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, parameters);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventName, parameters);
    }
  },

  // Track roast generation
  trackRoast: (playlistName: string, roastLength: number) => {
    analytics.event('generate_roast', {
      playlist_name: playlistName,
      roast_length: roastLength,
      timestamp: new Date().toISOString(),
    });
  },

  // Track Spotify connection
  trackSpotifyConnect: (success: boolean) => {
    analytics.event('spotify_connect', {
      success,
      timestamp: new Date().toISOString(),
    });
  },

  // Track share action
  trackShare: (platform: string, playlistName: string) => {
    analytics.event('share_roast', {
      platform,
      playlist_name: playlistName,
      timestamp: new Date().toISOString(),
    });
  },

  // Track conversion events
  trackConversion: (type: 'signup' | 'premium' | 'roast_complete') => {
    analytics.event('conversion', {
      conversion_type: type,
      timestamp: new Date().toISOString(),
    });
  },
}; 