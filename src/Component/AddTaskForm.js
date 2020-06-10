import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { connect } from "react-redux";
import * as Action from "../Actions/index";
import { useState } from "react";
function AddTaskForm(props) {
    const [nameChange, setNameChange] = useState("");
    const [levelChange, setLevelChange] = useState(1);

    function submitForm() {
        let tl = JSON.parse(localStorage.getItem("Tasks"));
        let lastTask = tl[tl.length - 1];
        props.closeFormAction();
        props.addTaskAction({
            id: parseInt(lastTask.id + 1),
            name: nameChange,
            level: parseInt(levelChange),
        });
        props.updateChart();
    }

    return (
        <Col md={{ span: 5, offset: 7 }}>
            <Form>
                <Form.Row>
                    <Col md={8}>
                        <Form.Group>
                            <Form.Label srOnly={true} htmlFor="true">
                                label
                            </Form.Label>
                            <Form.Control
                                value={nameChange}
                                onChange={(e) => setNameChange(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Task Name"
                                // ref="task_name"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label srOnly={true} htmlFor="true">
                                label
                            </Form.Label>
                            <Form.Control
                                value={levelChange}
                                as="select"
                                name="ds"
                                id="inputDs"
                                onChange={(e) => {
                                    setLevelChange(e.target.value);
                                }}
                            >
                                <option value={1}>Low</option>
                                <option value={2}>Medium</option>
                                <option value={3}>High</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col md={12}>
                        <ButtonGroup>
                            {/* {addSaveToggle(props.edit)} */}
                            <Button onClick={submitForm} variant="primary">
                                Add
                            </Button>
                            {/* <Button
                                    onClick={submitForm}
                                    variant="primary"
                                >
                                    Add
                                </Button> 
                                closeForm*/}

                            <Button
                                onClick={() => {
                                    props.closeFormAction();
                                }}
                            >
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Form.Row>
            </Form>
        </Col>
    );
}
const mapStateToProps = (state) => ({
    toggleForm: state.ToggleForm,
    toggleEdit: state.ToggleEdit,
    // newTaskName: state.NewTask.name,
    // newTaskLevel: state.NewTask.level,
});

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

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);
