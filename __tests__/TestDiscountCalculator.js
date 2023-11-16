import DiscountCalculator from '../src/DiscountCalculator.js';

describe('TestDiscountCalculator', () => {
  // TSTC-25: testChristmasDiscount
  // TSTC-69: 크리스마스 할인 기능 테스트
  test('TSTC-69: 크리스마스 할인 기능 테스트', () => {
    // 테스트 케이스 작성
    const date = new Date(2023, 11, 24); // 12월 24일
    const discountCalculator = new DiscountCalculator([], date);
    const discount = discountCalculator.christmasDiscount();
    expect(discount).toBe(3300); 
  });

  // TSTC-26: testWeekdayDiscount
  // TSTC-70: 평일 할인 기능 테스트
  test('TSTC-70: 평일 할인 기능 테스트', () => {
    // 테스트 케이스 작성
    const orders = ['아이스크림-1', '해산물파스타-1'];
    const date = new Date(2023, 11, 20); // 12월 20일 (평일)
    const discountCalculator = new DiscountCalculator(orders, date);
    const discount = discountCalculator.weekdayDiscount();
    expect(discount).toBe(2023); 
  });

  // TSTC-27: testWeekendDiscount
  // TSTC-71: 주말 할인 기능 테스트
  test('TSTC-71: 주말 할인 기능 테스트', () => {
    // 테스트 케이스 작성
    const orders = ['아이스크림-1', '해산물파스타-1'];
    const date = new Date(2023, 11, 23); // 12월 24일 (주말)
    const discountCalculator = new DiscountCalculator(orders, date);
    const discount = discountCalculator.weekendDiscount();
    expect(discount).toBe(2023); 
});

  // TSTC-28: testSpecialDiscount
  // TSTC-72: 특별 할인 기능 테스트
  test('TSTC-72: 특별 할인 기능 테스트', () => {
    // 테스트 케이스 작성
    const date = new Date(2023, 11, 3); // 특별 할인 날짜
    const discountCalculator = new DiscountCalculator([], date);
    const discount = discountCalculator.specialDiscount();
    expect(discount).toBe(1000); // 예상되는 할인 값에 따라 수정
  });

  // TSTC-29: testChampagneDiscount
  // TSTC-73: 증정 이벤트 기능 테스트
  test('TSTC-73: 증정 이벤트 기능 테스트', () => {
    // 테스트 케이스 작성
    const totalBeforeDiscount = 120000; // 할인 조건 충족
    const discountCalculator = new DiscountCalculator([], new Date());
    const discount = discountCalculator.champagneDiscount(totalBeforeDiscount);
    expect(discount).toBe(25000); // 예상되는 할인 값에 따라 수정
  });
});
