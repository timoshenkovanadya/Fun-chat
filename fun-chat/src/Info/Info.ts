import { BaseComponent, BaseComponentProps } from "../BaseComponent/BaseComponent";

export class Info extends BaseComponent {
    public infoContainer: BaseComponent;

    public infoLink: BaseComponent;

    public infoButton: BaseComponent;

    constructor(props: BaseComponentProps) {
        super(props);

        this.infoContainer = new BaseComponent({
            tagName: "div",
            textContent: "This is a chat application where you can communicate with each other.",
            classNames: "info-container",
            parentNode: this.element,
        });

        this.infoLink = new BaseComponent({
            tagName: "a",
            textContent: "Author Timoshenkovanadya",
            classNames: "info-link",
            parentNode: this.infoContainer.getElement(),
        });
        this.infoLink.setAttribute({ name: "href", value: "https://github.com/timoshenkovanadya" });

        this.infoButton = new BaseComponent({
            tagName: "button",
            textContent: "Back",
            classNames: "back-button",
            parentNode: this.infoContainer.getElement(),
        });
    }
}
