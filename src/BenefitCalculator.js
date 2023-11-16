import DiscountCalculator from './DiscountCalculator.js';
import BeforeDiscountCalculator from './BeforeDiscountCalculator.js';
import { CHIRSTMAS_DISCOUNT, WEEKDAY_DISCOUNT, WEEKEND_DISCOUNT, SPECIAL_DISCOUNT, CHAMPAGNE_DISCOUNT } from './constants.js';

class BenefitCalculator {
    constructor(orders, date) {
        this.orders = orders;
        this.date = date;
        this.discountCalculator = new DiscountCalculator(orders, date);
        this.beforeDiscountCalculator = new BeforeDiscountCalculator(orders, this.menuList);
    }

    // IMPC-30
    totalBenefit() {
        const benefits = [];
        const totalBeforeDiscount = this.beforeDiscountCalculator.totalBeforeDiscount();
    
        this.calculateAndAddBenefit(benefits, CHIRSTMAS_DISCOUNT, this.discountCalculator.christmasDiscount());
        this.calculateAndAddBenefit(benefits, WEEKDAY_DISCOUNT, this.discountCalculator.weekdayDiscount());
        this.calculateAndAddBenefit(benefits, WEEKEND_DISCOUNT, this.discountCalculator.weekendDiscount());
        this.calculateAndAddBenefit(benefits, SPECIAL_DISCOUNT, this.discountCalculator.specialDiscount());
        this.calculateAndAddBenefit(benefits, CHAMPAGNE_DISCOUNT, this.discountCalculator.champagneDiscount(totalBeforeDiscount));
        
        return benefits; // 배열 반환
    }
  
    // 혜택 계산 및 배열에 추가하는 보조 메서드
    calculateAndAddBenefit(benefits, description, amount) {
        if (amount > 0) {
            benefits.push({ description, amount });
        }
    }
}

export default BenefitCalculator;
