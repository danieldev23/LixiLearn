import { NavigationProp, VocabularyWord } from "@/types/vocabulary";
import { playPronunciation } from "@/utils/playing-mp3";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

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


export const WordItem = ({ item }: { item: VocabularyWord }) => {
    const navigation = useNavigation<NavigationProp>();
    const posColors = getPosColor(item.pos);
      const [vocabularyData, setVocabularyData] = useState<VocabularyWord[]>([]);
    
    const toggleStarWord = (id: string) => {
        setVocabularyData((prev) => {
          return prev.map((word) => {
            if (word.id === id) {
              return {
                ...word,
                starred: !word.starred,
              };
            }
            return word;
          });
        });
      };

    return (
      <TouchableOpacity
        style={styles.wordCard}
        onPress={() => navigation.navigate("word", { word: item })}
      >
        <View

          style={styles.wordCardGradient}
        >
          <View style={styles.wordHeader}>
            <View style={styles.wordAndStar}>
              <Text style={styles.wordText}>{item.word}</Text>
              <TouchableOpacity
                style={styles.starButton}
                onPress={() => toggleStarWord(item.id)}
              >
                <Ionicons
                  name={item.starred ? "star" : "star-outline"}
                  size={20}
                  color={item.starred ? "#FFD700" : "#888"}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.posTag,
                { backgroundColor: posColors.main }
              ]}
            >
              <Text style={styles.posTagText}>{item.pos}</Text>
            </View>
          </View>

          <View style={styles.posTagRow}>


            {item.status === "Mastered" && (
              <View style={styles.masteredTag}>
                <Ionicons name="checkmark-circle" size={14} color="#34A853" />
                <Text style={styles.masteredTagText}>Mastered</Text>
              </View>
            )}
          </View>

          <View style={styles.phoneticContainer}>
            {item.phonetic || item.phonetic_text ? (
              <View style={styles.pronunciationRow}>
                <TouchableOpacity
                  style={styles.audioButton}
                  onPress={() => playPronunciation(item.phonetic)}
                >
                  <Ionicons name="volume-medium" size={16} color="white" />
                </TouchableOpacity>
                <Text style={styles.phoneticText}>
                  {item.phonetic_text || item.phonetic} (UK)
                </Text>
              </View>
            ) : null}

            {item.phonetic_am || item.phonetic_am_text ? (
              <View style={styles.pronunciationRow}>
                <TouchableOpacity
                  style={styles.audioButtonTwo}
                  onPress={() => playPronunciation(item.phonetic_am)}
                >
                  <Ionicons name="volume-medium" size={16} color="white" />
                </TouchableOpacity>
                <Text style={[styles.phoneticText, { marginLeft: 2 }]}>
                  {item.phonetic_am_text || item.phonetic_am} (US)
                </Text>
              </View>
            ) : null}
          </View>

          {item.senses && item.senses.length > 0 && (
            <>
              <Text style={styles.definitionText}>
                {item.senses[0].definition}
              </Text>


            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    wordList: {
      flex: 1,
      backgroundColor: "#FAFAFA",
    },
    listContent: {
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
    wordCard: {
      borderRadius: 12,
      marginBottom: 16,
      overflow: "hidden",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      borderColor: '333',
      shadowRadius: 4,
    },
    wordCardGradient: {
  
      backgroundColor: "#e4f0fa",
      padding: 10,
    },
    wordHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    wordAndStar: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
  
    },
    wordText: {
      fontSize: 18,
      fontWeight: "700",
      color: "#333",
    },
    starButton: {
      width: 24,
      height: 24,
      marginLeft: 6,
      borderRadius: 18,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    posTagRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    posTag: {
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 16,
      marginRight: 10,
    },
    posTagText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "600",
    },
    masteredTag: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 16,
      backgroundColor: "rgba(52, 168, 83, 0.15)",
    },
    masteredTagText: {
      color: "#34A853",
      fontSize: 12,
      fontWeight: "500",
      marginLeft: 4,
    },
    phoneticContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 12,
  
    },
    pronunciationRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    audioButton: {
      backgroundColor: "#32A953",
      borderRadius: 12,
      width: 24,
      height: 24,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 8,
    },
    audioButtonTwo: {
      backgroundColor: "#E35F34",
      borderRadius: 12,
      width: 24,
      height: 24,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 8,
    },
    phoneticText: {
      color: "#666",
      fontSize: 14,
    },
    // Continuing the styles object from where it left off
    definitionText: {
      fontSize: 15,
      color: "#333",
      marginBottom: 10,
      lineHeight: 22,
    }
});