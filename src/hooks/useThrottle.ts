export function useThrottle() {
  let timeout: NodeJS.Timeout | null = null;

  return <T extends (...args: unknown[]) => unknown>(
    callback: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    const throttled = (...args: Parameters<T>) => {
      if (timeout) return;

      timeout = setTimeout(() => {
        callback(...args);
        if (timeout) clearTimeout(timeout);
        timeout = null;
      }, delay);
    };

    return throttled;
  };
}
