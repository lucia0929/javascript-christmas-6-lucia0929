import BenefitCalculator from './BenefitCalculator.js';
import BeforeDiscountCalculator from './BeforeDiscountCalculator.js';
import { CHAMPAGNE_DISCOUNT } from './constants.js';

class AfterDiscountCalculator {
    constructor(orders, date, menuList) {
        this.orders = orders;
        this.date = date;
        this.menuList = menuList;
        this.benefitCalculator = new BenefitCalculator(orders, date, menuList);
        this.beforeDiscountCalculator = new BeforeDiscountCalculator(orders, menuList);
    }

    // IMPC-31
    totalAfterDiscount() {
        const totalBeforeDiscount = this.beforeDiscountCalculator.totalBeforeDiscount();
        const benefits = this.benefitCalculator.totalBenefit();
        // "증정 이벤트" 혜택 찾기
        const champagneBenefit = benefits.find(benefit => benefit.description === CHAMPAGNE_DISCOUNT);
        const champagneAmount = champagneBenefit ? champagneBenefit.amount : 0;
        const totalBenefits = benefits.reduce((total, benefit) => total + benefit.amount, 0);
        return totalBeforeDiscount - totalBenefits + champagneAmount;
    }
}

export default AfterDiscountCalculator;
