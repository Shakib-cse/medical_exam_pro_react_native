import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Routes } from '../../../helpers/Routes';
import { useAuthStore } from '../../auth/data/authStore';
import { NavigationService } from '../../../helpers/NavigationService';
import { SideDrawer } from '../../../common/components/SideDrawer';

export interface ExamModuleItem {
  id: string;
  title: string;
  badge: string;
  badgeType: 'warning' | 'danger' | 'info';
  durationMins: number;
  totalQuestions: number;
  bestScore: number;
}

export interface RecentResultItem {
  id: string;
  date: string;
  examType: string;
  score: number;
  scoreType: 'green' | 'yellow' | 'red';
  timeSpent: string;
}

const EXAM_MODULES: ExamModuleItem[] = [
  {
    id: 'cardio-resp',
    title: 'Cardiology & Respiratory Focus',
    badge: 'Moderate',
    badgeType: 'warning',
    durationMins: 45,
    totalQuestions: 50,
    bestScore: 72,
  },
  {
    id: 'neuro-renal',
    title: 'Neurology & Renal Deep Dive',
    badge: 'Advanced',
    badgeType: 'danger',
    durationMins: 45,
    totalQuestions: 50,
    bestScore: 58,
  },
  {
    id: 'sjt-pro',
    title: 'SJT Professionalism Module',
    badge: 'Clinical',
    badgeType: 'info',
    durationMins: 30,
    totalQuestions: 40,
    bestScore: 84,
  },
  {
    id: 'mixed-clinical',
    title: 'Mixed Clinical Review',
    badge: 'Standard',
    badgeType: 'warning',
    durationMins: 60,
    totalQuestions: 70,
    bestScore: 84,
  },
];

const RECENT_RESULTS: RecentResultItem[] = [
  {
    id: '1',
    date: 'Oct 24, 2023',
    examType: 'Full Mock Exam #2',
    score: 76,
    scoreType: 'green',
    timeSpent: '2h 55m',
  },
  {
    id: '2',
    date: 'Oct 18, 2023',
    examType: 'SJT Deep Dive',
    score: 82,
    scoreType: 'green',
    timeSpent: '28m 10s',
  },
  {
    id: '3',
    date: 'Oct 12, 2023',
    examType: 'Gold Standard Mock',
    score: 68,
    scoreType: 'yellow',
    timeSpent: '3h 05m',
  },
  {
    id: '4',
    date: 'Oct 05, 2023',
    examType: 'Neurology Module',
    score: 52,
    scoreType: 'red',
    timeSpent: '44m 30s',
  },
];

