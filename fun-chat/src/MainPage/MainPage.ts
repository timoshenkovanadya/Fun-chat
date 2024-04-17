import { BaseComponent, BaseComponentProps } from "../BaseComponent/BaseComponent";
import { socketSend } from "../socket/socket";
import { Chat } from "./Chat/Chat";
import { Footer } from "./Footer/footer";
import { Header } from "./header/header";
import "./MainPage.css";

export class MainPage extends BaseComponent {
    public header: Header;

    public chat: Chat;

    public footer: Footer;

    constructor(props: BaseComponentProps) {
        super(props);
        this.header = new Header({ tagName: "div", parentNode: this.element });
        this.chat = new Chat({ tagName: "div", classNames: "chat-container", parentNode: this.element });
        this.footer = new Footer({ tagName: "div", classNames: "footer-container", parentNode: this.element });
    }

    sendInitMessages = () => {
        socketSend("USER_ACTIVE");
        socketSend("USER_INACTIVE");
    };
}
