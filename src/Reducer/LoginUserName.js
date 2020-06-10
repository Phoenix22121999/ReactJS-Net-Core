import * as TYPE from "../Const/Types";

const initialState = {
    username: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TYPE.UPDATE_USER:
            return { username: action.username };

        default:
            return state;
    }
};
