import { combineReducers } from "redux";
import TaskList from "./ListTask";
import ToggleForm from "./ToggleForm";
import ToggleEdit from "./ToggleEdit";
import EditTask from "./EditTask";
import NewTask from "./NewTask";
import ToggleChart from "./ToggleChart";
import ChartData from "./ChartData";
import IsLogin from "./IsLogin";
import LoginUserName from "./LoginUserName";
import Chat from "./Chat";
import ListUser from "./ListUsers";
import UserChatWith from "./UserChatWith";
import { reducer as formReducer } from "redux-form";
const reducer = combineReducers({
    TaskList: TaskList,
    ToggleForm: ToggleForm,
    ToggleEdit: ToggleEdit,
    EditTask: EditTask,
    NewTask: NewTask,
    ToggleChart: ToggleChart,
    ChartData: ChartData,
    form: formReducer,
    IsLogin: IsLogin,
    LoginUserName: LoginUserName,
    Chat: Chat,
    ListUser: ListUser,
    UserChatWith,
});
export default reducer;
