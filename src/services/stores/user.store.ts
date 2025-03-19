import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { GitHubSearchResponse } from "../api/api-types/user.type";

type UserState = {
  data: GitHubSearchResponse | null;
  searchValue: string;
};

type UserAction = {
  setUserData: (data: GitHubSearchResponse) => void;
  setSearchValue: (searchValue: string) => void;
};

export const useUserStore = create<UserState & UserAction>()(
  immer((set) => ({
    data: null,
    searchValue: "",
    setUserData: (data) => set({ data }),
    setSearchValue: (searchValue) => set({ searchValue }),
  }))
);
