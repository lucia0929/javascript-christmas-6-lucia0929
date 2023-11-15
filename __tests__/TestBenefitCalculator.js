import BenefitCalculator from '../src/BenefitCalculator.js';

describe('BenefitCalculator', () => {
  // TSTC-30: testTotalBenefit
  // TSTC-74: 총 혜택 금액 계산 기능 테스트
  test('TSTC-74: 총 혜택 금액 계산 기능 테스트', () => {
    // 테스트 케이스 작성
    const orders = ['아이스크림-2', '해물파스타-3'];
    const date = new Date(2023, 11, 20); // 12월 20일 (평일)
    const benefitCalculator = new BenefitCalculator(orders, date);
    const totalBenefit = benefitCalculator.totalBenefit();

    // 예상되는 혜택 배열과 비교
    const expectedBenefit = [
      { description: '크리스마스 디데이 할인', amount: 2900 }, // 예상 혜택
      { description: '평일 할인', amount: 4046 }, // 예상 혜택
    ];

    // 혜택 배열이 일치하는지 확인
    expect(totalBenefit).toEqual(expectedBenefit);
  });
});
