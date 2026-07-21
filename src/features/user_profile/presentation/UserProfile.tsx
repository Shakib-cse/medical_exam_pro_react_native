import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useProfileStore } from '../data/profileStore';
import { useAuthStore } from '../../auth/data/authStore';
import { CustomButton } from '../../../common/components/CustomButton';
import { NavigationService } from '../../../helpers/NavigationService';
import { Routes } from '../../../helpers/Routes';
import { SideDrawer } from '../../../common/components/SideDrawer';

export const UserProfileScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { profile, isLoading, fetchProfile } = useProfileStore();
  const { logout } = useAuthStore();

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<'settings' | 'pricing' | 'logout'>(
    'settings',
  );

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleLogout = () => {
    setIsSideMenuOpen(false);
    logout();
    NavigationService.navigateToReplacement(Routes.loginScreen);
  };

  const handleMenuItemPress = (item: 'settings' | 'pricing') => {
    setSelectedMenuItem(item);
    setIsSideMenuOpen(false);
    if (item === 'settings') {
      // Already on settings/profile screen
    } else if (item === 'pricing') {
      NavigationService.navigateTo(Routes.pricingScreen);
    }
  };

  if (isLoading || !profile) {
    return (
      <View
        className="flex-1 justify-center items-center bg-[#F8F9FA]"
        style={{ paddingTop: Math.max(insets.top, 12) }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <ActivityIndicator size="large" color="#288BDC" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#F8F9FA]" style={{ paddingTop: Math.max(insets.top, 12) }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Top Navigation Bar */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-[#F8F9FA]">
        {/* Back Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.back()}
          className="w-10 h-10 bg-[#E2E8F0] rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="#1E293B" />
        </TouchableOpacity>

        {/* Header Title */}
        <Text className="text-lg font-bold text-[#0F2942]">
          {t('profile.settings', 'Settings')}
        </Text>

        {/* Menu Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsSideMenuOpen(true)}
          className="w-10 h-10 bg-[#E2E8F0] rounded-full items-center justify-center"
        >
          <Ionicons name="menu-outline" size={22} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5 pt-4 pb-8" showsVerticalScrollIndicator={false}>
        {/* Profile Header Card */}
        <View className="bg-white rounded-3xl p-6 shadow-sm items-center mb-6 border border-[#E9ECEF]">
          <View className="w-24 h-24 bg-[#EBF5FF] rounded-full justify-center items-center mb-4 border-2 border-[#288BDC]">
            <Text className="text-3xl font-bold text-[#288BDC]">{profile.name.charAt(0)}</Text>
          </View>
          <Text className="text-2xl font-bold text-[#1A1D1E]">{profile.name}</Text>
          <Text className="text-[#6C757D] text-sm mt-1 font-medium">{profile.email}</Text>
          {profile.phone && (
            <Text className="text-[#6C757D] text-sm mt-1 font-medium">{profile.phone}</Text>
          )}
        </View>

        {/* Actions */}
        <View className="space-y-3">
          <CustomButton title="Edit Profile" onPress={() => console.log('Edit Profile Pressed')} />
          <View className="mt-3">
            <CustomButton title="Log Out" onPress={handleLogout} />
          </View>
        </View>
      </ScrollView>

      {/* Side Navigation Drawer */}
      <SideDrawer
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        selectedItem={selectedMenuItem}
        onSelectSettings={() => handleMenuItemPress('settings')}
        onSelectPricing={() => handleMenuItemPress('pricing')}
        onLogout={handleLogout}
      />
    </View>
  );
};
