import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import * as URL from "../Const/URL";
import { SubmissionError } from "redux-form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { connect } from "react-redux";
import * as Action from "../Actions/index";
import connection from "../Reducer/ConnectHub";

// import EditFields from "./EditFields";
import "../Form.css";
import EditForm from "./EditForm";
// import { Field, reduxForm, submit } from "redux-form";

// import { Field, reduxForm } from "redux-form";
// import { submit } from "redux-form";
// import React, { useState, useEffect } from "react";
// import Edit from "./Edit";
function TaskRow(props) {
    const [editName, setEditName] = useState(props.editName);
    const [isEdit, setIsEdit] = useState(false);

    function getTask() {
        fetch(URL.URL_API)
            .then((response) => response.json())
            .catch((e) => {
                console.log("Err", e);
            })
            .then((data) => {
                console.log(data);
                localStorage.setItem("Tasks", JSON.stringify(data));
                // Cookies.set("Task", data);
                // console.log(localStorage.getItem("Tasks"));
            });
    }

    async function update(values) {
        console.log(values);
        return fetch(URL.URL_API + "/" + props.task.id, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: props.task.id,
                name: values.Name,
                level: parseInt(values.Level),
            }),
        })
            .then((response) => {
                // console.log("response", response);
                if (response.ok) return response;
                else return response.json();
                // console.log(response);
            })
            .then((response) => {
                console.log(response.status === 400);
                if (response.status === 400) {
                    throw new SubmissionError(response.errors);
                }
                return getTask();
            })
            .then(() => {
                console.log("update ");
                props.updateTask({
                    id: props.task.id,
                    name: values.Name,
                    level: parseInt(values.Level),
                });
                props.updateChart();
                props.toggleEdit();
                setIsEdit(false);
                connection.invoke("SendMessage", "DataUpdate");
            });
    }

    function handleEdit(name, level) {
        // console.log(name);
        // console.log(nameChange);
        props.editTask({
            id: props.task.id,
            name: props.task.name,
            level: props.task.level,
        });
        setIsEdit(true);

        setEditName(name);
    }

    function level(level) {
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

    function isEditForm(task) {
        // console.log(isEdit);
        if (task.name !== editName || isEdit === false) {
            return (
                <tr>
                    <td className="text-center">{props.index + 1}</td>
                    {/* {isEditName(props.task)} */}
                    {/* {isEditLevel(props.task)} */}
                    <td>{task.name}</td>
                    <td className="text-center">{level(task.level)}</td>
                    <td className="text-center">
                        <ButtonGroup>
                            {/* {toggleEditOrSave(props.task)} */}
                            <Button
                                variant="warning"
                                onClick={() =>
                                    handleEdit(task.name, task.level)
                                }
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    // return this.delete(this.state.task.name);
                                    return props.deleteTask(props.task.id);
                                }}
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        } else if (isEdit === true) {
            // console.log("select ", task.name);
            return (
                <EditForm
                    form={"Row" + (props.index + 1)}
                    task={task}
                    index={props.index}
                    onSubmit={update}
                    onClose={() => {
                        setIsEdit(false);
                    }}
                ></EditForm>
            );
        }
    }

    console.log("row-render");

    return isEditForm(props.task);
}

const mapStateToProps = (state) => ({
    // isEdit: state.ToggleEdit,
    // editName: state.EditTask.name,
    // editTaskTarget: state.EditTask,
    newTaskName: state.NewTask.name,
    newTaskLevel: state.NewTask.level,
});

function mapDispatchToProps(dispatch) {
    return {
        deleteTask: (taskId) => {
            dispatch(Action.deleteTask(taskId));
        },
        toggleEdit: () => {
            dispatch(Action.toggleEdit());
        },
        editTask: (task) => {
            dispatch(Action.editTask(task));
        },
        newTask: (task) => {
            dispatch(Action.newTask(task));
        },
        updateTask: (newTask) => {
            dispatch(Action.updateTask(newTask));
        },
        updateChart: () => {
            dispatch(Action.resetChart());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskRow);
