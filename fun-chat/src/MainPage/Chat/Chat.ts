import { BaseComponent, BaseComponentProps } from "../../BaseComponent/BaseComponent";
import { socket, socketSend } from "../../socket/socket";
import "../MainPage.css";
import { MessageItemContainer } from "./MessagePart/MessageItemContainer";
import { MessagePart } from "./MessagePart/MessagePart";
import { UserList } from "./UserList/UserList";
import { MsgType } from "./chat.types";

export class Chat extends BaseComponent {
    public userList: UserList;

    public messagePart: MessagePart;

    public login: string;

    public messages: MessageItemContainer[];

    public requestId: string;

    public incomeIds: string[];

    constructor(props: BaseComponentProps) {
        super(props);
        this.incomeIds = [];
        this.messages = [];
        this.login = "";
        this.requestId = "";
        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "USER_LOGIN") {
                this.login = message.payload.user.login;
            }
        });
        this.userList = new UserList({
            tagName: "div",
            classNames: "userList-container",
            parentNode: this.element,
            clickHandler: this.clickUserItem,
        });
        this.messagePart = new MessagePart({ tagName: "div", classNames: "message-part", parentNode: this.element });
        this.messagePart.messageShow.getElement().addEventListener("wheel", this.changeReadedStatus);
        this.messagePart.messageShow.getElement().addEventListener("click", this.changeReadedStatus);
        this.messagePart.sendButton.getElement().addEventListener("click", this.sendMessage);
        this.messagePart.sendButton.getElement().addEventListener("click", this.getHistoryMessage);
        this.messagePart.messageInput.getElement().addEventListener("keydown", this.keyEnterHandlerSend);
        this.messagePart.messageInput.getElement().addEventListener("input", () => {
            if ((this.messagePart.messageInput.getElement() as HTMLInputElement).value.length > 0) {
                this.messagePart.sendButton.removeAttribute({ name: "disabled" });
            }
            if ((this.messagePart.messageInput.getElement() as HTMLInputElement).value.length === 0) {
                this.messagePart.sendButton.setAttribute({ name: "disabled", value: "true" });
            }
        });

        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "MSG_FROM_USER" && message.id === this.requestId) {
                if (message.payload.messages.length === 0) {
                    this.messagePart.messageShow.setTextContent("start your messaging");
                }
                if (message.payload.messages.length !== 0) {
                    this.messagePart.messageShow.setTextContent("");
                    this.incomeIds = message.payload.messages
                        .filter((element: MsgType) => element.to === this.login && !element.status.isReaded)
                        .map((element: MsgType) => element.id);

                    message.payload.messages.forEach((msg: MsgType) => {
                        const msgContainer = new MessageItemContainer({
                            parentNode: this.messagePart.messageShow.getElement(),
                            login: this.login,
                            ...msg,
                        });
                        this.messages.push(msgContainer);
                    });
                    this.messagePart.messageShow.getElement().scrollTop =
                        this.messagePart.messageShow.getElement().scrollHeight;
                }
            }
        });

        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "MSG_SEND" && message.id === null) {
                this.messages.forEach((element) => element.destroy());
                this.messages = [];
                this.getHistoryMessage();
            }
        });

        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "MSG_READ") {
                this.messages.forEach((element) => element.destroy());
                this.messages = [];
                this.getHistoryMessage();
            }
        });

        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "MSG_DELETE") {
                console.log('refetch')
                this.getHistoryMessage();
            }
        });
    }

    clickUserItem = (login: string, isLogined: boolean) => () => {
        this.messagePart.setUser(login, isLogined);

        this.messagePart.messageInput.removeAttribute({ name: "disabled" });
        const payload = {
            user: {
                login: login,
            },
        };
        this.requestId = socketSend("MSG_FROM_USER", payload);
    };

    sendMessage = () => {
        const payload = {
            message: {
                to: this.messagePart.messageHeader.getTextContent(),
                text: (this.messagePart.messageInput.getElement() as HTMLInputElement).value,
            },
        };
        socketSend("MSG_SEND", payload);
        (this.messagePart.messageInput.getElement() as HTMLInputElement).value = "";
        this.messages.forEach((element) => element.destroy());
        this.messages = [];
        this.changeReadedStatus();
        this.messagePart.sendButton.setAttribute({ name: "disabled", value: "true" });
    };

    getHistoryMessage = () => {
        const payload = {
            user: {
                login: this.messagePart.messageHeader.getTextContent(),
            },
        };
        this.requestId = socketSend("MSG_FROM_USER", payload);
    };

    renderMessages = () => {};

    keyEnterHandlerSend = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            this.sendMessage();
            this.getHistoryMessage();
        }
    };

    changeReadedStatusRequest = (id: string) => {
        const payload = {
            message: {
                id: id,
            },
        };
        socketSend("MSG_READ", payload);
    };

    changeReadedStatus = () => {
        this.incomeIds.forEach((id) => this.changeReadedStatusRequest(id));
    };
}
