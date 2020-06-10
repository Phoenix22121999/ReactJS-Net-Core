import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
function mapStateToProps(state) {
    return {};
}

class ChatForm extends Component {
    renderText = ({ input, meta, type, placeholder }) => {
        // console.log(input.value);
        return <Form.Control {...input}></Form.Control>;
    };
    render() {
        return (
            <Form onSubmit={this.props.handleSubmit}>
                {/* <div className="container"> */}
                <InputGroup className="mb-3">
                    <Field
                        name="Chat"
                        component={this.renderText}
                        // component="input"
                        // type="text"
                        placeholder="Chat Here"
                    />
                    <InputGroup.Append>
                        {" "}
                        <Button variant="info" type="submit">
                            <FontAwesomeIcon icon={faArrowUp} size="1x" />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>

                {/* </div> */}
            </Form>
        );
    }
}

ChatForm = reduxForm({
    // a unique name for the form
    // initialValues: { name: "", level: 0 },
    // validate,
    form: "Chat",
})(ChatForm);

export default connect(mapStateToProps)(ChatForm);
