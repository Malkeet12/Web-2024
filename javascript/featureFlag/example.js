import featureFlagManager from "./featureFlags.js";

async function initializeFeatureFlags() {
  const staticFlags = {
    development: {
      enableNewDashboard: true,
      enableBetaFeature: true,
    },
    production: {
      enableNewDashboard: false,
      enableBetaFeature: false,
    },
  };

  await featureFlagManager.init(staticFlags, false);

  if (featureFlagManager.isFeatureEnabled("enableNewDashboard", "production")) {
    console.log("New Dashboard is enabled for production");
  } else {
    console.log("New Dashboard is disabled for production");
  }

  // Dynamically enable/disable features
  featureFlagManager.enableFeature("enableDarkMode", "production");
  featureFlagManager.disableFeature("enableBetaFeature", "development");

  if (featureFlagManager.isFeatureEnabled("enableDarkMode", "production")) {
    console.log("Dark mode enabled");
  }
}

initializeFeatureFlags();
