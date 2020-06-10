import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../Chatbox.css";
import ChatForm from "./ChatForm";
import { reset } from "redux-form";
import { connect } from "react-redux";
import connection from "../Reducer/ConnectHub";
import { Badge } from "react-bootstrap";

function Chatbox(props) {
    function chat(values) {
        console.log(values.Chat, props.username.username);
        connection.invoke(
            "SendChatMessageToUser",
            values.Chat,
            props.userchatwith,
            props.username.username
        );
        props.resetChat();
    }
    const chatList = props.chat.map((chat, index) => {
        console.log(props.userchatwith);
        if (
            (chat.usernameReceive === props.userchatwith ||
                chat.usernameSend === props.userchatwith) &&
            props.userchatwith !== props.username.username
        ) {
            if (chat.usernameSend === props.username.username) {
                return (
                    <div className="flex-column d-flex mb-2" key={index}>
                        <div className="name_display_send d-flex justify-content-end">
                            {chat.usernameSend}
                        </div>
                        <div className="d-flex justify-content-end">
                            <div className="msg_cotainer_send">
                                {chat.message}
                            </div>
                        </div>
                    </div>
                );
            } else
                return (
                    <div className="flex-column d-flex mb-2" key={index}>
                        <div className="name_display d-flex justify-content-start">
                            {chat.usernameReceive}
                        </div>
                        <div className="d-flex justify-content-start  ">
                            <div className="msg_cotainer">{chat.message}</div>
                        </div>
                    </div>
                );
        } else return null;
    });
    return (
        <Col className="chat" md={{ span: 7 }}>
            <Card className="card_chatbox">
                <Card.Header className="msg_head">
                    <div style={{ width: "100%", fontSize: "200%" }}>
                        <Badge variant="light" pill>
                            {" "}
                            {props.userchatwith}
                        </Badge>
                    </div>
                </Card.Header>
                <Card.Body className=" msg_card_body">{chatList}</Card.Body>
                <Card.Footer>
                    <ChatForm onSubmit={chat}></ChatForm>
                </Card.Footer>
            </Card>
        </Col>
    );
}
const mapStateToProps = (state) => ({
    username: state.LoginUserName,
    chat: state.Chat,
    userchatwith: state.UserChatWith,
});

function mapDispatchToProps(dispatch) {
    return {
        resetChat: () => {
            dispatch(reset("Chat"));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);
