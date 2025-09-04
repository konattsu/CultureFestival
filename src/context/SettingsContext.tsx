import React, { createContext, useState, useEffect, useContext } from "react";

import { safeLocalStorage } from "../utils/safeLocalStorage";

interface SettingsContextProps {
  isMirrored: boolean;
  showUpArrow: boolean;
  toggleMirrored: () => void;
  toggleUpArrow: () => void;
}

export const SettingsContext = createContext<SettingsContextProps>({
  isMirrored: false,
  showUpArrow: true,
  toggleMirrored: () => {},
  toggleUpArrow: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMirrored, setIsMirrored] = useState(false);
  const [showUpArrow, setShowUpArrow] = useState(true);

  useEffect(() => {
    // Load settings from localStorage
    const mirroredSetting = safeLocalStorage.getItem("mirrored");
    const upArrowSetting = safeLocalStorage.getItem("showUpArrow");

    // Apply the settings
    setIsMirrored(mirroredSetting === "true");
    setShowUpArrow(upArrowSetting !== "false"); // Default to true if not set
  }, []);

  useEffect(() => {
    // Apply mirrored effect to body
    if (typeof document !== "undefined") {
      if (isMirrored) {
        document.body.classList.add("mirrored");
      } else {
        document.body.classList.remove("mirrored");
      }
    }

    // Save setting to localStorage
    safeLocalStorage.setItem("mirrored", String(isMirrored));
  }, [isMirrored]);

  useEffect(() => {
    // Apply up arrow visibility to body
    if (typeof document !== "undefined") {
      if (!showUpArrow) {
        document.body.classList.add("non-up-arrow");
      } else {
        document.body.classList.remove("non-up-arrow");
      }
    }

    // Save setting to localStorage
    safeLocalStorage.setItem("showUpArrow", String(showUpArrow));
  }, [showUpArrow]);

  const toggleMirrored = (): void => {
    setIsMirrored((prev) => !prev);
  };

  const toggleUpArrow = (): void => {
    setShowUpArrow((prev) => !prev);
  };

  return (
    <SettingsContext.Provider
      value={{
        isMirrored,
        showUpArrow,
        toggleMirrored,
        toggleUpArrow,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextProps =>
  useContext(SettingsContext);
