import { fork } from 'redux-saga/effects';
import { authLifecycle } from './auth';
import { kickoffLifecycle } from './kickoff';
import { teamsLifecycle } from './teams';

/**
 * Saga lifecycle generator function.
 *
 * This function forks multiple lifecycle sagas to manage different parts of the application state.
 * It includes:
 * - `authLifecycle`: Manages authentication-related side effects.
 * - `kickoffLifecycle`: Manages kickoff-related side effects.
 * - `teamsLifecycle`: Manages team-related side effects.
 *
 * @generator
 */
function* lifecycle() {
  if (typeof window !== 'undefined' && typeof SharedWorker !== 'undefined') {
    yield fork(authLifecycle);
    yield fork(kickoffLifecycle);
    yield fork(teamsLifecycle);
  } else {
    console.warn('Sagas are only available on browser runtime.');
  }
}

export { lifecycle };
