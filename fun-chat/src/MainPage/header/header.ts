import { BaseComponent, BaseComponentProps } from "../../BaseComponent/BaseComponent";
import { SessionStorage } from "../../sessionStorage/sessionStorage";
import { socket, socketSend } from "../../socket/socket";
import "../MainPage.css";

export class Header extends BaseComponent {
    public headerContainer: BaseComponent;

    public userName: BaseComponent;

    public chatName: BaseComponent;

    public infoButton: BaseComponent;

    public logoutButton: BaseComponent;

    public sessionStorage: SessionStorage;

    public socket: WebSocket;

    public login: string;

    constructor(props: BaseComponentProps) {
        super(props);

        this.login = "";

        this.sessionStorage = new SessionStorage();

        this.headerContainer = new BaseComponent({
            tagName: "div",
            classNames: "header-container",
            parentNode: this.element,
        });

        this.userName = new BaseComponent({
            tagName: "div",
            classNames: "username",
            textContent: "",
            parentNode: this.headerContainer.getElement(),
        });
        this.socket = socket;

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "USER_LOGIN") {
                this.userName.setTextContent(`Username: ${message.payload.user.login}`);
            }
        };

        this.chatName = new BaseComponent({
            tagName: "div",
            classNames: "chat-name",
            textContent: "Fun Chat",
            parentNode: this.headerContainer.getElement(),
        });

        this.infoButton = new BaseComponent({
            tagName: "button",
            classNames: "header-button",
            textContent: "Info",
            parentNode: this.headerContainer.getElement(),
        });

        this.logoutButton = new BaseComponent({
            tagName: "button",
            classNames: "header-button",
            textContent: "logout",
            parentNode: this.headerContainer.getElement(),
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
