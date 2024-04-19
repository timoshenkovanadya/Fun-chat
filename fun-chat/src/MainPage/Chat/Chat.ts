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

    constructor(props: BaseComponentProps) {
        super(props);
        this.messages = [];
        this.login = "";
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
        this.messagePart.sendButton.getElement().addEventListener("click", this.sendMessage);
        this.messagePart.sendButton.getElement().addEventListener("click", this.getHistoryMessage);

        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "MSG_FROM_USER") {
                message.payload.messages.forEach((msg: MsgType) => {
                    const msgContainer = new MessageItemContainer({
                        parentNode: this.messagePart.messageShow.getElement(),
                        login: this.login,
                        ...msg,
                    });
                    this.messages.push(msgContainer);
                });

                // if (message.id === null) {
                //     this.messagePart.messageShow.setTextContent("");
                //     const messageItemContainer = new MessageItemContainer({
                //         tagName: "div",
                //         classNames: "message-item-container",
                //         parentNode: this.messagePart.messageShow.getElement(),
                //     });

                //     messageItemContainer.messageItem.setClassName("incoming");
                //     messageItemContainer.messageItemHeader.setTextContent(
                //         `${message.payload.message.from} at ${message.payload.message.datetime}`
                //     );
                //     messageItemContainer.messageItemText.setTextContent(`${message.payload.message.text}`);
                // }

                // if (message.id !== null) {
                //     this.messagePart.messageShow.setTextContent("");
                //     const messageItemContainer = new MessageItemContainer({
                //         tagName: "div",
                //         classNames: "message-item-container",
                //         parentNode: this.messagePart.messageShow.getElement(),
                //     });
                //     messageItemContainer.messageItem.setClassName("outcoming");
                //     messageItemContainer.messageItemHeader.setTextContent(`You at ${message.payload.message.datetime}`);
                //     messageItemContainer.messageItemText.setTextContent(`${message.payload.message.text}`);
                //     messageItemContainer.messageItemFooter.setTextContent("Delivered");
                // }
            }
        });
    }

    clickUserItem = (login: string, isLogined: boolean) => () => {
        this.messagePart.setUser(login, isLogined);
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
    };

    getHistoryMessage = () => {
        const payload = {
            user: {
                login: this.messagePart.messageHeader.getTextContent(),
            },
        };
        socketSend("MSG_FROM_USER", payload);
    };

    renderMessages = () => {};
}
