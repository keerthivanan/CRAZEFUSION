export const categories = [
  "All",
  "Aesthetic",
  "Anime",
  "Art",
  "Astronomy",
  "Bar & Pub",
  "Botanical",
  "Cars",
  "Coffee Shop",
  "Cute",
  "Cyberpunk",
  "Football",
  "Gaming",
  "Indie",
  "K-Pop",
  "Movies",
  "Music",
  "Motivational",
  "Polaroids",
  "Sneakers",
  "Split Poster",
  "Trippy",
  "TV Shows",
  "Vintage",
  "Travel",
  "Zodiac",
];

export interface Product {
  id: string;
  name: string;
  category: string;
  sub: string;
  price: number;
  badge: string | null;
  img: string;
  img2: string;
}

export const products: Product[] = [];
