import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../data/authStore';
import { CustomTextField } from '../../../common/components/CustomTextField';
import { CustomButton } from '../../../common/components/CustomButton';
import { NavigationService } from '../../../helpers/NavigationService';
import { Routes } from '../../../helpers/Routes';

export const LoginScreen = () => {
  const { t } = useTranslation();
  const { login, isLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    await login(email || 'alex@example.com', password || 'password');
    NavigationService.navigateToReplacement(Routes.homeScreen);
  };

  const handleForgotPassword = () => {
    NavigationService.navigateTo(Routes.forgotPWScreen);
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

          <Text className="text-xl font-bold text-[#1A1D1E] text-center mb-8">
            {t('auth.loginTitle')}
          </Text>

          <CustomTextField
            label={t('auth.emailAddress')}
            placeholder={t('auth.enterEmail')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomTextField
            label={t('auth.password')}
            labelRight={
              <TouchableOpacity onPress={handleForgotPassword} activeOpacity={0.7}>
                <Text className="text-[#FF5B5C] font-semibold text-sm">
                  {t('auth.forgotPassword')}
                </Text>
              </TouchableOpacity>
            }
            placeholder={t('auth.enterPassword')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightElement={
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#8E95A2"
                />
              </TouchableOpacity>
            }
          />

          <View className="mt-4">
            <CustomButton title={t('auth.login')} onPress={handleLogin} isLoading={isLoading} />
          </View>

          <View className="flex-row items-center justify-center mt-10">
            <Text className="text-gray-600 text-sm font-medium">{t('auth.dontHaveAccount')} </Text>
            <TouchableOpacity
              onPress={() => NavigationService.navigateTo(Routes.signUpScreen)}
              activeOpacity={0.7}
            >
              <Text className="text-[#288BDC] font-bold text-sm">{t('auth.signUp')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
