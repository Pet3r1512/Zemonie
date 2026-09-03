import { useCallback, useEffect, useRef, useState } from "react";

const COOLDOWN_SECONDS = 60;

export default function useVerificationCooldown() {
  const [remaining, setRemaining] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startCooldown = useCallback(() => {
    clearTimer();
    setRemaining(COOLDOWN_SECONDS);

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  useEffect(() => {
    if (remaining === 0) {
      clearTimer();
    }
  }, [remaining, clearTimer]);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  return {
    remaining,
    isCoolingDown: remaining > 0,
    startCooldown,
  };
}
