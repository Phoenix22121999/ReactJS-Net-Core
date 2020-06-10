import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Title from "./Title";
import { Badge } from "react-bootstrap";
import * as URL from "../Const/URL";
import * as Action from "../Actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { connectionStart } from "../Reducer/ConnectHub";

function mapStateToProps(state) {
    return { userName: state.LoginUserName };
}
function mapDispatchToProps(dispatch, props) {
    return {
        ToggleLogin: () => {
            dispatch(Action.toggleLogin());
        },
        IsLogin: () => {
            dispatch(Action.isLogin());
        },
        NotLogin: () => {
            dispatch(Action.notLogin());
        },
        updateUser: (username) => {
            dispatch(Action.updateUser(username));
        },
    };
}

class AppNavbar extends Component {
    constructor(props) {
        super(props);

        connectionStart();
    }

    getUsername() {
        fetch(URL.URL_CHECK_LOGIN, {
            method: "GET",
        })
            .then((Response) => Response.json())
            .then((data) => {
                this.props.updateUser(data.userName);
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
        this.getUsername();
    }
    render() {
        console.log("render navbar");
        return (
            <Navbar
                expand="md"
                expanded={true}
                // style={{ backgroundColor: "red" }}
            >
                <Navbar.Brand>
                    <Title></Title>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <h4>
                            <Badge>{this.props.userName.username}</Badge>
                        </h4>
                    </Navbar.Text>
                    <Nav>
                        {" "}
                        <Nav.Item>
                            <Button
                                onClick={() => {
                                    this.logout();
                                }}
                            >
                                Logout
                            </Button>
                            <Button
                                className="btn-chatbox"
                                onClick={this.props.toggleChat}
                            >
                                <FontAwesomeIcon icon={faComments} size="1x" />
                            </Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
