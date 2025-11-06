import { TbankPaymentPage } from "./tbank_pay_page";

export class PaymentPage
{

    constructor(page) {
        this.page = page;
        this._title = page.locator('.v-head_title');
        this._sbp = page.locator('.v-payment-provider_description').filter({hasText: 'Оплатить через СБП'});
        this._cardRus = page.locator('.v-payment-provider_description').filter({hasText: 'Российская карта'});
        this._cardNoRus = page.locator('.v-payment-provider_description').filter({hasText: 'Зарубежная карта'});
        this._sbpQr = page.locator('.v-payment-sbp_wrapper_qr');
        this._payButton = page.locator('.v-button').filter({hasText:'Оплатить'});
    }

    
    async clickSbp() {
        await this._sbp.click();
    }

    async clickRussianCard() {
        await this._cardRus.click();
    }

    async clickNoRussianCard() {
        await this._cardNoRus.click();
    }
    
    async clickGoToPay() {
        await this._payButton.click();
        return new TbankPaymentPage(this.page);
    }

}