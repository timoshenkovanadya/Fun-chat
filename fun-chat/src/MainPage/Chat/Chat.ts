import { BaseComponent, BaseComponentProps } from "../../BaseComponent/BaseComponent";
import { MessagePart } from "./MessagePart/MessagePart";
import { UserList } from "./UserList/UserList";


export class Chat extends BaseComponent {

    public userList: UserList;

    public messagePart: MessagePart;

        constructor(props: BaseComponentProps) {
        super(props);
        this.userList = new UserList({ tagName: "div", parentNode: this.element});
        this.messagePart = new MessagePart({ tagName: "div", parentNode: this.element});
    }
}