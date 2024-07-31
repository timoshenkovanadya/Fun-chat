import { BaseComponent, BaseComponentProps } from "../BaseComponent/BaseComponent";

import { SessionStorage } from "../sessionStorage/sessionStorage";
import { socketConfig, socketSend } from "../socket/socket";
import "./LoginPage.css";

export class Login extends BaseComponent {
    public loginContainer: BaseComponent;

    public loginInput: BaseComponent;

    public passwordInput: BaseComponent;

    public loginButton: BaseComponent;

    public infoButton: BaseComponent;

    public loginValidationText: BaseComponent;

    public passwordValidationText: BaseComponent;

    public loginInputContainer: BaseComponent;

    public passwordInputContainer: BaseComponent;

    public errorMessage: BaseComponent;

    public sessionStorage: SessionStorage;

    public login: string;

    public password: string;

    constructor(props: BaseComponentProps) {
        super(props);

        this.login = "";

        this.password = "";

        this.sessionStorage = new SessionStorage();

        this.loginContainer = new BaseComponent({
            tagName: "div",
            classNames: "login-container",
            textContent: "Authentication",
            parentNode: this.element,
        });

        this.errorMessage = new BaseComponent({
            tagName: "div",
            classNames: "error-message",
            textContent: "",
            parentNode: this.loginContainer.getElement(),
        });

        socketConfig.socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "ERROR") {
                this.errorMessage.setTextContent(message.payload.error);
                setTimeout(() => {
                    this.errorMessage.setTextContent("");
                }, 5000);
            }
        });

        this.loginInputContainer = new BaseComponent({
            tagName: "div",
            classNames: "input-container",
            parentNode: this.loginContainer.getElement(),
        });

        this.loginInput = new BaseComponent({
            tagName: "input",
            classNames: "input",
            parentNode: this.loginInputContainer.getElement(),
        });
        this.loginInput.setAttribute({ name: "placeholder", value: "Enter your login here" });

        this.loginInput.getElement().addEventListener("input", this.validateInput(this.loginInput));
        this.loginInput.getElement().addEventListener("keydown", this.keyEnterHandler);

        this.loginValidationText = new BaseComponent({
            tagName: "p",
            classNames: "validation-message",
            textContent: "validation-message",
            parentNode: this.loginInputContainer.getElement(),
        });

        this.passwordInputContainer = new BaseComponent({
            tagName: "div",
            classNames: "input-container",
            parentNode: this.loginContainer.getElement(),
        });

        this.passwordInput = new BaseComponent({
            tagName: "input",
            classNames: "input",
            parentNode: this.passwordInputContainer.getElement(),
        });
        this.passwordInput.setAttribute({ name: "placeholder", value: "Enter your password here" });

        this.passwordValidationText = new BaseComponent({
            tagName: "p",
            classNames: "validation-message",
            textContent: "validation-message",
            parentNode: this.passwordInputContainer.getElement(),
        });
        this.passwordInput.getElement().addEventListener("input", this.validateInput(this.passwordInput));
        this.passwordInput.getElement().addEventListener("keydown", this.keyEnterHandler);

        this.loginButton = new BaseComponent({
            tagName: "button",
            textContent: "enter",
            classNames: ["login-button", "disabled"],
            parentNode: this.loginContainer.getElement(),
        });
        this.loginButton.setAttribute({ name: "disabled", value: "true" });

        this.loginButton.getElement().addEventListener("click", this.enterHandler);

        this.infoButton = new BaseComponent({
            tagName: "button",
            textContent: "info",
            classNames: "info-button",
            parentNode: this.loginContainer.getElement(),
        });
    }

    validateInput = (input: BaseComponent) => () => {
        const value = (input.getElement() as HTMLInputElement).value;
        if (input === this.loginInput) {
            if (!/^[A-Za-z]+$/.test(value)) {
                this.loginValidationText.setClassName("validation-message-active");
                this.loginValidationText.setTextContent(`Should contain only letters of eng alphabet.`);
                this.loginButton.setClassName("disabled");
                this.loginButton.setAttribute({ name: "disabled", value: "true" });
            }
            if (/^[A-Za-z]+$/.test(value)) {
                this.loginValidationText.removeClassName("validation-message-active");
            }
            if (/^[A-Za-z]+$/.test(value) && (this.passwordInput.getElement() as HTMLInputElement).value.length >= 4) {
                this.loginButton.removeAttribute({ name: "disabled" });
                this.loginButton.removeClassName("disabled");
            }
        }
        if (input === this.passwordInput) {
            if (value.length < 4) {
                this.passwordValidationText.setClassName("validation-message-active");
                this.passwordValidationText.setTextContent(`Should contain at least 4 characters.`);
                this.loginButton.setClassName("disabled");
                this.loginButton.setAttribute({ name: "disabled", value: "true" });
            }

            if (value.length >= 4) {
                this.passwordValidationText.removeClassName("validation-message-active");
            }
            if (/^[A-Za-z]+$/.test((this.loginInput.getElement() as HTMLInputElement).value) && value.length >= 4) {
                this.loginButton.removeAttribute({ name: "disabled" });
                this.loginButton.removeClassName("disabled");
            }
        }
    };

    enterHandler = () => {
        this.login = (this.loginInput.getElement() as HTMLInputElement).value;
        this.password = (this.passwordInput.getElement() as HTMLInputElement).value;
        const payload = {
            user: {
                login: this.login,
                password: this.password,
            },
        };
        socketSend("USER_LOGIN", payload);
        (this.loginInput.getElement() as HTMLInputElement).value = '';
        (this.passwordInput.getElement() as HTMLInputElement).value = '';
        // this.sessionStorage.submit(
        //     (this.loginInput.getElement() as HTMLInputElement).value,
        //     (this.passwordInput.getElement() as HTMLInputElement).value
        // );
    };

    keyEnterHandler = (e: KeyboardEvent) => {
        if (
            /^[A-Za-z]+$/.test((this.loginInput.getElement() as HTMLInputElement).value) &&
            (this.passwordInput.getElement() as HTMLInputElement).value.length >= 4 &&
            e.key === "Enter"
        ) {
            this.enterHandler();
        }
    };
}
