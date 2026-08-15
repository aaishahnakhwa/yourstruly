import React, { useState } from 'react';
import type { ProposalCard, ThemeConfig } from '../../types';
import { Envelope } from '../recipient/Envelope';
import { RecipientStory } from '../recipient/RecipientStory';
import { Monitor, Smartphone, Volume2, MailOpen, Layers } from 'lucide-react';

interface LivePreviewProps {
  card: ProposalCard;
  themeConfig: ThemeConfig;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ card, themeConfig }) => {
  const [viewMode, setViewMode] = useState<'envelope' | 'story'>('envelope');
  const [deviceFrame, setDeviceFrame] = useState<'mobile' | 'desktop'>('mobile');

  // Hidden player element for soundtrack testing inside preview
  const handleOpenEnvelope = () => {
    setViewMode('story');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 lg:p-6 bg-slate-900 border-l border-slate-800">
      {/* Control bar */}
      <div className="w-full max-w-xl flex items-center justify-between mb-4 text-slate-400 text-xs font-sans">
        <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-lg">
          <button
            type="button"
            onClick={() => setViewMode('envelope')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
              viewMode === 'envelope' ? 'bg-slate-700 text-white font-medium' : 'hover:text-white'
            }`}
          >
            <MailOpen size={14} />
            Envelope View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('story')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
              viewMode === 'story' ? 'bg-slate-700 text-white font-medium' : 'hover:text-white'
            }`}
          >
            <Layers size={14} />
            Story Scroll
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Device Mockup Toggle */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setDeviceFrame('mobile')}
              className={`p-1.5 rounded transition-colors ${
                deviceFrame === 'mobile' ? 'bg-slate-700 text-white' : 'hover:text-white'
              }`}
              title="Mobile Preview"
            >
              <Smartphone size={15} />
            </button>
            <button
              type="button"
              onClick={() => setDeviceFrame('desktop')}
              className={`p-1.5 rounded transition-colors ${
                deviceFrame === 'desktop' ? 'bg-slate-700 text-white' : 'hover:text-white'
              }`}
              title="Desktop Preview"
            >
              <Monitor size={15} />
            </button>
          </div>

          {/* Soundtrack indicator */}
          {card.musicUrl && (
            <div className="flex items-center gap-1 text-rose-400 bg-rose-950/40 border border-rose-900/30 px-2 py-1 rounded-md">
              <Volume2 size={13} className="animate-pulse" />
              <span className="text-[10px] tracking-wide">Soundtrack configured</span>
            </div>
          )}
        </div>
      </div>

      {/* Device frame container */}
      <div
        className={`relative transition-all duration-500 border border-slate-700/60 bg-slate-950 shadow-3xl overflow-hidden ${
          deviceFrame === 'mobile'
            ? 'w-[375px] h-[667px] rounded-[36px] ring-12 ring-slate-800'
            : 'w-full max-w-4xl aspect-[16/10] rounded-xl'
        }`}
      >
        {/* Device screen header indicator */}
        {deviceFrame === 'mobile' && (
          <div className="absolute top-0 inset-x-0 h-6 bg-black z-40 flex justify-center items-center">
            <div className="w-32 h-4 bg-black rounded-b-xl flex justify-center items-end pb-1">
              <div className="w-12 h-1 bg-slate-800 rounded-full" />
            </div>
          </div>
        )}

        {/* Content canvas */}
        <div
          className={`w-full h-full preview-scroller-container overflow-y-auto scroll-smooth ${
            deviceFrame === 'mobile' ? 'pt-6' : ''
          }`}
        >
          {viewMode === 'envelope' ? (
            <Envelope
              senderName={card.senderName}
              recipientName={card.recipientName}
              themeConfig={themeConfig}
              onOpen={handleOpenEnvelope}
            />
          ) : (
            <RecipientStory card={card} themeConfig={themeConfig} isPreview={true} />
          )}
        </div>
      </div>

      {/* Tiny instructions */}
      <p className="text-[10px] text-slate-500 font-sans mt-3 text-center">
        Scroll inside the device view above to preview the story timeline.
      </p>
    </div>
  );
};
