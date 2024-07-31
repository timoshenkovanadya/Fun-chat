import { BaseComponent, BaseComponentProps } from "../../BaseComponent/BaseComponent";
import { SessionStorage } from "../../sessionStorage/sessionStorage";
import { socketConfig, socketSend } from "../../socket/socket";
import "../MainPage.css";

export class Header extends BaseComponent {
    public userName: BaseComponent;

    public chatName: BaseComponent;

    public infoButton: BaseComponent;

    public logoutButton: BaseComponent;

    public sessionStorage: SessionStorage;

    public login: string | null;

    constructor(props: BaseComponentProps) {
        super(props);

        this.login = sessionStorage.getItem("login");

        this.sessionStorage = new SessionStorage();

        this.userName = new BaseComponent({
            tagName: "div",
            classNames: "username",
            textContent: `Username: ${this.login}`,
            parentNode: this.element,
        });

        socketConfig.socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "USER_LOGIN") {
                this.login = message.payload.user.login;
                this.userName.setTextContent(`Username: ${this.login}`);
            }
        });

        this.chatName = new BaseComponent({
            tagName: "div",
            classNames: "chat-name",
            textContent: "Fun Chat",
            parentNode: this.element,
        });

        this.infoButton = new BaseComponent({
            tagName: "button",
            classNames: "header-button",
            textContent: "Info",
            parentNode: this.element,
        });

        this.logoutButton = new BaseComponent({
            tagName: "button",
            classNames: "header-button",
            textContent: "logout",
            parentNode: this.element,
        });
        this.logoutButton.getElement().addEventListener("click", this.logoutHandler);
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
    };

    setLogin = (login: string) => {
        this.login = login;
    };
}
