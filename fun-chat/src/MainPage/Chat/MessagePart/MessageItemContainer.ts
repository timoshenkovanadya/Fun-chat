import { BaseComponent, BaseComponentProps } from "../../../BaseComponent/BaseComponent"

export class MessageItemContainer extends BaseComponent {

    public messageItem: BaseComponent;

    public messageItemHeader: BaseComponent;

    public messageItemText: BaseComponent;

    public messageItemFooter: BaseComponent;

    constructor(props: BaseComponentProps) {
        super(props);

        this.messageItem = new BaseComponent ({
            tagName: "div",
            classNames: "message-item",
            textContent: "",
            parentNode: this.element,
        });

        this.messageItemHeader = new BaseComponent ({
            tagName: "div",
            classNames: "message-item-header",
            textContent: "",
            parentNode: this.messageItem.getElement(),
        });

       this.messageItemText = new BaseComponent ({
            tagName: "div",
            classNames: "message-item-text",
            textContent: "",
            parentNode: this.messageItem.getElement(),
        });

        this.messageItemFooter = new BaseComponent ({
            tagName: "div",
            classNames: "message-item-footer",
            textContent: "",
            parentNode: this.messageItem.getElement(),
        });


    }
}