import * as TYPE from "../Const/Types";

const initialState = false;

export default (state = initialState, action) => {
    switch (action.type) {
        case TYPE.TOGGLE_LOGIN:
            // console.log(action);
            return !state;

        case TYPE.IS_LOGIN:
            // console.log(action);
            return true;
        case TYPE.NOT_LOGIN:
            // console.log(action);
            return false;
        default:
            return state;
    }
};
