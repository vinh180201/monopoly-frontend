import { useState, useCallback, useRef, useEffect } from "react";

export const useQuestionQueue = () => {
  const [currentQuestion, setCurrentQuestion] = useState<null | {
    text: string;
    confirm: () => void;
    cancel: () => void;
    autoDismiss?: boolean;
  }>(null);

  const queueRef = useRef<any[]>([]);
  const isShowingQuestion = useRef(false);

  const processNext = () => {
    if (queueRef.current.length === 0) {
      console.log("✅ Queue is empty. Nothing to show.");
      isShowingQuestion.current = false;
      setCurrentQuestion(null);
      return;
    }
  
    const next = queueRef.current.shift();
    console.log("🔔 Showing next question:", next.text);
    isShowingQuestion.current = true;
    setCurrentQuestion(next);
  
    if (next.autoDismiss) {
      console.log("⏳ Auto dismiss enabled, will confirm in 1.5s");
      setTimeout(() => {
        next.confirm();
        processNext(); 
      }, 1500);
    }
  };
  

  const enqueueQuestion = useCallback(
    (
      text: string,
      confirm: () => void,
      cancel: () => void,
      autoDismiss = false
    ) => {
      console.log("📥 Enqueue question:", { text, autoDismiss });
      queueRef.current.push({ text, confirm, cancel, autoDismiss });
  
      console.log("📋 Queue after enqueue:", [...queueRef.current]);
  
      if (!isShowingQuestion.current) {
        console.log("🚀 Starting to process next question...");
        processNext();
      } else {
        console.log("🕒 Currently showing a question, new one queued.");
      }
    },
    []
  );  

  const confirm = () => {
    console.log("✅ Confirmed question:", currentQuestion?.text);
    currentQuestion?.confirm?.();
    processNext();
  };
  
  const cancel = () => {
    console.log("❌ Canceled question:", currentQuestion?.text);
    currentQuestion?.cancel?.();
    processNext();
  };  

  return {
    question: currentQuestion?.text ?? null,
    showQuestion: enqueueQuestion,
    confirm,
    cancel,
    isAutoDismiss: currentQuestion?.autoDismiss ?? false,
  };
};
