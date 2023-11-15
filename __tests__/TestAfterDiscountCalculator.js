import AfterDiscountCalculator from '../src/AfterDiscountCalculator.js';

describe('AfterDiscountCalculator', () => {
  // TSTC-31: testTotalAfterDiscount
  // TSTC-75: 할인 후 예상 결제 금액 계산 기능 테스트
  test('TSTC-75: 할인 후 예상 결제 금액 계산 기능 테스트', () => {
    const orders = ['아이스크림-2', '해산물파스타-3'];
    const date = new Date(2023, 11, 20); // 12월 20일 (평일)
    const menuList = {
        '아이스크림': 5000,
        '해산물파스타': 35000,
    };
    const afterDiscountCalculator = new AfterDiscountCalculator(orders, date, menuList);
    const totalAfterDiscount = afterDiscountCalculator.totalAfterDiscount();

    // '샴페인 할인' 혜택이 적용되었는지에 따라 예상 금액을 조정
    // 예를 들어, 샴페인 할인이 적용되었다면 예상 금액을 적절히 조정해야 합니다.
    const expectedTotalAfterDiscount = 108054; // 예상 결제 금액

    expect(totalAfterDiscount).toEqual(expectedTotalAfterDiscount);
});
});