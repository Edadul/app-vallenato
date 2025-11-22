import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CATEGORIES, SONGS } from "../assets/songs/songs.data";
import type { Category } from "../assets/songs/songs.types";
import Navbar from "../components/organism/Navbar";
import SongCard from "../components/organism/SongCard";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<Category>("Todos");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filteredSongs =
    category === "Todos"
      ? SONGS.filter((song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : SONGS.filter(
          (song) =>
            song.category === category &&
            song.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/ccmv_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>
          Archivo de audio CCMV{"\n"}
          <Text style={{ fontSize: 12, opacity: 0.8, marginTop: 0 }}>
            Centro Cultural de la Música Vallenata
          </Text>
        </Text>
      </View>

      <Navbar
        categories={CATEGORIES}
        onCategoryChange={(cat) => {
          setCategory(cat as Category);
        }}
        onSearchChange={(query) => setSearchQuery(query)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={viewMode === "grid" ? styles.contentGrid : styles.contentList}
        >
          {filteredSongs.map((song) => (
            <SongCard key={song.id} song={song} viewMode={viewMode} />
          ))}
        </View>
      </ScrollView>

      {/* TODO: player controller over all screens */}
      {/* <View style={styles.player}>
        <FontAwesome5 name="step-backward" size={25} color="#ff2d88" />
        <Ionicons name="play-circle" size={48} color="#ff2d88" />
        <FontAwesome5 name="step-forward" size={25} color="#ff2d88" />
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#ff2d88",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  logo: {
    aspectRatio: 260 / 140,
    width: 130,
    height: "auto",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 0,
  },
  content: {
    padding: 16,
    flexGrow: 1,
  },
  contentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  contentList: {
    flexDirection: "column",
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 12,
  },
  player: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#333",
    backgroundColor: "#121212",
  },
});
