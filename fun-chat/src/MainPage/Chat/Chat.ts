import { BaseComponent, BaseComponentProps } from "../../BaseComponent/BaseComponent";
import { MessagePart } from "./MessagePart/MessagePart";
import { UserList } from "./UserList/UserList";
import '../MainPage.css';

export class Chat extends BaseComponent {
    public userList: UserList;

    public messagePart: MessagePart;

    public login: string;

    constructor(props: BaseComponentProps) {
        super(props);
        this.login = "";
        this.userList = new UserList({ tagName: "div", classNames: "userList-container", parentNode: this.element });
        this.messagePart = new MessagePart({ tagName: "div", parentNode: this.element });
    }

    setLogin = (login: string) => {
        this.login = login;
    };
}
