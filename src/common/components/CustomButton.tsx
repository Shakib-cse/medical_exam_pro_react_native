import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  isLoading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      className={`w-full py-4 rounded-full items-center justify-center flex-row ${
        disabled ? 'bg-gray-300' : 'bg-[#288BDC]'
      }`}
    >
      {isLoading ? <ActivityIndicator color="white" className="mr-2" /> : null}
      <Text className="text-white font-semibold text-lg">{title}</Text>
    </TouchableOpacity>
  );
};
