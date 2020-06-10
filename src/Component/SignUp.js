import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

class SignUp extends Component {
    renderText = ({ input, meta, type, placeholder, title }) => {
        // console.log(input.value);
        return (
            <Col>
                <h4>
                    <Badge className="text-light bg-dark">{title}</Badge>
                </h4>
                <Form.Control
                    type={type}
                    {...input}
                    placeholder={placeholder}
                ></Form.Control>{" "}
                {meta.error && <Badge variant="primary">{meta.error}</Badge>}
            </Col>
        );
    };

    render() {
        return (
            <Form className="bg-dark " onSubmit={this.props.handleSubmit}>
                <h2 className="text-center">
                    <Badge variant="dark">Sign Up</Badge>
                </h2>

                <FormGroup>
                    <Field
                        title="Username"
                        name="Username"
                        component={this.renderText}
                        type="text"
                        placeholder="Enter UserName"
                    />
                </FormGroup>

                <FormGroup className="form-group">
                    <Field
                        title="Email"
                        name="Email"
                        component={this.renderText}
                        type="email"
                        placeholder="Enter Email"
                    />
                </FormGroup>

                <div className="form-group">
                    <Field
                        name="Password"
                        title="Password"
                        component={this.renderText}
                        type="password"
                        placeholder="Enter Password"
                    />
                </div>

                <Button type="submit" block variant="info">
                    Sign Up
                </Button>
            </Form>
        );
    }
}
SignUp = reduxForm({
    // a unique name for the form
    form: "Sigup",
    // initialValues: { name: "", level: 0 },
    // validate,
})(SignUp);

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
