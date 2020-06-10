import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import TaskRow from "./TaskRow";
import { connect } from "react-redux";
import * as Action from "../Actions/index";

class TaskTable extends Component {
    render() {
        console.log("table-render");
        var taskList;
        try {
            taskList = this.props.Task.map((task, index) => {
                // console.log(connection);
                return (
                    <TaskRow
                        // connection={this.connection}
                        key={index}
                        index={index}
                        task={task}
                    ></TaskRow>
                );
            });
        } catch {
            taskList = null;
        }

        console.log("table-render");
        return (
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Header as="h3">List Task</Card.Header>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th
                                        style={{ width: "10%" }}
                                        className="text-center"
                                    >
                                        #
                                    </th>
                                    <th>Task</th>
                                    <th
                                        style={{ width: "20%" }}
                                        className="text-center"
                                    >
                                        Level
                                    </th>
                                    <th
                                        style={{ width: "20%" }}
                                        className="text-center"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{taskList}</tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}
const mapStateToProps = (state) => ({
    Task: state.TaskList,
    // isEdit: state.ToggleEdit,
    // editName: state.EditTask.name,
    // newName: state.NewTask.name,
});

function mapDispatchToProps(dispatch) {
    return {
        toggleEdit: () => {
            dispatch(Action.toggleEdit());
        },
        resetTask: () => {
            dispatch(Action.resetTask());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);
