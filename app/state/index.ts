import { type Store, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { lifecycle } from '../events/sagas';
import { initWorkerBridge, sendStateToWorker } from './bridge';
import { reducers } from './reducers';
let store: Store;

/**
 * Enhanced logger middleware for Redux.
 * Logs the previous state, the dispatched action, and the next state.
 *
 * @template S - The state type.
 * @template A - The action type. It must have at least a 'type' property.
 *
 * @param store - The Redux middleware API including getState() and dispatch().
 * @returns A function that passes the action to the next middleware.
 */
import type { Middleware } from 'redux';

/**
 * Enhanced logger middleware for Redux.
 * Logs the previous state, the dispatched action, and the next state.
 * Uses console grouping and styled output for clarity.
 */
export const logger: Middleware = (store: any) => (next: any) => (action: any) => {
  /**
   * Capture the current state before processing the action.
   */
  const prevState = store.getState();

  /**
   * Start a console group with the action type.
   */
  if (console.groupCollapsed) {
    console.groupCollapsed(`Action: ${action.type}`);
  } else {
    console.log(`Action: ${action.type}`);
  }

  /**
   * Log the previous state and the action with styled output.
   */
  console.info('%cPrevious State:', 'color: #9E9E9E; font-weight: bold;', prevState);
  console.info('%cAction:', 'color: #03A9F4; font-weight: bold;', action);

  let result;
  try {
    /**
     * Dispatch the action.
     */
    result = next(action);
  } catch (error) {
    /**
     * Log any errors that occur during action processing.
     */
    console.error('%cError processing action:', 'color: red; font-weight: bold;', error);
    throw error;
  }

  /**
   * Capture the new state after processing the action.
   */
  const nextState = store.getState();
  console.info('%cNext State:', 'color: #4CAF50; font-weight: bold;', nextState);

  /**
   * End the console group.
   */
  if (console.groupEnd) {
    console.groupEnd();
  }

  /**
   * Return the result of next(action).
   */
  return result;
};
/**
 * Retrieves the Redux store and persistor.
 * @returns An object containing the Redux store and persistor.
 */
const getStore = () => {
  if (!store) {
    const sagaMiddleware = createSagaMiddleware();
    store = configureStore({
      reducer: reducers,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware).concat(logger),
    });

    /**
     * Reusing state across tabs via Shared Worker.
     */
    let isHydrating = false;
    if (typeof window !== 'undefined' && typeof SharedWorker !== 'undefined') {
      store.subscribe(() => {
        if (isHydrating) return;
        const state = store.getState();
        sendStateToWorker(state);
      });
      initWorkerBridge((data) => {
        if (data.type === 'SYNC_STATE') {
          isHydrating = true;
          store.dispatch({ type: 'HYDRATE_FROM_WORKER', payload: data.payload });
          isHydrating = false;
        }
      });
    } else {
      console.warn('SharedWorker not available, skipping worker bridge.');
    }

    sagaMiddleware.run(lifecycle);
  }

  return { store };
};

export { getStore };
