import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Heart, Camera, Trash2, 
  Music, Copy, Check, Sparkles, Plus,
  Share2, Eye
} from 'lucide-react';
import type { ProposalCard } from '../../types';
import { THEME_CONFIGS, THEME_IDS } from '../../themes/themeConfigs';
import { cardStorage, compressImage } from '../../services/cardStorage';
import { LivePreview } from './LivePreview';

interface CardBuilderProps {
  initialCardId?: string | null;
  onClose: () => void;
  onGenerate: (cardId: string) => void;
}

const STEPS = [
  { id: 'theme', title: 'Choose World', desc: 'Select a visual environment' },
  { id: 'characters', title: 'Sender & Recipient', desc: 'Add names for the card' },
  { id: 'intro', title: 'Introduction', desc: 'Write a personal opening note' },
  { id: 'memories', title: 'Shared Memories', desc: 'Add stories and optional photos' },
  { id: 'proposal', title: 'The Question', desc: 'Define your proposal screen' },
  { id: 'music', title: 'Soundtrack', desc: 'Add background music' },
];

export const CardBuilder: React.FC<CardBuilderProps> = ({
  initialCardId,
  onClose,
  onGenerate,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [copied, setCopied] = useState(false);
  const [generatedCardId, setGeneratedCardId] = useState<string | null>(null);

  // Form State
  const [theme, setTheme] = useState<string>(THEME_IDS.CLASSIC);
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [introTitle, setIntroTitle] = useState('');
  const [introText, setIntroText] = useState('');
  const [memories, setMemories] = useState<ProposalCard['memories']>([]);
  const [proposalQuestion, setProposalQuestion] = useState('');
  const [yesText, setYesText] = useState('');
  const [noText, setNoText] = useState('');
  const [musicUrl, setMusicUrl] = useState('');

  // Mobile layout preview overlay toggle
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);

  // Load existing card if provided
  useEffect(() => {
    if (initialCardId) {
      const card = cardStorage.getById(initialCardId);
      if (card) {
        setTheme(card.theme);
        setSenderName(card.senderName);
        setRecipientName(card.recipientName);
        setIntroTitle(card.introTitle);
        setIntroText(card.introText);
        setMemories(card.memories || []);
        setProposalQuestion(card.proposalQuestion);
        setYesText(card.yesText);
        setNoText(card.noText);
        setMusicUrl(card.musicUrl || '');
      }
    } else {
      // Default empty templates
      setMemories([
        { id: 'm-1', title: 'Our First Adventure', text: 'Where we spent hours talking and realized this was something special.' },
      ]);
    }
  }, [initialCardId]);

  // Construct current proposal card object for Live Preview
  const currentCardState: ProposalCard = {
    id: initialCardId || 'preview-id',
    theme,
    senderName,
    recipientName,
    introTitle,
    introText,
    memories,
    proposalQuestion,
    yesText,
    noText,
    musicUrl,
    createdAt: new Date().toISOString(),
  };

  const currentThemeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS[THEME_IDS.CLASSIC];

  // Steps Navigation
  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setDirection(1);
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleSaveAndGenerate();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setDirection(-1);
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Image Upload handler
  const handlePhotoUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (uploadEvent) => {
      const base64 = uploadEvent.target?.result as string;
      try {
        // Compress to keep local storage happy
        const compressed = await compressImage(base64, 600, 600, 0.6);
        const updatedMemories = [...memories];
        updatedMemories[index] = {
          ...updatedMemories[index],
          photoUrl: compressed,
        };
        setMemories(updatedMemories);
      } catch (err) {
        console.error('Failed to compress uploaded photo:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (index: number) => {
    const updatedMemories = [...memories];
    delete updatedMemories[index].photoUrl;
    setMemories(updatedMemories);
  };

  // Memory Array manipulation
  const addMemory = () => {
    if (memories.length >= 3) return; // Cap at 3 memories for storytelling pacing
    setMemories([
      ...memories,
      {
        id: `m-${Date.now()}`,
        title: '',
        text: '',
      },
    ]);
  };

  const updateMemory = (index: number, key: keyof ProposalCard['memories'][number], value: string) => {
    const updatedMemories = [...memories];
    updatedMemories[index] = {
      ...updatedMemories[index],
      [key]: value,
    };
    setMemories(updatedMemories);
  };

  const deleteMemory = (index: number) => {
    setMemories(memories.filter((_, i) => i !== index));
  };

  const handleSaveAndGenerate = () => {
    const finalCard = {
      theme,
      senderName: senderName.trim() || 'Your partner',
      recipientName: recipientName.trim() || 'My Love',
      introTitle: introTitle.trim() || 'To my dearest one',
      introText: introText.trim() || 'A short letter of the memories we share...',
      memories: memories.filter(m => m.title.trim() !== ''),
      proposalQuestion: proposalQuestion.trim() || 'Will you go on this lifetime adventure with me?',
      yesText: yesText.trim() || 'Yes, I do!',
      noText: noText.trim() || 'No...',
      musicUrl: musicUrl.trim() || undefined,
    };

    let savedCard: ProposalCard;
    if (initialCardId) {
      savedCard = {
        ...finalCard,
        id: initialCardId,
        createdAt: new Date().toISOString(),
      };
      cardStorage.save(savedCard);
    } else {
      savedCard = cardStorage.create(finalCard);
    }

    setGeneratedCardId(savedCard.id);
    onGenerate(savedCard.id);
  };

  const shareLink = `${window.location.origin}/#/to/${generatedCardId || 'demo'}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Animation Variant for steps
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: 'easeOut' as any },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' as any },
    }),
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#0c0d12] text-slate-100 font-sans">
      {/* LEFT COLUMN: Step customized form */}
      <div className="w-full lg:w-1/2 flex flex-col h-screen overflow-y-auto border-r border-slate-800">
        {/* Form header */}
        <header className="px-6 py-4 border-b border-slate-800 flex justify-between items-center select-none bg-slate-900/50 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-rose-500 fill-rose-500" />
            <h1 className="text-lg font-bold tracking-tight text-white font-serif">yoursturly cardbuilder</h1>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-md hover:bg-slate-800 font-medium"
          >
            Exit Builder
          </button>
        </header>

        {/* Step progress bar */}
        {!generatedCardId && (
          <div className="w-full bg-slate-800 h-1">
            <div
              className="bg-rose-500 h-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        )}

        {/* Step display container */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between max-w-xl mx-auto w-full">
          <AnimatePresence mode="wait" custom={direction}>
            {!generatedCardId ? (
              <motion.div
                key={currentStepIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex-1 flex flex-col justify-center min-h-[350px]"
              >
                {/* Step Subtitle */}
                <div className="mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-rose-400 font-bold font-mono">
                    Step 0{currentStepIndex + 1} of 0{STEPS.length}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif text-white font-bold mt-1">
                    {STEPS[currentStepIndex].title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {STEPS[currentStepIndex].desc}
                  </p>
                </div>

                {/* STEP CONTENT SWITCHBOARD */}
                <div className="mb-8 flex-1">
                  {/* Step 1: Choose World */}
                  {STEPS[currentStepIndex].id === 'theme' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                      {Object.values(THEME_CONFIGS).map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTheme(t.id)}
                          className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 relative ${
                            theme === t.id
                              ? 'border-rose-500 bg-rose-950/20 text-white shadow-lg'
                              : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/80 text-slate-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-serif font-bold text-sm">{t.name}</span>
                              {theme === t.id && <Sparkles size={12} className="text-rose-400 animate-pulse" />}
                            </div>
                            <p className="text-[10px] text-slate-400 leading-normal mt-1.5">
                              {t.description}
                            </p>
                          </div>
                          <div className="flex gap-1 mt-4">
                            <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: t.primaryColor }} />
                            <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: t.secondaryColor }} />
                            <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: t.accentColor }} />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Step 2: Characters */}
                  {STEPS[currentStepIndex].id === 'characters' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                          Who is writing this letter?
                        </label>
                        <input
                          type="text"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="Your name (e.g. Julian)"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:border-rose-500 focus:outline-none text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                          Who is it for?
                        </label>
                        <input
                          type="text"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          placeholder="Your partner's name (e.g. Evelyn)"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:border-rose-500 focus:outline-none text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Narrative */}
                  {STEPS[currentStepIndex].id === 'intro' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                          Letter Opening Title
                        </label>
                        <input
                          type="text"
                          value={introTitle}
                          onChange={(e) => setIntroTitle(e.target.value)}
                          placeholder="E.g., To My Favorite Person"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:border-rose-500 focus:outline-none text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                          Personal Intro Message
                        </label>
                        <textarea
                          rows={4}
                          value={introText}
                          onChange={(e) => setIntroText(e.target.value)}
                          placeholder="Express how much they mean to you, setting the mood for the story..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:border-rose-500 focus:outline-none text-white resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Memories */}
                  {STEPS[currentStepIndex].id === 'memories' && (
                    <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                      {memories.map((m, idx) => (
                        <div key={m.id} className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 space-y-3 relative">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400 font-semibold font-mono">MEMORY 0{idx + 1}</span>
                            {memories.length > 1 && (
                              <button
                                type="button"
                                onClick={() => deleteMemory(idx)}
                                className="text-slate-500 hover:text-red-400 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                          
                          <input
                            type="text"
                            value={m.title}
                            onChange={(e) => updateMemory(idx, 'title', e.target.value)}
                            placeholder="Memory Heading (e.g. Picnic in Paris)"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:border-rose-500 focus:outline-none text-white"
                          />

                          <textarea
                            rows={2}
                            value={m.text}
                            onChange={(e) => updateMemory(idx, 'text', e.target.value)}
                            placeholder="What made this moment special?"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:border-rose-500 focus:outline-none text-white resize-none"
                          />

                          {/* Image Attachment */}
                          <div className="flex items-center gap-3">
                            {m.photoUrl ? (
                              <div className="relative w-16 h-16 rounded-md overflow-hidden border border-slate-700">
                                <img src={m.photoUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => removePhoto(idx)}
                                  className="absolute inset-0 bg-black/60 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ) : (
                              <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-slate-700 hover:border-slate-500 cursor-pointer text-[10px] text-slate-400 transition-colors font-medium">
                                <Camera size={12} />
                                Attach Photo
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handlePhotoUpload(idx, e)}
                                  className="hidden"
                                />
                              </label>
                            )}
                            <span className="text-[9px] text-slate-500 italic">Compressed automatically</span>
                          </div>
                        </div>
                      ))}

                      {memories.length < 3 && (
                        <button
                          type="button"
                          onClick={addMemory}
                          className="w-full py-2.5 rounded-xl border border-dashed border-slate-800 hover:border-slate-600 hover:bg-slate-900/30 flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white transition-all font-medium"
                        >
                          <Plus size={14} />
                          Add Another Memory ({memories.length}/3)
                        </button>
                      )}
                    </div>
                  )}

                  {/* Step 5: The Proposal */}
                  {STEPS[currentStepIndex].id === 'proposal' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                          Proposal Question
                        </label>
                        <input
                          type="text"
                          value={proposalQuestion}
                          onChange={(e) => setProposalQuestion(e.target.value)}
                          placeholder="Will you marry me? / Will you be my partner?"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:border-rose-500 focus:outline-none text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                            "Yes" Button Text
                          </label>
                          <input
                            type="text"
                            value={yesText}
                            onChange={(e) => setYesText(e.target.value)}
                            placeholder="Yes, a thousand times!"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:border-rose-500 focus:outline-none text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                            "No" Button Text
                          </label>
                          <input
                            type="text"
                            value={noText}
                            onChange={(e) => setNoText(e.target.value)}
                            placeholder="No..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:border-rose-500 focus:outline-none text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 6: Soundtrack */}
                  {STEPS[currentStepIndex].id === 'music' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                          YouTube Song URL
                        </label>
                        <div className="flex gap-2 relative">
                          <span className="absolute left-3 top-3.5 text-slate-500">
                            <Music size={16} />
                          </span>
                          <input
                            type="text"
                            value={musicUrl}
                            onChange={(e) => setMusicUrl(e.target.value)}
                            placeholder="E.g., https://www.youtube.com/watch?v=2Vv-BfVoq4g"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm focus:border-rose-500 focus:outline-none text-white"
                          />
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                          Paste any YouTube video or instrumental link. When the recipient opens the card, this music will cue up and start playing softly.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between border-t border-slate-800 pt-6 mt-auto">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStepIndex === 0}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium ${
                      currentStepIndex === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  {/* Mobile Preview toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowPreviewMobile(true)}
                    className="flex lg:hidden items-center gap-1 text-slate-400 hover:text-white text-sm bg-slate-800 px-3 py-1.5 rounded-lg font-medium"
                  >
                    <Eye size={14} />
                    Preview
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1 px-5 py-2.5 rounded-lg text-sm font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/20"
                  >
                    {currentStepIndex === STEPS.length - 1 ? 'Generate Card' : 'Next'}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Success / Card Generation Screen */
              <motion.div
                key="generated"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 flex flex-col items-center justify-center h-full"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-950/50 border border-emerald-500 flex items-center justify-center mb-6 text-emerald-400 shadow-lg">
                  <Check size={32} className="animate-pulse" />
                </div>

                <h2 className="text-2xl md:text-3xl font-serif text-white font-bold mb-3">
                  Your romantic world is ready!
                </h2>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
                  The digital envelope has been sealed. Copy the link below and send it to {recipientName || 'your partner'} when you are ready to propose.
                </p>

                {/* Link container */}
                <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between mb-8">
                  <span className="text-xs text-rose-400 font-mono overflow-x-auto whitespace-nowrap scrollbar-none pr-3 select-all">
                    {shareLink}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      copied ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check size={13} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <a
                    href={`#/to/${generatedCardId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-6 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-lg"
                  >
                    <Share2 size={16} />
                    Open Card View
                  </a>
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center"
                  >
                    Done, Go to Dashboard
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT COLUMN: Desktop Live Preview */}
      <div className="hidden lg:block lg:w-1/2 h-screen">
        <LivePreview card={currentCardState} themeConfig={currentThemeConfig} />
      </div>

      {/* Mobile Preview Modal overlay */}
      <AnimatePresence>
        {showPreviewMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-end lg:hidden"
          >
            <div className="w-full flex justify-between items-center p-4 bg-slate-900 border-b border-slate-800 text-white">
              <span className="text-sm font-semibold font-serif">Live Card Preview</span>
              <button
                type="button"
                onClick={() => setShowPreviewMobile(false)}
                className="text-xs bg-slate-800 px-3 py-1.5 rounded-lg text-slate-300 font-semibold"
              >
                Close Preview
              </button>
            </div>
            <div className="flex-1 w-full bg-slate-950 overflow-hidden">
              <LivePreview card={currentCardState} themeConfig={currentThemeConfig} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
