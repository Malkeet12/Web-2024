// returns the state of *all* features for current user
const b = false;
const c = {};
const a = b ?? c;
console.log(a);
function fetchAllFeatures() {
  // in reality, this would have been a `fetch` call:
  console.log("api calls");
  // `fetch("/api/features/all")`

  return new Promise((resolve, reject) => {
    const sampleFeatures = {
      "extended-summary": true,
      "feedback-dialog": false,
      abc: { value: true },
    };

    setTimeout(resolve, 100, sampleFeatures);
  });
}

let features;
let overrideFeatures = { "feedback-dialog": true };
//localStorage (5MB)
//indexDB
const addDevOverrideForFeature = (event, value) => {
  features[event] = value;
};

const deleteDevOverrideForFeature = () => {
  overrideFeatures = null;
};

// src/feature-x/summary.js
async function getFeatureState(event, defaultValue) {
  try {
    if (!features) {
      features = await fetchAllFeatures();
    }
    return overrideFeatures[event] || features[event] || defaultValue;
  } catch (e) {
    console.log(e);
    return defaultValue;
    // throw "Api failure";
  }
}

getFeatureState("extended-summary", true)
  .then(function (isEnabled) {
    console.log(isEnabled);
    if (isEnabled) {
      // console.log("enabled", { isEnabled });
      //showExtendedSummary();
    } else {
      // console.log({ isEnabled });
      //showBriefSummary();
    }
  })
  .catch((e) => {
    console.log(e);
  });

setTimeout(() => {
  // addDevOverrideForFeature("ab", { value: false });
  addDevOverrideForFeature("feedback-dialog", { value: false });

  getFeatureState("feedback-dialog").then(function (isEnabled) {
    console.log("feedback", isEnabled);
    if (isEnabled) {
      console.log("feedback", isEnabled);
    }
  });
}, 1000);
// src/feature-y/feedback-dialog.js
