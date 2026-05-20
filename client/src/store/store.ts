import { create } from "zustand";
import getCurrentBalance from "@/api/users/balances/getCurrentBalance";
import { authClient } from "@/lib/auth-client";

export type BalanceState = {
  balance: number;
  isUpdated: boolean;
  isLoading: boolean;

  fetchBalance: () => Promise<void>;
  updateBalance: (value: number) => void;
  markUpdated: (value: boolean) => void;
};

const useBalanceStore = create<BalanceState>((set) => ({
  balance: 0,
  isUpdated: false,
  isLoading: false,

  updateBalance: (value) =>
    set(() => ({
      balance: value,
      isUpdated: true,
    })),

  markUpdated: (value) =>
    set(() => ({
      isUpdated: value,
    })),

  fetchBalance: async () => {
    set({ isLoading: true });

    try {
      const session = await authClient.getSession();

      const userId = session?.data?.user?.id;
      if (!userId) return;

      const res = await getCurrentBalance({ userId });

      set({
        balance: res.balance,
        isUpdated: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useBalanceStore;
