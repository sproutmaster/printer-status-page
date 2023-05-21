const signalr = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:8888/printer-status", { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets })
    .configureLogging(signalR.LogLevel.Information) // comment out in prod
    .build();

async function startSignalR() {
    try {
        await signalr.start();
        document.getElementById("test_con").innerText = "Connected";
    }
    catch (err) {
        console.log(err);
    }
}

startSignalR();

signalr.on("newData", (user, message) => {
    const li = document.createElement("li");
    li.textContent = `${user}: ${message}`;
    document.getElementById("messageList").appendChild(li);
});



// connection.on("ReceiveMessage", function (user, message) {
//     const li = document.createElement("li");
//     document.getElementById("messagesList").appendChild(li);
//     // We can assign user-supplied strings to an element's textContent because it
//     // is not interpreted as markup. If you're assigning in any other way, you
//     // should be aware of possible script injection concerns.
//     li.textContent = `${user} says ${message}`;
// });

