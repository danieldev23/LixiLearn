import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Animated,
  Share,
  Alert,
} from "react-native";
import Header from "@/components/ui/Header";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { playPronunciation } from "@/utils/playing-mp3";
import { StatusBar } from "expo-status-bar";

// Type definitions
interface Example {
  cf: string;
  x: string;
}

interface Sense {
  definition: string;
  examples: Example[];
}

interface VocabularyWord {
  id: string;
  word: string;
  pos: string;
  phonetic: string;
  phonetic_text: string;
  phonetic_am: string;
  phonetic_am_text: string;
  senses: Sense[];
  status: string;
  starred: boolean;
}

type ParamList = {
  WordDetail: {
    word: VocabularyWord;
  };
};

export default function WordDetailScreen() {
  const route = useRoute<RouteProp<ParamList, "WordDetail">>();
  const navigation = useNavigation();
  const { word } = route.params || { 
    word: {
      id: "1",
      word: "abandon",
      pos: "verb",
      phonetic_text: "/əˈbændən/",
      phonetic_am_text: "/əˈbændən/",
      senses: [
        {
          definition: "to leave somebody, especially somebody you are responsible for, with no intention of returning",
          examples: [
            { 
              cf: "", 
              x: "The baby had been abandoned by its mother." 
            },
            { 
              cf: "", 
              x: "People often simply abandon their pets when they go abroad." 
            },
            { 
              cf: "", 
              x: "'We have been abandoned to our fate,' said one resident." 
            },
            { 
              cf: "", 
              x: "The study showed a deep fear among the elderly of being abandoned to the care of strangers." 
            }
          ]
        },
        {
          definition: "to leave a thing or place, especially because it is impossible or dangerous to stay",
          examples: [
            { 
              cf: "", 
              x: "Snow forced many drivers to abandon their vehicles." 
            },
            { 
              cf: "", 
              x: "He gave the order to abandon ship (= to leave the ship because it was sinking)." 
            },
            { 
              cf: "", 
              x: "They were forced to abandon their homes." 
            }
          ]
        }
      ],
      status: "Mastered",
      starred: true
    }
  };
  const [status, setStatus] = useState(word.status || "Unknown");
  const [isStarred, setIsStarred] = useState(word.starred || false);
  const [activeSection, setActiveSection] = useState("definition");

  // Function to go back
  const goBack = () => {
    navigation.goBack();
  };

  // Function to toggle star status
  const toggleStar = () => {
    setIsStarred(!isStarred);
  };

  // Function to play pronunciation
  const handlePlayPronunciation = (type) => {
    const pronunciationFile = type === "uk" ? word.phonetic : word.phonetic_am;
    playPronunciation(pronunciationFile);
  };

  // Format the part of speech
  const formatPos = (pos) => {
    return pos.charAt(0).toUpperCase() + pos.slice(1);
  };

  // Handle bottom tab navigation
  const handleTabPress = (tabName) => {
    setActiveSection(tabName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
     <Header title="Chi tiết từ" showBackButton={true}
             rightIcon={<Feather name="bookmark" size={22} color="#333" />}
             onRightPress={() => console.log("Right button pressed")} />
      
      <ScrollView style={styles.scrollContainer}>
        {/* Word header section */}
        <View style={styles.wordSection}>
          <Text style={styles.wordText}>{word.word}</Text>
          <Text style={styles.posLabel}>A. Class: {formatPos(word.pos)}</Text>
        </View>
        
        {/* Phonetic section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>B. Phonetic</Text>
          <View style={styles.phoneticBox}>
            <View style={styles.phoneticRow}>
              <TouchableOpacity 
                style={styles.playButton} 
                onPress={() => handlePlayPronunciation("uk")}
              >
                <Ionicons name="volume-medium" size={22} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.phoneticText}>{word.phonetic_text} (US)</Text>
            </View>
            
            <View style={styles.phoneticRow}>
              <TouchableOpacity 
                style={[styles.playButton, styles.playButtonRed]} 
                onPress={() => handlePlayPronunciation("us")}
              >
                <Ionicons name="volume-medium" size={22} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.phoneticText}>{word.phonetic_am_text} (UK)</Text>
            </View>
          </View>
        </View>
        
        {/* Definition section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>C. Definition</Text>
          
          {word.senses && word.senses.map((sense, index) => (
            <View key={index} style={styles.definitionBlock}>
              <Text style={styles.definitionNumber}>
                {index + 1}. {sense.definition}
              </Text>
              
              {sense.examples && sense.examples.length > 0 && (
                <View style={styles.examplesContainer}>
                  <Text style={styles.examplesLabel}>Examples:</Text>
                  {sense.examples.map((example, exIndex) => (
                    <View key={exIndex} style={styles.exampleItem}>
                      <Text style={styles.exampleNumber}>{exIndex + 1}.</Text>
                      <Text style={styles.exampleText}>
                        {example.x}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* Bottom tab bar */}
      {/* <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => handleTabPress("vocabulary")}
        >
          <View style={[styles.tabIcon, activeSection === "vocabulary" && styles.activeTabIcon]}>
            <Ionicons name="book-outline" size={22} color={activeSection === "vocabulary" ? "#4B79E4" : "#888"} />
          </View>
          <Text style={[styles.tabText, activeSection === "vocabulary" && styles.activeTabText]}>
            Vocabulary
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => handleTabPress("studying")}
        >
          <Ionicons name="star-outline" size={22} color={activeSection === "studying" ? "#4B79E4" : "#888"} />
          <Text style={[styles.tabText, activeSection === "studying" && styles.activeTabText]}>
            Studying
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => handleTabPress("grammar")}
        >
          <Ionicons name="book-outline" size={22} color={activeSection === "grammar" ? "#4B79E4" : "#888"} />
          <Text style={[styles.tabText, activeSection === "grammar" && styles.activeTabText]}>
            Grammar
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => handleTabPress("streak")}
        >
          <Ionicons name="flame-outline" size={22} color={activeSection === "streak" ? "#4B79E4" : "#888"} />
          <Text style={[styles.tabText, activeSection === "streak" && styles.activeTabText]}>
            Streak
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => handleTabPress("settings")}
        >
          <Ionicons name="settings-outline" size={22} color={activeSection === "settings" ? "#4B79E4" : "#888"} />
          <Text style={[styles.tabText, activeSection === "settings" && styles.activeTabText]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },
  statusBadge: {
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scrollContainer: {
    flex: 1,
    padding: 2,
  },
  wordSection: {
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  wordText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
  },
  posLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#444",
  },
  sectionContainer: {
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#444",
    marginBottom: 15,
  },
  phoneticBox: {
    backgroundColor: "#e4f0fa",
    borderRadius: 10,
    padding: 15,
  },
  phoneticRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  playButtonRed: {
    backgroundColor: "#E57373",
  },
  phoneticText: {
    fontSize: 16,
    color: "#333",
  },
  definitionBlock: {
    marginBottom: 25,
  },
  definitionNumber: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    fontWeight: "500",
  },
  examplesContainer: {
    marginTop: 15,
  },
  examplesLabel: {
    fontSize: 15,
    color: "#555",
    fontWeight: "500",
    marginBottom: 10,
  },
  exampleItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  exampleNumber: {
    fontSize: 15,
    color: "#555",
    marginRight: 8,
    width: 20,
  },
  exampleText: {
    fontSize: 15,
    color: "#333",
    flex: 1,
    lineHeight: 22,
  },
  tabBar: {
    flexDirection: "row",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIcon: {
    marginBottom: 4,
  },
  activeTabIcon: {
    backgroundColor: "#e6f0ff",
    borderRadius: 5,
    padding: 2,
  },
  tabText: {
    fontSize: 12,
    color: "#888",
  },
  activeTabText: {
    color: "#4B79E4",
    fontWeight: "500",
  },
});