import { create } from 'zustand';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  isLoading: false,
  fetchProfile: async () => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({
      profile: { name: 'John Doe', email: 'john@example.com', phone: '+1234567890' },
      isLoading: false,
    });
  },
  updateProfile: async (data) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const current = get().profile;
    if (current) {
      set({ profile: { ...current, ...data }, isLoading: false });
    }
  },
}));
