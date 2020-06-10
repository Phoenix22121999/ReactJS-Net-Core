import * as TYPE from "../Const/Types";
var initialState;
var local =
    localStorage.getItem("Tasks") !== "undefined"
        ? JSON.parse(localStorage.getItem("Tasks"))
        : [];
if (local !== null) {
    const lowCount = local.filter((task) => {
        return task.level === 1;
    }).length;
    const mediumCount = local.filter((task) => {
        return task.level === 2;
    }).length;
    const hightCount = local.filter((task) => {
        return task.level === 3;
    }).length;
    initialState = [
        { name: "Low Task", value: lowCount },
        { name: "Medium Task", value: mediumCount },
        { name: "High Task", value: hightCount },
    ];
} else {
    initialState = [];
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TYPE.UPDATE_CHART:
            var local = JSON.parse(localStorage.getItem("Tasks"));
            const lowCount = local.filter((task) => {
                return task.level === 1;
            }).length;
            const mediumCount = local.filter((task) => {
                return task.level === 2;
            }).length;
            const hightCount = local.filter((task) => {
                return task.level === 3;
            }).length;
            return (state = [
                { name: "Low Task", value: lowCount },
                { name: "Medium Task", value: mediumCount },
                { name: "High Task", value: hightCount },
            ]);

        default:
            return state;
    }
};
