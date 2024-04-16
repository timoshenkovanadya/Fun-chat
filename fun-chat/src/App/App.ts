import { Info } from "../Info/Info";
import { Login } from "../Login/LoginPage";
import { MainPage } from "../MainPage/MainPage";
import { socket } from "../socket/socket";

export class App {
    public appContainer: HTMLElement;

    public parent: HTMLElement;

    public login: Login;

    public socket: WebSocket;

    public info: Info;

    public mainPage: MainPage;

    constructor(parent: HTMLElement) {
        this.appContainer = document.createElement("div");
        this.appContainer.className = "app-container";
        this.parent = parent;
        this.login = new Login({ tagName: "div", parentNode: this.appContainer });
        this.info = new Info({ tagName: "div", parentNode: this.appContainer });
        this.info.infoButton.setOnclick(this.backHandler);
        this.login.loginInput.getElement().addEventListener("keydown", this.keyEnterHandler);
        this.login.passwordInput.getElement().addEventListener("keydown", this.keyEnterHandler);
        this.login.loginButton.setOnclick(this.renderMain);
        this.login.infoButton.setOnclick(this.renderInfo);
        this.socket = socket;
        this.mainPage = new MainPage({ tagName: "div", classNames: "main-page-container", parentNode: this.appContainer });
        this.mainPage.header.infoButton.setOnclick(this.renderInfo);
        this.mainPage.header.logoutButton.setOnclick(this.renderLogin);
    }

    keyEnterHandler = (e: KeyboardEvent) => {
        if (
            /^[A-Za-z]+$/.test((this.login.loginInput.getElement() as HTMLInputElement).value) &&
            (this.login.passwordInput.getElement() as HTMLInputElement).value.length >= 4 &&
            e.key === "Enter"
        ) {
            this.renderMain();
        }
    };

    backHandler = () => {
        if (sessionStorage.getItem('login') !== null) {
            this.renderMain()
        }
        else {
            this.renderLogin()
        }
    };

    start = () => {
        this.parent.append(this.appContainer);
    };

    renderLogin = (): void => {
        this.appContainer.innerHTML = "";
        this.login.render(this.appContainer);
    };

    renderInfo = (): void => {
        this.appContainer.innerHTML = "";
        this.info.render(this.appContainer);
    };

    renderMain = (): void => {
        this.appContainer.innerHTML = "";
        this.mainPage.render(this.appContainer);
    };
}
