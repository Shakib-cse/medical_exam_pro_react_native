import React from 'react';
import { Text, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'label' | 'caption';
  color?: string; // e.g. 'text-blue-600' or '#FFFFFF'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  className?: string; // allow tailwind extensions
}

/**
 * A generic Text component mapping to the TextFontStyle.dart in Flutter.
 */
export const CustomText: React.FC<CustomTextProps> = ({
  variant = 'body',
  color = 'text-gray-900',
  weight = 'normal',
  className = '',
  style,
  children,
  ...props
}) => {
  let sizeClass = 'text-base';
  if (variant === 'h1') sizeClass = 'text-3xl';
  if (variant === 'h2') sizeClass = 'text-2xl';
  if (variant === 'h3') sizeClass = 'text-xl';
  if (variant === 'label') sizeClass = 'text-sm';
  if (variant === 'caption') sizeClass = 'text-xs';

  let weightClass = 'font-normal';
  if (weight === 'medium') weightClass = 'font-medium';
  if (weight === 'semibold') weightClass = 'font-semibold';
  if (weight === 'bold') weightClass = 'font-bold';
  if (weight === 'extrabold') weightClass = 'font-extrabold';

  const isHexColor = color.startsWith('#');
  const textColorClass = isHexColor ? '' : color;
  const customColorStyle = isHexColor ? { color } : {};

  return (
    <Text
      className={`font-sans ${sizeClass} ${weightClass} ${textColorClass} ${className}`}
      style={[customColorStyle, style]}
      {...props}
    >
      {children}
    </Text>
  );
};
