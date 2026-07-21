import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Pressable,
  Animated,
  Dimensions,
  Easing,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8;

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: 'settings' | 'pricing' | string;
  onSelectSettings?: () => void;
  onSelectPricing?: () => void;
  onLogout?: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  selectedItem = '',
  onSelectSettings,
  onSelectPricing,
  onLogout,
}) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(isOpen);

  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(animValue, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animValue, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [isOpen, animValue]);

  if (!modalVisible) return null;

  const backdropOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [DRAWER_WIDTH, 0],
  });

  const androidStatusBar = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;
  const topPadding = Math.max(insets.top, androidStatusBar + 16, 48);

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View className="flex-1 flex-row">
        {/* Dimmed backdrop area */}
        <Animated.View style={{ opacity: backdropOpacity }} className="absolute inset-0 bg-black">
          <Pressable className="flex-1" onPress={onClose} />
        </Animated.View>

        <Pressable className="flex-1" onPress={onClose} />

        {/* Right Drawer Panel with Smooth Slide Transition */}
        <Animated.View
          style={{
            transform: [{ translateX }],
            width: DRAWER_WIDTH,
            paddingTop: topPadding,
            paddingBottom: Math.max(insets.bottom, 24),
          }}
          className="bg-white h-full px-5 shadow-2xl"
        >
          {/* Drawer Header */}
          <View className="flex-row items-center justify-between mb-8">
            <View className="flex-row items-center">
              <Image
                source={require('../../../assets/logo.png')}
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
              <Text className="text-lg font-bold text-[#1A1D1E] tracking-tight ml-2">
                Medical<Text className="text-[#288BDC]">Exam</Text>Pro
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onClose}
              className="w-10 h-10 rounded-full bg-[#E9ECEF] items-center justify-center"
            >
              <Ionicons name="close" size={22} color="#1A1D1E" />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View className="space-y-1">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                onClose();
                if (onSelectSettings) onSelectSettings();
              }}
              className={`p-3.5 rounded-2xl mb-1 ${
                selectedItem === 'settings' ? 'bg-[#E9ECEF]' : 'bg-transparent'
              }`}
            >
              <Text className="text-[#1A1D1E] font-semibold text-base">
                {t('profile.settings', 'Settings')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                onClose();
                if (onSelectPricing) onSelectPricing();
              }}
              className={`p-3.5 rounded-2xl mb-1 ${
                selectedItem === 'pricing' ? 'bg-[#E9ECEF]' : 'bg-transparent'
              }`}
            >
              <Text className="text-[#1A1D1E] font-semibold text-base">
                {t('auth.pricing', 'Pricing')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                onClose();
                if (onLogout) onLogout();
              }}
              className="p-3.5 rounded-2xl mt-1"
            >
              <Text className="text-[#FF5B5C] font-semibold text-base">
                {t('profile.logout', 'Log out')}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
