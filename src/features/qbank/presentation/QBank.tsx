import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Routes } from '../../../helpers/Routes';
import { useAuthStore } from '../../auth/data/authStore';
import { NavigationService } from '../../../helpers/NavigationService';
import { useQBankStore } from '../data/qbankStore';
import { SideDrawer } from '../../../common/components/SideDrawer';

interface QuestionItem {
  id: string;
  question: string;
  accuracy: string;
  isUnattempted: boolean;
  selectedQuestionsCount: number;
  estimatedTime: string;
  tags: { label: string; type: 'pink' | 'outline' | 'gray' | 'neutral' }[];
}

const QUESTIONS: QuestionItem[] = [
  {
    id: '1',
    question:
      'You are a FY2 in A&E. A senior consultant asks you to perform a procedure you are not fully comfortable with. How should you respond?',
    accuracy: 'N/A',
    isUnattempted: true,
    selectedQuestionsCount: 12,
    estimatedTime: '18 mins',
    tags: [
      { label: 'SJT', type: 'pink' },
      { label: 'Professionalism', type: 'outline' },
      { label: 'Unattempted', type: 'gray' },
    ],
  },
  {
    id: '2',
    question:
      'A 45-year-old male presents with sudden onset central chest pain radiating to the left jaw. ECG shows ST-segment elevation in leads V2-V4...',
    accuracy: '74%',
    isUnattempted: false,
    selectedQuestionsCount: 15,
    estimatedTime: '22 mins',
    tags: [
      { label: 'Clinical', type: 'neutral' },
      { label: 'Cardiology', type: 'neutral' },
      { label: '• Last attempted: 3 days ago', type: 'neutral' },
    ],
  },
  {
    id: '3',
    question:
      'A 62-year-old female presents with acute onset shortness of breath and chest tightness. Chest X-ray reveals left-sided pleural effusion...',
    accuracy: '68%',
    isUnattempted: false,
    selectedQuestionsCount: 8,
    estimatedTime: '12 mins',
    tags: [
      { label: 'Clinical', type: 'neutral' },
      { label: 'Cardiology', type: 'neutral' },
      { label: '• Last attempted: 1 week ago', type: 'neutral' },
    ],
  },
  {
    id: '4',
    question:
      'A 30-year-old male reports recurrent episodes of epigastric pain and bloating after meals. Endoscopy shows gastritis...',
    accuracy: '81%',
    isUnattempted: false,
    selectedQuestionsCount: 10,
    estimatedTime: '15 mins',
    tags: [
      { label: 'Clinical', type: 'neutral' },
      { label: 'Cardiology', type: 'neutral' },
      { label: '• Last attempted: 2 weeks ago', type: 'neutral' },
    ],
  },
  {
    id: '5',
    question:
      'A 50-year-old female with a history of hypertension presents with severe headache and visual disturbances. CT scan reveals hemorrhagic stroke...',
    accuracy: '62%',
    isUnattempted: false,
    selectedQuestionsCount: 6,
    estimatedTime: '9 mins',
    tags: [
      { label: 'Clinical', type: 'neutral' },
      { label: 'Cardiology', type: 'neutral' },
      { label: '• Last attempted: 5 days ago', type: 'neutral' },
    ],
  },
  {
    id: '6',
    question:
      'A 28-year-old male with a family history of diabetes presents with fatigue and polyuria. Blood tests confirm hyperglycemia...',
    accuracy: '75%',
    isUnattempted: false,
    selectedQuestionsCount: 14,
    estimatedTime: '20 mins',
    tags: [
      { label: 'Clinical', type: 'neutral' },
      { label: 'Cardiology', type: 'neutral' },
      { label: '• Last attempted: 1 week ago', type: 'neutral' },
    ],
  },
  {
    id: '7',
    question:
      'A 45-year-old female presents with persistent cough and unexplained weight loss. CT imaging shows a suspicious lung nodule...',
    accuracy: '70%',
    isUnattempted: false,
    selectedQuestionsCount: 9,
    estimatedTime: '14 mins',
    tags: [
      { label: 'Clinical', type: 'neutral' },
      { label: 'Cardiology', type: 'neutral' },
      { label: '• Last attempted: 1 week ago', type: 'neutral' },
    ],
  },
];

