import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import NavButton from "../atom/NavButton";
import Searchbar from "../molecule/Searchbar";

export default function Navbar({
  categories,
  onCategoryChange,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: {
  categories: string[];
  onCategoryChange?: (category: string) => void;
  onSearchChange?: (search: string) => void;
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
}) {
  const [activeButton, setActiveButton] = useState<string>(categories[0]);

  const handlePress = (category: string) => {
    setActiveButton(category);
    onCategoryChange?.(category);
  };

  return (
    <View style={styles.container}>
      <Searchbar onChangeText={onSearchChange} />
      <View style={styles.buttonsRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonsContainer}
        >
          {categories.map((category) => (
            <NavButton
              key={category}
              text={category}
              active={activeButton === category}
              onPress={() => handlePress(category)}
            />
          ))}
        </ScrollView>
        <View style={styles.viewModeContainer}>
          <Pressable
            style={[
              styles.viewModeButton,
              styles.viewModeButtonLeft,
              viewMode === "list" && styles.viewModeButtonActive,
            ]}
            onPress={() => onViewModeChange("list")}
          >
            <Ionicons
              name="list"
              size={24}
              color={viewMode === "list" ? "#fff" : "#ff2d88"}
            />
          </Pressable>
          <Pressable
            style={[
              styles.viewModeButton,
              styles.viewModeButtonRight,
              viewMode === "grid" && styles.viewModeButtonActive,
            ]}
            onPress={() => onViewModeChange("grid")}
          >
            <Ionicons
              name="grid"
              size={24}
              color={viewMode === "grid" ? "#fff" : "#ff2d88"}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#1a1a1a",
    padding: 20,
    gap: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    paddingRight: 10,
  },
  viewModeContainer: {
    flexDirection: "row",
    borderColor: "#ff2d88",
    borderWidth: 1,
    borderRadius: 10,
    flexShrink: 0,
  },
  viewModeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  viewModeButtonLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  viewModeButtonRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  viewModeButtonActive: {
    backgroundColor: "#ff2d88",
  },
});
