import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import * as Action from "../Actions/index";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
// import { SubmissionError } from "redux-form";

class EditForm extends Component {
    renderText = ({ input, meta, type, placeholder }) => {
        // console.log(input.value);
        return (
            <div>
                <Form.Control {...input}></Form.Control>{" "}
                {meta.error && <Badge variant="primary">{meta.error}</Badge>}
            </div>
        );
    };

    renderSelect = ({ input, meta, type, placeholder, defaultValue }) => {
        // console.log(input.value);
        return (
            <div>
                <Form.Control as="select" custom {...input}>
                    <option
                        value={0}
                        // style={{ background: "black", color: "white" }}
                    >
                        Choose Priority
                    </option>
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                </Form.Control>
                {meta.error && <Badge variant="primary">{meta.error}</Badge>}
            </div>
        );
    };
    level(level) {
        switch (level) {
            case 1:
                return <Badge variant="light">Low</Badge>;
            case 2:
                return <Badge variant="info">Medium</Badge>;
            case 3:
                return <Badge variant="danger">High</Badge>;
            default:
                return <Badge variant="primary">No Level</Badge>;
        }
    }
    render() {
        // console.log(this.props.initialValues);
        return (
            <tr>
                <td className="text-center">{this.props.index + 1}</td>
                <td colSpan={3} className="td">
                    <div>
                        <Form
                            onSubmit={this.props.handleSubmit}
                            className="container-form"
                        >
                            {/* <div className="container"> */}
                            <div className="name">
                                <h6>Old Name: {this.props.task.name}</h6>
                                <div>
                                    <Field
                                        id={this.props.task.id}
                                        className="form-control"
                                        name="Name"
                                        component={this.renderText}
                                        // component="input"
                                        // type="text"
                                        placeholder="First Name"
                                    />
                                </div>
                            </div>

                            <div className="level">
                                <h6>
                                    Old Level:{" "}
                                    {this.level(this.props.task.level)}
                                </h6>

                                <div>
                                    <Field
                                        name="Level"
                                        id={this.props.task.id}
                                        // component="select"
                                        component={this.renderSelect}
                                    ></Field>
                                </div>
                            </div>

                            <div className="action">
                                <div className="button-form text-center  ">
                                    <ButtonGroup
                                        aria-label="Basic example"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        <Button variant="warning" type="submit">
                                            Done
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                this.props.onClose();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        {/* <Button variant="secondary">Right</Button> */}
                                    </ButtonGroup>
                                </div>
                            </div>
                            {/* </div> */}
                        </Form>
                    </div>
                </td>
            </tr>
        );
    }
}
EditForm = reduxForm({
    // a unique name for the form
    // initialValues: { name: "", level: 0 },
    // validate,
    // form: "test",
})(EditForm);

const mapStateToProps = (state) => ({
    initialValues: state.EditTask,
});

const mapDispatchToProps = (dispatch) => {
    return {
        toggleEdit: () => {
            dispatch(Action.toggleEdit());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
