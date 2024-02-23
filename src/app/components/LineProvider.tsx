"use client";

import type { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

interface Props {
  session: Session | null;
  children: React.ReactNode;
}

const LineProvider = ({ session, children }: Props) => {
  useEffect(() => {
    const signInIfNoSession = async (session: Session | null) => {
      if (!session) {
        await signIn("line");
      }
    };

    signInIfNoSession(session);
  }, [session]);

  return children as React.ReactElement;
};

export default LineProvider;
