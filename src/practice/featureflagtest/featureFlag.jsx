import { FeatureFlagProvider } from "./context";
import { useFlag } from "./useFlag";

export const Feature = () => {
  const { flags, setFlags } = useFlag();
  console.log(flags);
  if (flags.prod.videos) return "videos";
  return "coming soon";
};

export const FeatureFlagContainer = () => {
  return (
    <FeatureFlagProvider>
      <Feature />
    </FeatureFlagProvider>
  );
};
