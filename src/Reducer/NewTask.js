import * as TYPE from "../Const/Types";
const initialState = {
    name: "",
    level: 1,
};

export default (state = initialState, Action) => {
    switch (Action.type) {
        case TYPE.NEW_TASK:
            console.log("edit", Action);
            return (state = {
                name: Action.task.name,
                level: Action.task.level,
            });

        case TYPE.RESET_NEW_TASK:
            console.log("edit", Action);
            return (state = {
                name: "",
                level: 1,
            });

        case TYPE.SET_NEW_TASK:
            console.log("edit", Action);
            return (state = {
                name: Action.task.name,
                level: Action.task.level,
            });
        default:
            // console.log("new", Action);
            return state;
    }
};
