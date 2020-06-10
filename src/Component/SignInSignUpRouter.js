import React from "react";
import "../Css/index.css";
import * as URL from "../Const/URL";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Nav, Row, Col, Badge, Container } from "react-bootstrap";
import { SubmissionError } from "redux-form";

import Login from "./SignIn";
import SignUp from "./SignUp";
import { connect } from "react-redux";
import * as Action from "../Actions/index";

function SignInSignUpRouter(props) {
    function signup(values) {
        console.log(values.Password);
        return fetch(URL.URL_SIGNUP, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Username: values.Username,
                Password: values.Password,
                Email: values.Email,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if (response.status === 400) {
                    throw new SubmissionError(response.errors);
                } else {
                    return alert("Đăng Kí Thành Công");
                }
            });
    }

    function getTask() {
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
            })
            .then(() => props.resetTask());
        // .then(() =>
        //     console.log(getCookie(".AspNetCore.Identity.Application"))
        // );
    }

    async function login(values) {
        return fetch(URL.URL_LOGIN, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Username: values.Username,
                Password: values.Password,
            }),
        })
            .then((response) => {
                // console.log("response", response);
                if (response.ok) return response;
                else return response.json();
            })
            .then((response) => {
                // console.log(response);
                if (response === true || response.ok) {
                    getTask();
                    props.toggleLogin();

                    // throw new Error("Sai Thông Tin");
                } else if (response.status === 400) {
                    // console.log(response);
                    throw new SubmissionError(response.errors);
                } else if (response === false) {
                    alert("Sai Thông Tin");
                }
            });
        // .then(() => getTask())
        // .then(() => props.toggleLogin());
    }
    return (
        // align-items-center
        <Container className="h-100">
            <Row
                className="justify-content-center h-100 "
                style={{ marginTop: "5rem" }}
            >
                <Col md={6}>
                    <Router>
                        <Nav
                            fill
                            variant="tabs"
                            className="justify-content-end  navbar-dark bg-dark"
                        >
                            <Nav.Item>
                                {" "}
                                <Link className="nav-link" to={"/sign-in"}>
                                    <h3>
                                        <Badge variant="dark">Login</Badge>
                                    </h3>
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link" to={"/sign-up"}>
                                    <h3>
                                        <Badge variant="dark">Sign Up</Badge>
                                    </h3>
                                </Link>
                            </Nav.Item>
                        </Nav>

                        <Switch>
                            <Route
                                exact
                                path="/"
                                // component={
                                //     <Login {...props} onSubmit={test}></Login>
                                // }
                                render={(props) => {
                                    return (
                                        <Login
                                            {...props}
                                            onSubmit={login}
                                        ></Login>
                                    );
                                }}
                            />
                            <Route
                                path="/sign-in"
                                // component={Login}
                                render={(props) => {
                                    return (
                                        <Login
                                            {...props}
                                            onSubmit={login}
                                        ></Login>
                                    );
                                }}
                            />
                            <Route
                                path="/sign-up"
                                // component={SignUp}
                                render={(props) => {
                                    return (
                                        <SignUp
                                            {...props}
                                            onSubmit={signup}
                                        ></SignUp>
                                    );
                                }}
                            />
                        </Switch>
                    </Router>
                </Col>
            </Row>
        </Container>
    );
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLogin: () => {
            dispatch(Action.toggleLogin());
        },
        resetTask: () => {
            dispatch(Action.resetTask());
        },

        // submitform: () => {
        //     dispatch(submit("row"));
        // },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInSignUpRouter);
