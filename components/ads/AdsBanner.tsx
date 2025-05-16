import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  MobileAds,
  TestIds,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';

const BANNER_AD_UNIT_ID = __DEV__ 
  ? TestIds.BANNER 
  : 'ca-app-pub-8307719942892591~8558622618';

const INTERSTITIAL_AD_UNIT_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-8307719942892591~8558622618';

const REWARDED_AD_UNIT_ID = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-8307719942892591~8558622618';

const AdsComponent = () => {
  useEffect(() => {
    MobileAds()
      .initialize()
      .then(adapterStatuses => {
        // Xử lý sau khi khởi tạo
        console.log('Ads Initialized', adapterStatuses);
      });
  }, []);

  // Banner Ads
  const BannerAdComponent = () => (
    <View style={styles.adContainer}>
      <BannerAd
        unitId={BANNER_AD_UNIT_ID}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log('Banner ad loaded');
        }}
        onAdFailedToLoad={(error) => {
          console.error('Banner ad failed to load', error);
        }}
      />
    </View>
  );

  // Interstitial Ads (Toàn màn hình)
  const showInterstitialAd = () => {
    // Tạo quảng cáo toàn màn hình
    const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_AD_UNIT_ID, {
      requestNonPersonalizedAdsOnly: true,
    });

    // Lắng nghe sự kiện
    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show();
    });

    // Nạp quảng cáo
    interstitial.load();
  };

  // Rewarded Ads (Quảng cáo có phần thưởng)
  const showRewardedAd = () => {
    const rewarded = RewardedAd.createForAdRequest(REWARDED_AD_UNIT_ID, {
      requestNonPersonalizedAdsOnly: true,
    });

    // Lắng nghe sự kiện
    rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
      // Xử lý khi người dùng nhận được phần thưởng
      console.log('Reward earned:', reward);
    });

    // Lắng nghe sự kiện đầy đủ
    rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewarded.show();
    });

    // Nạp quảng cáo
    rewarded.load();
  };

  return (
    <View style={styles.container}>
      {/* Banner Ads luôn hiển thị */}
      <BannerAdComponent />

      {/* Nút hiển thị Interstitial Ads */}
      <TouchableOpacity 
        style={styles.adButton} 
        onPress={showInterstitialAd}
      >
        <Text>Hiển thị Quảng cáo Toàn màn hình</Text>
      </TouchableOpacity>

      {/* Nút hiển thị Rewarded Ads */}
      <TouchableOpacity 
        style={styles.adButton} 
        onPress={showRewardedAd}
      >
        <Text>Nhận Phần thưởng từ Quảng cáo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  adButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default AdsComponent;