import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../auth/data/authStore';
import { NavigationService } from '../../../helpers/NavigationService';
import { Routes } from '../../../helpers/Routes';
import { useQBankStore } from '../../qbank/data/qbankStore';
import { CARD_QUESTION_MAP } from '../../qbank/data/mockQuestions';

export const HomeScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { logout } = useAuthStore();
  const { lastActiveCardId, sessions } = useQBankStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<'settings' | 'pricing' | 'logout'>(
    'settings',
  );

  const activeCardId =
    lastActiveCardId && sessions[lastActiveCardId] && !sessions[lastActiveCardId].isCompleted
      ? lastActiveCardId
      : null;

  const currentSet = CARD_QUESTION_MAP[activeCardId || '1'] || CARD_QUESTION_MAP['1'];
  const activeSessionData = activeCardId ? sessions[activeCardId] : null;
  const currentQNum = activeSessionData ? activeSessionData.currentIndex + 1 : 1;
  const totalQCount = currentSet.questions.length;
  const progressPercent = activeSessionData
    ? Math.min(100, Math.round((currentQNum / totalQCount) * 100))
    : 0;

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
    NavigationService.navigateToReplacement(Routes.loginScreen);
  };

  const handleMenuItemPress = (item: 'settings' | 'pricing') => {
    setSelectedMenuItem(item);
    setIsMenuOpen(false);
    if (item === 'settings') {
      NavigationService.navigateTo(Routes.profile);
    } else if (item === 'pricing') {
      NavigationService.navigateTo(Routes.pricingScreen);
    }
  };

  const handleResumePress = () => {
    router.push({
      pathname: Routes.practiceSessionScreen,
      params: { cardId: activeCardId || '1' },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <ScrollView className="flex-1 px-5 pt-3 pb-8" showsVerticalScrollIndicator={false}>
        {/* Top App Header */}
        <View className="flex-row items-center justify-between mt-2 mb-4">
          <View className="flex-row items-center space-x-2">
            <Image
              source={require('../../../../assets/logo.png')}
              style={{ width: 34, height: 34 }}
              resizeMode="contain"
            />
            <Text className="text-xl font-bold text-[#1A1D1E] tracking-tight ml-2">
              Medical<Text className="text-[#288BDC]">Exam</Text>Pro
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsMenuOpen(true)}
            className="w-10 h-10 rounded-full bg-[#E9ECEF] items-center justify-center"
          >
            <Ionicons name="menu" size={22} color="#1A1D1E" />
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <Text className="text-2xl font-bold text-[#1A1D1E] mb-5">Welcome Back, Alex</Text>

        {/* Featured Course Progress Card */}
        <View className="bg-[#124D73] rounded-3xl p-5 mb-5 shadow-sm">
          <Text className="text-sky-200/80 text-xs font-medium mb-3">Start where you left off</Text>
          <Text className="text-white text-xl font-bold mb-2 leading-snug">
            {currentSet.title}
          </Text>
          <Text className="text-slate-300 text-xs leading-relaxed mb-4">
            {activeSessionData
              ? `You stopped at question ${currentQNum} of ${totalQCount}. Continue the same timed set, then review explanations.`
              : 'Start a fresh practice session from 4,500+ clinical and SJT questions.'}
          </Text>

          {/* Inner Progress Box */}
          <View className="bg-[#0B3754] p-4 rounded-2xl mb-5">
            <View className="flex-row justify-between items-center">
              <Text className="text-white text-xs font-semibold">Current Progress</Text>
              <Text className="text-white text-xs font-bold">{`${progressPercent}%`}</Text>
            </View>
            <View className="w-full bg-[#1D4A6B] h-2.5 rounded-full mt-2.5 overflow-hidden">
              <View
                className="bg-[#288BDC] h-full rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </View>
          </View>

          {/* Resume Action Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleResumePress}
            className="bg-[#FF6B2C] rounded-full px-5 py-3 flex-row items-center self-start"
          >
            <Text className="text-white font-bold text-sm mr-1.5">
              {activeSessionData ? 'Resume set' : 'Start session'}
            </Text>
            <Ionicons name="chevron-forward" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* 2x2 Stats Grid */}
        <View className="flex-row mb-3">
          {/* Card 1: Questions attempted */}
          <View className="flex-1 bg-white p-4 rounded-2xl border border-gray-100/80 shadow-sm mr-1.5 flex-row items-center justify-between">
            <View className="flex-1 pr-1">
              <Text className="text-gray-400 text-[11px] font-medium mb-1" numberOfLines={1}>
                Questions attempted
              </Text>
              <Text className="text-[#1A1D1E] font-bold text-base">428 / 1,200</Text>
              <Text className="text-gray-400 text-[10px] mt-0.5">36% completed</Text>
            </View>
            <View className="w-11 h-11 rounded-full border-4 border-[#288BDC] items-center justify-center bg-blue-50/50">
              <Text className="text-[#1A1D1E] text-[10px] font-bold">36%</Text>
            </View>
          </View>

          {/* Card 2: Accuracy */}
          <View className="flex-1 bg-white p-4 rounded-2xl border border-gray-100/80 shadow-sm ml-1.5 flex-row items-center justify-between">
            <View className="flex-1 pr-1">
              <Text className="text-gray-400 text-[11px] font-medium mb-1" numberOfLines={1}>
                Accuracy
              </Text>
              <Text className="text-[#1A1D1E] font-bold text-base">318 / 428</Text>
              <Text className="text-gray-400 text-[10px] mt-0.5">74% correct</Text>
            </View>
            <View className="w-11 h-11 rounded-full border-4 border-[#288BDC] items-center justify-center bg-blue-50/50">
              <Text className="text-[#1A1D1E] text-[10px] font-bold">74%</Text>
            </View>
          </View>
        </View>

        <View className="flex-row mb-6">
          {/* Card 3: Average answering time */}
          <View className="flex-1 bg-white p-4 rounded-2xl border border-gray-100/80 shadow-sm mr-1.5">
            <Text className="text-gray-400 text-[11px] font-medium mb-1">
              Average answering time
            </Text>
            <Text className="text-[#1A1D1E] font-bold text-base">82 sec</Text>
            <Text className="text-gray-400 text-[10px] mt-0.5">Per attempted question</Text>
          </View>

          {/* Card 4: Weakest areas */}
          <View className="flex-1 bg-white p-4 rounded-2xl border border-gray-100/80 shadow-sm ml-1.5">
            <Text className="text-gray-400 text-[11px] font-medium mb-1">Weakest areas</Text>
            <Text className="text-[#1A1D1E] font-bold text-base" numberOfLines={1}>
              Renal, Ethics
            </Text>
            <Text className="text-gray-400 text-[10px] mt-0.5">42 questions to revisit</Text>
          </View>
        </View>

        {/* Professional Dilemmas Section */}
        <Text className="text-lg font-bold text-[#1A1D1E] mb-3">Professional Dilemmas</Text>

        <View className="flex-row flex-wrap justify-between pb-6">
          {/* Dilemma Card 1 */}
          <View className="w-[48.5%] bg-white rounded-2xl border border-gray-100/80 p-2.5 mb-3 shadow-sm">
            <Image
              source={require('../../../../assets/professional_integrity.png')}
              className="w-full h-24 rounded-xl mb-2"
              resizeMode="cover"
            />
            <Text className="text-[#1A1D1E] font-bold text-xs mb-0.5">Professional Integrity</Text>
            <Text className="text-gray-400 text-[10px]" numberOfLines={1}>
              Probity, safety and candour
            </Text>
          </View>

          {/* Dilemma Card 2 */}
          <View className="w-[48.5%] bg-white rounded-2xl border border-gray-100/80 p-2.5 mb-3 shadow-sm">
            <Image
              source={require('../../../../assets/coping_pressure.png')}
              className="w-full h-24 rounded-xl mb-2"
              resizeMode="cover"
            />
            <Text className="text-[#1A1D1E] font-bold text-xs mb-0.5">Coping with Pressure</Text>
            <Text className="text-gray-400 text-[10px]" numberOfLines={1}>
              Prioritisation under stress
            </Text>
          </View>

          {/* Dilemma Card 3 */}
          <View className="w-[48.5%] bg-white rounded-2xl border border-gray-100/80 p-2.5 mb-3 shadow-sm">
            <Image
              source={require('../../../../assets/empathy_sensitivity.png')}
              className="w-full h-24 rounded-xl mb-2"
              resizeMode="cover"
            />
            <Text className="text-[#1A1D1E] font-bold text-xs mb-0.5">Empathy and Sensitivity</Text>
            <Text className="text-gray-400 text-[10px]" numberOfLines={1}>
              Patient-centred judgement
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Slide-out Menu Modal */}
      <Modal
        visible={isMenuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <View className="flex-1 flex-row bg-black/40">
          {/* Dimmed backdrop area on left */}
          <TouchableOpacity
            className="w-[20%]"
            activeOpacity={1}
            onPress={() => setIsMenuOpen(false)}
          />

          {/* Right Drawer Panel */}
          <SafeAreaView className="w-[80%] bg-white h-full px-5 pt-3 pb-8">
            {/* Drawer Header */}
            <View className="flex-row items-center justify-between mt-2 mb-8">
              <View className="flex-row items-center">
                <Image
                  source={require('../../../../assets/logo.png')}
                  style={{ width: 28, height: 28 }}
                  resizeMode="contain"
                />
                <Text className="text-lg font-bold text-[#1A1D1E] tracking-tight ml-2">
                  Medical<Text className="text-[#288BDC]">Exam</Text>Pro
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-[#E9ECEF] items-center justify-center"
              >
                <Ionicons name="close" size={22} color="#1A1D1E" />
              </TouchableOpacity>
            </View>

            {/* Menu Items */}
            <View className="space-y-1">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleMenuItemPress('settings')}
                className={`p-3.5 rounded-2xl mb-1 ${
                  selectedMenuItem === 'settings' ? 'bg-[#E9ECEF]' : 'bg-transparent'
                }`}
              >
                <Text className="text-[#1A1D1E] font-semibold text-base">
                  {t('profile.settings', 'Settings')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleMenuItemPress('pricing')}
                className={`p-3.5 rounded-2xl mb-1 ${
                  selectedMenuItem === 'pricing' ? 'bg-[#E9ECEF]' : 'bg-transparent'
                }`}
              >
                <Text className="text-[#1A1D1E] font-semibold text-base">
                  {t('auth.pricing', 'Pricing')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleLogout}
                className="p-3.5 rounded-2xl mt-1"
              >
                <Text className="text-[#FF5B5C] font-semibold text-base">
                  {t('profile.logout', 'Log out')}
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
