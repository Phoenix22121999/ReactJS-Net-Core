import * as TYPE from "../Const/Types";
const initialState = [];

export default (state = initialState, Action) => {
    switch (Action.type) {
        case TYPE.UPDATE_CHAT:
            state.push({
                usernameSend: Action.usernameSend,
                usernameReceive: Action.usernameReceive,
                message: Action.message,
            });
            return [...state];

        default:
            return state;
    }
};
