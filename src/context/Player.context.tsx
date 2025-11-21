import { getUri } from "@/src/utils/getUri";
import { useAudioPlayer } from "expo-audio";
import { createContext, ReactNode, useContext, useState } from "react";
import { Song } from "../assets/songs/songs.types";

interface IPlayerContext {
  player: ReturnType<typeof useAudioPlayer>;
  play: (file: any) => void;
  pause: () => void;
  isPlaying: boolean;
  currentSong: Song | null;
}

const PlayerContext = createContext<IPlayerContext | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const player = useAudioPlayer();
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function play(songData: Song) {
    try {
      if (currentSong?.file === songData.file) {
        player.play();
        setIsPlaying(true);
        return;
      }

      const source = await getUri(songData.file);
      await player.replace(source);
      setCurrentSong(songData);
      player.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("[Playsong] Error playing song:", err);
    }
  }

  async function pause() {
    try {
      await player.pause();
      setIsPlaying(false);
    } catch (err) {
      console.error("[Pausesong] Error pausing song:", err);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        player,
        play,
        pause,
        isPlaying,
        currentSong,
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
