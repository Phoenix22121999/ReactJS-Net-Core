import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import * as Action from "../Actions/index";

class AddTaskButton extends Component {
    constructor(props) {
        super(props);
        this.addClick = this.addClick.bind(this);
    }
    addClick() {
        // this.props.showForm();
        this.props.toggleForm();
    }

    render() {
        var btn = null;
        if (this.props.adding) {
            btn = (
                <Button onClick={this.addClick} variant="info" block>
                    Close
                </Button>
            );
        } else
            btn = (
                <Button onClick={this.addClick} variant="info" block>
                    Add Task
                </Button>
            );
        return (
            <Col sm={3} xs={3} md={3} lg={3}>
                {btn}
            </Col>
        );
    }
}
const mapStateToProps = (state) => ({
    adding: state.ToggleForm,
});

const mapDispatchToProps = (dispatch) => ({
    toggleForm: () => {
        dispatch(Action.toggleForm());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskButton);
