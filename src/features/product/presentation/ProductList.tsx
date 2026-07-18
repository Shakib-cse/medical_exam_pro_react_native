import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useProductStore } from '../data/productStore';
import { NavigationService } from '../../../helpers/NavigationService';
import { Routes } from '../../../helpers/Routes';

export const ProductListScreen = () => {
  const { products, isLoading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => NavigationService.navigateToWithArgs(Routes.productDetailsScreen, { id: item.id })}
            className="flex-row bg-white p-4 rounded-xl mb-4 shadow-sm"
          >
            <Image
              source={{ uri: item.imageUrl }}
              className="w-20 h-20 rounded-lg bg-gray-200"
              resizeMode="cover"
            />
            <View className="ml-4 flex-1 justify-center">
              <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
              <Text className="text-gray-500 mt-1" numberOfLines={2}>
                {item.description}
              </Text>
              <Text className="text-blue-600 font-semibold mt-2">${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
