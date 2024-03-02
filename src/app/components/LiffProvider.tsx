"use client";

import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Liff } from "@line/liff";
import VConsole from "vconsole";
import { useRecoilState, useSetRecoilState } from "recoil";
import { state as liffProfileState } from "./store/liffProvider";

const LiffContext = createContext<{
  liff: Liff | null;
  liffError: string | null;
}>({ liff: null, liffError: null });

export const useLiff = () => useContext(LiffContext);

export const LiffProvider: FC<PropsWithChildren<{ liffId: string }>> = ({
  children,
  liffId,
}) => {
  const [liff, setLiff] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const setProfile = useSetRecoilState(liffProfileState);

  const initLiff = useCallback(async () => {
    try {
      const liffModule = await import("@line/liff");
      const liff = liffModule.default;
      console.log("LIFF init...");

      await liff.init({ liffId });

      console.log("LIFF init succeeded.");
      setLiff(liff);

      const profile = await liff.getProfile();
      setProfile(profile);
    } catch (error) {
      console.log("LIFF init failed.");
      setLiffError((error as Error).toString());
    }
  }, [liffId, setProfile]);

  // init Liff
  useEffect(() => {
    console.log("LIFF init start...");
    initLiff();
  }, [initLiff]);

  useEffect(() => {
    // NOTE: レンダリング時に初期化
    const vConsole = new VConsole();

    // NOTE: アンマウント時に解除
    return () => {
      vConsole.destroy();
    };
  }, []);

  return (
    <LiffContext.Provider
      value={{
        liff,
        liffError,
      }}
    >
      {children}
    </LiffContext.Provider>
  );
};
