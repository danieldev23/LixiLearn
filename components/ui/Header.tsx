import { router } from 'expo-router';
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

type HeaderProps = {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
};

export default function Header({
  title = "Header",
  showBackButton = true,
  onBack,
  rightIcon,
  onRightPress,
}: HeaderProps) {
  const handleBack = () => {
    if (onBack) return onBack();
    router.back();
  };

  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity style={[styles.backButton, ]} onPress={handleBack}>
          <Feather name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} /> // placeholder để giữ layout
      )}

      <Text style={styles.headerTitle}>{title}</Text>

      {rightIcon ? (
        <TouchableOpacity style={styles.menuButton} onPress={onRightPress}>
          {rightIcon}
        </TouchableOpacity>
      ) : (
        <View style={styles.menuButton} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
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
    justifyContent: "center",
    alignItems: "center",
  },
});
