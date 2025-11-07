import { PaymentPage } from "./payment_page";

export class OrderPage
{

    constructor(page) {
        this.page = page;
        this._title = page.locator('.v-order-description_text').first();
        this._from_to_order = page.locator('.v-order-position_title');
        this._payButton = page.locator('.v-button');
    }
    
    async clickPayButton() {
        await this._payButton.click();
        return new PaymentPage(this.page);
    }

}