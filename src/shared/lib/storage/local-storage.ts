export function useLocalStorage(): Storage {
  if (typeof window === "undefined") {
    return {
      clear: () => {},
      getItem: () => null,
      key: () => null,
      length: 0,
      removeItem: () => {},
      setItem: () => {},
    };
  } else {
    return localStorage;
  }
}
