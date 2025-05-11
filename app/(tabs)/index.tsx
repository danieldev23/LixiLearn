
import a from "@/assets/json/oxford_words/a.json";
import b from "@/assets/json/oxford_words/b.json";
import c from "@/assets/json/oxford_words/c.json";
import d from "@/assets/json/oxford_words/d.json";
import e from "@/assets/json/oxford_words/e.json";
import f from "@/assets/json/oxford_words/f.json";
import g from "@/assets/json/oxford_words/g.json";
import h from "@/assets/json/oxford_words/h.json";
import i from "@/assets/json/oxford_words/i.json";
import j from "@/assets/json/oxford_words/j.json";
import k from "@/assets/json/oxford_words/k.json";
import l from "@/assets/json/oxford_words/l.json";
import m from "@/assets/json/oxford_words/m.json";
import n from "@/assets/json/oxford_words/n.json";
import o from "@/assets/json/oxford_words/o.json";
import p from "@/assets/json/oxford_words/p.json";
import q from "@/assets/json/oxford_words/q.json";
import r from "@/assets/json/oxford_words/r.json";
import s from "@/assets/json/oxford_words/s.json";
import t from "@/assets/json/oxford_words/t.json";
import u from "@/assets/json/oxford_words/u.json";
import v from "@/assets/json/oxford_words/v.json";
import w from "@/assets/json/oxford_words/w.json";
import x from "@/assets/json/oxford_words/x.json";
import y from "@/assets/json/oxford_words/y.json";
import z from "@/assets/json/oxford_words/z.json";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Header from "@/components/ui/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { WordItem } from "@/components/home/WordItem";
import { StatusBar } from "expo-status-bar";
import { FilterState, letterOptions, posOptions, VocabularyWord } from "@/types/vocabulary";
const { width } = Dimensions.get("window");

const getAllVocabularyData = () => {
  const letterJsonMap = {
    A: a,
    B: b,
    C: c,
    D: d,
    E: e,
    F: f,
    G: g,
    H: h,
    I: i,
    J: j,
    K: k,
    L: l,
    M: m,
    N: n,
    O: o,
    P: p,
    Q: q,
    R: r,
    S: s,
    T: t,
    U: u,
    V: v,
    W: w,
    X: x,
    Y: y,
    Z: z,
  };


  const allWords: VocabularyWord[] = [];

  Object.entries(letterJsonMap).forEach(([letter, jsonData]) => {
    if (jsonData && Array.isArray(jsonData)) {
      jsonData.forEach((word, index) => {
        const wordWithId: VocabularyWord = {
          ...word,
          id: `${letter.toLowerCase()}_${word.word}_${index}`,
          status: "Unknown",
          starred: false,
        };
        allWords.push(wordWithId);
      });
    }
  });

  return allWords;
};



// POC color mapping
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

