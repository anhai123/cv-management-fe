import * as signalR from "@microsoft/signalr";
import port from "./Base/http";
import Api from "./Base/api";

interface NotificationDTO {
    userId?: string;
    message?: string;
}

export default class NotificationServiceApi extends Api {
    public notificationEndpoint = 'Notification/';
    private notificationInstance: signalR.HubConnection;

    constructor() {
        super();
        this.notificationInstance = new signalR.HubConnectionBuilder()
            .withUrl(port.NOTIFICATION_HUB_URL)
            .build();

        this.initializeConnection();
    }

    private async initializeConnection() {


        try {
            // Start the SignalR connection
            await this.notificationInstance.start();
            console.log('SignalR connected successfully.');
        } catch (err) {
            console.error('Error connecting to SignalR:', err);
        }
    }

    postNewJob(notificationData: NotificationDTO) {
        return this.postAPI(`${this.notificationEndpoint}send-notification`, notificationData);
    }

    updateNotification(id: number, notificationData: NotificationDTO) {
        return this.putAPI(`${this.notificationEndpoint}${id}`, notificationData);
    }

    getConnectionInstance() {
        return this.notificationInstance;
    }

    addUserToGroup = async (companyId: string): Promise<void> => {
        try {
            await this.notificationInstance.invoke("AddUserToGroup", companyId);
            console.log(`User added to group ${companyId} successfully.`);
        } catch (err) {
            console.error(`Error adding user to group ${companyId}:`, err);
        }
    }

    /**
     * Registers a callback function to be invoked when a notification is received.
     *
     * @param {Function} callback - The callback function to handle the received notification.
     */
    onReceiveNotification = (callback: (notification: any) => void): void => {
        this.notificationInstance.on("ReceiveNotification", callback);
    }

    getNotification(params: any) {
        return this.get(`${this.notificationEndpoint}get-notification-by-userId`, params);
    }
}
