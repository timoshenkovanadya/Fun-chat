import { BaseComponent, BaseComponentProps } from "../../BaseComponent/BaseComponent";
import '../mainPage.css';

export class Header extends BaseComponent{
    public headerContainer: BaseComponent;

    public userName: BaseComponent;

    public chatName: BaseComponent;

    public infoButton: BaseComponent;

    public logoutButton: BaseComponent;


    constructor(props: BaseComponentProps) {
         super(props);

         this.headerContainer = new BaseComponent({
            tagName: "div",
            classNames: "header-container",
            parentNode: this.element,
        });

        this.userName = new BaseComponent({
            tagName: "div",
            classNames: "username",
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



    }
}