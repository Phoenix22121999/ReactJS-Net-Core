import * as TYPE from "../Const/Types";
const initialState = false;

export default (state = initialState, action) => {
    switch (action.type) {
        case TYPE.TOGGLE_EDIT:
            return !state;
        default:
            // console.log("Edit ", state);
            return state;
    }
};
