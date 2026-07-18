import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../../common/components/CustomButton';
import { NavigationService } from '../../../helpers/NavigationService';
import { Routes } from '../../../helpers/Routes';

export const ForgotVerificationScreen = () => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChangeText = (text: string, index: number) => {
    // Handle pasting 6-digit code
    if (text.length > 1) {
      const pastedCode = text
        .replace(/[^0-9]/g, '')
        .slice(0, 6)
        .split('');
      const newOtp = [...otp];
      pastedCode.forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(pastedCode.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    // Upon verifying forgot password OTP, navigate to set new password page
    NavigationService.navigateTo(Routes.resetPasswordScreen);
  };

  const handleResend = () => {
    // Placeholder for API resend action
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
            {t('auth.verificationTitle')}
          </Text>

          <Text className="text-[#8E95A2] text-sm text-center px-4 mb-8">
            {t('auth.verificationSubtitle')}
          </Text>

          <View className="flex-row justify-between items-center mb-8">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                keyboardType="number-pad"
                maxLength={index === 0 ? 6 : 1}
                className={`flex-1 mx-1 h-14 rounded-2xl bg-[#EAF0F6] text-center text-xl font-bold text-[#1A1D1E] border ${
                  focusedIndex === index ? 'border-[#288BDC]' : 'border-transparent'
                }`}
                selectTextOnFocus
              />
            ))}
          </View>

          <View className="mt-2">
            <CustomButton title={t('auth.continue')} onPress={handleVerify} />
          </View>

          <TouchableOpacity
            onPress={handleResend}
            activeOpacity={0.7}
            className="items-center mt-6 py-2"
          >
            <Text className="text-[#1A1D1E] font-semibold text-base">{t('auth.resendIt')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
