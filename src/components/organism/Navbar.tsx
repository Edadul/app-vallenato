import { useState } from "react";
import { StyleSheet, View } from "react-native";
import NavButton from "../atom/NavButton";
import Searchbar from "../molecule/Searchbar";

export default function Navbar({
  categories,
  onCategoryChange,
}: {
  categories: string[];
  onCategoryChange?: (category: string) => void;
}) {
  const [activeButton, setActiveButton] = useState<string>(categories[0]);

  const handlePress = (category: string) => {
    setActiveButton(category);
    onCategoryChange?.(category);
  };

  return (
    <View style={styles.container}>
      <Searchbar />
      <View style={styles.buttonsContainer}>
        {categories.map((category) => (
          <NavButton
            key={category}
            text={category}
            active={activeButton === category}
            onPress={() => handlePress(category)}
          />
        ))}
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
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
