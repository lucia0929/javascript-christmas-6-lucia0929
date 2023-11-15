import AfterDiscountCalculator from './AfterDiscountCalculator.js';
import BeforeDiscountCalculator from './BeforeDiscountCalculator.js';
import BenefitCalculator from './BenefitCalculator.js';
import BadgeAssigner from './BadgeAssigner.js';
import { Console } from "@woowacourse/mission-utils";
import {
    ORDER_HEADER,
    ORDER_DETAILS_HEADER,
    TOTAL_BEFORE_DISCOUNT_HEADER,
    CHAMPAGNE_HEADER,
    BENEFIT_DETAILS_HEADER,
    TOTAL_BENEFITS_HEADER,
    TOTAL_AFTER_DISCOUNT_HEADER,
    NO_ITEM,
    EVENT_BADGE_HEADER,
} from './constants.js';

// OutputView 객체의 정의


const OutputView = {
    // 필요한 계산기 클래스 인스턴스 초기화
    
    initialize(orders, date, menuList) {
        if (typeof orders === 'string') {
            orders = orders.split(COMMA).map(order => order.trim());
        }

        this.beforeDiscountCalculator = new BeforeDiscountCalculator(orders, menuList);
        this.benefitCalculator = new BenefitCalculator(orders, date, menuList);
        this.afterDiscountCalculator = new AfterDiscountCalculator(orders, date, menuList);
        this.badgeAssigner = new BadgeAssigner(orders, date, menuList);
    },

    // IMPC-33: 헤더 출력
    printHeader(date) {
        Console.print(ORDER_HEADER.replace("{date}", date.getDate()));
    },

    // IMPC-34: 주문 상세 정보 출력
    printOrderDetails(orders) {
        Console.print(ORDER_DETAILS_HEADER);
        orders.forEach(order => this.printOrder(order));
    },

    // 주문 출력 도우미 함수
    printOrder(order) {
        const [menuItem, quantity] = order.split('-');
        Console.print(`${menuItem} ${quantity}개`);
    },

    // IMPC-35: 할인 전 총주문 금액 출력
    printTotalBeforeDiscount() {
        const totalBeforeDiscount = this.beforeDiscountCalculator.totalBeforeDiscount();
        this.printTotal(TOTAL_BEFORE_DISCOUNT_HEADER, totalBeforeDiscount);
    },

    // IMPC-36: 증정 메뉴 출력
    printChampagne() {
        const champagneBenefit = this.benefitCalculator.totalBenefit().find(benefit => benefit.description === "증정 이벤트");
        const message = champagneBenefit && champagneBenefit.amount > 0 ? '샴페인 1개' : NO_ITEM;
        this.printSimpleMessage(CHAMPAGNE_HEADER, message);
    },

    // IMPC-37: 혜택 내역 출력
    printBenefitDetails() {
        const benefitDetails = this.benefitCalculator.totalBenefit();
        const hasBenefits = benefitDetails.length > 0 && benefitDetails.some(benefit => benefit.amount !== 0);

        if (!hasBenefits) {
            this.printSimpleMessage(BENEFIT_DETAILS_HEADER, NO_ITEM);
            return;
        }
        this.printBenefits(benefitDetails);
    },

    // 혜택 내역 출력 도우미 함수
    printBenefits(benefits) {
        Console.print(BENEFIT_DETAILS_HEADER);
            benefits.forEach(benefit => {
                Console.print(`${benefit.description}: -${benefit.amount.toLocaleString()}원`);
        });
    },

    // IMPC-38: 총 혜택 금액 출력
    printTotalBenefits() {
        const benefits = this.benefitCalculator.totalBenefit();
        const totalBenefits = benefits.reduce((total, benefit) => total + benefit.amount, 0);
    
        // 혜택 목록이 비어있거나 모든 혜택의 합계가 0인 경우
        if (benefits.length > 0 && totalBenefits !== 0) {
            this.printTotal(TOTAL_BENEFITS_HEADER, -totalBenefits);
            return;
        }
        this.printTotal(TOTAL_BENEFITS_HEADER, 0);
    },
    

    // IMPC-39: 할인 후 예상 결제 금액 출력
    printTotalAfterDiscount() {
        const totalAfterDiscount = this.afterDiscountCalculator.totalAfterDiscount();
        this.printTotal(TOTAL_AFTER_DISCOUNT_HEADER, totalAfterDiscount);
    },

    // IMPC-40: 이벤트 배지 출력
    printBadge() {
        const badge = this.badgeAssigner.assignBadge();
        this.printSimpleMessage(EVENT_BADGE_HEADER, badge ? badge : NO_ITEM);
    },

    // 총액 출력 도우미 함수
    printTotal(header, amount) {
        Console.print(`${header}\n${amount.toLocaleString()}원`);
    },

    // 간단한 메시지 출력 도우미 함수
    printSimpleMessage(header, message) {
        Console.print(header);
        Console.print(message);
    }
};

export default OutputView;
