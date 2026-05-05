import { useEffect, useState } from "react";

const useCountUp = (target, duration = 1000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const frameRate = 16;
    const totalFrames = Math.max(1, Math.floor(duration / frameRate));
    const increment = target / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(start);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [target, duration]);

  return Math.round(value * 100) / 100;
};

export default useCountUp;
