import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cardStorage } from '../services/cardStorage';
import { THEME_CONFIGS, THEME_IDS } from '../themes/themeConfigs';
import { Envelope } from '../components/recipient/Envelope';
import { RecipientStory } from '../components/recipient/RecipientStory';
import { useYouTubePlayer } from '../hooks/useYouTubePlayer';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { FloatingMusicPlayer } from '../components/shared/FloatingMusicPlayer';
import { Heart, Home } from 'lucide-react';

export const RecipientView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const [card, setCard] = useState(cardStorage.getById(id || ''));

  // If card is not found, fallback to first demo to prevent crashing
  useEffect(() => {
    if (id) {
      const found = cardStorage.getById(id);
      if (found) {
        setCard(found);
      }
    }
  }, [id]);

  // Smooth scroll - only enabled once envelope is opened
  const { start, stop } = useSmoothScroll(isOpen);

  // YouTube player hook - mounts onto div with id "yt-bg-player"
  const { isPlaying, isReady, togglePlay, play } = useYouTubePlayer(
    'yt-bg-player',
    card?.musicUrl
  );

  // Stop scroll on initial load (when envelope is closed)
  useEffect(() => {
    if (!isOpen) {
      stop();
    } else {
      start();
    }
  }, [isOpen, start, stop]);

  // Autoplay music as soon as envelope is opened and the player is ready
  useEffect(() => {
    if (isOpen && isReady && !isPlaying && card?.musicUrl) {
      play();
    }
  }, [isOpen, isReady, isPlaying, play, card?.musicUrl]);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    if (card?.musicUrl) {
      play();
    }
  };

  if (!card) {
    return (
      <div className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-300">
        <Heart size={48} className="text-rose-500 fill-rose-950/20 mb-4 animate-bounce" />
        <h1 className="text-2xl font-serif text-white font-bold">This proposal card has expired or does not exist</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-sm">
          Please check the URL or create a new card in the creator workspace.
        </p>
        <Link
          to="/"
          className="mt-8 flex items-center gap-1.5 px-4 py-2 bg-slate-900 border border-slate-800 text-sm font-semibold rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Home size={15} />
          Go to Homepage
        </Link>
      </div>
    );
  }

  const themeConfig = THEME_CONFIGS[card.theme] || THEME_CONFIGS[THEME_IDS.CLASSIC];

  return (
    <div className="w-full relative min-h-screen overflow-hidden select-none bg-slate-950">
      {/* Hidden YouTube IFrame container */}
      <div className="absolute opacity-0 pointer-events-none w-0 h-0" overflow-hidden="true">
        <div id="yt-bg-player" />
      </div>

      {!isOpen ? (
        <Envelope
          senderName={card.senderName}
          recipientName={card.recipientName}
          themeConfig={themeConfig}
          onOpen={handleOpenEnvelope}
        />
      ) : (
        <div className="w-full min-h-screen animate-fade-in duration-1000">
          <RecipientStory card={card} themeConfig={themeConfig} isPreview={false} />
          
          <FloatingMusicPlayer
            isPlaying={isPlaying}
            isReady={isReady}
            onToggle={togglePlay}
            hasMusic={!!card.musicUrl}
            themeId={card.theme}
          />
        </div>
      )}
    </div>
  );
};
