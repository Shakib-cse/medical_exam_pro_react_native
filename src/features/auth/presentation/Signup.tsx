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

export const SignupScreen = () => {
  const { t } = useTranslation();
  const { signup, isLoading } = useAuthStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    const fullName = `${firstName} ${lastName}`.trim();
    if (email && password && fullName) {
      await signup(email, password);
    }
    NavigationService.navigateTo(Routes.verificationScreen);
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
            {t('auth.createAccountTitle')}
          </Text>

          <View className="flex-row">
            <View className="flex-1 mr-2">
              <CustomTextField
                label={t('auth.firstName')}
                placeholder={t('auth.enterFirstName')}
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />
            </View>
            <View className="flex-1 ml-2">
              <CustomTextField
                label={t('auth.lastName')}
                placeholder={t('auth.enterLastName')}
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
              />
            </View>
          </View>

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
            <CustomButton title={t('auth.signIn')} onPress={handleSignup} isLoading={isLoading} />
          </View>

          <View className="flex-row items-center justify-center mt-10">
            <Text className="text-gray-600 text-sm font-medium">
              {t('auth.alreadyHaveAccount')}{' '}
            </Text>
            <TouchableOpacity
              onPress={() => NavigationService.navigateTo(Routes.loginScreen)}
              activeOpacity={0.7}
            >
              <Text className="text-[#288BDC] font-bold text-sm">{t('auth.login')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
