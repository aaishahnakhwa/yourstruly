import { useEffect, useRef, useState } from 'react';

// Extract 11 character video ID from various YouTube URL formats
export const getYouTubeVideoId = (url?: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const useYouTubePlayer = (elementId: string, url?: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<any>(null);
  const videoIdRef = useRef<string | null>(getYouTubeVideoId(url));

  useEffect(() => {
    videoIdRef.current = getYouTubeVideoId(url);
    if (playerRef.current && isReady && videoIdRef.current) {
      playerRef.current.cueVideoById({
        videoId: videoIdRef.current,
        startSeconds: 0
      });
      if (isPlaying) {
        playerRef.current.playVideo();
      }
    }
  }, [url, isReady]);

  useEffect(() => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) {
      setError('No valid YouTube URL provided');
      return;
    }

    // Function to initialize the YouTube player
    const initPlayer = () => {
      if (playerRef.current) {
        // Player already exists, just cue/play
        return;
      }

      // Check if YT is loaded globally
      if (typeof window !== 'undefined' && (window as any).YT && (window as any).YT.Player) {
        try {
          playerRef.current = new (window as any).YT.Player(elementId, {
            height: '0',
            width: '0',
            videoId: videoId,
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              loop: 1,
              playlist: videoId // Repeat the track
            },
            events: {
              onReady: (event: any) => {
                setIsReady(true);
                // Set initial volume
                event.target.setVolume(50);
              },
              onStateChange: (event: any) => {
                // YT.PlayerState.PLAYING is 1
                if (event.data === 1) {
                  setIsPlaying(true);
                } else {
                  setIsPlaying(false);
                }
              },
              onError: (event: any) => {
                console.warn('YouTube Player error code:', event.data);
                setError(`Failed to load video (Error code: ${event.data})`);
                setIsPlaying(false);
              }
            }
          });
        } catch (err) {
          console.error('Error creating YouTube player:', err);
          setError('Failed to initialize YouTube Player');
        }
      }
    };

    // Load YouTube API script if it doesn't exist
    if (!(window as any).YT) {
      // Check if script is already added
      const existingScript = document.getElementById('youtube-iframe-api-script');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      // Callback from YouTube script
      const previousCallback = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      // Cleanup is handled by cueing and referencing, we keep the player active
      // to avoid frame recreation glitches in single page apps
    };
  }, [elementId]);

  const play = () => {
    if (playerRef.current && isReady) {
      try {
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch (err) {
        console.error('Play error:', err);
      }
    }
  };

  const pause = () => {
    if (playerRef.current && isReady) {
      try {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } catch (err) {
        console.error('Pause error:', err);
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return {
    isPlaying,
    isReady,
    error,
    play,
    pause,
    togglePlay,
  };
};
