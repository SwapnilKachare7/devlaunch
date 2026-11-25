import flagsmith from '@flagsmith/flagsmith';

const environmentKey = import.meta.env.VITE_FLAGSMITH_ENVIRONMENT_KEY;
const FLAG_NAME = 'devlaunch_onboarding';

export function getVisitorId() {
  let id = localStorage.getItem('devlaunch_visitor_id');

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('devlaunch_visitor_id', id);
  }

  return id;
}

export const visitorId = getVisitorId();

let initialized = false;

export async function initializeFlagsmith() {
  if (!environmentKey) {
    throw new Error('Missing Flagsmith environment key in .env');
  }

  await flagsmith.init({
    environmentID: environmentKey,
    enableEvents: true,
  });

  await flagsmith.identify(visitorId);

  initialized = true;

  console.log('Flagsmith connected!');
  console.log('Visitor:', visitorId);
}

export function getOnboardingVariation() {
  if (!initialized) {
    throw new Error('Flagsmith has not been initialized.');
  }

  const experiment = flagsmith.getExperimentFlag(FLAG_NAME);

  console.log('Experiment response:', experiment);

  return experiment?.value ?? 'simple';
}

let onboardingCompleted = false;

export function trackOnboardingCompleted() {
  if (!initialized || onboardingCompleted) return;

  onboardingCompleted = true;

  flagsmith.trackEvent('onboarding_completed', {
    identifier: visitorId,
  });

  console.log('Conversion event submitted.');
}
