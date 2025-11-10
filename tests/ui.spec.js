import { test, expect } from '@playwright/test';
import {MainPage} from '../page/main_page.js';
import TelegramServices from '../framework/services/TelegramServices.js';

let mainPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.goto('https://fstravel.com/avia');
  console.log('Начало нового теста');
});

test ('Title on avia', async ({ page }) => {
  await expect(mainPage._searchForm).toBeVisible;
  await expect(mainPage._banner).toBeVisible;
  await expect(mainPage._title).toContainText('Спецпредложения авиакомпаний');
});

test ('Autorization on avia', async ({ page }) => {
  const mainPageAutorization = await mainPage.clickLk();
  await mainPageAutorization.emailFill('testfs0123@yandex.ru');
  await mainPageAutorization.passwordFill('@Test0123');
  page.keyboard.press('Enter');
  await mainPage.clickLkUser();
  await expect(mainPage._userMenu).toBeVisible;
});

test ('Message nothing', async ({ page }) => {
  await mainPage.fillFrom('123'); 
  await expect(mainPage._cityList).toBeVisible();
  await expect(mainPage._cityList).toHaveText('Ничего не найдено')
});

/*test ('Enter departure city', async ({ page }) => {
  await mainPage.fillFrom('');
  await mainPage.fillFrom('Санкт')
  await expect(mainPage._cityList).toBeVisible();
  await expect(mainPage._cityList).first().toContainText('Санкт-Петербург');
  await mainPage.clickFirstCityOfList;
  await mainPage.clickFrom;
  await expect(mainPage._cityList).toContainText('Санкт-Петербург')
});

test ('Search', async ({ page }) => {
  const searchResultPage = await mainPage.searchFor3Month('Санкт-П', 'Москв');
  await expect(searchResultPage._title.first()).toContainText('Авиабилеты Санкт-Петербург - Москва');
  await expect(searchResultPage._leftCity).toContainText('Санкт-Петербург');
  await expect(searchResultPage._rightCity).toContainText('Москва')
});

test ('Go to basket', async ({ page }) => {
  const searchResultPage = await mainPage.searchFor3Month('Мос', 'Соч');
  const basketPageStep1 = await searchResultPage.addToBasket();
  await basketPageStep1._title.filter({ hasText: 'Бронирование' }).waitFor({ state: 'visible', timeout: 20000 });
  await expect(basketPageStep1._from_to).toContainText('Москва - Сочи');
});


test ('Go to basket step 2', async ({ page }) => {
  const searchResultPage = await mainPage.searchFor3Month('Мос', 'Соч');
  const basketPageStep1 = await searchResultPage.addToBasket();
  await basketPageStep1._title.filter({ hasText: 'Бронирование' }).waitFor({ state: 'visible', timeout: 20000 });
  const basketPageAutorization = await basketPageStep1.clickGoTostepTiurists();
  await expect(basketPageAutorization._enterButton).toBeVisible;
});

test ('Autorization in the basket', async ({page}) => {
  const searchResultPage = await mainPage.searchFor3Month('Мос', 'Соч');
  const basketPageStep1 = await searchResultPage.addToBasket();
  await basketPageStep1._title.filter({ hasText: 'Бронирование' }).waitFor({ state: 'visible', timeout: 20000 });
  const basketPageAutorization = await basketPageStep1.clickGoTostepTourists();
  await basketPageAutorization.clickButton();
  await basketPageAutorization.emailFill('testfs0123@yandex.ru');
  await basketPageAutorization.passwordFill('@Test0123');
  const basketPageStep2 = await basketPageAutorization.clickEnterButtonOnForm();
  await expect(basketPageStep2._formTourist).toBeVisible;
})

test ('Failed booking - non checkbox', async ({page}) => {
  const searchResultPage = await mainPage.searchFor3Month('Моск', 'Соч');
  const basketPageStep1 = await searchResultPage.addToBasket();
  await basketPageStep1._title.filter({ hasText: 'Бронирование' }).waitFor({ state: 'visible', timeout: 20000 });
  const basketPageAutorization = await basketPageStep1.clickGoToStepTourists();
  await basketPageAutorization.clickButton();
  await basketPageAutorization.emailFill('testfs0123@yandex.ru');
  await basketPageAutorization.passwordFill('@Test0123');
  page.keyboard.press('Enter');
  const basketPageStep2 = await basketPageAutorization.clickEnterButtonOnFormBasket();
  await basketPageStep2.lastNameFill();
  await basketPageStep2.nameFill();
  await basketPageStep2.middleNameFill();
  await basketPageStep2.chooseGender();
  await basketPageStep2.birthdayFill();
  await basketPageStep2.numberFill();
  await basketPageStep2.clickButtonBook();
  await expect(basketPageStep2.__messageErrorAgreement).toBeVisible;
})

/*test.only ('Booking and pay', async ({page}) => {
  const searchResultPage = await mainPage.searchFor3Month('Моск', 'Соч');
  const basketPageStep1 = await searchResultPage.addToBasket();
  await basketPageStep1._title.filter({ hasText: 'Бронирование' }).waitFor({ state: 'visible', timeout: 40000 });
  const basketPageAutorization = await basketPageStep1.clickGoToStepTourists();
  await basketPageAutorization.clickButton();
  await basketPageAutorization.emailFill('testfs0123@yandex.ru');
  await basketPageAutorization.passwordFill('@Test0123');
  page.keyboard.press('Enter');
  const basketPageStep2 = await basketPageAutorization.clickEnterButtonOnFormBasket();
  await basketPageStep2.lastNameFill();
  await basketPageStep2.nameFill();
  await basketPageStep2.middleNameFill();
  await basketPageStep2.chooseGender();
  await basketPageStep2.birthdayFill();
  await basketPageStep2.numberFill();
  await basketPageStep2.clickAgreement();
  const orderPage = await basketPageStep2.clickGoToOrderPage();
  await expect(orderPage._title).toBeVisible;
  const message = await orderPage._title.textContent();
  await TelegramServices.sendMessage(message);
  await expect(orderPage._from_to_order).toContainText('Москва — Сочи');
  /*const payPage = await orderPage.clickPayButton();
  await expect(payPage._title).toBeVisible;
  await payPage.clickSbp();
  await expect(payPage._sbpQr).toBeVisible;
  await payPage.clickRussianCard();
  const tbankPage = await payPage.clickGoToPay();
  await expect(tbankPage._logo).toBeVisible;
})*/

