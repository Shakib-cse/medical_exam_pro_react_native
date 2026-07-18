import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useProductStore } from '../data/productStore';
import { CustomButton } from '../../../common/components/CustomButton';

export const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { selectProduct, selectedProduct, isLoading } = useProductStore();

  useEffect(() => {
    if (id) {
      selectProduct(id);
    }
  }, [id]);

  if (isLoading || !selectedProduct) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <Image
        source={{ uri: selectedProduct.imageUrl }}
        className="w-full h-80 bg-gray-200"
        resizeMode="cover"
      />
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</Text>
        <Text className="text-2xl font-bold text-blue-600 mb-6">${selectedProduct.price}</Text>
        
        <Text className="text-lg font-semibold text-gray-800 mb-2">Description</Text>
        <Text className="text-gray-600 leading-6 mb-8">
          {selectedProduct.description}
        </Text>

        <CustomButton
          title="Add to Cart"
          onPress={() => console.log('Added to cart:', selectedProduct.id)}
        />
      </View>
    </ScrollView>
  );
};
