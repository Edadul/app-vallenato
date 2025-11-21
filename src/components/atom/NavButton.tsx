import { Pressable, StyleSheet, Text } from "react-native";

export default function NavButton({
  text,
  onPress,
  active = false,
}: {
  text: string;
  onPress?: () => void;
  active?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, active && styles.containerActive]}
    >
      <Text style={[styles.text, active && styles.textActive]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#ff2d88",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  containerActive: {
    backgroundColor: "#ff2d88",
  },
  text: {
    color: "#ff2d88",
    fontWeight: "600",
    fontSize: 16,
  },
  textActive: {
    color: "#ffff",
  },
});
