import { BaseComponent, BaseComponentProps } from "../../../BaseComponent/BaseComponent";

export class MessageDividerLine extends BaseComponent {
    public dividerLine: BaseComponent;

    constructor(props: BaseComponentProps) {
        super(props);
        this.dividerLine = new BaseComponent({
            tagName: "div",
            textContent: "new messages",
            classNames: "divider",
            parentNode: this.element,
        });
        this.unreadScroll();
    }

    unreadScroll = () => {
        setTimeout(() => {
            this.element.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });
        }, 100);
        
    };
}
