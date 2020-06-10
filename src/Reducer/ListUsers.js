import * as TYPE from "../Const/Types";
const initialState = [];

export default (state = initialState, Action) => {
    switch (Action.type) {
        case TYPE.UPDATE_LIST_USER:
            console.log(Action.listUser);
            return [...Action.listUser];
        default:
            return state;
    }
};