export const QBankScreen = () => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(QUESTIONS.length);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const filteredQuestions = QUESTIONS.filter(
    (q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((t) => t.label.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const handleQuestionPress = (item: QuestionItem) => {
    setSelectedCardId(item.id);
    setSelectedQuestion(item);
    setIsModalOpen(true);
  };

  const handleShowMore = () => {
    Toast.show({
      type: 'success',
      text1: 'Loading Questions',
      text2: 'Fetching additional practice questions...',
    });
  };

  const handleFilterPress = () => {
    Toast.show({
      type: 'info',
      text1: 'Filter Options',
      text2: 'Open filters modal',
    });
  };

  const handleMenuPress = () => {
    setIsSideMenuOpen(true);
  };

  const { getSessionProgress } = useQBankStore();
  const activeSession = selectedQuestion ? getSessionProgress(selectedQuestion.id) : undefined;
  const hasActiveSession = !!activeSession && !activeSession.isCompleted;

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <ScrollView className="flex-1 px-5 pt-3 pb-8" showsVerticalScrollIndicator={false}>
        {/* Top Search & Action Controls */}
        <View className="flex-row items-center space-x-2.5 mb-4">
          <View className="flex-1 flex-row items-center bg-[#E8EEF4] rounded-full px-4 h-11">
            <TextInput
              placeholder="Search"
              placeholderTextColor="#8E95A2"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 text-[#1A1D1E] text-base p-0 mr-2"
            />
            <Ionicons name="search-outline" size={20} color="#8E95A2" />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleFilterPress}
            className="w-11 h-11 rounded-full bg-[#E8EEF4] items-center justify-center ml-2"
          >
            <Ionicons name="funnel-outline" size={18} color="#8E95A2" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleMenuPress}
            className="w-11 h-11 rounded-full bg-[#E8EEF4] items-center justify-center ml-2"
          >
            <Ionicons name="menu-outline" size={22} color="#8E95A2" />
          </TouchableOpacity>
        </View>

        {/* Header & Subtitle */}
        <View className="mb-4 pb-3 border-b border-[#E9ECEF]">
          <Text className="text-2xl font-bold text-[#1A1D1E] mb-1.5">Question Bank</Text>
          <Text className="text-[#6C757D] text-sm leading-relaxed">
            Browse and create custom practice sets from 4,500+ clinical and SJT questions.
          </Text>
        </View>

        {/* Question Cards List */}
        {filteredQuestions.slice(0, visibleCount).map((item) => {
          const isSelected = item.id === selectedCardId;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.75}
              onPress={() => handleQuestionPress(item)}
              className={`rounded-2xl p-4 mb-3.5 border ${
                isSelected ? 'bg-[#FFF3EC] border-[#FFDCD0]' : 'bg-white border-[#E9ECEF] shadow-sm'
              }`}
            >
              {/* Top Row: Question text and Accuracy Badge */}
              <View className="flex-row justify-between items-start mb-3">
                <Text className="text-[#1A1D1E] font-bold text-sm leading-snug flex-1 pr-3">
                  {item.question}
                </Text>

                {/* Accuracy Badge */}
                <View
                  className={`px-3 py-1.5 rounded-xl items-center justify-center min-w-[54px] ${
                    isSelected ? 'bg-[#FFEADF]' : 'bg-[#EBF3FA]'
                  }`}
                >
                  <Text className="text-[#1A1D1E] font-bold text-sm">{item.accuracy}</Text>
                  <Text className="text-[#8E95A2] text-[9px] font-semibold tracking-tighter">
                    AVG ACC.
                  </Text>
                </View>
              </View>

              {/* Bottom Row: Tags */}
              <View className="flex-row flex-wrap items-center space-x-1.5 gap-y-1">
                {item.tags.map((tag, idx) => {
                  if (tag.type === 'pink') {
                    return (
                      <View key={idx} className="bg-[#FFE2E2] px-2.5 py-1 rounded-lg mr-1.5">
                        <Text className="text-[#FF5B5C] font-semibold text-[11px]">
                          {tag.label}
                        </Text>
                      </View>
                    );
                  }
                  if (tag.type === 'outline') {
                    return (
                      <View
                        key={idx}
                        className="bg-white border border-gray-200 px-2.5 py-1 rounded-lg mr-1.5"
                      >
                        <Text className="text-gray-700 font-medium text-[11px]">{tag.label}</Text>
                      </View>
                    );
                  }
                  if (tag.type === 'gray') {
                    return (
                      <View
                        key={idx}
                        className="bg-white border border-gray-200 px-2.5 py-1 rounded-lg mr-1.5"
                      >
                        <Text className="text-gray-500 font-medium text-[11px]">{tag.label}</Text>
                      </View>
                    );
                  }
                  return (
                    <View key={idx} className="bg-[#F0F4F8] px-2.5 py-1 rounded-lg mr-1.5">
                      <Text className="text-gray-600 font-medium text-[11px]">{tag.label}</Text>
                    </View>
                  );
                })}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Show More Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleShowMore}
          className="bg-[#FF6B25] rounded-full px-6 py-2.5 self-end my-3"
        >
          <Text className="text-white font-bold text-sm">Show more</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Create Custom Session Modal */}
      <Modal
        visible={isModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsModalOpen(false)}
          className="flex-1 bg-black/40 items-center justify-center px-6"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            className="w-full bg-white rounded-3xl p-6 shadow-xl"
          >
            {/* Modal Title */}
            <Text className="text-xl font-bold text-[#1A1D1E] mb-5">Create Custom Session</Text>

            {/* Selected Questions Row */}
            <View className="flex-row justify-between items-center mb-3.5">
              <Text className="text-[#8E95A2] text-base font-normal">Selected Questions</Text>
              <Text className="text-[#1A1D1E] text-base font-bold">
                {selectedQuestion?.selectedQuestionsCount ?? 12}
              </Text>
            </View>

            {/* Est. Completion Time Row */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-[#8E95A2] text-base font-normal">Est. Completion Time</Text>
              <Text className="text-[#1A1D1E] text-base font-bold">
                {selectedQuestion?.estimatedTime ?? '18 mins'}
              </Text>
            </View>

            {/* Start / Resume Practice Session Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setIsModalOpen(false);
                router.push({
                  pathname: Routes.practiceSessionScreen,
                  params: { cardId: selectedQuestion?.id || '1' },
                });
              }}
              className="w-full bg-[#FF6B25] rounded-full py-3.5 items-center justify-center"
            >
              <Text className="text-white font-bold text-base">
                {hasActiveSession ? 'Resume Practice Session' : 'Start Practice Session'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Slide-out Sidebar Drawer */}
      <SideDrawer
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        selectedItem={selectedMenuItem}
        onSelectSettings={() => handleMenuItemPress('settings')}
        onSelectPricing={() => handleMenuItemPress('pricing')}
        onLogout={handleLogout}
      />
    </SafeAreaView>
  );
};
