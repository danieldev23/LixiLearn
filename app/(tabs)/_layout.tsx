import { Tabs } from "expo-router";
import React from "react";
import { Platform, Image } from "react-native";
import { BookA, BookOpen, Timer, Bot } from "lucide-react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Từ vựng",
          tabBarIcon: () => <Image source={require('@/assets/images/tabbar/vocab.png')} style={{width: 28, height: 28}} />,
        }}
      />
       <Tabs.Screen
        name="grammar"
        options={{
          title: "Ngữ pháp",
          tabBarIcon: () => <Image source={require('@/assets/images/tabbar/grammar.png')} style={{width: 28, height: 28}} />,
        }}
      />
        <Tabs.Screen
        name="timer"
        options={{
          title: "Hẹn giờ",
          tabBarIcon: ({ color }) => <Image source={require('@/assets/images/tabbar/streak.png')} style={{width: 28, height: 28}} />,
        }}
      />
      
      <Tabs.Screen
        name="chat"
        options={{
          title: "Lixi AI",
          tabBarIcon: ({ color }) => <Image source={require('@/assets/images/tabbar/bot.png')} style={{width: 28, height: 28}} />,
        }}
      />
    </Tabs>
  );
}
