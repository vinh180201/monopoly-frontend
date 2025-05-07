"use client";

import React, { createContext, useContext } from "react";
import { useQuestionQueue } from "@/hooks/useQuestionQueue";

const QuestionContext = createContext<ReturnType<typeof useQuestionQueue> | null>(null);

export const QuestionProvider = ({ children }: { children: React.ReactNode }) => {
  const question = useQuestionQueue();
  return (
    <QuestionContext.Provider value={question}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useGlobalQuestion = () => {
  const ctx = useContext(QuestionContext);
  if (!ctx) {
    throw new Error("useGlobalQuestion must be used within QuestionProvider");
  }
  return ctx;
};
