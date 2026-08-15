import type { ProposalCard } from '../types';

const STORAGE_KEY = 'yourstruly_cards';

// Helper to compress base64 images using HTML Canvas
export const compressImage = (base64Str: string, maxWidth = 800, maxHeight = 800, quality = 0.6): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(base64Str); // Fallback to uncompressed if canvas context fails
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const compressed = canvas.toDataURL('image/jpeg', quality);
      resolve(compressed);
    };
    img.onerror = (err) => {
      reject(err);
    };
  });
};

const getDemoCards = (): ProposalCard[] => [
  {
    id: 'classic-demo',
    theme: 'classic',
    senderName: 'Julian',
    recipientName: 'Evelyn',
    introTitle: 'To My Dearest Evelyn',
    introText: 'Some love stories are written on the wind, but ours is written in the permanent ink of shared years, quiet mornings, and a thousand tiny acts of grace.',
    createdAt: new Date().toISOString(),
    proposalQuestion: 'Evelyn, will you give me the honor of writing the rest of our lives together?',
    yesText: 'Yes, forever and always',
    noText: 'No, let us wait a little longer',
    musicUrl: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g', // Perfect Ed Sheeran / Romantic song
    memories: [
      {
        id: 'c1',
        title: 'The Letter in the Book',
        text: 'Do you remember when I left that pressed rose in your favorite book? We spent the whole evening arguing about poetry in that tiny dusty bookstore.',
      },
      {
        id: 'c2',
        title: 'Walks along the Seine',
        text: 'The drizzle was soft, and we only had one broken umbrella. We got soaked, but we laughed until our ribs ached under the yellow streetlamps.',
      }
    ]
  },
  {
    id: 'midnight-demo',
    theme: 'midnight',
    senderName: 'Kabir',
    recipientName: 'Tara',
    introTitle: 'To My Starlight',
    introText: 'Before I met you, the night sky was just a vast, beautiful emptiness. Now, when I look up, every constellation tells a story of you.',
    createdAt: new Date().toISOString(),
    proposalQuestion: 'Tara, will you navigate the rest of this universe with me by your side?',
    yesText: 'Yes, to the stars and back!',
    noText: 'No, I prefer the dark',
    musicUrl: 'https://www.youtube.com/watch?v=0yW7w8F2TVA', // Cinematic space instrumental
    memories: [
      {
        id: 'm1',
        title: 'The Roof in August',
        text: 'We sat on the hood of the car, waiting for the Perseid meteor shower. We missed all the shooting stars because we couldn\'t take our eyes off each other.',
      },
      {
        id: 'm2',
        title: 'Midnight Whispers',
        text: 'Sitting on the kitchen floor at 2 AM, eating cold pizza and talking about whether parallel dimensions exist. In every single one, I\'d choose you.',
      }
    ]
  },
  {
    id: 'bollywood-demo',
    theme: 'bollywood',
    senderName: 'Raj',
    recipientName: 'Simran',
    introTitle: 'Ek Ladki Bheegi Bhaagi Si',
    introText: 'They say life isn\'t a movie, Simran. But with the way my heart beats every time you walk into the room, I am convinced we are living in our own blockbuster romance.',
    createdAt: new Date().toISOString(),
    proposalQuestion: 'Simran, will you be my heroine, my partner, my lifetime companion?',
    yesText: 'Yes, a thousand times!',
    noText: 'Nahi, Ja Simran Ja!',
    musicUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', // Desi romantic melody
    memories: [
      {
        id: 'b1',
        title: 'The Train Station Rush',
        text: 'Running on platform 3, carrying three suitcases, only to find that the train was delayed by two hours. We ended up sharing hot chai and singing old tunes.',
      },
      {
        id: 'b2',
        title: 'Dancing in the Monsoon',
        text: 'Without any music, we danced on the terrace under the pouring rain. Your laughter drowned out the thunder, and that was the moment I fell in love.',
      }
    ]
  },
  {
    id: 'soft-demo',
    theme: 'soft',
    senderName: 'Liam',
    recipientName: 'Chloe',
    introTitle: 'My Sunshine',
    introText: 'You are like a warm cup of hot cocoa on a cold winter day. You bring so much color, warmth, and soft joy into my little world.',
    createdAt: new Date().toISOString(),
    proposalQuestion: 'Chloe, will you hold my hand and walk through all of life\'s gardens with me?',
    yesText: 'Yes, please! 🌸',
    noText: 'No, thank you... 🙊',
    musicUrl: 'https://www.youtube.com/watch?v=gO7sNn-gE38', // Cute indie acoustic
    memories: [
      {
        id: 's1',
        title: 'Picnic in the Meadow',
        text: 'We packed squished peanut butter sandwiches and spent three hours chasing a butterfly, only to end up taking a nap in the sweet clover.',
      },
      {
        id: 's2',
        title: 'Baking Disasters',
        text: 'Our attempt at making chocolate chip cookies resulted in a single giant, rock-hard biscuit. We still tried to eat it, dipped in milk, while giggling.',
      }
    ]
  }
];

export const cardStorage = {
  getAll(): ProposalCard[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      const demos = getDemoCards();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demos));
      return demos;
    }
    try {
      return JSON.parse(data);
    } catch {
      return getDemoCards();
    }
  },

  getById(id: string): ProposalCard | null {
    const cards = this.getAll();
    return cards.find((card) => card.id === id) || null;
  },

  save(card: ProposalCard): void {
    const cards = this.getAll();
    const index = cards.findIndex((c) => c.id === card.id);
    if (index >= 0) {
      cards[index] = card;
    } else {
      cards.push(card);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  },

  create(cardData: Omit<ProposalCard, 'id' | 'createdAt'>): ProposalCard {
    const id = Math.random().toString(36).substring(2, 11);
    const newCard: ProposalCard = {
      ...cardData,
      id,
      createdAt: new Date().toISOString(),
    };
    this.save(newCard);
    return newCard;
  },

  delete(id: string): void {
    const cards = this.getAll();
    const filtered = cards.filter((card) => card.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
