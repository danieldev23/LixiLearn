import { Audio } from 'expo-av';

export async function playPronunciation(uri: string) {
  const { sound } = await Audio.Sound.createAsync({
    uri: uri
  });
  await sound.playAsync();
} 