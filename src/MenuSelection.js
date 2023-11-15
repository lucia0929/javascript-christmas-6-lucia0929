import { Console } from "@woowacourse/mission-utils";
import { APPETIZERS, MAINS, DESSERTS, DRINKS, COMMA, DASH, EMPTY, MENU_INPUT_TRIM} from './constants.js';
import {MENU_ORDER_PROMPT, MENU_ERROR_MESSAGE} from './constants.js';
import {MENU_MINIMUM_QUANTITY, MENU_MAXIMUM_QUANTITY, IS_MENU_DUPLICATE, MENU_FORMAT} from './constants.js';

class MenuSelection {
    constructor() {
        this.menuList = {...APPETIZERS, ...MAINS, ...DESSERTS, ...DRINKS};
        this.drinkList = Object.keys(DRINKS);
    }

    // IMPC-15
    async inputMenuOrder() {
        let isValid = false;
        let input;
        while (!isValid) {
            input = await this.promptMenuOrder(); // IMPC-50, IMPC-51
            isValid = this.validateMenuOrder(input); // IMPC-52, IMPC-53, IMPC-54, IMPC-55, IMPC-56, IMPC-57, IMPC-58, IMPC-59, IMPC-60, IMPC-61, IMPC-62, IMPC-63
            if (!isValid) {
                this.menuOrderError(); // IMPC-64
            }
        }
        return input;
    }

    // IMPC-50, IMPC-51
    async promptMenuOrder() {
        const input = await Console.readLineAsync(MENU_ORDER_PROMPT);
        return input.replace(MENU_INPUT_TRIM, EMPTY);
    }

    // IMPC-52, IMPC-53, IMPC-54, IMPC-55, IMPC-56, IMPC-57, IMPC-58, IMPC-59, IMPC-60, IMPC-61, IMPC-62, IMPC-63
    validateMenuOrder(input) {
        const orders = input.split(COMMA).map(order => order.split(DASH));
        return orders.every(order => 
            this.isValidMenu(order[0]) &&
            this.isValidNumber(order[1]) &&
            !this.isDuplicateMenu(order[0], orders) && // 'orders'를 전달
            !this.isOnlyDrink(orders) &&
            !this.isOrderLimit(orders)
        );
    }

    // IMPC-16, IMPC-52, IMPC-53
    isValidMenu(menuItem) {
        return this.menuList.hasOwnProperty(menuItem);
    }

    // IMPC-17, IMPC-54, IMPC-55
    isValidNumber(quantity) {
        const num = Number(quantity);
        return !isNaN(num) && num >= MENU_MINIMUM_QUANTITY;
    }

    // IMPC-18, IMPC-56, IMPC-57
    isValidMenuFormat(input) {
        const menuFormat = MENU_FORMAT;
        return menuFormat.test(input);
    }

    // IMPC-19, IMPC-58, IMPC-59
    isDuplicateMenu(menuItem, orders) {
        const menuCount = orders.filter(order => order[0] === menuItem).length;
        return menuCount > IS_MENU_DUPLICATE; //IS_MENU_DUPLICATE
    }

    // IMPC-20, IMPC-60, IMPC-61
    isOnlyDrink(orders) {
        return orders.every(order => this.drinkList.includes(order[0]));
    }

    // IMPC-21, IMPC-62, IMPC-63
    isOrderLimit(orders) {
        const totalQuantity = orders.reduce((total, order) => total + Number(order[1]), 0);
        return totalQuantity > MENU_MAXIMUM_QUANTITY;
    }

    // IMPC-22, IMPC-64
    menuOrderError() {
        Console.print(MENU_ERROR_MESSAGE);
    }
}

export default MenuSelection;
