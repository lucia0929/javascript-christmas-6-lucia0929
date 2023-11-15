import BenefitCalculator from './BenefitCalculator.js';
import { SANTA_BADGE, TREE_BADGE, STAR_BADGE } from './constants.js';
import { SANTA_AMOUNT, TREE_AMOUNT, STAR_AMOUNT } from './constants.js';

class BadgeAssigner {
    constructor(orders, date, menuList) {
        this.benefitCalculator = new BenefitCalculator(orders, date, menuList);
    }

    // IMPC-32
    assignBadge() {
        const totalBenefits = this.calculateTotalBenefits();
        return this.determineBadge(totalBenefits);
    }

    calculateTotalBenefits() {
        const benefits = this.benefitCalculator.totalBenefit();
        return benefits.reduce((total, benefit) => total + benefit.amount, 0);
    }

    determineBadge(totalBenefits) {
        if (totalBenefits >= SANTA_AMOUNT) return SANTA_BADGE;
        if (totalBenefits >= TREE_AMOUNT) return TREE_BADGE;
        if (totalBenefits >= STAR_AMOUNT) return STAR_BADGE;
        return null;
    }
}

export default BadgeAssigner;
