import * as TYPE from "../Const/Types";

const initialState = false;

export default (state = initialState, action) => {
    switch (action.type) {
        case TYPE.TOGGLE_FORM:
            // console.log(action, state);
            return !state;
        case TYPE.CLOSE_FORM:
            // console.log(action, state);
            return false;
        case TYPE.OPEN_FORM:
            // console.log(action, state);
            return true;

        default:
            return state;
    }
};
