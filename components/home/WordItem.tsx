import { NavigationProp, VocabularyWord } from "@/types/vocabulary";
import { playPronunciation } from "@/utils/playing-mp3";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
const { width } = Dimensions.get("window");

const getPosColor = (pos: string) => {
  switch (pos) {
    case "verb":
      return { light: "#F8E2DD", main: "#E35F34", dark: "#C5502C" };
    case "noun":
      return { light: "#F3ECD8", main: "#DBC174", dark: "#BA9F54" };
    case "adjective":
      return { light: "#DCE7F7", main: "#5B8AC5", dark: "#4A73A5" };
    case "adverb":
      return { light: "#DDF3E7", main: "#5BC58A", dark: "#4AA575" };
    case "preposition":
      return { light: "#F3DCE7", main: "#C55B8A", dark: "#A54A73" };
    default:
      return { light: "#E8E8E8", main: "#888888", dark: "#666666" };
  }
};

interface WordItemProps {
  item: VocabularyWord;
  onToggleStar: (id: string) => void;
}

export const WordItem = ({ item, onToggleStar }: WordItemProps) => {
  const navigation = useNavigation<NavigationProp>();
  const posColors = getPosColor(item.pos);

  const handleStarPress = (event: any) => {
    event.stopPropagation();
    onToggleStar(item.id);
  };

  return (
    <TouchableOpacity
      style={styles.wordCard}
      onPress={() => navigation.navigate("word", { word: item })}
    >
      <View style={styles.wordCardGradient}>
        <View style={styles.wordHeader}>
          <View style={styles.wordAndStar}>
            <Text style={styles.wordText}>{item.word}</Text>
            <TouchableOpacity
              style={styles.starButton}
              onPress={handleStarPress}
            >
              <Ionicons
                name={item.starred ? "star" : "star-outline"}
                size={20}
                color={item.starred ? "#FFD700" : "#888"}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.posTag, { backgroundColor: posColors.main }]}>
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
          <Text style={styles.definitionText}>{item.senses[0].definition}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wordCard: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  wordCardGradient: {
    padding: 16,
  },
  wordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  wordAndStar: {
    flexDirection: "row",
    alignItems: "center",
  },
  wordText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginRight: 8,
  },
  starButton: {
    padding: 4,
  },
  posTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  posTagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  posTagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  masteredTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F4EA",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  masteredTagText: {
    fontSize: 12,
    color: "#34A853",
    marginLeft: 2,
  },
  phoneticContainer: {
    flexDirection: "row",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  pronunciationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginBottom: 4,
  },
  audioButton: {
    backgroundColor: "#4B79E4",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  audioButtonTwo: {
    backgroundColor: "#E35F34",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  phoneticText: {
    fontSize: 14,
    color: "#777",
  },
  definitionText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});
