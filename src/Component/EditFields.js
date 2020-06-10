import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import * as Action from "../Actions/index";
import { connect } from "react-redux";

function EditFields(props) {
    // const [nameChange, setNameChange] = useState(props.nameChange);
    // const renderField = ({ input, label, type, meta: { touched, error } }) => (
    //     <div className="form-group">
    //         <label>{label}</label>
    //         <div>
    //             <input {...input} placeholder={label} type={type} />
    //         </div>
    //         {touched && error && <span className="text-danger">{error}</span>}
    //     </div>
    // );
    const renderField = ({ input, label, type, meta: { touched, error } }) => {
        // console.log(input);
        return (
            <div>
                <h6>
                    <Badge pill variant="primary">
                        {"OldName: " + props.nameChange}
                    </Badge>
                </h6>
                <div>
                    <input
                        {...input}
                        type={type}
                        className="form-control"
                        // value={input.value}
                    />
                </div>
                {/* {touched && error && <span className="text-danger">{error}</span>} */}
            </div>
        );
    };
    // console.log(nameChange);
    return (
        // <Form onSubmit={props.handleSubmit} className="form-inline">
        //     <Form.Row>
        //         <Form.Group as={Col} md="8">
        //             <Form.Label>Email</Form.Label>
        //             <Form.Control type="email" placeholder="Enter email" />
        //         </Form.Group>

        //         <Form.Group as={Col} md="3">
        //             <Form.Label>Password</Form.Label>
        //             <Form.Control type="password" placeholder="Password" />
        //         </Form.Group>
        //     </Form.Row>
        <form>
            <h5>
                <Badge variant="primary">
                    {"OldName: " + props.nameChange}
                </Badge>
            </h5>
            <Field
                className="form-control"
                name="Name"
                type="text"
                component="input"
                // label="last name"
            />
        </form>

        // </Form>
    );
}
EditFields = reduxForm({
    // a unique name for the form
    form: "row",
})(EditFields);

export default EditFields;
