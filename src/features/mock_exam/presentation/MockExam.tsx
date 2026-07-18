import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Routes } from '../../../helpers/Routes';
import { useAuthStore } from '../../auth/data/authStore';
import { NavigationService } from '../../../helpers/NavigationService';

export type FilterOption = 'all' | 'weakest' | 'inprogress';

export interface CategoryCard {
  id: string;
  title: string;
  image: string;
  total: number;
  correct: number;
  wrong: number;
  unattempted: number;
  accuracy: number; // Percentage, e.g. 62 = 62%
  status: 'completed' | 'inprogress' | 'notstarted';
}

export interface MockExamItem {
  id: string;
  title: string;
  durationMinutes: number;
  totalQuestions: number;
  progressPercent: number;
  status: 'completed' | 'inprogress' | 'notstarted';
}

const CATEGORY_CARDS: CategoryCard[] = [
  {
    id: 'cardio',
    title: 'Cardiovascular',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop',
    total: 500,
    correct: 120,
    wrong: 55,
    unattempted: 325,
    accuracy: 68,
    status: 'inprogress',
  },
  {
    id: 'respiratory',
    title: 'Respiratory',
    image:
      'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&auto=format&fit=crop',
    total: 500,
    correct: 120,
    wrong: 55,
    unattempted: 325,
    accuracy: 68,
    status: 'inprogress',
  },
  {
    id: 'gastro',
    title: 'Gastroenterology',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&auto=format&fit=crop',
    total: 500,
    correct: 120,
    wrong: 55,
    unattempted: 325,
    accuracy: 68,
    status: 'inprogress',
  },
  {
    id: 'neuro',
    title: 'Neurology',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&auto=format&fit=crop',
    total: 500,
    correct: 120,
    wrong: 55,
    unattempted: 325,
    accuracy: 58,
    status: 'inprogress',
  },
  {
    id: 'renal',
    title: 'Renal & Urology',
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop',
    total: 500,
    correct: 120,
    wrong: 55,
    unattempted: 325,
    accuracy: 62,
    status: 'inprogress',
  },
  {
    id: 'endo',
    title: 'Endocrinology & Metabolic',
    image:
      'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=500&auto=format&fit=crop',
    total: 500,
    correct: 120,
    wrong: 55,
    unattempted: 325,
    accuracy: 66,
    status: 'inprogress',
  },
  {
    id: 'derm',
    title: 'Dermatology / ENT / Eyes',
    image:
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&auto=format&fit=crop',
    total: 500,
    correct: 120,
    wrong: 55,
    unattempted: 325,
    accuracy: 60,
    status: 'inprogress',
  },
  {
    id: 'infectious',
    title: 'Infectious disease',
    image:
      'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=500&auto=format&fit=crop',
    total: 500,
    correct: 120,
    wrong: 55,
    unattempted: 325,
    accuracy: 54,
    status: 'inprogress',
  },
  {
    id: 'immuno',
    title: 'Immunology / Allergy',
    image:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&auto=format&fit=crop',
    total: 500,
    correct: 120,
    wrong: 55,
    unattempted: 325,
    accuracy: 62,
    status: 'inprogress',
  },
  {
    id: 'msk',
    title: 'Musculoskeletal',
    image:
      'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&auto=format&fit=crop',
    total: 500,
    correct: 120,
    wrong: 55,
    unattempted: 325,
    accuracy: 68,
    status: 'inprogress',
  },
  {
    id: 'paediatrics',
    title: 'Paediatrics',
    image:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop',
    total: 500,
    correct: 120,
    wrong: 55,
    unattempted: 325,
    accuracy: 62,
    status: 'inprogress',
  },
  {
    id: 'pharm',
    title: 'Pharmacology',
    image:
      'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop',
    total: 500,
    correct: 120,
    wrong: 55,
    unattempted: 325,
    accuracy: 54,
    status: 'inprogress',
  },
  {
    id: 'repro',
    title: 'Reproductive',
    image:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&auto=format&fit=crop',
    total: 500,
    correct: 120,
    wrong: 55,
    unattempted: 325,
    accuracy: 65,
    status: 'inprogress',
  },
];

