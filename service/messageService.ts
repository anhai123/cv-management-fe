
import * as signalR from "@microsoft/signalr";
import port from "./Base/http";

/**
 * Initializes a SignalR connection to the message hub.
 *
 * @returns {Promise<signalR.HubConnection | null>} A promise that resolves to the SignalR connection if successful, or null if an error occurs.
 *
 * @summary This function sets up and starts a SignalR connection using the specified message hub URL.
 */
// export const InitMessageHub = async (): Promise<signalR.HubConnection | null> => {
//     var connection = new signalR.HubConnectionBuilder()
//         .withUrl(port.MESSAGE_HUB_URL)
//         .build();
//     try {
//         // Start the SignalR connection
//         await connection.start();
//         console.log('SignalR connected successfully.');
//         return connection;
//     } catch (err) {
//         console.error('Error connecting to SignalR:', err);
//         return null
//     }
// }
