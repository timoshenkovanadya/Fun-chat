import { Info } from "../Info/Info";
import { Login } from "../Login/LoginPage";
import { socket } from "../socket/socket";

export class App {
    public appContainer: HTMLElement;

    public parent: HTMLElement;

    public login: Login;

    public socket: WebSocket;

    public info: Info;

    constructor(parent: HTMLElement) {
        this.appContainer = document.createElement("div");
        this.appContainer.className = "app-container";
        this.parent = parent;
        this.login = new Login({ tagName: "div", parentNode: this.appContainer });
        this.info = new Info({ tagName: "div", parentNode: this.appContainer });
        this.login.infoButton.setOnclick(this.renderInfo);
        this.socket = socket;
    }

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
}
