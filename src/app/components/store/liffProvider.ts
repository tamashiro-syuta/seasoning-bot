"use client";

import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { Profile } from "@liff/get-profile";

const key = "liffProvider";

export const state = atom<Profile | null>({
  key: `${key}/atom`,
  default: null,
});

const profile = selector({
  key: `${key}/selector`,
  get: ({ get }) => {
    const profile = get(state);

    return profile;
  },
});

const userId = selector({
  key: `${key}/selector/userId`,
  get: ({ get }) => {
    const profile = get(state);

    return profile?.userId;
  },
});

export const selectors = {
  useProfile: () => useRecoilValue(profile),
  useUserId: () => useRecoilValue(userId),
};
