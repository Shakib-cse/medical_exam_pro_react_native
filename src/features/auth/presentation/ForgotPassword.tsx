import React, { useState } from 'react';
import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { CustomTextField } from '../../../common/components/CustomTextField';
import { CustomButton } from '../../../common/components/CustomButton';
import { NavigationService } from '../../../helpers/NavigationService';
import { Routes } from '../../../helpers/Routes';

export const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleSend = () => {
    // Send verification email action & navigate to forgot verification page
    NavigationService.navigateTo(Routes.forgotVerificationScreen);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
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

          <Text className="text-xl font-bold text-[#1A1D1E] text-center mb-2">
            {t('auth.enterYourEmailTitle')}
          </Text>

          <Text className="text-[#8E95A2] text-sm text-center px-4 mb-8">
            {t('auth.forgotPasswordSubtitle')}
          </Text>

          <CustomTextField
            label={t('auth.emailAddress')}
            placeholder={t('auth.enterEmail')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View className="mt-4">
            <CustomButton title={t('auth.send')} onPress={handleSend} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
