/**
 * Represents the global scope of a shared worker.
 */
const globalScope = self as unknown as SharedWorkerGlobalScope;

/**
 * An array of `MessagePort` objects representing the connected ports.
 */
const ports: MessagePort[] = [];

/**
 * Interface defining the structure of message data exchanged between the worker and its ports.
 */
interface MessageData {
  type: 'SET_STATE' | 'GET_STATE';
  payload?: any;
}

/**
 * Interface defining the structure of synchronization messages sent to update shared state.
 */
interface SyncMessage {
  type: 'SYNC_STATE';
  payload: any;
}

/**
 * An array of `MessagePort` objects representing active connections to the shared worker.
 */
let connections: MessagePort[] = [];

/**
 * A record representing the shared state managed by the shared worker.
 */
let sharedState: Record<string, any> = {};

/**
 * Handles a new connection by adding the provided `MessagePort` to the list of connections
 * and setting up message event listeners for state synchronization.
 *
 * @param port - The `MessagePort` representing the connection to handle.
 *
 * The function listens for two types of messages:
 * - `SET_STATE`: Updates the shared state with the provided payload and synchronizes the updated
 *   state with all other connected ports.
 * - `GET_STATE`: Sends the current shared state back to the requesting port.
 *
 * Upon connection, the function immediately sends the current shared state to the new port.
 */
const handleConnection = (port: MessagePort) => {
  connections.push(port);

  port.onmessage = (event: MessageEvent<MessageData>) => {
    const { type, payload } = event.data;
    console.log(payload);
    switch (type) {
      case 'SET_STATE':
        sharedState = { ...sharedState, ...payload };

        connections.forEach((p) => {
          if (p !== port) {
            const msg: SyncMessage = { type: 'SYNC_STATE', payload: sharedState };
            p.postMessage(msg);
          }
        });
        break;

      case 'GET_STATE':
        port.postMessage({ type: 'SYNC_STATE', payload: sharedState });
        break;
    }
  };

  port.postMessage({ type: 'SYNC_STATE', payload: sharedState });
};

/**
 * Event handler for the `onconnect` event of the shared worker's global scope.
 *
 * This function is triggered when a new client connects to the shared worker. It retrieves the
 * `MessagePort` from the event, passes it to the `handleConnection` function, and sets up the
 * necessary communication channels.
 *
 * @param e - The `MessageEvent` triggered when a new client connects.
 */
globalScope.onconnect = function (e: MessageEvent) {
  const port = (e as any).ports[0] as MessagePort;
  handleConnection(port);
};
