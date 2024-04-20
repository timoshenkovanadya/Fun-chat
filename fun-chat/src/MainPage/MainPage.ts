import { BaseComponent, BaseComponentProps } from "../BaseComponent/BaseComponent";
import { SessionStorage } from "../sessionStorage/sessionStorage";
import { socketSend } from "../socket/socket";
import { Chat } from "./Chat/Chat";
import { Footer } from "./Footer/footer";
import { Header } from "./header/header";
import "./MainPage.css";

export class MainPage extends BaseComponent {
    public header: Header;

    public chat: Chat;

    public footer: Footer;

    public sessionStorage: SessionStorage;

    constructor(props: BaseComponentProps) {
        super(props);
        this.sessionStorage = new SessionStorage();
        this.header = new Header({ tagName: "div", classNames: "header-container", parentNode: this.element });
        this.chat = new Chat({ tagName: "div", classNames: "chat-container", parentNode: this.element });
        this.footer = new Footer({ tagName: "div", classNames: "footer-container", parentNode: this.element });
        // this.header.logoutButton.getElement().addEventListener("click", this.logoutHandler);
    }

    logoutHandler = () => {
        const payload = {
            user: {
                login: sessionStorage.getItem("login"),
                password: sessionStorage.getItem("password"),
            },
        };
        socketSend("USER_LOGOUT", payload);
        this.sessionStorage.logout();
        
        // this.chat.messagePart.messageHeader.setTextContent('');
        
    };

    sendInitMessages = () => {
        socketSend("USER_ACTIVE");
        socketSend("USER_INACTIVE");
    };
}
