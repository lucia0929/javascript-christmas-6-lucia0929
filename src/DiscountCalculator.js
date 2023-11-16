import { 
CHIRSTMAS_DISCOUNT_START_AMOUNT,
ChRISTMAS_FINAL_DISCOUNT_DAY,
CHIRSTMAS_DISCOUNT_PER_AMOUNT,
CHAMPAGNE_PRICE,
CHAMPAGNE_DISCOUNT_MINIMUM_PRICE,
SPECIAL_DISCOUNT_AMOUNT,
SPECIAL_DAYS,
DASH, DESSERTS, MAINS, MONTH, DISCOUNT_MULTIPLIER } from './constants.js';

class DiscountCalculator {
    constructor(orders, date) {
        this.orders = orders;
        this.date = date;
    }

    // IMPC-25
    christmasDiscount() {
        if (this.date.getMonth() === MONTH && this.date.getDate() <= ChRISTMAS_FINAL_DISCOUNT_DAY)
            return CHIRSTMAS_DISCOUNT_START_AMOUNT + (this.date.getDate() - 1) * CHIRSTMAS_DISCOUNT_PER_AMOUNT;
        return 0;
    }


     // 평일 할인 계산
    calculateWeekdayDiscount() {
        return this.orders.reduce((discount, order) => {
            const [menuItem, quantity] = order.split(DASH);
            if (Object.keys(DESSERTS).includes(menuItem)) {
                return discount + (DISCOUNT_MULTIPLIER * Number(quantity));
            }
            return discount;
        }, 0);
    }

    // 주말 할인 계산
    calculateWeekendDiscount() {
        return this.orders.reduce((discount, order) => {
            const [menuItem, quantity] = order.split(DASH);
            if (Object.keys(MAINS).includes(menuItem)) {
                return discount + (DISCOUNT_MULTIPLIER * Number(quantity));
            }
            return discount;
        }, 0);
    }


     // IMPC-26
     weekdayDiscount() {
        if (this.date.getDay() >= 0 && this.date.getDay() <= 4) {
            return this.calculateWeekdayDiscount();
        }
        return 0;
    }

    // IMPC-27
    weekendDiscount() {
        if (this.date.getDay() === 5 || this.date.getDay() === 6) {
            return this.calculateWeekendDiscount();
        }
        return 0;
    }

    // IMPC-28
    specialDiscount() {
        if (SPECIAL_DAYS.includes(this.date.getDate()))
            return SPECIAL_DISCOUNT_AMOUNT;
        return 0;
    }

    // IMPC-29
    champagneDiscount(totalBeforeDiscount) {
        if (totalBeforeDiscount >= CHAMPAGNE_DISCOUNT_MINIMUM_PRICE) {
            return CHAMPAGNE_PRICE;
        }
        return 0;
        
    }
}

export default DiscountCalculator;
