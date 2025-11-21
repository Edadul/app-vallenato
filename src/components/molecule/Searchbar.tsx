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
      {/* @ts-ignore-next-line */}
      <TextInput style={styles.input} onChangeText={onChangeText}></TextInput>
    </View>
  );
}

// @ts-ignore-next-line
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    borderColor: "#ff2d88",
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    padding: 10,
    // esto no está soportado por react-native pero funciona en expo
    outlineStyle: "none",
  },
});
