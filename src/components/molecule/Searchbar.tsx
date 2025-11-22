import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, TextInput, View } from "react-native";

export default function Searchbar({
  onChangeText,
}: {
  onChangeText?: (text: string) => void;
}) {
  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color="#ff2d88" />
      <TextInput
        // @ts-ignore-next-line
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Buscar..."
        placeholderTextColor="#666"
      />
    </View>
  );
}

// @ts-ignore-next-line
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#242424",
    borderColor: "#ff2d88",
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 45,
  },
  input: {
    flex: 1,
    color: "#fff",
    padding: 10,
    // @ts-ignore-next-line - este solo funciona para web
    outlineStyle: "none",
  },
});
