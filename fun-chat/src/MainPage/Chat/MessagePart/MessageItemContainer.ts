import { BaseComponent, BaseComponentProps } from "../../../BaseComponent/BaseComponent";
import { socketSend } from "../../../socket/socket";
import { MsgType } from "../chat.types";

type PropsType = Pick<BaseComponentProps, "parentNode"> & MsgType & { login: string; startEditHandler: () => void };

export class MessageItemContainer extends BaseComponent {
    public messageItem: BaseComponent;

    public messageItemHeader: BaseComponent;

    public messageItemText: BaseComponent;

    public messageItemFooter: BaseComponent;

    public deleteButton: BaseComponent | null;

    public updButton: BaseComponent | null;

    constructor(props: PropsType) {
        const { startEditHandler, parentNode, ...msg } = props;
        const { login, from, to, text, datetime, status, id } = msg;
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
            textContent: `${isIncome ? from : "you"}     ${new Date(datetime).toLocaleTimeString()}`,
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
            textContent: isIncome ? isIncome && edited ? "edited" : "" : readed && edited ? 'read, edited' : readed ? "read" : edited ? "edited" :  delivered ? "delivered" : "sended",
            parentNode: this.messageItem.getElement(),
        });
        this.deleteButton = isIncome
            ? null
            : new BaseComponent({
                  tagName: "button",
                  classNames: "message-item-btn",
                  textContent: "DEL",
                  parentNode: this.messageItemFooter.getElement(),
              });
        this.updButton = isIncome
            ? null
            : new BaseComponent({
                  tagName: "button",
                  classNames: "message-item-btn",
                  textContent: "EDIT",
                  parentNode: this.messageItemFooter.getElement(),
              });

        if (this.deleteButton) {
            this.deleteButton.getElement().addEventListener("click", this.deleteHandler(id));
        }
        if (this.updButton) {
            this.updButton.getElement().addEventListener("click", startEditHandler);
        }
    }

    deleteHandler = (id: string) => () => {
        socketSend("MSG_DELETE", { message: { id } });
    };
}
