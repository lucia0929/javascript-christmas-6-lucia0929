import BeforeDiscountCalculator from '../src/BeforeDiscountCalculator';

describe('TestBeforeDiscountCalculator', () => {

// TSTC-23: testTotalBeforeDiscount
// TSTC-66: 각 메뉴의 가격과 수량 곱해서 합산하는 기능 테스트
test('TSTC-66: 각 메뉴의 가격과 수량을 곱해서 합산하는 기능 테스트', () => {
    // 테스트 케이스 작성
    const orders = ['양송이수프-2', '티본스테이크-3', '아이스크림-1', '제로콜라-2'];
    const beforeDiscountCalculator = new BeforeDiscountCalculator(orders);
    const totalBeforeDiscount = beforeDiscountCalculator.totalBeforeDiscount();
    expect(totalBeforeDiscount).toBe(188000); // 각 메뉴의 가격과 수량을 곱한 총 합산 금액
  });
  
  // TSTC-24: testIsOverTenThousand
  // TSTC-67: 총주문 금액이 10,000원 이상인지 검증 기능 테스트
  // TSTC-68: 10000원 이상일 경우 true 반환 기능 테스트
  test('TSTC-68: 총 주문 금액이 10,000원 이상일 경우 true 반환 기능 테스트', () => {
    // 테스트 케이스 작성
    const orders = ['시저샐러드-2', '해산물파스타-3', '초코케이크-1', '샴페인-2'];
    const beforeDiscountCalculator = new BeforeDiscountCalculator(orders);
    const isOverTenThousand = beforeDiscountCalculator.isOverTenThousand();
    expect(isOverTenThousand).toBe(true); // 총 주문 금액이 10,000원 이상이므로 true 반환
  });
});