export default function VocabularyScreen(): React.ReactElement {
  const [vocabularyData, setVocabularyData] = useState<VocabularyWord[]>([]);
  const [filteredData, setFilteredData] = useState<VocabularyWord[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    letter: "A",
    pos: [],
    status: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  // Initialize data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const allData = getAllVocabularyData();
        setVocabularyData(allData);

        // Initial filter with just the active letter
        const initialFiltered = allData.filter(
          (word) => word.word.charAt(0).toUpperCase() === activeFilters.letter
        );
        setFilteredData(initialFiltered);
      } catch (error) {
        console.error("Error loading vocabulary data:", error);
        Alert.alert("Error", "Failed to load vocabulary data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Apply filters when activeFilters or search text changes
  useEffect(() => {
    if (vocabularyData.length > 0) {
      applyFilters();
    }
  }, [activeFilters, searchText, vocabularyData]);

  // Apply filters to the vocabulary data
  const applyFilters = () => {
    let filtered = [...vocabularyData];

    // Apply letter filter
    if (activeFilters.letter) {
      filtered = filtered.filter(
        (word) => word.word.charAt(0).toUpperCase() === activeFilters.letter
      );
    }

    // Apply POS filter if any are selected
    if (activeFilters.pos.length > 0) {
      filtered = filtered.filter((word) =>
        activeFilters.pos.includes(word.pos)
      );
    }

    // Apply status filter if any are selected
    if (activeFilters.status.length > 0) {
      filtered = filtered.filter((word) => {
        if (activeFilters.status.includes("Star") && word.starred) {
          return true;
        }
        return activeFilters.status.includes(word.status || "Unknown");
      });
    }

    // Apply search text
    if (searchText) {
      filtered = filtered.filter((word) =>
        word.word.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Limit the number of results to improve performance
    const maxResults = 100;
    if (filtered.length > maxResults) {
      filtered = filtered.slice(0, maxResults);
    }

    setFilteredData(filtered);
  };

  // Toggle filter functions
  const toggleLetterFilter = (letter: string) => {
    setActiveFilters((prev: any) => ({
      ...prev,
      letter: letter,
    }));
  };

  const togglePosFilter = (pos: string) => {
    setActiveFilters((prev: any) => {
      const posFilters = [...prev.pos];
      const index = posFilters.indexOf(pos);

      if (index >= 0) {
        posFilters.splice(index, 1);
      } else {
        posFilters.push(pos);
      }

      return {
        ...prev,
        pos: posFilters,
      };
    });
  };


  const clearFilters = () => {
    setActiveFilters({
      letter: "A",
      pos: [],
      status: [],
    });
    setSearchText("");
  };


  // Filter button component
  const FilterButton = ({
    title,
    isActive,
    onPress,
    style,
  }: {
    title: string;
    isActive: boolean;
    onPress: () => void;
    style?: object;
  }) => {
    const posColor = title in posOptions ? getPosColor(title).main : undefined;

    return (
      <TouchableOpacity
        style={[
          styles.filterButton,
          isActive ?
            (posColor ? { backgroundColor: posColor, borderColor: posColor } : styles.activeFilter)
            : {},
          style
        ]}
        onPress={onPress}
      >
        {isActive && (
          <Ionicons
            name="checkmark"
            size={16}
            color="white"
            style={styles.checkIcon}
          />
        )}
        <Text
          style={[styles.filterText, isActive ? styles.activeFilterText : {}]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  // Horizontal scrollable row for filters
  const ScrollableFilterRow = ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollableRow}
    >
      {children}
    </ScrollView>
  );

  // Get active filters as text
  const getActiveFiltersText = () => {
    const parts = [];

    if (activeFilters.letter) {
      parts.push(`letter: ${activeFilters.letter}`);
    }

    if (activeFilters.pos.length > 0) {
      parts.push(`pos: ${activeFilters.pos.join(", ")}`);
    }

    if (activeFilters.status.length > 0) {
      parts.push(`status: ${activeFilters.status.join(", ")}`);
    }

    return parts.join(" • ");
  };

  // Loading component
  const LoadingView = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#4B79E4" />
      <Text style={styles.loadingText}>Loading vocabulary data...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <Header
        title="Từ vựng"
        showBackButton={false}
        rightIcon={<Feather name="bookmark" size={22} color="#333" />}
        onRightPress={() => console.log("Right button pressed")}
      />

      {showSearch ? (
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#777"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search words"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
          {searchText ? (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={20} color="#777" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setShowSearch(false)}>
              <Ionicons name="close" size={20} color="#777" />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.searchPromptContainer}>
          <TouchableOpacity
            style={styles.searchPrompt}
            onPress={() => setShowSearch(true)}
          >
            <Ionicons name="search" size={18} color="#777" />
            <Text style={styles.searchPromptText}>Tìm kiếm từ vựng</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.wordCount}>
            <Text style={styles.wordCountText}>{getWordCountText()}</Text>
          </TouchableOpacity> */}
        </View>
      )}

      <View style={styles.filterSection}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Loại từ:</Text>
            <ScrollableFilterRow>
              {posOptions.map((pos) => (
                <FilterButton
                  key={pos}
                  title={pos}
                  isActive={activeFilters.pos.includes(pos)}
                  onPress={() => togglePosFilter(pos)}
                />
              ))}
            </ScrollableFilterRow>
          </View>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Từ:</Text>
            <ScrollView horizontal
              showsHorizontalScrollIndicator={false} style={styles.letterGrid}>
              {letterOptions.map((letter) => (
                <TouchableOpacity
                  key={letter}
                  style={[
                    styles.letterButton,
                    activeFilters.letter === letter && styles.activeLetterButton,
                  ]}
                  onPress={() => toggleLetterFilter(letter)}
                >
                  <Text
                    style={[
                      styles.letterText,
                      activeFilters.letter === letter && styles.activeLetterText,
                    ]}
                  >
                    {letter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.activeFiltersRow}>
            <View style={styles.filterSummary}>
              <Ionicons name="filter" size={16} color="#4B79E4" />
              <Text style={styles.activeFiltersText}>{getActiveFiltersText()}</Text>
            </View>
            <TouchableOpacity
              style={styles.clearFiltersButton}
              onPress={clearFilters}
            >
              <Text style={styles.clearFiltersText}>Xoá</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {isLoading ? (
        <LoadingView />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <WordItem item={item} />}
          keyExtractor={(item) => item.id}
          style={styles.wordList}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={48} color="#CCC" />
              <Text style={styles.emptyText}>
                No words found matching your filters
              </Text>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={clearFilters}
              >
                <Text style={styles.resetButtonText}>Reset Filters</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  premiumButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
  },
  premiumBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  premiumText: {
    marginLeft: 6,
    color: "#FF9800",
    fontWeight: "600",
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 18,
    marginRight: 70,
    fontWeight: "700",
    color: "#333",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  searchPromptContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  searchPrompt: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F7",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  searchPromptText: {
    color: "#777",
    marginLeft: 8,
    fontSize: 15,
  },
  wordCount: {
    marginLeft: 12,
    backgroundColor: "#EBF1FB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  wordCountText: {
    fontSize: 13,
    color: "#4B79E4",
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F5F5F7",
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  filterSection: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    maxHeight: 240,
  },
  filterRow: {
    marginTop: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  scrollableRow: {
    flexDirection: "row",
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  activeFilter: {
    backgroundColor: "#4B79E4",
    borderColor: "#4B79E4",
  },
  masteredFilter: {
    backgroundColor: "#34A853",
    borderColor: "#34A853",
  },
  starFilter: {
    backgroundColor: "#FF9800",
    borderColor: "#FF9800",
  },
  letterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  letterButton: {
    width: width / 10,
    height: width / 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
    backgroundColor: "#F5F5F7",
  },
  activeLetterButton: {
    backgroundColor: "#4B79E4",
  },
  letterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  activeLetterText: {
    color: "#FFFFFF",
  },
  filterText: {
    fontSize: 14,
    color: "#444",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  checkIcon: {
    marginRight: 4,
  },
  activeFiltersRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  filterSummary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  activeFiltersText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 8,
  },
  clearFiltersButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#F5F5F7",
    borderRadius: 16,
  },
  clearFiltersText: {
    fontSize: 13,
    color: "#FF3B30",
    fontWeight: "600",
  },
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
  },
  examplesContainer: {
    backgroundColor: "rgba(245, 245, 250, 0.7)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  exampleLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    marginBottom: 6,
  },
  exampleText: {
    fontSize: 14,
    color: "#333",
    fontStyle: "italic",
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.07)",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusLabel: {
    fontSize: 13,
    color: "#666",
    marginRight: 8,
  },
  statusButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#F5F5F7",
    marginRight: 6,
  },
  activeStatusUnknown: {
    backgroundColor: "#FF9800",
  },
  activeStatusMastered: {
    backgroundColor: "#34A853",
  },
  statusText: {
    fontSize: 12,
    color: "#666",
  },
  activeStatusText: {
    color: "white",
    fontWeight: "500",
  },
  editButton: {
    backgroundColor: "#4B79E4",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#4B79E4",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  resetButton: {
    backgroundColor: "#4B79E4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  resetButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  // Additional styles for improved UI
  addWordButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4B79E4",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sortFilterRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F7",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 12,
  },
  sortButtonText: {
    fontSize: 13,
    color: "#444",
    marginLeft: 4,
  },
  wordDetailsHeader: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  wordDetailsWord: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  wordDetailsPhoneticContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 12,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#4B79E4",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#4B79E4",
    fontWeight: "600",
  },
  sensesContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  senseHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  definitionContainer: {
    marginBottom: 16,
  },
  definitionNumber: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4B79E4",
    marginRight: 8,
  },
  synonymsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  synonym: {
    backgroundColor: "#EBF1FB",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  synonymText: {
    color: "#4B79E4",
    fontSize: 13,
  },
  notesContainer: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  notesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  notesInput: {
    backgroundColor: "#F5F5F7",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#333",
    minHeight: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#4B79E4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
  quizButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF1FB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    margin: 20,
  },
  quizButtonIcon: {
    backgroundColor: "#4B79E4",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  quizButtonTextContainer: {
    flex: 1,
  },
  quizButtonTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  quizButtonSubtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  // Animations and additional enhancements
  progressContainer: {
    marginTop: 8,
    height: 6,
    backgroundColor: "#F0F0F0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4B79E4",
  },
  badgeRow: {
    flexDirection: "row",
    marginTop: 16,
  },
  badge: {
    backgroundColor: "#F5F5F7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    fontSize: 12,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  statDivider: {
    width: 1,
    height: "80%",
    backgroundColor: "#F0F0F0",
  },
  // Additional UI for bookmarks and history
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  historyTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  historyWord: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  historyTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  emptyStateImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
    opacity: 0.6,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: "#4B79E4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
  // Settings UI
  settingsSection: {
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  settingsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F5F5F7",
  },
  settingsHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  settingsLabelContainer: {
    flex: 1,
  },
  settingsLabel: {
    fontSize: 16,
    color: "#333",
  },
  settingsDescription: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
});