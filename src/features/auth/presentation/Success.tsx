import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../data/authStore';
import { CustomButton } from '../../../common/components/CustomButton';
import { NavigationService } from '../../../helpers/NavigationService';
import { Routes } from '../../../helpers/Routes';

export const SuccessScreen = () => {
  const { t } = useTranslation();
  const { login } = useAuthStore();

  const handleGoToDashboard = async () => {
    // Authenticate user session and navigate to main dashboard
    await login('user@example.com', 'password');
    NavigationService.navigateToReplacement(Routes.homeScreen);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className="px-6 py-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-8">
          <Image
            source={require('../../../../assets/logo.png')}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
            className="mb-3"
          />
          <Text className="text-2xl font-bold text-[#1A1D1E] tracking-tight">
            Medical<Text className="text-[#288BDC]">Exam</Text>Pro
          </Text>
        </View>

        <Text className="text-xl font-bold text-[#1A1D1E] text-center mb-12 px-2">
          {t('auth.accountCreatedSuccess')}
        </Text>

        {/* Success Checkmark with surrounding decorative dots */}
        <View className="items-center justify-center my-6 relative self-center w-48 h-48">
          {/* Decorative Green Dots */}
          <View className="absolute top-1 right-12 w-3.5 h-3.5 rounded-full bg-[#00C896]" />
          <View className="absolute top-8 left-10 w-2.5 h-2.5 rounded-full bg-[#00C896]" />
          <View className="absolute top-14 right-4 w-4 h-4 rounded-full bg-[#00C896]" />
          <View className="absolute bottom-12 left-6 w-3.5 h-3.5 rounded-full bg-[#00C896]" />
          <View className="absolute bottom-4 right-14 w-3 h-3 rounded-full bg-[#00C896]" />
          <View className="absolute bottom-10 left-20 w-2 h-2 rounded-full bg-[#00C896]" />
          <View className="absolute top-20 left-4 w-2 h-2 rounded-full bg-[#00C896]" />
          <View className="absolute bottom-20 right-8 w-2 h-2 rounded-full bg-[#00C896]" />

          {/* Central Checkmark Circle */}
          <View className="w-24 h-24 rounded-full border-[3.5px] border-[#00C896] items-center justify-center bg-transparent shadow-sm">
            <Ionicons name="checkmark" size={48} color="#00C896" />
          </View>
        </View>

        <View className="mt-12">
          <CustomButton title={t('auth.goToDashboard')} onPress={handleGoToDashboard} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
