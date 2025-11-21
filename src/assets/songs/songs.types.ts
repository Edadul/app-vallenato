export type Category = "Todos" | "Merengue" | "Paseo" | "Puya" | "Son";

export interface Song {
  id: string;
  title: string;
  artist: string[];
  category: Category;
  album: string;
  duration: number;
  file: any;
  cover?: any;
}
