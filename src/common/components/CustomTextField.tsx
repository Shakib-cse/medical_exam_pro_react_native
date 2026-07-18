import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

export interface CustomTextFieldProps extends TextInputProps {
  label?: string;
  labelRight?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: string;
}

export const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  labelRight,
  rightElement,
  error,
  ...props
}) => {
  return (
    <View className="mb-5 w-full">
      {label || labelRight ? (
        <View className="flex-row justify-between items-center mb-2">
          {label ? <Text className="text-gray-900 font-semibold text-sm">{label}</Text> : <View />}
          {labelRight}
        </View>
      ) : null}
      <View
        className={`flex-row items-center bg-[#EAF0F6] px-4 py-3.5 rounded-2xl border ${
          error ? 'border-red-500' : 'border-transparent'
        }`}
      >
        <TextInput
          className="flex-1 text-gray-900 text-base py-0"
          placeholderTextColor="#9EA5B4"
          {...props}
        />
        {rightElement}
      </View>
      {error && <Text className="text-red-500 text-xs mt-1.5 ml-1">{error}</Text>}
    </View>
  );
};
