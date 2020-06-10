import * as TYPE from "../Const/Types";
export const listAll = () => {
    return {
        type: TYPE.LIST,
    };
};

export const addTask = (task) => {
    return {
        type: TYPE.ADD_TASK,
        task: task,
    };
};

export const deleteTask = (taskId) => {
    return {
        type: TYPE.DELETE_TASK,
        taskId: taskId,
    };
};

export const toggleForm = () => {
    return {
        type: TYPE.TOGGLE_FORM,
    };
};

export const openForm = () => {
    return {
        type: TYPE.OPEN_FORM,
    };
};

export const closeForm = () => {
    return {
        type: TYPE.CLOSE_FORM,
    };
};

export const toggleEdit = () => {
    return {
        type: TYPE.TOGGLE_EDIT,
    };
};

export const editTask = (task) => {
    return {
        type: TYPE.EDIT_TASK,
        task: task,
    };
};

export const newTask = (task) => {
    return {
        type: TYPE.NEW_TASK,
        task: task,
    };
};

export const updateTask = (newTask) => {
    return {
        type: TYPE.UPDATE_TASK,
        newTask: newTask,
    };
};

export const search = (search) => {
    return {
        type: TYPE.SEARCH,
        search: search,
    };
};

export const sort = (by, dir) => {
    return {
        type: TYPE.SORT,
        by: by,
        dir: dir,
    };
};

export const resetNewTask = () => {
    return {
        type: TYPE.RESET_NEW_TASK,
    };
};

export const setNewTask = (task) => {
    return {
        type: TYPE.SET_NEW_TASK,
        task: task,
    };
};

export const toggleChart = () => {
    return {
        type: TYPE.TOGGLE_CHART,
    };
};

export const resetChart = () => {
    return {
        type: TYPE.UPDATE_CHART,
    };
};

export const toggleLogin = () => {
    return {
        type: TYPE.TOGGLE_LOGIN,
    };
};

export const notLogin = () => {
    return {
        type: TYPE.NOT_LOGIN,
    };
};
export const isLogin = () => {
    return {
        type: TYPE.IS_LOGIN,
    };
};
export const resetTask = () => {
    return {
        type: TYPE.RESET_TASK,
    };
};
export const updateUser = (username) => {
    return {
        type: TYPE.UPDATE_USER,
        username: username,
    };
};
export const updateChat = (usernameSend, usernameReceive, message) => {
    return {
        type: TYPE.UPDATE_CHAT,
        usernameSend: usernameSend,
        usernameReceive: usernameReceive,
        message: message,
    };
};
export const updateListUser = (listUser) => {
    return {
        type: TYPE.UPDATE_LIST_USER,
        listUser: listUser,
    };
};
export const updateUserChatWith = (username) => {
    return {
        type: TYPE.UPDATE_USER_CHAT_WITH,
        username: username,
    };
};
