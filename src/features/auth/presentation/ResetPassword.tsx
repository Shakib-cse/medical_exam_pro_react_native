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
import { CustomTextField } from '../../../common/components/CustomTextField';
import { CustomButton } from '../../../common/components/CustomButton';
import { NavigationService } from '../../../helpers/NavigationService';
import { Routes } from '../../../helpers/Routes';

export const ResetPasswordScreen = () => {
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleContinue = () => {
    // Reset password action & navigate back to login screen
    NavigationService.navigateToReplacement(Routes.loginScreen);
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
            {t('auth.createNewPasswordTitle')}
          </Text>

          <Text className="text-[#8E95A2] text-sm text-center px-4 mb-8">
            {t('auth.createNewPasswordSubtitle')}
          </Text>

          <CustomTextField
            label={t('auth.newPassword')}
            placeholder={t('auth.enterNewPassword')}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            rightElement={
              <TouchableOpacity
                onPress={() => setShowNewPassword((prev) => !prev)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#8E95A2"
                />
              </TouchableOpacity>
            }
          />

          <CustomTextField
            label={t('auth.confirmNewPassword')}
            placeholder={t('auth.reEnterNewPassword')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            rightElement={
              <TouchableOpacity
                onPress={() => setShowConfirmPassword((prev) => !prev)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#8E95A2"
                />
              </TouchableOpacity>
            }
          />

          <View className="mt-4">
            <CustomButton title={t('auth.continue')} onPress={handleContinue} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
