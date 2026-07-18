import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ExamSessionData {
  currentIndex: number;
  userAnswers: { [qId: number]: string };
  secondsElapsed: number;
  isCompleted?: boolean;
}

interface QBankState {
  sessions: { [cardId: string]: ExamSessionData };
  lastActiveCardId: string | null;
  saveSessionProgress: (cardId: string, data: ExamSessionData) => void;
  clearSessionProgress: (cardId: string) => void;
  getSessionProgress: (cardId: string) => ExamSessionData | undefined;
}

export const useQBankStore = create<QBankState>()(
  persist(
    (set, get) => ({
      sessions: {},
      lastActiveCardId: null,
      saveSessionProgress: (cardId, data) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [cardId]: data,
          },
          lastActiveCardId: cardId,
        })),
      clearSessionProgress: (cardId) =>
        set((state) => {
          const newSessions = { ...state.sessions };
          delete newSessions[cardId];
          return {
            sessions: newSessions,
            lastActiveCardId: state.lastActiveCardId === cardId ? null : state.lastActiveCardId,
          };
        }),
      getSessionProgress: (cardId) => get().sessions[cardId],
    }),
    {
      name: 'qbank-sessions-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
