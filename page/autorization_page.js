import { BasketPageStep2 } from "./basket_step2_page";
import { MainPage } from "./main_page";

export class PageAutorization
{

    constructor(page) {
        this.page = page;
        this._enterButton = page.locator('.v-enter-button');
        this._autorizationForm = page.locator('.v-modal-wrap');
        this._inputEmail = page.locator('[type="email"]');
        this._inputPass = page.locator('[type="password"]');
        this._enterButtonOnForm = page.locator('[value="Войти"]')
    }


    async emailFill(email) {
        await this._inputEmail.fill(email);
    }

    async passwordFill(pass) {
        await this._inputPass.fill(pass);
    }

    async clickButton() {
        await this._enterButton.click();
    }

    async clickEnterButtonOnFormBasket() {
        await this._enterButtonOnForm.click();
        return new BasketPageStep2(this.page);
    }

    async clickEnterButtonOnFormMain() {
        await this._enterButtonOnForm.click();
        return new MainPage(this.page);
    }

}