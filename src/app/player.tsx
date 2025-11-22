import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import { BlurView } from "expo-blur";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePlayer } from "../context/Player.context";

export default function PlayerScreen() {
  const [seek, setSeek] = useState<number | undefined>(undefined);
  const { player, play, pause, seekTo, currentSong, isPlaying, currentTime } =
    usePlayer();

  const navigation = useNavigation();

  const handleSeekingUI = (value: number) => {
    setSeek(value);
  };

  const formattedTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.bgImg} source={currentSong?.cover} blurRadius={30} />
      <BlurView intensity={50} />

      <View style={styles.content}>
        {/* header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <View>
            <Text style={{ color: "white", opacity: 0.7 }}>Reproduciendo</Text>
            <Text style={{ color: "white", fontSize: 16 }}>
              {currentSong?.title}
            </Text>
          </View>
        </View>

        {/* cover */}
        <Image style={styles.cover} source={currentSong?.cover} />

        {/* info */}
        <Text style={styles.title}>{currentSong?.title}</Text>
        <Text style={styles.artists}>{currentSong?.artist.join(", ")}</Text>

        {/* player controls */}
        <View style={styles.playerControlContainer}>
          {/* barra de progreso */}
          {/* TOOD: esto se puede extaer a un componente ProgressBar */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressTimeText}>
              {seek ? formattedTime(seek) : formattedTime(currentTime)}
            </Text>
            <Slider
              style={{ flex: 1 }}
              value={seek ?? currentTime}
              minimumValue={0}
              maximumValue={player.duration}
              onValueChange={handleSeekingUI}
              onSlidingComplete={(value) => {
                try {
                  seekTo(value);
                  setSeek(undefined);
                } catch {}
              }}
              minimumTrackTintColor="white"
              thumbTintColor="white"
            />
            <Text style={styles.progressTimeText}>
              {formattedTime(player.duration)}
            </Text>
          </View>

          <View style={styles.playerButtons}>
            <Pressable
              onPress={() => {
                seekTo(0);
              }}
            >
              <Ionicons name="play-back-circle" size={55} color="white" />
            </Pressable>
            <Pressable
              onPress={() => {
                if (isPlaying) pause();
                else play(currentSong);
              }}
            >
              <Ionicons
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={80}
                color="white"
              />
            </Pressable>
            <Pressable>
              <Ionicons name="play-forward-circle" size={55} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#000",
  },
  bgImg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  header: {
    position: "absolute",
    flexDirection: "row",
    top: 30,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    aspectRatio: 1,
    width: 260,
    height: "auto",
    borderRadius: 15,
  },
  backButton: {
    backgroundColor: "#00000080",
    padding: 10,
    borderRadius: 30,
    zIndex: 10,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  artists: {
    color: "white",
    fontSize: 16,
    opacity: 0.7,
    marginTop: 5,
  },
  playerControlContainer: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  progressContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  progressTimeText: {
    color: "white",
    opacity: 0.7,
  },
  playerButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
