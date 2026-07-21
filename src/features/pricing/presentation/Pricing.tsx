import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Routes } from '../../../helpers/Routes';
import { useAuthStore } from '../../auth/data/authStore';
import { NavigationService } from '../../../helpers/NavigationService';
import { SideDrawer } from '../../../common/components/SideDrawer';

export const PricingScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { logout } = useAuthStore();
  const { width: windowWidth } = useWindowDimensions();

  const scrollViewRef = useRef<ScrollView>(null);

  // Width of Card 1 = 280, margin = 16. Width of Card 2 = 290. Padding horizontal = 20.
  // Center of Card 2 in content = 20 + 280 + 16 + 145 = 461.
  // Scroll X offset to center Card 2 on screen = 461 - (windowWidth / 2).
  const initialOffset = Math.max(0, 461 - windowWidth / 2);

  useEffect(() => {
    // Ensure smooth default scroll position on mount for both iOS and Android
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollTo({ x: initialOffset, animated: false });
    }, 50);
    return () => clearTimeout(timer);
  }, [initialOffset]);

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<'settings' | 'pricing' | 'logout'>(
    'pricing',
  );

  const handleLogout = () => {
    setIsSideMenuOpen(false);
    logout();
    NavigationService.navigateToReplacement(Routes.loginScreen);
  };

  const handleMenuItemPress = (item: 'settings' | 'pricing') => {
    setSelectedMenuItem(item);
    setIsSideMenuOpen(false);
    if (item === 'settings') {
      NavigationService.navigateTo(Routes.profile);
    } else if (item === 'pricing') {
      NavigationService.navigateTo(Routes.pricingScreen);
    }
  };

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

        {/* Menu Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsSideMenuOpen(true)}
          className="w-10 h-10 bg-[#E2E8F0] rounded-full items-center justify-center"
        >
          <Ionicons name="menu-outline" size={22} color="#1E293B" />
        </TouchableOpacity>
      </View>

      {/* Title Header */}
      <View className="items-center px-6 mt-3 mb-6">
        <Text className="text-2xl font-bold text-[#0F2942] text-center mb-2">
          Simple, Transparent{'\n'}Pricing
        </Text>
        <Text className="text-[#64748B] text-xs text-center font-medium">
          Choose the plan that fits your exam timeline.
        </Text>
      </View>

      {/* Horizontal Scrollable Pricing Cards */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentOffset={{ x: initialOffset, y: 0 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          alignItems: 'center',
        }}
        className="flex-1"
      >
        {/* Card 1: Sample questions (Free) */}
        <View className="w-[280px] bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm mr-4 justify-between h-[390px]">
          <View>
            <Text className="font-bold text-base text-[#0F2942] mb-2">Sample questions</Text>
            <Text className="font-bold text-4xl text-[#0F2942] mb-5">Free</Text>
            <Text className="text-[#64748B] text-xs leading-relaxed">
              Access a selection of sample questions covering both clinical problem-solving and
              professional dilemma scenarios to explore the style, depth, and quality of the
              question bank.
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            className="w-full border border-[#E2E8F0] bg-white py-3 rounded-full items-center justify-center"
          >
            <Text className="text-[#0F2942] font-bold text-sm">Start Free</Text>
          </TouchableOpacity>
        </View>

        {/* Card 2: MSRA full question bank (£24.99) - MOST POPULAR */}
        <View className="items-center mr-4">
          {/* Badge */}
          <View className="bg-[#FF6B25] px-4 py-1.5 rounded-full z-10 -mb-4">
            <Text className="text-white font-bold text-[10px] tracking-wider uppercase">
              MOST POPULAR
            </Text>
          </View>

          {/* Main Card */}
          <View className="w-[290px] bg-[#0A2540] rounded-3xl p-6 pt-8 shadow-md justify-between h-[475px]">
            <View>
              <Text className="font-bold text-base text-white mb-2">MSRA full question bank</Text>
              <Text className="font-bold text-4xl text-white mb-1">£24.99</Text>
              <Text className="text-[#94A3B8] text-xs mb-5 font-medium">
                Ideal for structured preparation
              </Text>

              {/* Features List */}
              <View className="space-y-3">
                <View className="flex-row items-start space-x-2.5 mb-2.5">
                  <Ionicons name="checkmark" size={16} color="white" />
                  <Text className="text-white text-xs flex-1 ml-2 leading-tight">
                    Full access to more than{' '}
                    <Text className="text-[#FF6B25] font-bold">10,000</Text>
                  </Text>
                </View>

                <View className="flex-row items-start space-x-2.5 mb-2.5">
                  <Ionicons name="checkmark" size={16} color="white" />
                  <Text className="text-white text-xs flex-1 ml-2 leading-tight">
                    MSRA-style questions, including over{' '}
                    <Text className="text-[#FF6B25] font-bold">8,000</Text> problem-solving
                    questions,
                  </Text>
                </View>

                <View className="flex-row items-start space-x-2.5 mb-2.5">
                  <Ionicons name="checkmark" size={16} color="white" />
                  <Text className="text-white text-xs flex-1 ml-2 leading-tight">
                    <Text className="text-[#FF6B25] font-bold">2,500+</Text> professional dilemma
                    cases
                  </Text>
                </View>

                <View className="flex-row items-start space-x-2.5 mb-2.5">
                  <Ionicons name="checkmark" size={16} color="white" />
                  <Text className="text-white text-xs flex-1 ml-2 leading-tight">
                    access to <Text className="text-[#FF6B25] font-bold">10</Text> full mock exams
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              className="w-full bg-[#FF6B25] py-3.5 rounded-full items-center justify-center shadow-sm"
            >
              <Text className="text-white font-bold text-sm">Choose Plan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card 3: Standalone professional dilemmas (£8.99) */}
        <View className="w-[280px] bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm justify-between h-[390px]">
          <View>
            <Text className="font-bold text-base text-[#0F2942] mb-2 leading-snug">
              Standalone professional dilemmas
            </Text>
            <Text className="font-bold text-4xl text-[#0F2942] mb-5">£8.99</Text>
            <Text className="text-[#64748B] text-xs leading-relaxed">
              Dedicated access to professional dilemma cases only, designed for focused situational
              judgement practice.
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            className="w-full border border-[#E2E8F0] bg-white py-3 rounded-full items-center justify-center"
          >
            <Text className="text-[#0F2942] font-bold text-sm">Choose Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Slide-out Sidebar Drawer */}
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