const MOCK_EXAMS: MockExamItem[] = [
  {
    id: 'mock-1',
    title: 'Mock Exam 1',
    durationMinutes: 60,
    totalQuestions: 100,
    progressPercent: 100,
    status: 'completed',
  },
  {
    id: 'mock-2',
    title: 'Mock Exam 2',
    durationMinutes: 60,
    totalQuestions: 100,
    progressPercent: 100,
    status: 'completed',
  },
  {
    id: 'mock-3',
    title: 'Mock Exam 3',
    durationMinutes: 60,
    totalQuestions: 100,
    progressPercent: 100,
    status: 'completed',
  },
  {
    id: 'mock-4',
    title: 'Mock Exam 4',
    durationMinutes: 60,
    totalQuestions: 100,
    progressPercent: 50,
    status: 'inprogress',
  },
  {
    id: 'mock-5',
    title: 'Mock Exam 5',
    durationMinutes: 60,
    totalQuestions: 100,
    progressPercent: 35,
    status: 'inprogress',
  },
  {
    id: 'mock-6',
    title: 'Mock Exam 6',
    durationMinutes: 60,
    totalQuestions: 100,
    progressPercent: 0,
    status: 'notstarted',
  },
  {
    id: 'mock-7',
    title: 'Mock Exam 7',
    durationMinutes: 60,
    totalQuestions: 100,
    progressPercent: 0,
    status: 'notstarted',
  },
  {
    id: 'mock-8',
    title: 'Mock Exam 8',
    durationMinutes: 60,
    totalQuestions: 100,
    progressPercent: 0,
    status: 'notstarted',
  },
  {
    id: 'mock-9',
    title: 'Mock Exam 9',
    durationMinutes: 60,
    totalQuestions: 100,
    progressPercent: 0,
    status: 'notstarted',
  },
  {
    id: 'mock-10',
    title: 'Mock Exam 10',
    durationMinutes: 60,
    totalQuestions: 100,
    progressPercent: 0,
    status: 'notstarted',
  },
];

