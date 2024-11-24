const base_url = "http://localhost:7081";
const port = {
    http: `${base_url}/api`,
    https: 'https://localhost:5000',
    MESSAGE_HUB_URL: `${base_url}/messageHub`,
    NOTIFICATION_HUB_URL: `${base_url}/notificationHub`,
    RTC_HUB: `${base_url}/RtcHub`,
    OPEN_API_URL: "http://127.0.0.1:8000"
};
export default port;
