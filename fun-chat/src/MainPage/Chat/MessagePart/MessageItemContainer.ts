import { BaseComponent, BaseComponentProps } from "../../../BaseComponent/BaseComponent";
import { MsgType } from "../chat.types";

type PropsType = Pick<BaseComponentProps, "parentNode"> & MsgType & { login: string };

export class MessageItemContainer extends BaseComponent {
    public messageItem: BaseComponent;

    public messageItemHeader: BaseComponent;

    public messageItemText: BaseComponent;

    public messageItemFooter: BaseComponent;

    constructor(props: PropsType) {
        const { parentNode, login, from, to, text, datetime, status } = props;
        super({ tagName: "div", classNames: "message-item-container", parentNode });

        const isIncome = login === to;
        const delivered = status.isDelivered === true;
        const readed = status.isReaded === true;
        const edited = status.isEdited === true;

        this.messageItem = new BaseComponent({
            tagName: "div",
            classNames: isIncome ? "income-message" : "outcome-message",
            parentNode: this.element,
        });

        this.messageItemHeader = new BaseComponent({
            tagName: "div",
            classNames: "message-item-header",
            textContent: `${isIncome ? from : 'you'}     ${new Date(datetime).toUTCString()}`,
            parentNode: this.messageItem.getElement(),
        });

        this.messageItemText = new BaseComponent({
            tagName: "div",
            classNames: "message-item-text",
            textContent: text,
            parentNode: this.messageItem.getElement(),
        });

        this.messageItemFooter = new BaseComponent({
            tagName: "div",
            classNames: "message-item-footer",
            textContent: isIncome ? "" : (delivered ? "Delivered" : (readed ? "read" : (edited ? "edited": "Sended"))),
            parentNode: this.messageItem.getElement(),
        });
    }
}


