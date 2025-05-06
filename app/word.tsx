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
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/ui/Header";

import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { playPronunciation } from "@/utils/playing-mp3";
import { LinearGradient } from "expo-linear-gradient";
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

// POC color mapping for consistent styling
const getPosColor = (pos: string) => {
  switch (pos) {
    case "verb": return { light: "#F8E2DD", main: "#E35F34", dark: "#C5502C" };
    case "noun": return { light: "#F3ECD8", main: "#DBC174", dark: "#BA9F54" };
    case "adjective": return { light: "#DCE7F7", main: "#5B8AC5", dark: "#4A73A5" };
    case "adverb": return { light: "#DDF3E7", main: "#5BC58A", dark: "#4AA575" };
    case "preposition": return { light: "#F3DCE7", main: "#C55B8A", dark: "#A54A73" };
    default: return { light: "#E8E8E8", main: "#888888", dark: "#666666" };
  }
};

export default function WordDetailScreen() {
  const route = useRoute<RouteProp<ParamList, "WordDetail">>();
  const navigation = useNavigation();
  const { word } = route.params;
  const posColors = getPosColor(word.pos);

  const [status, setStatus] = useState<string>(word.status || "Unknown");
  const [isStarred, setIsStarred] = useState<boolean>(word.starred || false);
  const [notes, setNotes] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("definition");
  const scrollY = useRef(new Animated.Value(0)).current;

  // Animation values
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Function to handle status change
  const changeStatus = (newStatus: string) => {
    setStatus(newStatus);
    // Toast notification
    Alert.alert("Status updated", `Word status changed to ${newStatus}`);
  };

  // Function to toggle starred status
  const toggleStarred = () => {
    setIsStarred(!isStarred);
    // Here you would also update the starred status in your main data store
  };

  // Function to go back
  const goBack = () => {
    navigation.goBack();
  };

  // Function to share word
  const shareWord = async () => {
    try {
      const definitions = word.senses.map((sense, index) => 
        `${index + 1}. ${sense.definition}`
      ).join('\n');
      
      await Share.share({
        message: `${word.word} (${word.pos})\n\nDefinitions:\n${definitions}`,
        title: `Word: ${word.word}`,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share word");
    }
  };

  // Format the part of speech with proper capitalization
  const formatPos = (pos: string) => {
    return pos.charAt(0).toUpperCase() + pos.slice(1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      {/* Animated Header */}
      <Header 
  title="English Tenses"
  showBackButton={true}
  rightIcon={<Feather name="bookmark" size={22} color="#333" />}
  onRightPress={() => console.log("Right button pressed")}
/>
      {/* Main Header */}
      <Animated.ScrollView 
        style={styles.container}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <LinearGradient
          colors={[posColors.light, '#FFFFFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.6 }}
          style={styles.gradientHeader}
        >
          <View style={styles.wordHeader}>
            <View style={styles.wordMain}>
              <Text style={styles.wordText}>{word.word}</Text>
              <View style={[styles.posTag, { backgroundColor: posColors.main }]}>
                <Text style={styles.posTagText}>{formatPos(word.pos)}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={toggleStarred} style={styles.starButton}>
              <Ionicons
                name={isStarred ? "star" : "star-outline"}
                size={28}
                color={isStarred ? "#FFD700" : "#888"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.phoneticContainer}>
            {word.phonetic || word.phonetic_text ? (
              <View style={styles.phoneticRow}>
                <TouchableOpacity
                  style={styles.audioButton}
                  onPress={() => playPronunciation(word.phonetic)}
                >
                  <Ionicons name="volume-medium" size={18} color="white" />
                </TouchableOpacity>
                <Text style={styles.phoneticText}>
                  {word.phonetic_text || `/${word.phonetic}/`} (UK)
                </Text>
              </View>
            ) : null}

            {word.phonetic_am || word.phonetic_am_text ? (
              <View style={styles.phoneticRow}>
                <TouchableOpacity
                  style={[styles.audioButton, styles.audioButtonAM]}
                  onPress={() => playPronunciation(word.phonetic_am)}
                >
                  <Ionicons name="volume-medium" size={18} color="white" />
                </TouchableOpacity>
                <Text style={styles.phoneticText}>
                  {word.phonetic_am_text || `/${word.phonetic_am}/`} (US)
                </Text>
              </View>
            ) : null}
          </View>
        </LinearGradient>

        {/* Word status */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <View style={styles.statusButtonsRow}>
            <TouchableOpacity
              style={[
                styles.statusButton,
                status === "Unknown" && styles.statusActiveUnknown,
              ]}
              onPress={() => changeStatus("Unknown")}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  status === "Unknown" && styles.statusActiveText,
                ]}
              >
                Unknown
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.statusButton,
                status === "Learning" && styles.statusActiveLearning,
              ]}
              onPress={() => changeStatus("Learning")}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  status === "Learning" && styles.statusActiveText,
                ]}
              >
                Learning
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.statusButton,
                status === "Mastered" && styles.statusActiveMastered,
              ]}
              onPress={() => changeStatus("Mastered")}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  status === "Mastered" && styles.statusActiveText,
                ]}
              >
                Mastered
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "definition" && styles.activeTab]}
            onPress={() => setActiveTab("definition")}
          >
            <Text style={[styles.tabText, activeTab === "definition" && styles.activeTabText]}>
              Definition
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "notes" && styles.activeTab]}
            onPress={() => setActiveTab("notes")}
          >
            <Text style={[styles.tabText, activeTab === "notes" && styles.activeTabText]}>
              Notes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "review" && styles.activeTab]}
            onPress={() => setActiveTab("review")}
          >
            <Text style={[styles.tabText, activeTab === "review" && styles.activeTabText]}>
              Review
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === "definition" && (
          <View style={styles.definitionContent}>
            {word.senses &&
              word.senses.map((sense, index) => (
                <View key={index} style={styles.definitionBlock}>
                  <View style={styles.definitionNumberContainer}>
                    <View style={styles.definitionNumberBadge}>
                      <Text style={styles.definitionNumberText}>{index + 1}</Text>
                    </View>
                  </View>
                  <View style={styles.definitionTextContainer}>
                    <Text style={styles.definitionText}>{sense.definition}</Text>

                    {sense.examples && sense.examples.length > 0 && (
                      <View style={styles.examplesContainer}>
                        <Text style={styles.examplesLabel}>Examples:</Text>
                        {sense.examples.map((example, exIndex) => (
                          <View key={exIndex} style={styles.exampleBlock}>
                            <Text style={styles.exampleBullet}>•</Text>
                            <Text style={styles.exampleText}>{example.x}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              ))}
          </View>
        )}

        {activeTab === "notes" && (
          <View style={styles.notesContent}>
            <View style={styles.notesInputContainer}>
              <TextInput
                style={styles.notesInput}
                placeholder="Add your notes about this word..."
                value={notes}
                onChangeText={setNotes}
                multiline
                placeholderTextColor="#999"
              />
            </View>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Notes</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "review" && (
          <View style={styles.reviewContent}>
            <View style={styles.emptyReviewContainer}>
              <Ionicons name="time-outline" size={48} color="#CCC" />
              <Text style={styles.emptyReviewText}>
                No review history yet
              </Text>
              <Text style={styles.emptyReviewSubtext}>
                Your review sessions will appear here
              </Text>
            </View>
          </View>
        )}

        {/* Quiz section */}
        <View style={styles.quizSection}>
          <LinearGradient
            colors={['#EBF1FB', '#DCE7F7']}
            style={styles.quizCard}
          >
            <View style={styles.quizIcon}>
              <Ionicons name="school" size={24} color="#FFF" />
            </View>
            <View style={styles.quizContent}>
              <Text style={styles.quizTitle}>Quiz Yourself</Text>
              <Text style={styles.quizDescription}>
                Test your knowledge of this word with a quick quiz
              </Text>
            </View>
            <TouchableOpacity style={styles.quizButton}>
              <Text style={styles.quizButtonText}>Start</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Related words section */}
        <View style={styles.relatedWordsSection}>
          <Text style={styles.relatedWordsTitle}>Related Words</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.relatedWordsScroll}
          >
            {["example", "sample", "specimen", "illustration", "paradigm"].map((relatedWord, index) => (
              <TouchableOpacity key={index} style={styles.relatedWordCard}>
                <Text style={styles.relatedWordText}>{relatedWord}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Extra space at bottom for better scrolling */}
        <View style={{ height: 40 }} />
      </Animated.ScrollView>

      {/* Footer actions */}
      {/* <View style={styles.footer}>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={20} color="#FFFFFF" />
          <Text style={styles.editButtonText}>Edit Word</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.testButton}>
          <Ionicons name="flash" size={20} color="#FFFFFF" />
          <Text style={styles.testButtonText}>Test Knowledge</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#FFFFFF',
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerBackButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    padding: 8,
    marginLeft: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "transparent",
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
  },
  container: {
    flex: 1,
  },
  gradientHeader: {
    padding: 22,
    paddingTop: 0,
  },
  wordHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingTop: 30,
  },
  wordMain: {
    flex: 1,
  },
  wordText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  posTag: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  posTagText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  starButton: {
    padding: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    marginLeft: 16,
  },
  phoneticContainer: {
    marginBottom: 16,
  },
  phoneticRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  audioButton: {
    backgroundColor: "#32A953", // Green for British pronunciation
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  audioButtonAM: {
    backgroundColor: "#E35F34", // Red for American pronunciation
  },
  phoneticText: {
    color: "#444",
    fontSize: 16,
  },
  statusContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#F0F0F0",
  },
  statusLabel: {
    fontSize: 15,
    color: "#666",
    marginBottom: 10,
    fontWeight: "500",
  },
  statusButtonsRow: {
    flexDirection: "row",
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#F5F5F7",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  statusButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  statusActiveUnknown: {
    backgroundColor: "#FF9800",
    borderColor: "#FF9800",
  },
  statusActiveLearning: {
    backgroundColor: "#4B79E4",
    borderColor: "#4B79E4",
  },
  statusActiveMastered: {
    backgroundColor: "#34A853",
    borderColor: "#34A853",
  },
  statusActiveText: {
    color: "#FFFFFF",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    marginTop: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#4B79E4",
  },
  tabText: {
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#4B79E4",
    fontWeight: "600",
  },
  definitionContent: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  definitionBlock: {
    flexDirection: "row",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  definitionNumberContainer: {
    paddingRight: 12,
  },
  definitionNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#4B79E4",
    justifyContent: "center",
    alignItems: "center",
  },
  definitionNumberText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  definitionTextContainer: {
    flex: 1,
  },
  definitionText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  examplesContainer: {
    marginTop: 12,
    backgroundColor: "#F8F8FA",
    padding: 12,
    borderRadius: 8,
  },
  examplesLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  exampleBlock: {
    flexDirection: "row",
    marginBottom: 8,
  },
  exampleBullet: {
    fontSize: 18,
    color: "#4B79E4",
    marginRight: 8,
  },
  exampleText: {
    fontSize: 15,
    color: "#444",
    flex: 1,
    lineHeight: 22,
  },
  notesContent: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  notesInputContainer: {
    backgroundColor: "#F8F8FA",
    borderRadius: 8,
    padding: 12,
    minHeight: 180,
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },
  notesInput: {
    fontSize: 15,
    color: "#333",
    textAlignVertical: "top",
    minHeight: 160,
  },
  saveButton: {
    backgroundColor: "#4B79E4",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  reviewContent: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    minHeight: 200,
  },
  emptyReviewContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyReviewText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#666",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyReviewSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  quizSection: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    marginTop: 16,
  },
  quizCard: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  quizIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4B79E4",
    justifyContent: "center",
    alignItems: "center",
  },
  quizContent: {
    flex: 1,
    marginLeft: 16,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  quizDescription: {
    fontSize: 14,
    color: "#666",
  },
  quizButton: {
    backgroundColor: "#4B79E4",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  quizButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  relatedWordsSection: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    marginTop: 16,
  },
  relatedWordsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  relatedWordsScroll: {
    flexDirection: "row",
  },
  relatedWordCard: {
    backgroundColor: "#F5F5F7",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  relatedWordText: {
    color: "#4B79E4",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#666",
    paddingVertical: 14,
    borderRadius: 8,
    marginRight: 8,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  testButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B79E4",
    paddingVertical: 14,
    borderRadius: 8,
    marginLeft: 8,
  },
  testButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
});