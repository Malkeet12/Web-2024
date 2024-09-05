import { useState } from "react";
import { createContext } from "react";

export const FeatureFlagContext = createContext();
export const FeatureFlagProvider = ({ children }) => {
  const [flags, setFlags] = useState({
    stage: {
      videos: true,
    },
    prod: {
      videos: false,
    },
  });
  return (
    <FeatureFlagContext.Provider value={{ flags, setFlags }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
