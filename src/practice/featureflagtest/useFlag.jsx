import { useContext } from "react";
import { FeatureFlagContext } from "./context";

export const useFlag = () => {
  const context = useContext(FeatureFlagContext);
  if (!context)
    throw new Error("useFlag can be used inside only useFlag context");
  return context;
};
