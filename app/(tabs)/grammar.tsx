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
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
const { width } = Dimensions.get("window");

export default function Grammar(): React.ReactElement {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.starButton}>
          <LinearGradient
            colors={["#FFD700", "#FFA500"]}
            style={styles.premiumBadge}
          >
            <Ionicons name="star" size={14} color="#FFFFFF" />
          </LinearGradient>
          <Text style={styles.premiumText}>Premium</Text>
        </TouchableOpacity> */}

        <Text style={styles.headerTitle}>Grammar</Text>

        {/* <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity> */}
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#777" />
          <Text style={styles.searchPlaceholder}>Search grammar topics</Text>
        </View>
      </View>

      <ScrollView
        style={styles.grammarBox}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Essential Topics</Text>

        <TouchableOpacity style={styles.boxItem}>
          <LinearGradient
            colors={["#4B79E4", "#3D6AD6"]}
            style={styles.iconBackground}
          >
            <Image
              style={styles.boxIcon}
              source={require("../../assets/images/grammar/tenses.png")}
            />
          </LinearGradient>
          <TouchableOpacity
            onPress={() => router.push("/tenses")}
            style={styles.textContainer}
          >
            <Text style={styles.boxTitle}>Tenses</Text>
            <Text style={styles.boxSubTitle}>13 tenses in English</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: "75%" }]} />
              </View>
              <Text style={styles.progressText}>75%</Text>
            </View>
          </TouchableOpacity>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxItem}>
          <LinearGradient
            colors={["#FF7676", "#F05454"]}
            style={styles.iconBackground}
          >
            <Image
              style={styles.boxIcon}
              source={require("../../assets/images/grammar/sentences.png")}
            />
          </LinearGradient>
          <TouchableOpacity onPress={() => router.push("/sentences")} style={styles.textContainer}>
            <Text style={styles.boxTitle}>Sentences</Text>
            <Text style={styles.boxSubTitle}>Sentences in English</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: "40%" }]} />
              </View>
              <Text style={styles.progressText}>40%</Text>
            </View>
          </TouchableOpacity>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Advanced Topics</Text>

        <TouchableOpacity style={styles.boxItem}>
          <LinearGradient
            colors={["#4ECDC4", "#26A69A"]}
            style={styles.iconBackground}
          >
            <Image
              style={styles.boxIcon}
              source={require("../../assets/images/grammar/words.png")}
            />
          </LinearGradient>
          <View style={styles.textContainer}>
            <Text style={styles.boxTitle}>Words</Text>
            <Text style={styles.boxSubTitle}>Words in English</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: "60%" }]} />
              </View>
              <Text style={styles.progressText}>60%</Text>
            </View>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxItem}>
          <LinearGradient
            colors={["#9370DB", "#8257DB"]}
            style={styles.iconBackground}
          >
            <Image
              style={styles.boxIcon}
              source={require("../../assets/images/grammar/others.png")}
            />
          </LinearGradient>
          <View style={styles.textContainer}>
            <Text style={styles.boxTitle}>Others</Text>
            <Text style={styles.boxSubTitle}>Other grammar topics</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: "20%" }]} />
              </View>
              <Text style={styles.progressText}>20%</Text>
            </View>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
        </TouchableOpacity>

        <View style={styles.newGrammarSection}>
          <LinearGradient
            colors={["#FFF7E0", "#FFF0C8"]}
            style={styles.newGrammarContainer}
          >
            <View style={styles.newGrammarContent}>
              <MaterialIcons name="new-releases" size={24} color="#FF9800" />
              <Text style={styles.newGrammarTitle}>New Grammar Topics</Text>
              <Text style={styles.newGrammarSubtitle}>
                Explore our latest grammar lessons, updated weekly
              </Text>
              <TouchableOpacity style={styles.exploreButton}>
                <Text style={styles.exploreButtonText}>Explore Now</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  starButton: {
    flexDirection: "row",
    alignItems: "center",
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchBar: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
    marginTop: 8,
  },
  grammarBox: {
    paddingHorizontal: 20,
    paddingTop: 10,
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
    shadowRadius: 5,
    elevation: 2,
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
  boxTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  boxSubTitle: {
    color: "#777",
    fontSize: 13,
    marginBottom: 8,
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
    marginBottom: 26,
  },
  newGrammarContainer: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    overflow: "hidden",
  },
  newGrammarContent: {
    flex: 1,
  },
  newGrammarTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginTop: 8,
    marginBottom: 4,
  },
  newGrammarSubtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
  },
  newGrammarImage: {
    width: 60,
    height: 60,
  },
  exploreButton: {
    backgroundColor: "#FF9800",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  exploreButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 12,
  },
});
