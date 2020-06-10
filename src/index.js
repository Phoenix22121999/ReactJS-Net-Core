import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import reducer from "./Reducer/Index";
import { Provider } from "react-redux";
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// const connection = new signalR.HubConnectionBuilder()
//     .withUrl("http://localhost:5000/chathub")
//     .configureLogging(signalR.LogLevel.Information)
//     .build();

// async function start() {
//     try {
//         await connection.start();
//         console.log("connected");
//     } catch (err) {
//         console.log(err);
//         setTimeout(() => start(), 5000);
//     }
// }

// connection.onclose(async () => {
//     await start();
// });

// Start the connection.
// start();

/* this is here to show an alternative to start, with a then
connection.start().then(() => console.log("connected"));
*/

/* this is here to show another alternative to start, with a catch
connection.start().catch(err => console.error(err));
*/

ReactDOM.render(
    <Provider store={store}>
        <App />{" "}
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
