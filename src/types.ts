export interface Memory {
  id: string;
  title: string;
  text: string;
  photoUrl?: string; // Base64 encoded string or empty
}

export interface ProposalCard {
  id: string;
  theme: string; // 'classic' | 'bollywood' | 'midnight' | 'soft' | 'story' | 'cafe' | 'monsoon'
  senderName: string;
  recipientName: string;
  introTitle: string;
  introText: string;
  memories: Memory[];
  proposalQuestion: string;
  yesText: string;
  noText: string;
  musicUrl?: string; // YouTube URL
  createdAt: string;
  acceptedDate?: string; // Picked date/day by recipient
  acceptedNote?: string; // Picked note by recipient
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  className: string; // Base class for container
  primaryColor: string; // Tailwind color name or hex
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontHeading: string; // CSS font class or inline styles
  fontBody: string; // CSS font class
  
  // Custom theme-specific classes
  decorations: {
    envelopeBg: string;
    envelopePatternBg?: string;
    heartColor: string;
    cardBgClass: string;
    proposalBgClass: string;
    pageTextClass: string;
    headingTextClass: string;
    accentTextClass: string;
    buttonClass: string;
  };
}
