import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Image
          source={require("../assets/pattern.png")}
          style={styles.pattern}
          resizeMode="repeat"
        />
      </View>

      <View style={styles.content}>
        <Image
          source={require("../assets/ccmv_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Archivo de Audio</Text>
        <Text style={styles.subtitle}>
          Explora la colección completa de audios del museo
        </Text>

        <Pressable style={styles.button} onPress={() => router.push("/home")}>
          <Text style={styles.buttonText}>Explorar Audios</Text>
        </Pressable>
      </View>
      <Text style={styles.footer}>
        Centro Cultural y de Convenciones de la Música Vallenata{"\n"}
        <Text style={{ fontSize: 12, opacity: 0.6 }}>
          Toque la pantalla para comenzar
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ff2d88",
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 120,
    justifyContent: "center",
    backgroundColor: "#ff2d88",
  },
  pattern: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  logo: {
    aspectRatio: 260 / 140,
    width: 500,
    height: "auto",
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    color: "white",
    fontWeight: "600",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.8,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 12,
  },
  buttonText: {
    color: "#ff2d88",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    opacity: 0.8,
    marginTop: 60,
    padding: 20,
  },
});
