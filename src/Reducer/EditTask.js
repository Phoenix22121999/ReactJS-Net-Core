import * as TYPE from "../Const/Types";
const initialState = {
    Name: "",
    Level: 1,
};

export default (state = initialState, Action) => {
    switch (Action.type) {
        case TYPE.EDIT_TASK:
            // console.log("edit", Action);
            return (state = {
                Name: Action.task.name,
                Level: Action.task.level,
            });
        default:
            // console.log("edit", Action);
            return state;
    }
};
