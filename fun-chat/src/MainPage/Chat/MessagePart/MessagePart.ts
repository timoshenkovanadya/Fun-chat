import { BaseComponent, BaseComponentProps } from "../../../BaseComponent/BaseComponent";

export class MessagePart extends BaseComponent {

    public messagePartContainer: BaseComponent;

    constructor(props: BaseComponentProps) {
        super(props);
        this.messagePartContainer = new BaseComponent({
            tagName: "div",
            classNames: "messagePart-container",
            parentNode: this.element,
        });
    }
}