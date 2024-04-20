import { BaseComponent, BaseComponentProps } from "../../../BaseComponent/BaseComponent";
import { socket } from "../../../socket/socket";
import { UserType } from "../chat.types";

export class MessagePart extends BaseComponent {
    public messageHeader: BaseComponent;

    public messageShow: BaseComponent;

    public messageSend: BaseComponent;

    public messageInput: BaseComponent;

    public sendButton: BaseComponent;

    public login: string;

    constructor(props: BaseComponentProps) {
        super(props);
        this.login = "";
        this.messageHeader = new BaseComponent({
            tagName: "div",
            textContent: "",
            classNames: "message-header",
            parentNode: this.element,
        });

        this.messageShow = new BaseComponent({
            tagName: "div",
            classNames: "message-show",
            textContent: "select user to send a message",
            parentNode: this.element,
        });

        this.messageSend = new BaseComponent({
            tagName: "div",
            classNames: "message-send",
            parentNode: this.element,
        });

        this.messageInput = new BaseComponent({
            tagName: "input",
            classNames: "message-input",
            parentNode: this.messageSend.getElement(),
        });
        this.messageInput.setAttribute({ name: "placeholder", value: "Message..." });

        this.sendButton = new BaseComponent({
            tagName: "button",
            classNames: "send-button",
            textContent: "send",
            parentNode: this.messageSend.getElement(),
        });
        this.sendButton.setAttribute({ name: "disabled", value: "true" });

        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "USER_ACTIVE") {
                const activeUsers: UserType[] = message.payload.users;
                if (activeUsers.some(user => user.login === this.messageHeader.getTextContent())) {
                    this.messageHeader.removeClassName("offline");
                    this.messageHeader.setClassName("online");
                }
            }
            if (message.type === "USER_INACTIVE") {
                const inactiveUsers: UserType[] = message.payload.users;
                if (inactiveUsers.some(user => user.login === this.messageHeader.getTextContent())) {
                    this.messageHeader.removeClassName("online");
                    this.messageHeader.setClassName("offline");
                }
            }
        });
    }

    setUser = (login: string, isLogined: boolean) => {
        this.messageHeader.setTextContent(`${login}`);
        this.messageShow.setTextContent("");
        if (isLogined === true) {
            this.messageHeader.removeClassName("offline");
            this.messageHeader.setClassName("online");
        }
        if (isLogined === false) {
            this.messageHeader.removeClassName("online");
            this.messageHeader.setClassName("offline");
        }
    };
}
