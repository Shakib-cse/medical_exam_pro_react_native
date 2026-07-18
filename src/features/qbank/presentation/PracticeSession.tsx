import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { CARD_QUESTION_MAP } from '../data/mockQuestions';

export const PracticeSessionScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ cardId?: string }>();
  const insets = useSafeAreaInsets();

  const cardId = params.cardId || '1';
  const currentCardSet = CARD_QUESTION_MAP[cardId] || CARD_QUESTION_MAP['1'];
  const questions = currentCardSet.questions;
  const sessionTitle = currentCardSet.title;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: string }>({});
  const [secondsElapsed, setSecondsElapsed] = useState(0); // Starts from 00:00

  // Reset session state whenever screen comes into focus (fresh practice session)
  useFocusEffect(
    useCallback(() => {
      setCurrentIndex(0);
      setUserAnswers({});
      setSecondsElapsed(0);
    }, [cardId]),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex] || questions[0];
  const selectedAnswer = userAnswers[currentQ.id];
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect = selectedAnswer === currentQ.correctOption;

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return; // Answer locked once selected
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const correctOptionObj = currentQ.options.find((opt) => opt.id === currentQ.correctOption);

  const isActionDisabled = !isAnswered;
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <View className="flex-1 bg-[#F8F9FA]" style={{ paddingTop: Math.max(insets.top, 12) }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" translucent={false} />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-[#F8F9FA]">
        <View className="flex-row items-center flex-1 pr-2">
          {/* Decorative Pause Icon (Display only) */}
          <View className="w-10 h-10 bg-[#0F2942] rounded-xl items-center justify-center">
            <Ionicons name="pause" size={18} color="white" />
          </View>

          {/* Screen Title */}
          <Text className="text-[#0F2942] font-bold text-base ml-3 flex-1" numberOfLines={1}>
            {sessionTitle}
          </Text>
        </View>

        {/* Decorative Timer Badge */}
        <View className="bg-[#0F2942] flex-row items-center px-3.5 py-2 rounded-full space-x-1.5">
          <Ionicons name="time-outline" size={16} color="white" />
          <Text className="text-white font-bold text-sm ml-1.5">{formatTimer(secondsElapsed)}</Text>
        </View>
      </View>

      {/* Main Content ScrollView */}
      <ScrollView
        className="flex-1 px-4 pt-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Question Card */}
        <View className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-sm mb-4">
          {/* Header Badges */}
          <View className="flex-row justify-between items-center mb-4">
            <View className="bg-[#0F2942] px-3 py-1 rounded-lg">
              <Text className="text-white font-bold text-xs">{`Q.${currentIndex + 1}`}</Text>
            </View>
            <View className="bg-[#E2E8F0] px-3 py-1 rounded-lg">
              <Text className="text-[#3B4861] font-semibold text-xs">
                {`Question ${currentIndex + 1} of ${questions.length}`}
              </Text>
            </View>
          </View>

          {/* Clinical Scenario */}
          <Text className="text-[#334155] text-sm leading-relaxed mb-4">{currentQ.scenario}</Text>

          {/* Question Text */}
          <Text className="text-[#0F2942] font-bold text-base leading-snug mb-5">
            {currentQ.question}
          </Text>

          {/* Options */}
          <View className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswer === opt.id;
              const isRightAnswer = opt.id === currentQ.correctOption;

              let optionBgStyle = 'bg-white border-[#E2E8F0]';
              let radioStyle = 'border-[#CBD5E1] bg-transparent';
              let radioIconComponent = null;

              if (isAnswered) {
                if (isRightAnswer) {
                  // Right answer gets green background and border
                  optionBgStyle = 'bg-[#D1FAE5] border-[#10B981] border-2';
                  radioStyle = 'border-[#10B981] bg-[#10B981]';
                  radioIconComponent = <Ionicons name="checkmark" size={12} color="white" />;
                } else if (isSelected && !isRightAnswer) {
                  // Wrong answer selected gets orange background and border
                  optionBgStyle = 'bg-[#FFEDD5] border-[#F97316] border-2';
                  radioStyle = 'border-[#F97316] bg-[#F97316]';
                  radioIconComponent = <View className="w-2 h-2 rounded-full bg-white" />;
                } else {
                  optionBgStyle = 'bg-white border-[#E2E8F0] opacity-70';
                }
              }

              return (
                <TouchableOpacity
                  key={opt.id}
                  activeOpacity={isAnswered ? 1 : 0.7}
                  onPress={() => handleSelectOption(opt.id)}
                  className={`w-full rounded-2xl p-4 border flex-row items-center mb-3 ${optionBgStyle}`}
                >
                  {/* Radio Icon */}
                  <View
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${radioStyle}`}
                  >
                    {radioIconComponent}
                  </View>

                  {/* Letter A, B, C, D, E */}
                  <Text className="text-[#0F2942] font-bold text-base mr-3 w-4">{opt.id}</Text>

                  {/* Option Text */}
                  <Text className="text-[#1E293B] text-sm font-medium flex-1 leading-snug">
                    {opt.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Explanation Card */}
        {isAnswered && (
          <View
            className={`rounded-2xl p-4 border mb-4 ${
              isCorrect ? 'bg-[#D1FAE5]/90 border-[#6EE7B7]' : 'bg-[#FEE2E2]/90 border-[#FCA5A5]'
            }`}
          >
            {/* Header Result Line */}
            <View className="flex-row items-center mb-1">
              <View
                className={`w-6 h-6 rounded-full items-center justify-center mr-2 ${
                  isCorrect ? 'bg-[#10B981]' : 'bg-[#EF4444]'
                }`}
              >
                <Ionicons name={isCorrect ? 'checkmark' : 'close'} size={14} color="white" />
              </View>
              <Text
                className={`font-bold text-base ${isCorrect ? 'text-[#065F46]' : 'text-[#B91C1C]'}`}
              >
                {isCorrect
                  ? `Correct Answer: ${currentQ.correctOption}`
                  : `Wrong Answer: ${selectedAnswer}`}
              </Text>
            </View>

            {/* Correct Option Subtitle */}
            <Text
              className={`text-xs font-semibold mb-3 ml-8 ${
                isCorrect ? 'text-[#047857]' : 'text-[#EA580C]'
              }`}
            >
              {correctOptionObj?.text}
            </Text>

            {/* Explanation Paragraph */}
            <Text className="text-[#334155] text-xs leading-relaxed mb-4">
              <Text className="font-bold text-[#0F2942]">Explanation: </Text>
              {currentQ.explanation}
            </Text>

            {/* Divider Line */}
            <View className={`h-[1px] my-3 ${isCorrect ? 'bg-[#A7F3D0]' : 'bg-[#FECACA]'}`} />

            {/* Topic & Exam Frequency Meta */}
            <View className="flex-row justify-between items-center pt-1">
              <View className="flex-1 pr-2">
                <Text className="text-[#64748B] text-[10px] uppercase font-bold tracking-wider mb-0.5">
                  TOPIC
                </Text>
                <Text className="text-[#0F2942] font-bold text-xs">{currentQ.topic}</Text>
              </View>
              <View className="items-end">
                <Text className="text-[#64748B] text-[10px] uppercase font-bold tracking-wider mb-0.5">
                  EXAM FREQUENCY
                </Text>
                <Text className="text-[#0F2942] font-bold text-xs">{currentQ.examFrequency}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Controls Bar */}
      <View
        className="flex-row items-center justify-between px-4 py-3 bg-[#F8F9FA] border-t border-[#E2E8F0] space-x-2"
        style={{ paddingBottom: Math.max(insets.bottom, 12) }}
      >
        {/* End Session */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.back()}
          className="bg-[#EF4444] py-3.5 px-4 rounded-xl items-center justify-center flex-1 mr-2"
        >
          <Text className="text-white font-bold text-xs sm:text-sm">End Session</Text>
        </TouchableOpacity>

        {/* Previous */}
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={currentIndex === 0}
          onPress={handlePrev}
          className={`bg-white border border-[#E2E8F0] py-3.5 px-3 rounded-xl items-center justify-center flex-row flex-1 mr-2 ${
            currentIndex === 0 ? 'opacity-40' : 'opacity-100'
          }`}
        >
          <Ionicons name="chevron-back" size={16} color="#3B4861" />
          <Text className="text-[#3B4861] font-bold text-xs sm:text-sm ml-1">Previous</Text>
        </TouchableOpacity>

        {/* Next Question or Submit Button */}
        {isLastQuestion ? (
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={isActionDisabled}
            onPress={() => router.back()}
            className={`bg-[#10B981] py-3.5 px-3 rounded-xl items-center justify-center flex-row flex-1 ${
              isActionDisabled ? 'opacity-40' : 'opacity-100'
            }`}
          >
            <Text className="text-white font-bold text-xs sm:text-sm mr-1">Submit</Text>
            <Ionicons name="checkmark-done" size={18} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={isActionDisabled}
            onPress={handleNext}
            className={`bg-[#FF6B25] py-3.5 px-3 rounded-xl items-center justify-center flex-row flex-1 ${
              isActionDisabled ? 'opacity-40' : 'opacity-100'
            }`}
          >
            <Text className="text-white font-bold text-xs sm:text-sm mr-1">Next Question</Text>
            <Ionicons name="chevron-forward" size={16} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
