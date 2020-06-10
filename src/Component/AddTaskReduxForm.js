import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as Action from "../Actions/index";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Row from "react-bootstrap/Row";

class AddTaskReduxForm extends Component {
    renderText({ input, meta, type, placeholder }) {
        return (
            <div>
                <h5>
                    {" "}
                    <Badge>First Name</Badge>
                    {meta.error && <Badge variant="danger">{meta.error}</Badge>}
                </h5>
                <FormControl
                    type="input"
                    // placeholder={placeholder}
                    {...input}
                ></FormControl>
            </div>
        );
    }
    renderSelect = ({ input, meta, type, placeholder }) => {
        return (
            <div>
                <h5>
                    {" "}
                    <Badge>Priority</Badge>
                    {meta.error && <Badge variant="danger">{meta.error}</Badge>}
                </h5>
                <Form.Control as="select" custom {...input}>
                    <option
                        value={0}
                        style={{ background: "black", color: "white" }}
                    >
                        Choose Priority
                    </option>
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                </Form.Control>
                {/* {meta.error && <Badge>{meta.error}</Badge>} */}
            </div>
        );
    };
    test = (values) => {
        console.log("dssss", values);
    };
    render() {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 6 }}>
                        <Form onSubmit={this.props.handleSubmit}>
                            <Form.Row>
                                <Col md={7}>
                                    <Form.Group>
                                        {/* <h5>
                                            {" "}
                                            <Badge>First Name</Badge>
                                        </h5> */}
                                        <Field
                                            // className="form-control"
                                            name="name"
                                            component={this.renderText}
                                            // component="input"
                                            // type="text"
                                            // placeholder="First Name"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    {/* {" "}
                                    <h5>
                                        <Badge>Favorite Color</Badge>
                                    </h5> */}
                                    <Field
                                        name="level"
                                        // component="select"
                                        component={this.renderSelect}
                                    >
                                        <option />
                                        <option value="ff0000">Red</option>
                                        <option value="00ff00">Green</option>
                                        <option value="0000ff">Blue</option>
                                    </Field>
                                </Col>
                            </Form.Row>

                            <Form.Row>
                                <Col md={{ offset: 5, span: 7 }}>
                                    <ButtonGroup
                                        aria-label="Basic example"
                                        // className="justify-content-between"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            style={{
                                                // padding: "auto 0",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        >
                                            Done
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            style={{
                                                // padding: "auto 0",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            onClick={() => {
                                                this.props.closeFormAction();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        {/* <Button variant="secondary">Right</Button> */}
                                    </ButtonGroup>
                                </Col>
                            </Form.Row>
                            {/* </div> */}
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch, props) {
    return {
        addTaskAction: (task) => {
            dispatch(Action.addTask(task));
        },
        closeFormAction: () => {
            dispatch(Action.closeForm());
        },
        setNewTask: (task) => {
            dispatch(Action.setNewTask(task));
        },
        updateChart: () => {
            dispatch(Action.resetChart());
        },
    };
}

const validate = (values) => {
    // console.log(initialValues);
    const error = {};
    if (!values.name) {
        error.name = "Required";
    }
    if (!values.level || values.level === "0") {
        error.level = "Required";
    }
    return error;
};

AddTaskReduxForm = reduxForm({
    // a unique name for the form
    // initialValues: { name: "", level: 0 },
    validate,
})(AddTaskReduxForm);
export default connect(mapStateToProps, mapDispatchToProps)(AddTaskReduxForm);
