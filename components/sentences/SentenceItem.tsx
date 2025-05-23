
import { router } from "expo-router";
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import {
    Animated,
    TouchableOpacity,
    StyleSheet,
    View,
    Text
} from "react-native";

export const SentenceItem = (item: any, index: number) => {
    const [animatedValue] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    });
    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    return (
        <Animated.View
            key={item.id}
            style={{ opacity, transform: [{ translateY }] }}
        >
            <TouchableOpacity
                style={[styles.sentenceItem]}
                onPress={() => router.push(item.link)}
                activeOpacity={0.8}
            >
                <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
                    <Feather name={item.icon} size={22} color={item.iconColor} />
                </View>

                <View style={styles.sentenceInfo}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.sentenceTitle}>{item.title}</Text>
                        {item.premium && (
                            <View style={styles.premiumBadge}>
                                <Feather name="gift" size={10} color="#FFFFFF" />
                                <Text style={styles.premiumText}>PRO</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.sentenceDescription}>{item.use}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    heroSection: {
        paddingHorizontal: 20,
        paddingVertical: 24,
        backgroundColor: '#F5F8FF',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        alignItems: 'center',
    },
    heroImageContainer: {
        width: 64,
        height: 64,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#4A89DC',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 8,
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 15,
        color: '#667280',
        textAlign: 'center',
        lineHeight: 22,
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F5',
        backgroundColor: '#FFFFFF',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F7FA',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#2D3748',
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 80,
    },
    sentenceItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F0F0F5',
    },
    selectedItem: {
        borderColor: '#4A89DC',
        borderWidth: 2,
        shadowColor: '#4A89DC',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    sentenceInfo: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    sentenceTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
        marginRight: 8,
    },
    premiumBadge: {
        backgroundColor: '#FFB800',
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    premiumText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 2,
    },
    sentenceDescription: {
        fontSize: 14,
        color: '#667280',
        lineHeight: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginLeft: 10,
    },
    checkboxSelected: {
        backgroundColor: '#4A89DC',
        borderColor: '#4A89DC',
    },
    practiceButton: {
        marginTop: 16,
        marginBottom: 20,
        backgroundColor: '#4A89DC',
        borderRadius: 16,
        shadowColor: '#4A89DC',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    practiceButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    practiceButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginRight: 8,
    },
    tipContainer: {
        position: 'absolute',
        bottom: 16,
        left: 20,
        right: 20,
    },
    tipContent: {
        backgroundColor: '#F5F8FF',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5EDFF',
    },
    tipText: {
        color: '#4A6285',
        marginLeft: 8,
        fontSize: 14,
    }
});