let port: MessagePort | null = null;

type Callback = (data: any) => void;

/**
 * Initializes a shared worker bridge for communication between the main thread
 * and a shared worker. This function sets up a message port to handle incoming
 * messages and sends an initial request to retrieve the state.
 *
 * @param onMessage - A callback function that is invoked whenever a message
 *                    is received from the shared worker. The message data is
 *                    passed as an argument to this callback.
 */
export const initWorkerBridge = (onMessage: Callback) => {
  if (!port) {
    const worker = new SharedWorker(new URL('../engines/state.shared.ts', import.meta.url), { type: 'module' });
    port = worker.port;
    port.start();
    port.onmessage = (event) => {
      onMessage(event.data);
    };

    port.postMessage({ type: 'GET_STATE' });
  }
};

export const sendStateToWorker = (state: any) => {
  port?.postMessage({ type: 'SET_STATE', payload: state });
};
