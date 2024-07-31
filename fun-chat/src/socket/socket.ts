

const URL_WS = "ws://localhost:4000/";

export const RequestTypes = {
    USER_LOGIN: "USER_LOGIN",
    USER_LOGOUT: "USER_LOGOUT",
    USER_ACTIVE: "USER_ACTIVE",
    USER_INACTIVE: "USER_INACTIVE",
    MSG_FROM_USER: "MSG_FROM_USER",
    MSG_SEND: "MSG_SEND",
    MSG_READED: "MSG_READ",
    MSG_DELETE: "MSG_DELETE",
    MSG_EDIT: "MSG_EDIT",
} as const;

type Keys = keyof typeof RequestTypes;

const getId = () => {
    return `${Date.now()}${Math.floor(Math.random() * 100)}`;
};

type SocketConfigType = {
    socket: WebSocket;
    intervalId: NodeJS.Timeout | null;
    // isPending: boolean;
};

export const socketConfig: SocketConfigType = {
    socket: new WebSocket(URL_WS),
    intervalId: null,
    // isPending: true,
};

export const socketSend = (type: (typeof RequestTypes)[Keys], payload: object | null = null) => {
    const id = getId();
    const message = JSON.stringify({ id, type, payload });
    if (socketConfig.socket.readyState === 1) {
        socketConfig.socket.send(message);
    } else {
        socketConfig.socket.addEventListener(
            "open",
            () => {
                socketConfig.socket.send(message);
            },
            { once: true }
        );
    }
    return id;
};

socketConfig.socket.addEventListener("close", () => {
    console.log("CLOSED");
              
    socketConfig.intervalId = setInterval(() => {
        if (socketConfig.socket.readyState === 1 || socketConfig.socket.readyState === 0) {
            if (socketConfig.socket.readyState === 1 && socketConfig.intervalId) {
                clearInterval(socketConfig.intervalId);
            }
            return;
        }
        console.log("RECONNECTING");
        socketConfig.socket = new WebSocket(URL_WS);
        socketConfig.socket.addEventListener(
            "open",
            () => {
                window.location.reload();
            },
            { once: true }
        );
    }, 1000);
});
