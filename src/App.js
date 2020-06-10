import React, { Component } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Search from "./Component/Search";
import SortDropDown from "./Component/SortDropDown";
import * as Action from "./Actions/index";
import * as URL from "./Const/URL";
import AddTaskButton from "./Component/AddTaskButton";
import Chatbox from "./Component/Chatbox";
import TaskTable from "./Component/TaskTable";
import ShowChartButton from "./Component/ShowChartButton";
import AddTaskReduxForm from "./Component/AddTaskReduxForm";
import Chart from "./Component/Chart";
import { connect } from "react-redux";
import SignInSignUpRouter from "./Component/SignInSignUpRouter";
import AppNavbar from "./Component/AppNavbar";
import connection from "./Reducer/ConnectHub";
import ChatGroup from "./Component/ChatGroup";
import { Col } from "react-bootstrap";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatToggle: false,
        };
        this.AddTask = this.AddTask.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        connection.on("ReceiveMessage", (message) => {
            console.log("đã nhận:", message);
            fetch("http://localhost:3000/api/Todo", {
                method: "GET",
            })
                .then((response) => {
                    // console.log(response);
                    return response.json();
                })
                .catch((e) => {
                    console.error("Err", e);
                })
                .then((data) => {
                    // console.log(data);
                    localStorage.setItem("Tasks", JSON.stringify(data));
                    // console.log(data);
                    // Cookies.set("Task", data);
                    // console.log(localStorage.getItem("Tasks"));
                })
                .then(() => {
                    this.props.resetTask();
                });
        });
    }
    componentDidMount() {
        connection.on(
            "ReceiveChatMessageFromSomeOne",
            (message, usernameSend, usernameReceive) => {
                console.log("đã nhận:", message, "Form", usernameSend);
                fetch(URL.URL_GETUSERNAME, { method: "GET" })
                    .then((Response) => Response.json())
                    .then((data) => {
                        console.log(data);
                        this.props.updateListUser(data);
                    });
                this.props.updateChat(usernameSend, usernameReceive, message);
                this.setState({
                    chatToggle: true,
                });
                if (usernameSend !== this.props.username.username) {
                    this.props.updateUserChatWith(usernameSend);
                } else {
                    this.props.updateUserChatWith(usernameReceive);
                }
            }
        );
    }

    toggleChat() {
        this.setState({ chatToggle: !this.state.chatToggle });
        fetch(URL.URL_GETUSERNAME, { method: "GET" })
            .then((Response) => Response.json())
            .then((data) => {
                console.log(data);
                this.props.updateListUser(data);
            });
    }

    getTask() {
        fetch(URL.URL_API)
            .then((response) => response.json())
            .catch((e) => {
                console.log("Err", e);
            })
            .then((data) => {
                // console.log(data);
                localStorage.setItem("Tasks", JSON.stringify(data));
                // Cookies.set("Task", data);
                // console.log(localStorage.getItem("Tasks"));
            });
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async AddTask(Values) {
        console.log(Values);
        let tl = JSON.parse(localStorage.getItem("Tasks"));
        let lastTask = tl[tl.length - 1];
        this.props.addTaskAction({
            id: parseInt(lastTask.id + 1),
            name: Values.name,
            level: parseInt(Values.level),
        });
        this.props.closeFormAction();
        await this.sleep(750);
        this.props.updateChart();
    }
    checkLogin() {
        fetch(URL.URL_CHECK_LOGIN, {
            method: "GET",
        })
            .then((Response) => Response.json())
            .then((data) => {
                if (data.userName === null) {
                    this.props.NotLogin();
                } else {
                    this.getTask();
                    this.props.IsLogin();
                }
            });
    }

    logout() {
        fetch(URL.URL_LOGOUT, {
            method: "GET",
        })
            .then((Response) => Response.json())
            .then((data) => {
                // console.log(data);
                // console.log(data.isCompleted);
                if (data.isCompleted) {
                    this.props.NotLogin();
                }
            });
    }

    UNSAFE_componentWillMount() {
        console.log("UNSAFE_componentWillMount");
        this.checkLogin();
    }

    render() {
        console.log("render App");
        if (this.props.showForm) {
            // console.log("d");
            var form = (
                <AddTaskReduxForm
                    form="AddForm"
                    onSubmit={this.AddTask}
                ></AddTaskReduxForm>
            );
        } else form = null;

        if (this.props.showChart) {
            var chart = <Chart> </Chart>;
        } else chart = null;
        if (this.props.isLogin) {
            return (
                <div>
                    <Container fluid>
                        {/* <Values form="row" /> */}
                        <AppNavbar toggleChat={this.toggleChat}></AppNavbar>

                        <Row>
                            <Search></Search>
                            <SortDropDown></SortDropDown>
                            <ShowChartButton></ShowChartButton>
                            <AddTaskButton></AddTaskButton>
                        </Row>

                        <Row>{form}</Row>
                        {/* <Chart> </Chart> */}
                        <Row
                            style={{
                                backgroundColor: "#1b262c",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "1rem",
                            }}
                        >
                            {chart}
                        </Row>
                        <Row>
                            <TaskTable
                            // connection={this.props.connection}
                            ></TaskTable>
                        </Row>
                        {this.state.chatToggle ? (
                            <Col
                                className="chat_row"
                                md={{ span: 6, offset: 6 }}
                            >
                                <Row>
                                    ><ChatGroup></ChatGroup>
                                    <Chatbox></Chatbox>>
                                </Row>
                            </Col>
                        ) : null}
                    </Container>
                    {/* <div className="chatboxflow"> */}
                    {/* <Button className="btn-chatbox" onClick={this.toggleChat}>
                        <FontAwesomeIcon icon={faComments} size="1x" />
                    </Button> */}

                    {/* </div> */}
                </div>
            );
        } else if (!this.props.isLogin)
            return <SignInSignUpRouter></SignInSignUpRouter>;
    }
}
function mapDispatchToProps(dispatch, props) {
    return {
        addTaskAction: (task) => {
            dispatch(Action.addTask(task));
        },
        closeFormAction: () => {
            dispatch(Action.closeForm());
        },
        // setNewTask: (task) => {
        //     dispatch(Action.setNewTask(task));
        // },
        updateChart: () => {
            dispatch(Action.resetChart());
        },
        // ToggleLogin: () => {
        //     dispatch(Action.toggleLogin());
        // },
        IsLogin: () => {
            dispatch(Action.isLogin());
        },
        NotLogin: () => {
            dispatch(Action.notLogin());
        },
        updateUser: (username) => {
            dispatch(Action.updateUser(username));
        },
        resetTask: () => {
            dispatch(Action.resetTask());
        },
        updateChat: (usernameSend, usernameReceive, message) => {
            dispatch(Action.updateChat(usernameSend, usernameReceive, message));
        },
        updateListUser: (listUser) => {
            dispatch(Action.updateListUser(listUser));
        },
        updateUserChatWith: (username) => {
            dispatch(Action.updateUserChatWith(username));
        },
    };
}
const mapStateToProps = (state) => ({
    isLogin: state.IsLogin,
    showForm: state.ToggleForm,
    showChart: state.ToggleChart,
    username: state.LoginUserName,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
