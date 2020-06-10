import * as TYPE from "../Const/Types";
const initialState = "";

export default (state = initialState, Action) => {
    switch (Action.type) {
        case TYPE.UPDATE_USER_CHAT_WITH:
            return Action.username;
        default:
            return state;
    }
};
