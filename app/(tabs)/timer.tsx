import React from 'react';
import { View, StyleSheet } from 'react-native';
import TimerScreen from '@/components/screens/TimerScreen';

export default function TimerPage() {
  return (
    <View style={styles.container}>
      <TimerScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});