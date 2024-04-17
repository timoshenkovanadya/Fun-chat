import { BaseComponent, BaseComponentProps } from "../../../BaseComponent/BaseComponent";
import { UserType } from "../chat.types";

import "./userListItem.styles.css";

type PropsType = UserType & Pick<BaseComponentProps, "parentNode">;

export class UserListItem extends BaseComponent {
    constructor({ isLogined, login, parentNode }: PropsType) {
        super({
            tagName: "div",
            parentNode,
            textContent: login,
            classNames: "user-list-item",
            attribute: { name: "isLogined", value: `${isLogined}` },
        });
    }
}
