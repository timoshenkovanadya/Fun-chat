import { BaseComponent, BaseComponentProps } from "../../../BaseComponent/BaseComponent";

export class UserList extends BaseComponent {
    public userListContainer: BaseComponent;

    constructor(props: BaseComponentProps) {
        super(props);
        this.userListContainer = new BaseComponent({
            tagName: "div",
            classNames: "userList-container",
            parentNode: this.element,
        });
    }
}
