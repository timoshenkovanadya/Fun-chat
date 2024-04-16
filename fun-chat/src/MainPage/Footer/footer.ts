import { BaseComponent, BaseComponentProps } from "../../BaseComponent/BaseComponent";

import "../MainPage.css";


export class Footer extends BaseComponent {
    public logo: BaseComponent;

    public footerLink: BaseComponent;

    public footerYear: BaseComponent;

    public footerText: BaseComponent;

   constructor(props: BaseComponentProps) {
        super(props);
        this.logo = new BaseComponent({
            tagName: "img",
            classNames: "logo",
            parentNode: this.element,
        });
        this.logo.setAttribute({ name: "src", value: "../../assets/images.png" })

        this.footerText = new BaseComponent({
            tagName: "div",
            textContent: "RSSchool",
            classNames: "footer-text",
            parentNode: this.element,
        });

        this.footerLink = new BaseComponent({
            tagName: "a",
            textContent: "Timoshenkovanadya",
            classNames: "footer-link",
            parentNode: this.element,
        });
        this.footerLink.setAttribute({ name: "href", value: "https://github.com/timoshenkovanadya" });

        this.footerYear = new BaseComponent({
            tagName: "div",
            textContent: "2024",
            classNames: "footer-link",
            parentNode: this.element,
        });


    }
}