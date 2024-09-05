class FeatureFlagManager {
  constructor() {
    if (FeatureFlagManager.instance) {
      return FeatureFlagManager.instance;
    }

    this.featureFlags = {};
    FeatureFlagManager.instance = this;

    // return this;
  }

  // Initialize feature flags from a static object, environment, or remote source
  async init(flags = {}, fetchRemoteFlags = false) {
    this.featureFlags = { ...flags };

    if (fetchRemoteFlags) {
      await this.fetchRemoteFlags();
    }
  }

  // Fetch feature flags from a remote service or API
  async fetchRemoteFlags() {
    try {
      const response = await fetch("/api/feature-flags");
      const remoteFlags = await response.json();
      this.featureFlags = { ...this.featureFlags, ...remoteFlags };
    } catch (error) {
      console.error("Failed to fetch remote feature flags:", error);
    }
  }

  // Check if a feature is enabled
  isFeatureEnabled(featureName, environment = "production") {
    return !!(
      this.featureFlags[environment] &&
      this.featureFlags[environment][featureName]
    );
  }

  // Enable a feature flag
  enableFeature(featureName, environment = "production") {
    if (!this.featureFlags[environment]) {
      this.featureFlags[environment] = {};
    }
    this.featureFlags[environment][featureName] = true;
  }

  // Disable a feature flag
  disableFeature(featureName, environment = "production") {
    if (!this.featureFlags[environment]) {
      this.featureFlags[environment] = {};
    }
    this.featureFlags[environment][featureName] = false;
  }

  // Toggle a feature flag
  toggleFeature(featureName, environment = "production") {
    if (!this.featureFlags[environment]) {
      this.featureFlags[environment] = {};
    }
    this.featureFlags[environment][featureName] =
      !this.featureFlags[environment][featureName];
  }

  // Get all feature flags for a specific environment
  getFeatureFlags(environment = "production") {
    return this.featureFlags[environment] || {};
  }

  // Get all environments
  getEnvironments() {
    return Object.keys(this.featureFlags);
  }
}

// Exporting a singleton instance of FeatureFlagManager
const instance = new FeatureFlagManager();
Object.freeze(instance.constructor.prototype);

export default instance;

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
const featureFlag = new FeatureFlagManager();
console.log("instance", featureFlag instanceof FeatureFlagManager);
featureFlag.init(staticFlags);

console.log(featureFlag.isFeatureEnabled("enableNewDashboard", "production"));
console.log(featureFlag.getEnvironments());
