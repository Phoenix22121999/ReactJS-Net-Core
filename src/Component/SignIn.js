import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

class FormPage extends Component {
    renderText = ({ input, meta, type, placeholder, title }) => {
        // console.log(input.value);
        return (
            <Col>
                <h4>
                    <Badge className="text-light bg-dark">{title}</Badge>
                </h4>
                <Form.Control
                    {...input}
                    placeholder={placeholder}
                    type={type}
                ></Form.Control>{" "}
                {meta.error && <Badge variant="primary">{meta.error}</Badge>}
            </Col>
        );
    };
    render() {
        // console.log(this.props);
        return (
            <Form className="bg-dark " onSubmit={this.props.handleSubmit}>
                <h2 className="text-center">
                    <Badge variant="dark">Sign In</Badge>
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

                <FormGroup>
                    <Field
                        title="Password"
                        name="Password"
                        component={this.renderText}
                        type="password"
                        placeholder="Enter Password"
                    />
                </FormGroup>

                <Button type="submit" block variant="primary">
                    Submit
                </Button>
            </Form>
        );
    }
}
FormPage = reduxForm({
    // a unique name for the form
    form: "Sigup",
    // initialValues: { name: "", level: 0 },
    // validate,
})(FormPage);

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
