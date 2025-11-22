import type { Song } from "@/src/assets/songs/songs.types";
import { usePlayer } from "@/src/context/Player.context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function SongCard({
  song,
  viewMode,
}: {
  song: Song;
  viewMode?: "list" | "grid";
}) {
  const { play, pause, currentSong, isPlaying } = usePlayer();
  const isCurrentSong = currentSong?.file === song.file;
  const showPlayIcon = isCurrentSong && isPlaying;

  const router = useRouter();

  const handlePlayer = () => {
    if (isCurrentSong && isPlaying) {
      pause();
      return;
    }
    play(song);
  };

  return (
    <Pressable
      style={[
        styles.card,
        viewMode === "list" && styles.cardList,
        viewMode === "grid" && styles.cardGrid,
      ]}
      onPress={() => {
        router.push("/player");
        if (!isCurrentSong) play(song);
      }}
    >
      <Image
        style={[
          styles.cover,
          viewMode === "list" && styles.coverList,
          viewMode === "grid" && styles.coverGrid,
        ]}
        source={song.cover}
        resizeMode="contain"
      />
      <View
        style={[
          styles.cardTitleContainer,
          viewMode === "list" && { justifyContent: "center" },
        ]}
      >
        <Text style={styles.cardTitle}>{song.title}</Text>
        <Text style={styles.cardText}>{song.artist.join(", ")}</Text>
      </View>

      {viewMode === "list" && (
        <Pressable
          style={{
            padding: 10,
            marginRight: 15,
            gap: 20,
          }}
          onPress={(e) => {
            e.stopPropagation();
            handlePlayer();
          }}
        >
          <FontAwesome6
            name={showPlayIcon ? "pause" : "play"}
            size={24}
            color="#ff2d88"
          />
        </Pressable>
      )}
    </Pressable>
  );
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#242424",
    padding: 10,
    borderRadius: 12,
  },
  cardGrid: {
    width: width < 500 ? "48%" : "30%",
    maxWidth: 250,
    flexDirection: "column",
  },
  cardList: {
    flexDirection: "row",
    width: "100%",
  },
  cardTitleContainer: {
    flex: 1,
    flexDirection: "column",
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
    marginRight: 16,
    borderRadius: 8,
  },
  coverGrid: {
    width: "100%",
    height: "auto",
    marginBottom: 10,
  },
  coverList: {
    width: 80,
    height: "auto",
  },
});
