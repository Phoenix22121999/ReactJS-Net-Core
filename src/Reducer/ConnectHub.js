import * as signalR from "@microsoft/signalr";

export const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chathub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

export async function connectionStart() {
    try {
        await connection.start();
        // console.log("connected table");
    } catch (err) {
        console.log(err);
        setTimeout(() => connectionStart(), 5000);
    }
}
export const connectionStart2 = async () => {
    try {
        await connection.start();
        // console.log("connected table");
    } catch (err) {
        console.log(err);
        setTimeout(() => connectionStart(), 5000);
    }
};
connection.onclose(async () => {
    await connectionStart();
});

export default connection;
