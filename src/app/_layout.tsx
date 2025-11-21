import { Stack } from "expo-router";
import { PlayerProvider } from "../context/Player.context";

export default function RootLayout() {
  return (
    <PlayerProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Bienvenido", headerShown: false }}
        />
        <Stack.Screen
          name="home"
          options={{
            title: "Inicio",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="player"
          options={{
            title: "Reproductor",
            headerShown: false,
          }}
        />
      </Stack>
    </PlayerProvider>
  );
}
