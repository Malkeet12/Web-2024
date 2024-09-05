export class FeatureFlag {
  constructor() {
    if (FeatureFlag.instance) {
      return;
    }
    this.featureFlags = {};
    FeatureFlag.instance = this;
    return this;
  }

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

  isFeatureEnabled(featureName, env) {
    return this.features[env][featureName];
  }

  toggleFeature() {}
  updateFeature() {}
  enableFeature() {}
  disableFeature() {}
}
