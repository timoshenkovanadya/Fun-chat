import { BaseComponent, BaseComponentProps } from "../BaseComponent/BaseComponent";
import { socketSend } from "../socket/socket";

export class Login extends BaseComponent {
    public loginContainer: BaseComponent;

    public loginInput: BaseComponent;

    public passwordInput: BaseComponent;

    public loginButton: BaseComponent;

    public infoButton: BaseComponent;

    constructor(props: BaseComponentProps) {
        super(props);

        this.loginContainer = new BaseComponent({
            tagName: "div",
            classNames: "login-container",
            parentNode: this.element,
        });

        this.loginInput = new BaseComponent({
            tagName: "input",
            classNames: "input",
            parentNode: this.loginContainer.getElement(),
        });

        this.passwordInput = new BaseComponent({
            tagName: "input",
            classNames: "input",
            parentNode: this.loginContainer.getElement(),
        });

        this.loginButton = new BaseComponent({
            tagName: "button",
            textContent: "enter",
            classNames: "login-button",
            parentNode: this.loginContainer.getElement(),
        });

        this.loginButton.setOnclick(this.enterHandler);

        this.infoButton = new BaseComponent({
            tagName: "button",
            textContent: "info",
            classNames: "info-button",
            parentNode: this.loginContainer.getElement(),
        });
    }

    enterHandler = () => {
        const payload = {
            user: {
                login: (this.loginInput.getElement() as HTMLInputElement).value,
                password: (this.passwordInput.getElement() as HTMLInputElement).value,
            },
        };
        socketSend("USER_LOGIN", payload);
    };
}
