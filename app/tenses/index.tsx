import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import Header from "@/components/ui/Header";
import { LinearGradient } from "expo-linear-gradient";
import { tenses } from "@/data/tenses";
import { router } from "expo-router";
const { width } = Dimensions.get("window");

export default function Tenses() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      {/* Header  */}
      <Header
        title="English Tenses"
        showBackButton={true}
        rightIcon={<Feather name="more-vertical" size={22} color="#333" />}
        onRightPress={() => console.log("Right button pressed")}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#777" />
          <Text style={styles.searchPlaceholder}>Search tenses...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="sliders" size={20} color="#4B79E4" />
        </TouchableOpacity>
      </View>

      {/* Stats bar */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>7</Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
      </View>

      <ScrollView
        style={styles.grammarBox}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Tenses Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Basic Tenses</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>See all</Text>
          </TouchableOpacity>
        </View>

        {tenses.map((tense, index) => (
          <TouchableOpacity
            onPress={() => router.push(tense.link as string)}
            key={index}
            style={styles.boxItem}
          >
            <LinearGradient
              colors={getGradientColors(index)}
              style={styles.iconBackground}
            >
              <Image
                style={styles.boxIcon}
                source={require("../../assets/images/grammar/tenses.png")}
              />
            </LinearGradient>

            <View style={styles.textContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.boxTitle}>{tense.title}</Text>
                {index < 3 && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Popular</Text>
                  </View>
                )}
              </View>
              <Text style={styles.boxSubTitle} numberOfLines={2}>
                {tense.use}
              </Text>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: getProgressWidth(index) },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{getProgress(index)}</Text>
              </View>
            </View>

            <MaterialIcons name="keyboard-arrow-right" size={24} color="#aaa" />
          </TouchableOpacity>
        ))}

        {/* New Grammar Section */}
        <View style={styles.newGrammarSection}>
          <LinearGradient
            colors={["#FFF7E0", "#FFF0C8"]}
            style={styles.newGrammarContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.newGrammarContent}>
              <View style={styles.newBadge}>
                <MaterialIcons name="new-releases" size={14} color="#FFF" />
                <Text style={styles.newBadgeText}>NEW</Text>
              </View>

              <Text style={styles.newGrammarTitle}>Master Advanced Tenses</Text>
              <Text style={styles.newGrammarSubtitle}>
                Our latest grammar lessons include perfect continuous forms and
                conditional tenses
              </Text>

              <TouchableOpacity style={styles.exploreButton}>
                <Text style={styles.exploreButtonText}>Explore Now</Text>
                <Feather
                  name="arrow-right"
                  size={14}
                  color="#FFF"
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
            </View>

            <Image
              source={require("../../assets/images/grammar/tenses.png")}
              style={styles.newGrammarImage}
            />
          </LinearGradient>
        </View>

        {/* Practice Section */}
        <View style={styles.practiceSection}>
          <LinearGradient
            colors={["#E0F7FF", "#C8E8FF"]}
            style={styles.practiceContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.practiceContent}>
              <Text style={styles.practiceTitle}>Daily Practice</Text>
              <Text style={styles.practiceSubtitle}>
                Complete today's tense exercises to improve your skills
              </Text>

              <TouchableOpacity style={styles.practiceButton}>
                <Text style={styles.practiceButtonText}>Start Practice</Text>
                <Feather
                  name="play"
                  size={14}
                  color="#4B79E4"
                  style={styles.practiceButtonIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.practiceStatsContainer}>
              <View style={styles.practiceStatItem}>
                <Text style={styles.practiceStatValue}>85%</Text>
                <Text style={styles.practiceStatLabel}>Accuracy</Text>
              </View>
              <View style={styles.practiceStatItem}>
                <Text style={styles.practiceStatValue}>12</Text>
                <Text style={styles.practiceStatLabel}>Day Streak</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper functions for dynamic values
function getGradientColors(index) {
  const colorSets = [
    ["#4B79E4", "#3D6AD6"], // Blue
    ["#FF9500", "#FF7A00"], // Orange
    ["#33C759", "#28A745"], // Green
    ["#AF52DE", "#9741C9"], // Purple
    ["#FF3B30", "#E02D22"], // Red
    ["#34C759", "#2BB14C"], // Green
    ["#FF9500", "#FF7A00"], // Orange
  ];
  return colorSets[index % colorSets.length];
}

function getProgress(index: number): string {
  const progress = ["75%", "60%", "90%", "40%", "25%", "85%", "10%"];
  return progress[index % progress.length];
}

function getProgressWidth(index: number): string {
  const progress = ["75%", "60%", "90%", "40%", "25%", "85%", "10%"];
  return progress[index % progress.length];
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
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
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F7",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F5F5F7",
    borderRadius: 12,
  },
  searchPlaceholder: {
    color: "#999",
    marginLeft: 10,
    fontSize: 14,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F5F5F7",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#F8F9FD",
    marginHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E0E0E0",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  seeAllButton: {
    fontSize: 14,
    color: "#4B79E4",
    fontWeight: "600",
  },
  grammarBox: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  boxItem: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  iconBackground: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  popularBadge: {
    backgroundColor: "#FFF0C8",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  popularText: {
    color: "#FF9800",
    fontSize: 10,
    fontWeight: "600",
  },
  boxSubTitle: {
    color: "#777",
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 18,
  },
  boxIcon: {
    width: 28,
    height: 28,
    tintColor: "#FFFFFF",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#F0F0F0",
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: 4,
    backgroundColor: "#4B79E4",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: "#999",
    width: 30,
  },
  newGrammarSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  newGrammarContainer: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 20,
    overflow: "hidden",
    alignItems: "center",
  },
  newGrammarContent: {
    flex: 1,
  },
  newBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF9800",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  newBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 4,
  },
  newGrammarTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  newGrammarSubtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 16,
    lineHeight: 18,
  },
  newGrammarImage: {
    width: 80,
    height: 80,
    tintColor: "#FF9800",
    opacity: 0.8,
  },
  exploreButton: {
    backgroundColor: "#FF9800",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  exploreButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 13,
  },
  buttonIcon: {
    marginLeft: 6,
  },
  practiceSection: {
    marginBottom: 20,
  },
  practiceContainer: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 20,
    overflow: "hidden",
  },
  practiceContent: {
    flex: 1,
  },
  practiceTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  practiceSubtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 16,
    lineHeight: 18,
  },
  practiceButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  practiceButtonText: {
    color: "#4B79E4",
    fontWeight: "600",
    fontSize: 13,
  },
  practiceButtonIcon: {
    marginLeft: 6,
  },
  practiceStatsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
  },
  practiceStatItem: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
    width: 80,
  },
  practiceStatValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4B79E4",
  },
  practiceStatLabel: {
    fontSize: 10,
    color: "#777",
  },
});
