import { BaseComponent, BaseComponentProps } from "../../../BaseComponent/BaseComponent";
import { socket, socketSend } from "../../../socket/socket";
import { MsgType, UserType } from "../chat.types";

import "./userListItem.styles.css";

type PropsType = UserType & Pick<BaseComponentProps, "parentNode">;

export class UserListItem extends BaseComponent {
    public userListItemNumber: BaseComponent;

    constructor({ isLogined, login, parentNode }: PropsType) {
        super({
            tagName: "div",
            parentNode,
            classNames: "user-list-item",
            attribute: { name: "isLogined", value: `${isLogined}` },
        });

        this.userListItemNumber = new BaseComponent({
            tagName: "div",
            classNames: "user-list-item-login",
            textContent: login,
            parentNode: this.element,
        });
        this.userListItemNumber = new BaseComponent({
            tagName: "div",
            classNames: "user-list-item-number",
            parentNode: this.element,
        });

        const payload = { user: { login } };

        socketSend("MSG_FROM_USER", payload);
        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "MSG_FROM_USER") {
                const respMessages = message.payload.messages as MsgType[];
                // is messages from this contact
                if (respMessages?.some((msg) => msg.from === login)) {
                    const countUnread =
                        respMessages
                            .filter((msg) => msg.from === login)
                            .reduce((acc, cur) => (cur.status.isReaded ? acc : acc + 1), 0) || 0;
                    this.userListItemNumber.setTextContent(countUnread.toString());
                }
            }
        });

        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "MSG_SEND" && message.id === null) {
                socketSend("MSG_FROM_USER", payload);
            }
            if (message.type === "MSG_READ") {
                socketSend("MSG_FROM_USER", payload);
            }
            if (message.type === "MSG_DELETE") {
                socketSend("MSG_FROM_USER", payload);
            }
        });
    }
}
