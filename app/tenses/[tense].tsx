import { useLocalSearchParams } from "expo-router";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Header from "@/components/ui/Header";
import Markdown from "react-native-markdown-display";
import { useEffect, useState } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { getTense } from "@/data/tenses";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
interface Token {
  id: number,
  token: string,
}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}
async function getNotificationToken() {

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}


export default function TenseDetailScreen() {
  const { tense } = useLocalSearchParams<{ tense: string }>();
  const [markdown, setMarkdown] = useState<string>("");
  const [title, setTitle] = useState<string>("Tense Detail");
  const [token, setToken] = useState<Token | undefined>()

  useEffect(() => {
    if (tense) {
      // If content exists for this tense
      setMarkdown(getTense(tense) as string);
      // Extract title from the tense ID
      const formattedTitle = tense
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      setTitle(formattedTitle);
    } else {
      setMarkdown("# 404\n\nTense content not found.");
      setTitle("Not Found");
    }
  }, [tense]);

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={title}
        showBackButton={true}
        rightIcon={<Feather name="bookmark" size={22} color="#333" />}
        onRightPress={async () => {
          try {
            const token = await getNotificationToken();
            if (token) {
              console.log(`Token from header: ${token}`);
              setToken({ id: 1, token });
            }
          } catch (error) {
            console.error("Error getting token:", error);
          }
        }}
      />


      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {markdown ? (
          <Markdown style={markdownStyles}>{markdown}</Markdown>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}

        <View style={styles.practiceSection}>
          <Text style={styles.practiceSectionTitle}>Practice This Tense</Text>
          <TouchableOpacity style={styles.practiceButton}>
            <Ionicons
              name="play-circle"
              size={22}
              color="#FFFFFF"
              style={styles.buttonIcon}
            />
            <Text style={styles.practiceButtonText}>Take a Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.exerciseButton}>
            <Ionicons
              name="document-text"
              size={22}
              color="#4B79E4"
              style={styles.buttonIcon}
            />
            <Text style={styles.exerciseButtonText}>Exercises</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F7",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  bookmarkButton: {
    padding: 8,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
  },
  practiceSection: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#F8F9FD",
    borderRadius: 16,
  },
  practiceSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  practiceButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B79E4",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  practiceButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  exerciseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#4B79E4",
  },
  exerciseButtonText: {
    color: "#4B79E4",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonIcon: {
    marginRight: 8,
  },
});

const markdownStyles = StyleSheet.create({
  // Headings
  heading1: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginVertical: 16,
  },
  heading2: {
    fontSize: 20,
    fontWeight: "700",
    color: "#444",
    marginTop: 20,
    marginBottom: 10,
  },
  heading3: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginTop: 16,
    marginBottom: 8,
  },
  // Paragraphs
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 16,
  },
  // Lists
  list_item: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bullet_list: {
    marginVertical: 8,
  },
  ordered_list: {
    marginVertical: 8,
  },
  // Bold and italics
  strong: {
    fontWeight: "700",
  },
  em: {
    fontStyle: "italic",
  },
  // Links
  link: {
    color: "#4B79E4",
    textDecorationLine: "underline",
  },
  // Code blocks
  code_inline: {
    fontFamily: "monospace",
    backgroundColor: "#F5F5F7",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  code_block: {
    backgroundColor: "#F5F5F7",
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    fontFamily: "monospace",
  },
  // Horizontal rule
  hr: {
    backgroundColor: "#DDD",
    height: 1,
    marginVertical: 20,
  },
  // Blockquote
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: "#4B79E4",
    paddingLeft: 12,
    marginLeft: 8,
    marginVertical: 12,
  },
  // Tables
  table: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    marginVertical: 16,
    overflow: "hidden",
  },
  thead: {
    backgroundColor: "#F5F5F7",
  },
  tr: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#DDD",
  },
  th: {
    padding: 12,
    fontWeight: "700",
  },
  td: {
    padding: 12,
  },
});
