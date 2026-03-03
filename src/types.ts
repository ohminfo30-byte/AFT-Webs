export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  role: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  authorId: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

export interface UserProfile {
  name: string;
  bio: string;
  avatar: string | null;
}

export interface Comment {
  id: string;
  postId: string;
  userName: string;
  userAvatar: string | null;
  content: string;
  date: string;
}

export type Category = 'Philosophy' | 'Culture' | 'Science' | 'Politics' | 'All';
