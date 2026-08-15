import React, { useState, useEffect } from 'react';
import { cardStorage } from '../services/cardStorage';
import type { ProposalCard } from '../types';
import { THEME_CONFIGS } from '../themes/themeConfigs';
import { CardBuilder } from '../components/creator/CardBuilder';
import { 
  Plus, Eye, Link as LinkIcon, Trash2, Heart, 
  ExternalLink, Sparkles, Calendar, BookOpen, Check
} from 'lucide-react';
import { formatDateTime } from '../components/recipient/ProposalScene';

interface CreatorDashboardProps {
  onBackToHome: () => void;
}

export const CreatorDashboard: React.FC<CreatorDashboardProps> = ({ onBackToHome }) => {
  const [cards, setCards] = useState<ProposalCard[]>([]);
  const [activeBuilderId, setActiveBuilderId] = useState<string | null>(null);
  const [showBuilder, setShowBuilder] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setCards(cardStorage.getAll());
  }, [showBuilder]); // Refresh list when builder closes

  const handleCreateNew = () => {
    setActiveBuilderId(null);
    setShowBuilder(true);
  };

  const handleEdit = (id: string) => {
    setActiveBuilderId(id);
    setShowBuilder(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this proposal card?')) {
      cardStorage.delete(id);
      setCards(cardStorage.getAll());
    }
  };

  const copyShareLink = (id: string) => {
    const link = `${window.location.origin}/#/to/${id}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (showBuilder) {
    return (
      <CardBuilder
        initialCardId={activeBuilderId}
        onClose={() => setShowBuilder(false)}
        onGenerate={(_id) => {
          setCards(cardStorage.getAll());
        }}
      />
    );
  }

  // Separate demo cards and user customized cards
  const userCards = cards.filter(c => !['classic-demo', 'midnight-demo', 'bollywood-demo', 'soft-demo'].includes(c.id));
  const demoCards = cards.filter(c => ['classic-demo', 'midnight-demo', 'bollywood-demo', 'soft-demo'].includes(c.id));

  return (
    <div className="w-full min-h-screen bg-[#07080b] text-slate-100 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3 select-none">
            <div className="w-10 h-10 rounded-full bg-rose-950/40 border border-rose-900/30 flex items-center justify-center text-rose-500">
              <Heart size={20} className="fill-rose-500" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-serif text-white font-bold">yoursturly dashboard</h1>
              <p className="text-xs text-slate-400">Craft beautifully illustrated 2D proposal letters</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-900 transition-colors font-medium"
            >
              Back to Home
            </button>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-semibold transition-all shadow-lg shadow-rose-950/20"
            >
              <Plus size={16} />
              Create Card
            </button>
          </div>
        </header>

        {/* Section 1: User Cards */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-rose-400 font-mono">My Romantic Cards</h2>
          {userCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCards.map((card) => {
                const themeConfig = THEME_CONFIGS[card.theme];
                return (
                  <div
                    key={card.id}
                    className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          {themeConfig?.name || card.theme}
                        </span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(card.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-serif text-white mt-3">To {card.recipientName}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 italic mb-2">
                        "{card.introTitle || card.introText}"
                      </p>
                      
                      {card.acceptedDate && (
                        <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/25 rounded-lg text-emerald-400 flex flex-col gap-1 text-left">
                          <span className="text-[10px] font-bold uppercase tracking-wider font-mono flex items-center gap-1 text-emerald-400">
                            <Sparkles size={11} className="animate-pulse" />
                            Accepted! ❤️
                          </span>
                          <span className="text-xs font-semibold text-white">
                            Date: {formatDateTime(card.acceptedDate)}
                          </span>
                          {card.acceptedNote && (
                            <span className="text-[10px] text-slate-400 italic">
                              "{card.acceptedNote}"
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-850">
                      <button
                        onClick={() => handleEdit(card.id)}
                        className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => copyShareLink(card.id)}
                        className="p-1.5 bg-slate-850 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-rose-400 transition-all"
                        title="Copy Share Link"
                      >
                        {copiedId === card.id ? <Check size={14} className="text-emerald-400" /> : <LinkIcon size={14} />}
                      </button>
                      <a
                        href={`#/to/${card.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 bg-slate-850 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-all flex items-center justify-center"
                        title="Open in new tab"
                      >
                        <ExternalLink size={14} />
                      </a>
                      <button
                        onClick={() => handleDelete(card.id)}
                        className="p-1.5 bg-slate-850 hover:bg-red-950/40 rounded-lg text-slate-500 hover:text-red-400 transition-all"
                        title="Delete Card"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center">
              <BookOpen size={32} className="text-slate-600 mb-3" />
              <p className="text-sm text-slate-400">You haven't created any cards yet.</p>
              <button
                onClick={handleCreateNew}
                className="text-xs text-rose-400 hover:underline mt-1 font-semibold"
              >
                Create your first card now &rarr;
              </button>
            </div>
          )}
        </section>

        {/* Section 2: Demo Presets */}
        <section className="flex flex-col gap-4 border-t border-slate-850 pt-10">
          <div className="flex items-center gap-1.5">
            <Sparkles size={16} className="text-amber-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-400 font-mono">Sample World Presets</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoCards.map((card) => {
              const themeConfig = THEME_CONFIGS[card.theme];
              return (
                <div
                  key={card.id}
                  className="bg-slate-900/25 border border-slate-850 rounded-xl p-5 hover:border-slate-800 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 bg-slate-900 px-2 py-0.5 rounded">
                      {themeConfig?.name || card.theme}
                    </span>
                    <h3 className="text-base font-bold font-serif text-white mt-3">{card.recipientName} Proposal</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                      Check out the '{themeConfig?.name}' theme layout.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-6">
                    <a
                      href={`#/to/${card.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-1.5 bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <Eye size={12} />
                      Preview
                    </a>
                    <button
                      onClick={() => copyShareLink(card.id)}
                      className="p-1.5 bg-slate-900 hover:bg-slate-850 rounded-lg text-slate-400 hover:text-amber-400 transition-all"
                    >
                      {copiedId === card.id ? <Check size={12} className="text-emerald-400" /> : <LinkIcon size={12} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};
