import type { Song } from "@/src/assets/songs/songs.types";
import { usePlayer } from "@/src/context/Player.context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function SongCard({ song }: { song: Song }) {
  const { play, pause, currentSong, isPlaying } = usePlayer();
  const thisIsActive = currentSong?.file === song.file;
  const thisIsPlaying = thisIsActive && isPlaying;

  const router = useRouter();

  const handlePlayer = () => {
    if (thisIsActive && thisIsPlaying) {
      pause();
      return;
    }

    play(song);
  };

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        router.push("/player");
        if (!thisIsActive) play(song);
      }}
    >
      <Image style={styles.cover} source={song.cover} resizeMode="contain" />
      <View style={styles.cardTitleContainer}>
        <Text style={styles.cardTitle}>{song.title}</Text>
        <Text style={styles.cardText}>{song.artist.join(", ")}</Text>
      </View>
      <View
        style={{
          marginRight: 15,
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Pressable
          style={{ padding: 10 }}
          onPress={(e) => {
            e.stopPropagation();
            handlePlayer();
          }}
        >
          <FontAwesome6
            name={thisIsPlaying ? "pause" : "play"}
            size={24}
            color="#ff2d88"
          />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#242424",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitleContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardText: {
    color: "#aaa",
  },
  cover: {
    aspectRatio: 1,
    width: 70,
    height: "auto",
    marginRight: 16,
    borderRadius: 8,
  },
});
