import { Info } from "../Info/Info";
import { Login } from "../Login/LoginPage";
import { MainPage } from "../MainPage/MainPage";
import { socket, socketSend } from "../socket/socket";

export class App {
    public appContainer: HTMLElement;

    public parent: HTMLElement;

    public login: Login | null;

    public info: Info | null;

    public mainPage: MainPage | null;

    constructor(parent: HTMLElement) {
        this.appContainer = document.createElement("div");
        this.appContainer.className = "app-container";
        this.parent = parent;
        this.mainPage = null;
        this.login = null;
        this.info = null;

        this.init();

        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "USER_LOGIN") {
                this.renderMain();
            }
            if (message.type === "USER_LOGOUT") {
                this.init();
                this.renderLogin();
            }
        });
    }

    init = () => {
        this.login = new Login({ tagName: "div", parentNode: this.appContainer });
        this.info = new Info({ tagName: "div", parentNode: this.appContainer });
        this.info.infoButton.setOnclick(this.backHandler);

        this.login.infoButton.setOnclick(this.renderInfo);

        this.mainPage = new MainPage({
            tagName: "div",
            classNames: "main-page-container",
            parentNode: this.appContainer,
        });
        this.mainPage.header.infoButton.setOnclick(this.renderInfo);
        this.mainPage.header.logoutButton.setOnclick(this.renderLogin);
    };

    backHandler = () => {
        if (sessionStorage.getItem("login") !== null) {
            this.renderMain();
        } else {
            this.renderLogin();
        }
    };

    start = () => {
        this.parent.append(this.appContainer);
        if (sessionStorage.getItem("login") !== null) {
            if (socket) {
                socket.addEventListener("open", () => {
                    const payload = {
                        user: {
                            login: sessionStorage.getItem("login"),
                            password: sessionStorage.getItem("password"),
                        },
                    };
                    socketSend("USER_LOGIN", payload);
                    this.renderMain();
                });
            }
        } else {
            this.renderLogin();
        }
    };

    renderLogin = (): void => {
        this.appContainer.innerHTML = "";
        this.login?.render(this.appContainer);
    };

    renderInfo = (): void => {
        this.appContainer.innerHTML = "";
        this.info?.render(this.appContainer);
    };

    renderMain = (): void => {
        this.appContainer.innerHTML = "";
        this.mainPage?.render(this.appContainer);
        this.mainPage?.sendInitMessages();
    };
}
