import * as TYPE from "../Const/Types";
import connection from "../Reducer/ConnectHub";

function getTask() {
    fetch(URL.URL_API)
        .then((response) => {
            // console.log(response);

            return response.json();
        })
        .catch((e) => {
            console.log("Err", e);
        })
        .then((data) => {
            // console.log(data);
            // console.log(data);
            localStorage.setItem("Tasks", JSON.stringify(data));
            // Cookies.set("Task", data);
            // console.log(localStorage.getItem("Tasks"));
        });
}
getTask();
const initialState =
    localStorage.getItem("Tasks") !== "undefined"
        ? JSON.parse(localStorage.getItem("Tasks"))
        : [];
// console.log(initialState);
function addTask(task) {
    // const item = task;

    fetch(URL.URL_API, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: task.name,
            level: task.level,
        }),
    })
        .catch((error) => console.error("Unable to add item.", error))
        .then(() => {
            getTask();
            connection.invoke("SendMessage", "AddTask");
        });
}

function deleteTask(taskId) {
    fetch(URL.URL_API + "/" + taskId, {
        method: "DELETE",
    })
        .catch((error) => console.error("Unable to delete item.", error))
        .then(() => {
            getTask();
            connection.invoke("SendMessage", "DeleteTask");
        });
}

// function updateTask(task) {
//     fetch(URL.URL_API + "/" + task.id, {
//         method: "PUT",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(task),
//     })
//         .then(() => {
//             getTask();
//             console.log(JSON.parse(localStorage.getItem("Tasks")));
//         })
//         .catch((error) => console.error("Unable to update item.", error));
// }

function sort(arr, by, dir) {
    switch (by) {
        case "Name":
            switch (dir) {
                case "DESC":
                    return arr.sort((a, b) => {
                        // console.log("DESC", a.name - b.name);
                        if (b.name < a.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1;
                        }

                        // name trùng nhau
                        return 0;
                        // return b.name - a.name;
                    });

                default:
                    return arr.sort((a, b) => {
                        // console.log("ASC", a.name - b.name);
                        if (b.name < a.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    });
            }

        default:
            switch (dir) {
                case "DESC":
                    return arr.sort((a, b) => {
                        return b.level - a.level;
                    });

                default:
                    return arr.sort((a, b) => {
                        return a.level - b.level;
                    });
            }
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TYPE.LIST:
            // console.log("reducer", action);
            return state;
        case TYPE.ADD_TASK:
            // console.log("reducer", action);
            addTask(action.task);
            // addTask(action.task);
            state.push(action.task);
            // fetch(URL.URL_API, {
            //     method: "POST",
            //     headers: {
            //         Accept: "application/json",
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         name: action.task.name,
            //         level: action.task.level,
            //     }),
            // })
            //     .catch((error) => console.error("Unable to add item.", error))
            //     .then(() => {
            //         getTask();
            //     });
            // console.log("js", tmp);
            // localStorage.setItem("Tasks", JSON.stringify(state));
            // console.log("state", JSON.parse(localStorage.getItem("Tasks")));
            // console.log("state", state);
            return [...state];
        case TYPE.DELETE_TASK:
            // console.log("reducer", URL.URL_API + "/" + action.taskId);
            deleteTask(action.taskId);
            let tmpArr = JSON.parse(localStorage.getItem("Tasks")).filter(
                (task) => {
                    return task.id !== action.taskId;
                }
            );
            // let tmpArr2 = state.filter((task) => {
            //     return task.id !== action.id;
            // });
            // console.log("state", tmpArr);
            // console.log("js", JSON.stringify(tmpArr));
            // localStorage.setItem("Tasks", JSON.stringify(tmpArr));
            console.log("reducer 1", tmpArr);
            // console.log("reducer 2", tmpArr2);

            return [...tmpArr];
        case TYPE.UPDATE_TASK:
            // updateTask(action.newTask);
            console.log("Update", action);
            let updateArr = state.map((task) => {
                if (task.id === action.newTask.id) {
                    return {
                        id: action.newTask.id,
                        name: action.newTask.name,
                        level: action.newTask.level,
                    };
                } else return task;
            });
            // console.log("state", updateArr);
            // console.log("js", JSON.stringify(updateArr));
            localStorage.setItem("Tasks", JSON.stringify(updateArr));
            console.log("UpdateArr", updateArr);

            return [...updateArr];
        case TYPE.SEARCH:
            // console.log("SEARCH", action);
            // JSON.parse(localStorage.getItem("Tasks"))
            const taskListSearched = JSON.parse(
                localStorage.getItem("Tasks")
            ).filter((task) => {
                return task.name
                    .toLowerCase()
                    .includes(action.search.toLowerCase());
            });
            // console.log("state", state);
            // console.log("js", JSON.stringify(taskListSearched));
            // localStorage.setItem("Tasks", JSON.stringify(updateArr));
            return [...taskListSearched];
        case TYPE.SORT:
            // console.log("Sort", action);
            // console.log("state", state);

            // JSON.parse(localStorage.getItem("Tasks"))
            const taskListSorted = sort(state, action.by, action.dir);
            // console.log("state", taskListSorted);
            // console.log("js", JSON.stringify(taskListSearched));
            // localStorage.setItem("Tasks", JSON.stringify(updateArr));
            return [...taskListSorted];
        case TYPE.RESET_TASK:
            // console.log(localStorage.getItem("Tasks"));
            return JSON.parse(localStorage.getItem("Tasks"));
        default:
            return state;
    }
    // return state;
};
