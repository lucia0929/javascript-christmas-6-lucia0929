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
});
