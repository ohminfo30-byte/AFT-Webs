import { Author, Post } from './types';

export const AUTHORS: Author[] = [
  {
    id: '1',
    name: 'Ahmed Afar',
    role: 'Philosopher & Historian',
    bio: 'Dedicated to preserving the oral traditions of the Afar people while exploring modern existentialism.',
    avatar: 'https://picsum.photos/seed/ahmed/200/200',
  },
  {
    id: '2',
    name: 'Fatuma Hassan',
    role: 'Cultural Critic',
    bio: 'Analyzing the intersection of nomadic heritage and digital globalization.',
    avatar: 'https://picsum.photos/seed/fatuma/200/200',
  },
  {
    id: '3',
    name: 'Idris Omar',
    role: 'Political Analyst',
    bio: 'Focusing on regional stability and the future of the Horn of Africa.',
    avatar: 'https://picsum.photos/seed/idris/200/200',
  },
];

export const POSTS: Post[] = [
  {
    id: '1',
    title: 'The Nomadic Mind in a Digital Age',
    excerpt: 'How the traditional Afar lifestyle provides unique perspectives on the concept of "digital nomadism" and global connectivity.',
    content: `The Afar people have been nomads for centuries, traversing the harsh landscapes of the Danakil Depression. Today, as the world becomes increasingly digital, the concept of "nomadism" is being redefined. 

But what can the ancient wisdom of the Afar teach the modern digital worker? It's about resilience, minimalist living, and a deep connection to the environment—even when that environment is a virtual one.

Free thinking in the Afar region is not just about breaking from tradition; it's about synthesizing the best of our heritage with the possibilities of the future.`,
    authorId: '1',
    date: 'March 1, 2026',
    category: 'Philosophy',
    image: 'https://picsum.photos/seed/desert/1200/600',
    readTime: '6 min read',
  },
  {
    id: '2',
    title: 'Preserving the Qasdak: A Call for Digital Archiving',
    excerpt: 'The importance of documenting Afar oral poetry and legal traditions before they are lost to time.',
    content: `The Qasdak is more than just poetry; it is the legal and moral backbone of Afar society. For generations, these verses have been passed down orally. 

However, as urbanization increases, the chain of transmission is weakening. We must leverage modern technology to archive these voices. This isn't just preservation; it's an act of intellectual sovereignty.`,
    authorId: '2',
    date: 'February 25, 2026',
    category: 'Culture',
    image: 'https://picsum.photos/seed/culture/1200/600',
    readTime: '8 min read',
  },
  {
    id: '3',
    title: 'The Geopolitics of the Red Sea Coast',
    excerpt: 'An analysis of how the Afar region sits at the heart of global trade routes and what it means for local autonomy.',
    content: `The Red Sea is one of the most important maritime corridors in the world. The Afar people, living along its shores, have a unique stake in its management. 

Recent developments in port infrastructure and regional alliances are shifting the balance of power. We must ensure that the voices of the local communities are heard in these high-level discussions.`,
    authorId: '3',
    date: 'February 20, 2026',
    category: 'Politics',
    image: 'https://picsum.photos/seed/sea/1200/600',
    readTime: '12 min read',
  },
];
