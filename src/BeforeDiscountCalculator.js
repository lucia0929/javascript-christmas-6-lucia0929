import { DASH, IS_OVER_TEN_THOUSAND } from './constants.js';
import { APPETIZERS, MAINS, DESSERTS, DRINKS } from './constants.js';

class BeforeDiscountCalculator {
    constructor(orders) {
        this.orders = orders;
    }

    // IMPC-23
    totalBeforeDiscount() {
        const menuList = {...APPETIZERS, ...MAINS, ...DESSERTS, ...DRINKS};
        return this.orders.reduce((total, order) => {
            const [menuItem, quantity] = order.split(DASH);
            return total + (menuList[menuItem] * Number(quantity));
        }, 0); // IMPC-66
    }

    // IMPC-24
    isOverTenThousand() {
        const totalAmount = this.totalBeforeDiscount();
        return totalAmount >= IS_OVER_TEN_THOUSAND; // IMPC-67, IMPC-68
    }
}

export default BeforeDiscountCalculator;
