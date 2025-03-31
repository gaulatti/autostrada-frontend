import { useSelector } from 'react-redux';
import { getFeatureFlags } from '../state/selectors/featureFlags';


/**
 * Custom hook to retrieve and interact with feature flags.
 *
 * This hook provides a function that allows you to check whether a specific feature flag is enabled
 * and retrieve its treatment value. Feature flags are fetched from the Redux store.
 *
 * @returns A function that takes a feature flag name and returns an object with:
 * - `isEnabled`: A function that returns a boolean indicating whether the feature is enabled.
 * - `treatment`: A function that returns the treatment value of the feature flag, which can be one of:
 *   - `'C'`: Control group (default value).
 *   - `'T1'`: Treatment group 1.
 *   - `'T2'`: Treatment group 2.
 *   - `'T3'`: Treatment group 3.
 *
 * @example
 * ```tsx
 * const getFeatureFlag = useFeatureFlags();
 * const feature = getFeatureFlag('someFeature');
 *
 * if (feature.isEnabled()) {
 *   console.log(`Feature is enabled with treatment: ${feature.treatment()}`);
 * } else {
 *   console.log('Feature is disabled');
 * }
 * ```
 */
const useFeatureFlags = (): ((flagName?: string) => { isEnabled: () => boolean, treatment: () => 'C' | 'T1' | 'T2' | 'T3' }) => {
  /**
   * Retrieve the feature flags from the Redux store.
   */
  const featureFlags = useSelector(getFeatureFlags);
  return (flagName?: string) => {
    const feature = featureFlags.find((flag) => flag.slug === flagName);
    return {
      isEnabled: () => (feature?.default_value || 'C') != 'C',
      treatment: () => feature?.default_value || 'C'
    }
  };
};

export { useFeatureFlags };
