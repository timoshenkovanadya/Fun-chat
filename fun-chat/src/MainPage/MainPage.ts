import { BaseComponent, BaseComponentProps } from "../BaseComponent/BaseComponent";
import { Header } from "./header/header";

export class MainPage extends BaseComponent{
    public header: Header;

    constructor(props: BaseComponentProps) {
        super(props);       
        this.header = new Header({ tagName: "div", parentNode: this.element})
    }
}