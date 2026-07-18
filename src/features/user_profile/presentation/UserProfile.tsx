import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useProfileStore } from '../data/profileStore';
import { useAuthStore } from '../../auth/data/authStore';
import { CustomButton } from '../../../common/components/CustomButton';
import { NavigationService } from '../../../helpers/NavigationService';
import { Routes } from '../../../helpers/Routes';

export const UserProfileScreen = () => {
  const { profile, isLoading, fetchProfile } = useProfileStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    NavigationService.navigateToReplacement(Routes.loginScreen);
  };

  if (isLoading || !profile) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <View className="bg-white rounded-2xl p-6 shadow-sm items-center mb-8">
        <View className="w-24 h-24 bg-blue-100 rounded-full justify-center items-center mb-4">
          <Text className="text-3xl font-bold text-blue-600">
            {profile.name.charAt(0)}
          </Text>
        </View>
        <Text className="text-2xl font-bold text-gray-900">{profile.name}</Text>
        <Text className="text-gray-500 mt-1">{profile.email}</Text>
        <Text className="text-gray-500 mt-1">{profile.phone}</Text>
      </View>

      <CustomButton
        title="Edit Profile"
        onPress={() => console.log('Edit Profile Pressed')}
      />
      
      <View className="mt-4">
        <CustomButton
          title="Log Out"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};