export const ExamCenterScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { logout } = useAuthStore();

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<'settings' | 'pricing' | 'logout'>(
    'settings',
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

  const handleStartPractice = (cardId: string) => {
    router.push({
      pathname: Routes.practiceSessionScreen,
      params: { cardId },
    });
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

      <ScrollView
        className="flex-1 px-4 pt-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header & Subtitle */}
        <View className="mb-5">
          <Text className="text-2xl font-bold text-[#0F2942] mb-1.5">Exam Center</Text>
          <Text className="text-[#64748B] text-sm leading-relaxed">
            Refine your exam technique with full-length simulations and targeted practice modules.
          </Text>
        </View>

        {/* Practice Modules Cards List */}
        <View className="mb-6">
          {EXAM_MODULES.map((item) => {
            let badgeBg = 'bg-[#FEF3C7]';
            let badgeTextColor = 'text-[#D97706]';

            if (item.badgeType === 'danger') {
              badgeBg = 'bg-[#FEE2E2]';
              badgeTextColor = 'text-[#DC2626]';
            } else if (item.badgeType === 'info') {
              badgeBg = 'bg-[#E0F2FE]';
              badgeTextColor = 'text-[#0284C7]';
            }

            return (
              <View
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-sm mb-4"
              >
                {/* Title & Badge */}
                <View className="flex-row justify-between items-start mb-3">
                  <Text className="text-[#0F2942] font-bold text-base flex-1 pr-3 leading-snug">
                    {item.title}
                  </Text>
                  <View className={`${badgeBg} px-3 py-1 rounded-lg`}>
                    <Text className={`text-xs font-bold ${badgeTextColor}`}>{item.badge}</Text>
                  </View>
                </View>

                {/* Duration & Question Count */}
                <View className="flex-row items-center mb-4 space-x-4">
                  <View className="flex-row items-center space-x-1.5">
                    <Ionicons name="time-outline" size={16} color="#64748B" />
                    <Text className="text-xs font-semibold text-[#64748B] ml-1">
                      {item.durationMins} mins
                    </Text>
                  </View>
                  <View className="flex-row items-center space-x-1.5 ml-4">
                    <Ionicons name="document-text-outline" size={16} color="#64748B" />
                    <Text className="text-xs font-semibold text-[#64748B] ml-1">
                      {item.totalQuestions} Questions
                    </Text>
                  </View>
                </View>

                {/* Divider */}
                <View className="h-[1px] bg-[#F1F5F9] mb-4" />

                {/* Best Score & Start Practice Button */}
                <View className="flex-row justify-between items-center">
                  <Text className="text-[#64748B] text-xs font-medium">
                    Best Score: <Text className="text-[#0F2942] font-bold">{item.bestScore}%</Text>
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleStartPractice(item.id)}
                    className="border border-[#E2E8F0] bg-white py-2 px-4 rounded-xl items-center justify-center"
                  >
                    <Text className="text-[#0F2942] font-bold text-xs">Start Practice</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* Recent Results Table Section */}
        <View className="bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-sm">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="min-w-[570px]">
              {/* Table Header */}
              <View className="flex-row items-center pb-3 border-b border-[#F1F5F9] mb-2 px-1 bg-[#F8FAFC] py-2 rounded-xl">
                <Text className="text-xs font-bold text-[#64748B] w-[100px]">DATE</Text>
                <Text className="text-xs font-bold text-[#64748B] w-[160px]">EXAM TYPE</Text>
                <Text className="text-xs font-bold text-[#64748B] w-[80px] text-center">SCORE</Text>
                <Text className="text-xs font-bold text-[#64748B] w-[100px] text-center">
                  TIME TAKEN
                </Text>
                <Text className="text-xs font-bold text-[#64748B] w-[130px] text-right">
                  ACTION
                </Text>
              </View>

              {/* Table Rows */}
              {RECENT_RESULTS.map((row, idx) => {
                let scoreBg = 'bg-[#D1FAE5]';
                let scoreTextColor = 'text-[#047857]';

                if (row.scoreType === 'yellow') {
                  scoreBg = 'bg-[#FEF3C7]';
                  scoreTextColor = 'text-[#D97706]';
                } else if (row.scoreType === 'red') {
                  scoreBg = 'bg-[#FEE2E2]';
                  scoreTextColor = 'text-[#DC2626]';
                }

                return (
                  <View
                    key={row.id}
                    className={`flex-row items-center py-3.5 px-1 ${
                      idx < RECENT_RESULTS.length - 1 ? 'border-b border-[#F1F5F9]' : ''
                    }`}
                  >
                    <Text
                      className="text-xs font-medium text-[#475569] w-[100px]"
                      numberOfLines={1}
                    >
                      {row.date}
                    </Text>
                    <Text className="text-xs font-bold text-[#0F2942] w-[160px]" numberOfLines={1}>
                      {row.examType}
                    </Text>
                    <View className="w-[80px] items-center">
                      <View className={`${scoreBg} px-2.5 py-0.5 rounded-full`}>
                        <Text className={`text-[11px] font-bold ${scoreTextColor}`}>
                          {row.score}%
                        </Text>
                      </View>
                    </View>
                    <Text
                      className="text-xs font-medium text-[#475569] w-[100px] text-center"
                      numberOfLines={1}
                    >
                      {row.timeSpent}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handleStartPractice('cardio-resp')}
                      className="w-[130px] items-end"
                    >
                      <Text className="text-[#FF6B25] font-semibold text-xs">Review Answers</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
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
