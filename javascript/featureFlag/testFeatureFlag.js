class FeatureFlag {
  constructor() {
    if (FeatureFlag.instance) {
      return FeatureFlag.instance;
    }
    this.flags = {};
    FeatureFlag.instance = this;
  }
  initialize(flags = {}, fetchFlags = false) {
    this.flags = { ...flags };
    if (fetchFlags) {
      console.log("fetch more flags");
    }
  }
  isFeatureEnabled(feature, env) {
    return Boolean(this.flags[env] && this.flags[env][feature]);
  }
  toggleFeature(feature, env) {
    if (!this.flags[env]) {
      this.flags[env] = {};
    }
    this.flags[env][feature] = Boolean(!this.flags[env][feature]);
  }
  getEnvironments() {
    return Object.keys(this.flags);
  }
}
//const featureFlag = new FeatureFlag();
// export featureFlag
// // export default FeatureFlag;
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
const featureFlag = new FeatureFlag();
console.log("instance", featureFlag instanceof FeatureFlag);
featureFlag.initialize(staticFlags);

console.log(featureFlag.isFeatureEnabled("enableNewDashboard", "production"));
console.log(featureFlag.getEnvironments());
