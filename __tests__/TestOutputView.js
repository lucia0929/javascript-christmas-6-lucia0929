import OutputView from '../src/OutputView.js';
import { Console } from "@woowacourse/mission-utils";
import {
    SANTA_BADGE,
    CHAMPAGNE_HEADER,
    ORDER_HEADER,
    ORDER_DETAILS_HEADER,
    TOTAL_BEFORE_DISCOUNT_HEADER,
    BENEFIT_DETAILS_HEADER,
    TOTAL_BENEFITS_HEADER,
    TOTAL_AFTER_DISCOUNT_HEADER,
    EVENT_BADGE_HEADER,
    CHAMPAGNE_DISCOUNT
} from '../src/constants.js';

jest.mock('@woowacourse/mission-utils', () => ({
  Console: {
    print: jest.fn()
  }
}));

describe('OutputView', () => {
  // TSTC-33: 날짜를 받아와서 미리 보기 문구 출력 기능 테스트
  test('TSTC-77: testPrintHeader', () => {
    const date = new Date(2023, 11, 25);
    OutputView.printHeader(date);
    expect(Console.print).toHaveBeenCalledWith(ORDER_HEADER.replace("{date}", date.getDate()));
  });

  // TSTC-34: 주문 메뉴 목록 출력 기능 테스트
  test('TSTC-78: testPrintOrderDetails', () => {
    const orders = ['아이스크림-2', '해산물파스타-3'];
    OutputView.printOrderDetails(orders);
    expect(Console.print).toHaveBeenCalledWith(ORDER_DETAILS_HEADER);
    expect(Console.print).toHaveBeenCalledWith('아이스크림 2개');
    expect(Console.print).toHaveBeenCalledWith('해산물파스타 3개');
  });

  // TSTC-35: 할인 전 총주문 금액 출력 기능 테스트
  test('TSTC-79: testPrintTotalBeforeDiscount', () => {
    const orders = ['아이스크림-2', '해산물파스타-3'];
    OutputView.initialize(orders, new Date(), {아이스크림: 5000, 해산물파스타: 35000});
    OutputView.printTotalBeforeDiscount();
    const expectedTotal = 5000 * 2 + 35000 * 3;
    expect(Console.print).toHaveBeenCalledWith(`${TOTAL_BEFORE_DISCOUNT_HEADER}\n${expectedTotal.toLocaleString()}원`);
  });
  

  // TSTC-36: 증정메뉴 출력 기능 테스트
// TSTC-36: 증정메뉴 출력 기능 테스트
test('TSTC-80: testPrintChampagne', () => {
    // 필요한 데이터 및 모의 객체 초기화
    const orders = ['해산물파스타-3'];
    const menuList = { '해산물파스타': 35000 };
    const mockDate = new Date(2023, 11, 25); // 테스트에 사용할 날짜
    OutputView.initialize(orders, mockDate, menuList);
  
    // BenefitCalculator의 반환 값을 모의 설정
    OutputView.benefitCalculator = {
      totalBenefit: () => [{ description: CHAMPAGNE_DISCOUNT, amount: 1 }]
    };
  
    // printChampagne 메서드 실행 및 검증
    OutputView.printChampagne();
    expect(Console.print).toHaveBeenCalledWith(CHAMPAGNE_HEADER);
    expect(Console.print).toHaveBeenCalledWith('샴페인 1개'); // 예상 메시지
  });
  
});
