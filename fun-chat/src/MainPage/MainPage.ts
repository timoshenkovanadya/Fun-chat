import { BaseComponent, BaseComponentProps } from "../BaseComponent/BaseComponent";
import { SessionStorage } from "../sessionStorage/sessionStorage";
import { socketConfig, socketSend } from "../socket/socket";
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
        socketConfig.socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
         
            if (message.type === "USER_EXTERNAL_LOGIN" || message.type === "USER_EXTERNAL_LOGOUT") {
                this.sendInitMessages();

            }
        });
    }

    sendInitMessages = () => {
        socketSend("USER_ACTIVE");
        socketSend("USER_INACTIVE");
    };
}
