import React from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import * as Action from "../Actions/index";
function ShowChartButton(props) {
    var btn = null;
    if (props.toggleChart) {
        btn = (
            <Button
                onClick={() => {
                    props.Toggle();
                }}
                variant="info"
                block
            >
                Close Chart
            </Button>
        );
    } else
        btn = (
            <Button
                onClick={() => {
                    props.Toggle();
                }}
                variant="info"
                block
            >
                Show Chart
            </Button>
        );
    return (
        <Col sm={3} xs={3} md={3} lg={3}>
            {btn}
        </Col>
    );
}
const mapStateToProps = (state) => ({
    toggleChart: state.ToggleChart,
});

const mapDispatchToProps = (dispatch) => {
    return {
        Toggle: () => {
            dispatch(Action.toggleChart());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowChartButton);
