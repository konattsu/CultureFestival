/**
 * Safe wrapper for localStorage operations that handles cases when localStorage is not available
 * (e.g., when cookies are disabled or in SSR environments)
 */
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== "undefined") {
        return window.localStorage.getItem(key);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    return null;
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error("Error setting localStorage item:", error);
    }
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error("Error removing localStorage item:", error);
    }
  },

  clear: (): void => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.clear();
      }
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};
