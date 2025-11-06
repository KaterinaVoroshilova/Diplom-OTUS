import { OrderPage } from "./order_page";
import { fakerRU } from "@faker-js/faker";
import { randomInt } from "crypto";
import dayjs from 'dayjs';

export class BasketPageStep2
{

    constructor(page) {
        this.page = page;
        this._formTourist = page.locator('[id="ADULT0tourist_form"]');
        this._inputLastName = page.locator('[data-cy="lastName"]');
        this._inputFirstName = page.locator('[data-cy="firstName"]');
        this._inputMiddleName = page.locator('[data-cy="middleName"]');
        this._inputBirthday = page.locator('[data-cy="birthday"]');
        this._dropdownGender = page.locator('.dropdown-select__tags').first();
        this._inputNumberOfDocument = page.locator('[data-cy="documentInfo"]');
        this._inputContactLastName = page.locator('[id="lastName"]');
        this._inputContactFirstName = page.locator('[id="firstName"]');
        this._inputContactMiddleName = page.locator('[id="middleName"]');
        this._checkBoxAgreement = page.locator('span[data-v-bf00de62 = ""]').filter({hasText: ' и '});
        this._genderWomen = page.locator('.dropdown-select__element').filter({hasText: 'Жен'});
        this._messageErrorAgreement = page.locator('.agreement-warning').filter({hasText: 'Нужно согласие с условиями договора'});
        this._buttonBook = page.locator('.pay-btn').first();
    }


    async lastNameFill() {
        const lastName = fakerRU.person.lastName('female');
        await this._inputLastName.fill(lastName);
        await this._inputContactLastName.fill(lastName);
    }

    async nameFill() {
        const name = fakerRU.person.firstName('female');
        await this._inputFirstName.fill(name);
        await this._inputContactFirstName.fill(name);
    }

    async middleNameFill() {
        const middleName = fakerRU.person.middleName('female');
        await this._inputMiddleName.fill(middleName);
        await this._inputContactMiddleName.fill(middleName);
    }

    async chooseGender() {
        await this._dropdownGender.click();
        await this._genderWomen.click();
    }

    async birthdayFill() {
        const birthday = fakerRU.date.birthdate({mode: 'age', min: 18, max: 50});
        await this._inputBirthday.fill(dayjs(birthday).format('DDMMYYYY'));
    }

    async numberFill() {
        const number = randomInt(1111111111, 9999999999);
        await this._inputNumberOfDocument.fill(`${number}`);
    }

    
    async clickAgreement() {
        await this._checkBoxAgreement.click();
    }

    async clickButtonBook() {
        await this._buttonBook.click();
    }
    
    async clickGoToOrderPage() {
        await this._buttonBook.click();
        return new OrderPage(this.page);
    }

}