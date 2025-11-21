import { getUri } from "@/src/utils/getUri";
import { useAudioPlayer } from "expo-audio";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Song } from "../assets/songs/songs.types";

interface IPlayerContext {
  player: ReturnType<typeof useAudioPlayer>;
  play: (file: any) => void;
  pause: () => void;
  seekTo: (value: number) => void;
  isPlaying: boolean;
  currentSong: Song | null;
  currentTime: number;
}

const PlayerContext = createContext<IPlayerContext | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const player = useAudioPlayer();
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);

  // este useEffect se usa para actualizar la posición actual de la canción
  // (tiempo transcurrido) cada 250ms
  useEffect(() => {
    if (!isPlaying) return;

    const tick = setInterval(() => {
      const t = player.currentTime ?? 0;
      setPosition(t);

      if (player.duration && t >= player.duration) {
        setIsPlaying(false);
      }
    }, 250);

    return () => clearInterval(tick);
  }, [isPlaying, player]);

  async function play(songData: Song) {
    try {
      if (currentSong?.file === songData.file) {
        player.play();
        setIsPlaying(true);
        return;
      }

      const source = await getUri(songData.file);
      player.replace(source);
      setCurrentSong(songData);
      player.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("[Playsong] Error playing song:", err);
    }
  }

  function pause() {
    try {
      player.pause();
      setIsPlaying(false);
    } catch (err) {
      console.error("[Pausesong] Error pausing song:", err);
    }
  }

  async function seekTo(value: number) {
    try {
      await player.seekTo(value);
      setPosition(value);
    } catch (err) {
      console.error("[SeekTo] Error seeking song:", err);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        player,
        play,
        pause,
        seekTo,
        isPlaying,
        currentSong,
        currentTime: position,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
