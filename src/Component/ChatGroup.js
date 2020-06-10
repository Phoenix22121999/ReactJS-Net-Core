import React from "react";
import { connect } from "react-redux";
import "../Chatbox.css";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import * as Action from "../Actions/index";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
export const ChatGroup = (props) => {
    // useEffect(() => {
    //     fetch(URL.URL_GETUSERNAME, { method: "GET" })
    //         .then((Response) => Response.json())
    //         .then((data) => {
    //             console.log(data);
    //             props.updateUser(data);
    //         });
    // });
    function test(e) {
        console.log(e.target.value);
    }
    const list = props.listUser.map((username, index) => {
        if (username !== props.username.username)
            return (
                <ListGroup.Item
                    key={index}
                    className="mb-2"
                    onClick={test}
                    // as={<Button></Button>}
                >
                    <Button
                        block
                        variant="outline-light"
                        onClick={() => props.updateUserChatWith(username)}
                        className="text-center"
                    >
                        {username}
                    </Button>
                </ListGroup.Item>
            );
    });
    return (
        <Col className="chat" md={{ span: 4 }}>
            <Card className="card_chatbox">
                <Card.Header></Card.Header>
                <Card.Body className=" msg_card_body">
                    <ListGroup className="contacts_body">{list}</ListGroup>
                </Card.Body>
            </Card>
            <Card.Footer></Card.Footer>
        </Col>
    );
};

const mapStateToProps = (state) => ({
    listUser: state.ListUser,
    username: state.LoginUserName,
});

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserChatWith: (username) => {
            dispatch(Action.updateUserChatWith(username));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatGroup);
