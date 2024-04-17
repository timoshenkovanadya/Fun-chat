const URL_WS = "ws://localhost:4000/";

export const RequestTypes = {
    // common
    USER_LOGIN: "USER_LOGIN",
    USER_LOGOUT: "USER_LOGOUT",
    USER_ACTIVE: "USER_ACTIVE",
    USER_INACTIVE: "USER_INACTIVE",
    MSG_FROM_USER: "MSG_FROM_USER",
    MSG_SEND: "MSG_SEND",
    MSG_READED: "MSG_READ",
    MSG_DELETE: "MSG_DELETE",
    MSG_EDIT: "MSG_EDIT",
    // server
    // USER_EXTERNAL_LOGIN: "USER_EXTERNAL_LOGIN",
    // USER_EXTERNAL_LOGOUT: "USER_EXTERNAL_LOGOUT",
    // MSG_READED_FROM_SERVER: "MSG_READED_FROM_SERVER",
    // MSG_DELETED_FROM_SERVER: "MSG_DELETED_FROM_SERVER",
    // MSG_EDITED_FROM_SERVER: "MSG_EDITED_FROM_SERVER",
    // MSG_SENDED_FROM_SERVER: "MSG_SENDED_FROM_SERVER",
    // MSG_DELIVERED: "MSG_DELIVER",
    // ERROR: "ERROR",
} as const;

type Keys = keyof typeof RequestTypes;

const getId = () => {
    return `${Date.now()}${Math.floor(Math.random() * 100)}`;
};

export const socket = new WebSocket(URL_WS);

export const socketSend = (type: (typeof RequestTypes)[Keys], payload: object | null = null) => {
    const id = getId();
    const message = JSON.stringify({ id, type, payload });
    console.log(type, "type");
    console.log(socket.OPEN, "socket.OPEN");
    console.log(socket.CONNECTING, "socket.CONNECTING");
    console.log(socket, "socket");
    if (socket.OPEN) {
        socket.send(message);
    } else {
        socket.addEventListener(
            "open",
            () => {
                socket.send(message);
            },
            { once: true }
        );
    }
};
