import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, TextInput, View } from "react-native";

export default function Searchbar() {
  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color="#ff2d88" />
      <TextInput style={styles.input}></TextInput>
    </View>
  );
}

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
    outlineStyle: "none",
  },
});
