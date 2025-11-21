import cover2 from "../assets/covers/16-TITULO-DE-AMOR-JSC-3577.jpg";
import cover1 from "../assets/covers/4-DOS-GRANDES-JSC-3544.jpg";
import song1 from "../assets/songs/A-Mi-Papá-Diomedes-Díaz-Colacho-Mendoza.mp3";
import song2 from "../assets/songs/Amarte-Más-No-Pude-Diomedes-Díaz-Juancho-Rois.mp3";
import type { Category, Song } from "../assets/songs/songs.types";

export const CATEGORIES: Category[] = [
  "Todos",
  "Merengue",
  "Paseo",
  "Puya",
  "Son",
];

export const SONGS: Song[] = [
  {
    id: "1",
    title: "A mi papá",
    artist: ["Diomedez Díaz", "Colacho Mendoza"],
    category: "Merengue",
    album: "Homenaje a mi papá",
    duration: 215,
    file: song1,
    cover: cover1,
  },
  {
    id: "2",
    title: "Amarte más no pude",
    artist: ["Diomedes Díaz", "Juancho Rois"],
    category: "Paseo",
    album: "Clásicos de la Provincia",
    duration: 200,
    file: song2,
    cover: cover2,
  },
];
