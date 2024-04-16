import { BaseComponent, BaseComponentProps } from "../../BaseComponent/BaseComponent";
import { SessionStorage } from "../../sessionStorage/sessionStorage";
import { socketSend } from "../../socket/socket";
import "../MainPage.css";

export class Header extends BaseComponent {
    public headerContainer: BaseComponent;

    public userName: BaseComponent;

    public chatName: BaseComponent;

    public infoButton: BaseComponent;

    public logoutButton: BaseComponent;

    public sessionStorage: SessionStorage;

    constructor(props: BaseComponentProps) {
        super(props);

        this.sessionStorage = new SessionStorage();
        const login = sessionStorage.getItem("login");
        this.headerContainer = new BaseComponent({
            tagName: "div",
            classNames: "header-container",
            parentNode: this.element,
        });

        this.userName = new BaseComponent({
            tagName: "div",
            classNames: "username",
            textContent: `Username: ${login}`,
            parentNode: this.headerContainer.getElement(),
        });

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

    logoutHandler =() => {
        const payload = {
            user: {
                login: sessionStorage.getItem("login"),
                password: sessionStorage.getItem("password"),
            },
        };
        socketSend("USER_LOGOUT", payload);
        this.sessionStorage.logout();
    }
}
