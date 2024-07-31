import { BaseComponent } from "../BaseComponent/BaseComponent";
import { Info } from "../Info/Info";
import { Login } from "../Login/LoginPage";
import { MainPage } from "../MainPage/MainPage";
import { SessionStorage } from "../sessionStorage/sessionStorage";
import { socketSend, socketConfig } from "../socket/socket";

export class App {
    public appContainer: HTMLElement;

    public parent: HTMLElement;

    public login: Login | null;

    public info: Info | null;

    public mainPage: MainPage | null;

    public sessionStorage: SessionStorage;

    public modal: BaseComponent;

    constructor(parent: HTMLElement) {
        this.appContainer = document.createElement("div");
        this.appContainer.className = "app-container";
        this.parent = parent;
        this.mainPage = null;
        this.login = null;
        this.info = null;

        this.modal = new BaseComponent({
            tagName: "div",
            classNames: "modal",
            textContent: "Sorry, disconnection from the server, trying to reconnecting",
            parentNode: this.appContainer,
        });

        this.sessionStorage = new SessionStorage();

        this.init();

        socketConfig.socket.addEventListener("close", () => {
            this.showModal();
        });

        socketConfig.socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "USER_LOGIN") {
                if (!this.login) return;
                if (!sessionStorage.getItem("login") || !sessionStorage.getItem("password")) {
                    this.sessionStorage.submit(this.login?.login, this.login?.password);
                }
                this.renderMain();
            }
            if (message.type === "USER_LOGOUT") {
                this.init();
                this.renderLogin();
            }
        });
    }

    init = () => {
        this.login = new Login({ tagName: "div" });
        this.login.infoButton.setOnclick(this.renderInfo);

        this.mainPage = new MainPage({
            tagName: "div",
            classNames: "main-page-container",
        });
        this.mainPage.header.infoButton.setOnclick(this.renderInfo);
        this.mainPage.header.logoutButton.setOnclick(this.renderLogin);

        this.info = new Info({ tagName: "div" });
        this.info.infoButton.setOnclick(this.backHandler);
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
            if (socketConfig.socket) {
                socketConfig.socket.addEventListener("open", () => {
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

    showModal = () => {
        this.modal?.render(this.appContainer);        
        this.modal.setClassName("modal");
        
    };

}
