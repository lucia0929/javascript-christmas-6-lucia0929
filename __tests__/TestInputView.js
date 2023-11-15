import { InputView } from '../src/InputView.js';
import { DateValidator } from '../src/InputView.js';
import { Console } from "@woowacourse/mission-utils";
import { DATE_PROMPT, DATE_INPUT_PROMPT, DATE_ERROR_MESSAGE } from '../src/constants.js';

jest.mock("@woowacourse/mission-utils", () => ({
  Console: {
    print: jest.fn(),
    readLineAsync: jest.fn()
  }
}));

describe('InputView', () => {
  test('TSTC-41: 사용자에게 날짜 입력 메시지를 표시하고 입력을 받아야 한다', async () => {
    Console.readLineAsync.mockResolvedValue("26");
    await InputView.inputDate();
    expect(Console.print).toHaveBeenCalledWith(DATE_PROMPT);
    expect(Console.readLineAsync).toHaveBeenCalledWith(DATE_INPUT_PROMPT);
  });

  test('TSTC-42: 날짜 입력값에서 공백을 제거해야 한다', async () => {
    Console.readLineAsync.mockResolvedValue(" 26 ");
    const date = await InputView.inputDate();
    expect(date).toBe("26");
  });
});

describe('DateValidator', () => {
  test('TSTC-43: 입력된 날짜가 1부터 31 사이여야 한다', () => {
    expect(DateValidator.isValidDate("32")).toBe(false);
    expect(DateValidator.isValidDate("15")).toBe(true);
  });
});