import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "" }}
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="word"
          options={{
            title: "Word Details",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="tenses/index"
          options={{
            title: "Tenses",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sentences/index"
          options={{
            title: "Senses",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="tenses/[tense]"
          options={() => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="sentences/[sentence]"
          options={() => ({
            headerShown: false,
          })}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
