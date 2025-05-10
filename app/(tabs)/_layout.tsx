import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
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
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
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
          tabBarIcon: ({ color }) => <BookA color={color} size={26} />,
        }}
      />
       <Tabs.Screen
        name="grammar"
        options={{
          title: "Ngữ pháp",
          tabBarIcon: ({ color }) => <BookOpen color={color} size={26} />,
        }}
      />
        <Tabs.Screen
        name="timer"
        options={{
          title: "Hẹn giờ",
          tabBarIcon: ({ color }) => <Timer color={color} size={28} />,
        }}
      />
      
      <Tabs.Screen
        name="chat"
        options={{
          title: "Lixi AI",
          tabBarIcon: ({ color }) => <Bot color={color} size={28} />,
        }}
      />
    </Tabs>
  );
}