export const MockExamScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { logout } = useAuthStore();

  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const getFilteredCategories = () => {
    if (selectedFilter === 'weakest') {
      // Sort by accuracy ascending (lowest accuracy first)
      return [...CATEGORY_CARDS].sort((a, b) => a.accuracy - b.accuracy);
    }
    if (selectedFilter === 'inprogress') {
      return CATEGORY_CARDS.filter((c) => c.status === 'inprogress');
    }
    return CATEGORY_CARDS;
  };

  const filteredCategories = getFilteredCategories();

  const getFilterLabel = (option: FilterOption) => {
    switch (option) {
      case 'all':
        return 'All';
      case 'weakest':
        return 'Weakest';
      case 'inprogress':
        return 'In Progress';
      default:
        return 'All';
    }
  };

  const handleStartPracticing = (cardId: string) => {
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
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Section 1 Header: Title + Dropdown */}
        <View className="flex-row items-center justify-between mt-2 mb-4">
          <Text className="text-xl font-bold text-[#0F2942]">Clinical Problem Solving</Text>

          {/* Dropdown Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsDropdownOpen(true)}
            className="bg-[#0F2942] flex-row items-center px-4 py-2 rounded-full space-x-1.5"
          >
            <Text className="text-white font-semibold text-xs mr-1">
              {getFilterLabel(selectedFilter)}
            </Text>
            <Ionicons name="chevron-down" size={14} color="white" />
          </TouchableOpacity>
        </View>

        {/* Categories Grid (2 Columns) */}
        <View className="flex-row flex-wrap justify-between">
          {filteredCategories.map((cat) => (
            <View
              key={cat.id}
              className="w-[48.5%] bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden mb-4 shadow-sm"
            >
              {/* Category Image */}
              <Image
                source={{ uri: cat.image }}
                className="w-full h-24 bg-[#E2E8F0]"
                resizeMode="cover"
              />

              <View className="p-3">
                {/* Category Title */}
                <Text className="font-bold text-sm text-[#0F2942] mb-2" numberOfLines={1}>
                  {cat.title}
                </Text>

                {/* Stats Headers */}
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-[10px] text-[#64748B] font-medium">Total</Text>
                  <Text className="text-[10px] text-[#10B981] font-medium">Correct</Text>
                  <Text className="text-[10px] text-[#EF4444] font-medium">Wrong</Text>
                  <Text className="text-[10px] text-[#64748B] font-medium">Unatt.</Text>
                  <Text className="text-[10px] text-[#0F2942] font-medium">Acc.</Text>
                </View>

                {/* Stats Values */}
                <View className="flex-row justify-between items-center mb-3">
                  <Text className="text-xs font-bold text-[#0F2942]">{cat.total}</Text>
                  <View className="bg-[#D1FAE5] px-1.5 py-0.5 rounded">
                    <Text className="text-[11px] font-bold text-[#047857]">{cat.correct}</Text>
                  </View>
                  <View className="bg-[#FEE2E2] px-1.5 py-0.5 rounded">
                    <Text className="text-[11px] font-bold text-[#B91C1C]">{cat.wrong}</Text>
                  </View>
                  <Text className="text-xs font-semibold text-[#64748B]">{cat.unattempted}</Text>
                  <Text className="text-xs font-bold text-[#0F2942]">{cat.accuracy}%</Text>
                </View>

                {/* Start Practicing Button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleStartPracticing(cat.id)}
                  className="w-full bg-[#FF6B25] py-2 rounded-full flex-row items-center justify-center space-x-1"
                >
                  <Text className="text-white font-bold text-xs mr-1">Start Practicing</Text>
                  <Ionicons name="chevron-forward" size={12} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Section 2 Header: Mock Exams */}
        <Text className="text-xl font-bold text-[#0F2942] mt-4 mb-4">Mock Exams</Text>

        {/* Mock Exams Grid (2 Columns) */}
        <View className="flex-row flex-wrap justify-between">
          {MOCK_EXAMS.map((exam) => {
            let badgeText = 'Not started';
            let badgeBg = 'bg-[#F1F5F9]';
            let badgeTextColor = 'text-[#64748B]';
            let actionText = 'Start';

            if (exam.status === 'completed') {
              badgeText = 'Completed';
              badgeBg = 'bg-[#D1FAE5]';
              badgeTextColor = 'text-[#047857]';
              actionText = 'Restart';
            } else if (exam.status === 'inprogress') {
              badgeText = 'In-progress';
              badgeBg = 'bg-[#FEF3C7]';
              badgeTextColor = 'text-[#D97706]';
              actionText = 'Resume';
            }

            return (
              <View
                key={exam.id}
                className="w-[48.5%] bg-white rounded-2xl border border-[#E2E8F0] p-4 mb-4 shadow-sm justify-between"
              >
                <View>
                  {/* Status Badge */}
                  <View className="flex-row mb-2">
                    <View className={`${badgeBg} px-2.5 py-0.5 rounded-full`}>
                      <Text className={`text-[10px] font-bold ${badgeTextColor}`}>{badgeText}</Text>
                    </View>
                  </View>

                  {/* Title */}
                  <Text className="font-bold text-sm text-[#0F2942] mb-2">{exam.title}</Text>

                  {/* Duration Meta */}
                  <View className="flex-row items-center mb-1 space-x-1">
                    <Ionicons name="time-outline" size={12} color="#64748B" />
                    <Text className="text-xs text-[#64748B] ml-1">{exam.durationMinutes} min</Text>
                  </View>

                  {/* Questions Meta */}
                  <View className="flex-row items-center mb-3 space-x-1">
                    <Ionicons name="document-text-outline" size={12} color="#64748B" />
                    <Text className="text-xs text-[#64748B] ml-1">
                      {exam.totalQuestions} Questions
                    </Text>
                  </View>

                  {/* Progress Bar */}
                  <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden mr-2">
                      <View
                        className="h-full bg-[#0284C7] rounded-full"
                        style={{ width: `${exam.progressPercent}%` }}
                      />
                    </View>
                    <Text className="text-[10px] font-semibold text-[#64748B]">
                      {exam.progressPercent}%
                    </Text>
                  </View>
                </View>

                {/* Action Button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleStartPracticing(exam.id)}
                  className="w-full bg-[#FF6B25] py-2 rounded-full flex-row items-center justify-center space-x-1"
                >
                  <Text className="text-white font-bold text-xs mr-1">{actionText}</Text>
                  <Ionicons name="chevron-forward" size={12} color="white" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Filter Dropdown Modal */}
      <Modal
        visible={isDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDropdownOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/40 items-center justify-center px-6"
          onPress={() => setIsDropdownOpen(false)}
        >
          <View
            className="w-64 bg-white rounded-2xl p-4 shadow-xl"
            onStartShouldSetResponder={() => true}
          >
            <Text className="text-sm font-bold text-[#0F2942] mb-3 px-2">Filter Categories</Text>

            {(['all', 'weakest', 'inprogress'] as FilterOption[]).map((option) => {
              const isSelected = selectedFilter === option;
              return (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedFilter(option);
                    setIsDropdownOpen(false);
                  }}
                  className={`flex-row items-center justify-between px-3 py-3 rounded-xl mb-1 ${
                    isSelected ? 'bg-[#F1F5F9]' : 'bg-transparent'
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      isSelected ? 'text-[#0F2942]' : 'text-[#475569]'
                    }`}
                  >
                    {getFilterLabel(option)}
                  </Text>
                  {isSelected && <Ionicons name="checkmark-circle" size={18} color="#FF6B25" />}
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Modal>

      {/* Slide-out Sidebar Drawer Modal */}
      <Modal
        visible={isSideMenuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsSideMenuOpen(false)}
      >
        <View className="flex-1 flex-row bg-black/40">
          {/* Dimmed backdrop area on left */}
          <TouchableOpacity
            className="w-[20%]"
            activeOpacity={1}
            onPress={() => setIsSideMenuOpen(false)}
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
                onPress={() => setIsSideMenuOpen(false)}
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
    </View>
  );
};
