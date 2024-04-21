import { BaseComponent, BaseComponentProps } from "../../../BaseComponent/BaseComponent";
import { socket } from "../../../socket/socket";
import { UserListItem } from "../UserListItem/UserListItem";
import { UserType } from "../chat.types";

type ClickHandlerType = (login: string, isLogined: boolean) => () => void;

type PropsType = BaseComponentProps & { clickHandler: ClickHandlerType };

export class UserList extends BaseComponent {
    public activeUsersData: UserType[];

    public inactiveUsersData: UserType[];

    public userItemsElements: UserListItem[];

    public login: string;

    public searchForm: BaseComponent;

    public userListItemContainer: BaseComponent;

    public clickHandler: ClickHandlerType;

    constructor({ clickHandler, ...props }: PropsType) {
        super(props);
        this.login = "";
        this.activeUsersData = [];
        this.inactiveUsersData = [];
        this.userItemsElements = [];
        this.clickHandler = clickHandler;

        this.searchForm = new BaseComponent({
            tagName: "input",
            classNames: "search-form",
            textContent: "",
            parentNode: this.element,
        });
        this.searchForm.setAttribute({ name: "placeholder", value: "Search..." });

        this.searchForm.getElement().addEventListener("input", this.searchingUsers);

        this.userListItemContainer = new BaseComponent({
            tagName: "div",
            classNames: "userListItem-container",
            parentNode: this.element,
        });

        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "USER_ACTIVE") {
                this.activeUsersData = message.payload.users;
                this.renderUsersList();
            }
            if (message.type === "USER_INACTIVE") {
                this.inactiveUsersData = message.payload.users;
                this.renderUsersList();
            }
           
            if (message.type === "USER_LOGIN") {
                this.login = message.payload.user.login;
            }
        });
    }

    searchingUsers = () => {
        const searchText = (this.searchForm.getElement() as HTMLInputElement).value;
        this.userListItemContainer.getElement().innerHTML = "";
        const allUsersData = [...this.activeUsersData, ...this.inactiveUsersData].filter(
            ({ login }) => login !== this.login
        );
        const filteredUsers = allUsersData.filter(({ login }) => login.includes(searchText));
        filteredUsers.forEach((data) => {
            const element = new UserListItem({ ...data, parentNode: this.userListItemContainer.getElement() });
            element.setOnclick(this.clickHandler(data.login, data.isLogined));
            this.userItemsElements.push(element);
        });
    };

    renderUsersList = () => {
        this.userListItemContainer.getElement().innerHTML= "";
        const currentLogin = this.login || sessionStorage.getItem('login')
        const allUsersData = [...this.activeUsersData, ...this.inactiveUsersData].filter(
            ({ login }) => login !== currentLogin
        );
        allUsersData.forEach((data) => {
            const element = new UserListItem({ ...data, parentNode: this.userListItemContainer.getElement() });
            element.setOnclick(this.clickHandler(data.login, data.isLogined));
            this.userItemsElements.push(element);
        });
    };

    
    
}
