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
import React, { useState, useEffect, useCallback } from "react";
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
import {
  FilterState,
  letterOptions,
  posOptions,
  VocabularyWord,
} from "@/types/vocabulary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const BOOKMARKED_WORDS_KEY = "@vocabulary_bookmarked_words";

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
  const [showingBookmarks, setShowingBookmarks] = useState<boolean>(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Load bookmarked words from AsyncStorage
  const loadBookmarkedWords = async () => {
    try {
      const bookmarkedIds = await AsyncStorage.getItem(BOOKMARKED_WORDS_KEY);
      if (bookmarkedIds) {
        const bookmarkedIdsArray = JSON.parse(bookmarkedIds);

        setVocabularyData((prevData) =>
          prevData.map((word) => ({
            ...word,
            starred: bookmarkedIdsArray.includes(word.id),
          }))
        );
      }
    } catch (error) {
      console.error("Error loading bookmarked words:", error);
    }
  };

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

        // Load bookmarked status
        await loadBookmarkedWords();
      } catch (error) {
        console.error("Error loading vocabulary data:", error);
        Alert.alert("Error", "Failed to load vocabulary data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Reload bookmarks when screen is focused
  useEffect(() => {
    if (isFocused) {
      loadBookmarkedWords();
    }
  }, [isFocused]);

  // Apply filters when activeFilters or search text changes
  useEffect(() => {
    if (vocabularyData.length > 0) {
      applyFilters();
    }
  }, [activeFilters, searchText, vocabularyData, showingBookmarks]);

  // Apply filters to the vocabulary data
  const applyFilters = () => {
    let filtered = [...vocabularyData];

    // Show only bookmarked words if in bookmarks mode
    if (showingBookmarks) {
      filtered = filtered.filter((word) => word.starred);
    } else {
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
    }

    // Apply search text (applies in both normal and bookmark mode)
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

  // Toggle star/bookmark for a word
  const toggleStarWord = useCallback(async (id: string) => {
    // Update state
    setVocabularyData((prev) => {
      const updatedData = prev.map((word) => {
        if (word.id === id) {
          return {
            ...word,
            starred: !word.starred,
          };
        }
        return word;
      });

      // Save updated bookmarks to AsyncStorage
      const bookmarkedIds = updatedData
        .filter((word) => word.starred)
        .map((word) => word.id);

      AsyncStorage.setItem(
        BOOKMARKED_WORDS_KEY,
        JSON.stringify(bookmarkedIds)
      ).catch((error) => console.error("Error saving bookmarks:", error));

      return updatedData;
    });
  }, []);

  // Toggle between normal view and bookmarks view
  const toggleBookmarksView = () => {
    setShowingBookmarks(!showingBookmarks);
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
    setShowingBookmarks(false);
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
          isActive
            ? posColor
              ? { backgroundColor: posColor, borderColor: posColor }
              : styles.activeFilter
            : {},
          style,
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
  const ScrollableFilterRow = ({ children }: { children: React.ReactNode }) => (
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
    if (showingBookmarks) {
      return "Showing bookmarked words only";
    }

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

  // Get bookmarked words count
  const getBookmarkedCount = () => {
    return vocabularyData.filter((word) => word.starred).length;
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
        title={showingBookmarks ? "Từ vựng đã lưu" : "Từ vựng"}
        showBackButton={false}
        rightIcon={
          <View style={styles.bookmarkIconContainer}>
            <Feather
              name="bookmark"
              size={22}
              color={showingBookmarks ? "#4B79E4" : "#333"}
            />
            {getBookmarkedCount() > 0 && (
              <View style={styles.bookmarkBadge}>
                <Text style={styles.bookmarkBadgeText}>
                  {getBookmarkedCount()}
                </Text>
              </View>
            )}
          </View>
        }
        onRightPress={toggleBookmarksView}
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
        </View>
      )}

      {!showingBookmarks && (
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
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.letterGrid}
              >
                {letterOptions.map((letter) => (
                  <TouchableOpacity
                    key={letter}
                    style={[
                      styles.letterButton,
                      activeFilters.letter === letter &&
                        styles.activeLetterButton,
                    ]}
                    onPress={() => toggleLetterFilter(letter)}
                  >
                    <Text
                      style={[
                        styles.letterText,
                        activeFilters.letter === letter &&
                          styles.activeLetterText,
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
                <Text style={styles.activeFiltersText}>
                  {getActiveFiltersText()}
                </Text>
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
      )}

      {isLoading ? (
        <LoadingView />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <WordItem item={item} onToggleStar={toggleStarWord} />
          )}
          keyExtractor={(item) => item.id}
          style={styles.wordList}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              {showingBookmarks ? (
                <>
                  <Ionicons name="bookmark-outline" size={48} color="#CCC" />
                  <Text style={styles.emptyText}>
                    No bookmarked words found
                  </Text>
                </>
              ) : (
                <>
                  <Ionicons name="search-outline" size={48} color="#CCC" />
                  <Text style={styles.emptyText}>
                    No words found matching your filters
                  </Text>
                </>
              )}
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
    backgroundColor: "#F5F5F7",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    height: 44,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  searchPromptContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  searchPrompt: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
    height: 44,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchPromptText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#777",
  },
  wordCount: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 16,
  },
  wordCountText: {
    fontSize: 12,
    color: "#555",
  },
  filterSection: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterRow: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  scrollableRow: {
    flexDirection: "row",
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    fontSize: 14,
    color: "#555",
  },
  activeFilter: {
    backgroundColor: "#4B79E4",
    borderColor: "#4B79E4",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  checkIcon: {
    marginRight: 4,
  },
  letterGrid: {
    flexDirection: "row",
  },
  letterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "#F0F0F0",
  },
  activeLetterButton: {
    backgroundColor: "#4B79E4",
  },
  letterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  activeLetterText: {
    color: "#FFFFFF",
  },
  activeFiltersRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
  },
  filterSummary: {
    flexDirection: "row",
    alignItems: "center",
  },
  activeFiltersText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  clearFiltersButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "#F0F0F0",
  },
  clearFiltersText: {
    fontSize: 12,
    color: "#555",
  },
  wordList: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    marginTop: 12,
    marginBottom: 16,
  },
  resetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#4B79E4",
    borderRadius: 8,
  },
  resetButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  bookmarkIconContainer: {
    position: "relative",
  },
  bookmarkBadge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "#4B79E4",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  bookmarkBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
