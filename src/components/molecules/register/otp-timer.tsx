"use client";

import { Button } from "@components/atoms/button";
import { memo, useCallback, useEffect, useRef, useState } from "react";

interface OtpTimerProps {
  seconds?: number;
  sendFn?: () => Promise<void> | void;
}

function OtpTimer({ seconds = 20, sendFn }: OtpTimerProps) {
  const [time, setTime] = useState(seconds);
  const [isExpierd, setIsExpierd] = useState(false);
  const interval = useRef<number>(0);

  const initTimer = useCallback(() => {
    setIsExpierd(false);
    interval.current = window.setInterval(() => {
      if (time > 0) {
        setTime(prev => --prev);
      } else {
        clearInterval(interval.current);
        setIsExpierd(true);
      }
    }, 1000);
  }, [time]);

  const reset = (interval?: number) => {
    if (!interval) return;
    setTime(seconds);
    clearInterval(interval);
    initTimer();
    sendFn?.();
  };

  useEffect(() => {
    initTimer();
    return () => clearInterval(interval.current);
  }, [initTimer]);

  return (
    <Button
      size={"lg"}
      type="button"
      disabled={!isExpierd}
      variant={isExpierd ? "default" : "outline"}
      onClick={() => reset(interval.current)}
    >
      <span>
        Отправить повторно{" "}
        {!isExpierd && (
          <span>
            через{" "}
            <span className="verify-minutes">
              {Math.floor(time / 60)
                .toString()
                .padStart(2, "0")}
            </span>
            :
            <span className="verify-seconds">
              {(time % 60).toString().padStart(2, "0")}
            </span>
          </span>
        )}
      </span>
    </Button>
  );
}

export default memo(OtpTimer);
