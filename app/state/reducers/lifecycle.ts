import { type ReduxAction } from '../dispatchers/base';
import defaultStore, { type State } from '../store';

/**
 * Reducer function for the lifecycle state.
 *
 * @param state - The current state.
 * @param action - The Redux action.
 * @returns The updated state.
 */
const lifecycleReducer = (state: State = defaultStore, action: ReduxAction) => {
  switch (action.type) {
    case 'SET_KICKOFF_READY':
      return {
        ...state,
        kickoffReady: true,
      };

    case 'HYDRATE_FROM_WORKER':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export { lifecycleReducer };
