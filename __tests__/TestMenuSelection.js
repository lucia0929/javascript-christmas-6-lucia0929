import { Console } from "@woowacourse/mission-utils";
import MenuSelection from "../src/MenuSelection.js";
import { MENU_ORDER_PROMPT, MENU_ERROR_MESSAGE } from '../src/constants.js';

jest.mock("@woowacourse/mission-utils", () => ({
  Console: {
    print: jest.fn(),
    readLineAsync: jest.fn()
  }
}));

describe('MenuSelection', () => {
  test('TSTC-50: 사용자에게 메뉴 입력 메시지를 표시하고 입력을 받아야 한다', async () => {
    Console.readLineAsync.mockResolvedValue("해산물파스타-2, 제로콜라-1");
    const menuSelection = new MenuSelection();
    await menuSelection.inputMenuOrder();
    expect(Console.readLineAsync).toHaveBeenCalledTimes(1);
  });

  test('TSTC-51: 메뉴 입력값에서 공백을 제거해야 한다', async () => {
    Console.readLineAsync.mockResolvedValue("해산물파스타-2,제로콜라-1 ");
    const menuSelection = new MenuSelection();
    const result = await menuSelection.inputMenuOrder();
    expect(result).toBe("해산물파스타-2,제로콜라-1");
  });

  test('TSTC-52: 메뉴판에 존재하는 메뉴명을 정확히 검증해야 한다', () => {
    const menuSelection = new MenuSelection();
    expect(menuSelection.isValidMenu("해산물파스타")).toBe(true);
    expect(menuSelection.isValidMenu("없는메뉴")).toBe(false);
  });

    test('TSTC-53: 없는 메뉴 입력 시 에러 메시지를 출력해야 한다', () => {
        Console.print.mockClear();
        const menuSelection = new MenuSelection();
        menuSelection.menuOrderError();
        expect(Console.print).toHaveBeenCalledWith(MENU_ERROR_MESSAGE);
    });

  test('TSTC-54: 메뉴 수량이 1 이상이어야 한다', () => {
    const menuSelection = new MenuSelection();
    expect(menuSelection.isValidNumber("2")).toBe(true);
    expect(menuSelection.isValidNumber("0")).toBe(false);
  });

   test('TSTC-55: 메뉴 수량이 1개 미만인 경우 에러 메시지를 출력해야 한다', () => {
    Console.print.mockClear();
    const menuSelection = new MenuSelection();
    menuSelection.menuOrderError();
    expect(Console.print).toHaveBeenCalledWith(MENU_ERROR_MESSAGE);
  });

  test('TSTC-56: 메뉴 형식이 올바른지 검증해야 한다', () => {
    const menuSelection = new MenuSelection();
    expect(menuSelection.isValidMenuFormat("해산물파스타-2")).toBe(true);
    expect(menuSelection.isValidMenuFormat("해산물파스타2")).toBe(false);
  });

  test('TSTC-57: 메뉴 형식이 잘못된 경우 에러 메시지를 출력해야 한다', () => {
    Console.print.mockClear();
    const menuSelection = new MenuSelection();
    menuSelection.menuOrderError();
    expect(Console.print).toHaveBeenCalledWith(MENU_ERROR_MESSAGE);
  });

    test('TSTC-58: 중복 메뉴 입력을 정확히 검증해야 한다', () => {
        const menuSelection = new MenuSelection();
        const orders = [["해산물파스타", "2"], ["해산물파스타", "3"]];
        expect(menuSelection.isDuplicateMenu("해산물파스타", orders)).toBe(true);
        expect(menuSelection.isDuplicateMenu("제로콜라", orders)).toBe(false);
    });

    test('TSTC-59: 중복 메뉴 입력 시 에러 메시지를 출력해야 한다', () => {
        Console.print.mockClear();
        const menuSelection = new MenuSelection();
        menuSelection.menuOrderError();
        expect(Console.print).toHaveBeenCalledWith(MENU_ERROR_MESSAGE);
    });
    
    test('TSTC-60: 주문한 모든 메뉴가 음료인 경우를 정확히 검증해야 한다', () => {
        const menuSelection = new MenuSelection();
        const orders = [["제로콜라", "2"], ["레드와인", "1"]];
        expect(menuSelection.isOnlyDrink(orders)).toBe(true);
        const mixedOrders = [["해산물파스타", "2"], ["제로콜라", "1"]];
        expect(menuSelection.isOnlyDrink(mixedOrders)).toBe(false);
    });

    test('TSTC-61: 음료만 주문한 경우 에러 메시지를 출력해야 한다', () => {
        Console.print.mockClear();
        const menuSelection = new MenuSelection();
        menuSelection.menuOrderError();
        expect(Console.print).toHaveBeenCalledWith(MENU_ERROR_MESSAGE);
    });
    
    test('TSTC-62: 주문한 메뉴 수가 20개를 초과하는지 정확히 검증해야 한다', () => {
        const menuSelection = new MenuSelection();
        const orders = new Array(21).fill(["해산물파스타", "1"]);
        expect(menuSelection.isOrderLimit(orders)).toBe(true);
        const validOrders = new Array(20).fill(["해산물파스타", "1"]);
        expect(menuSelection.isOrderLimit(validOrders)).toBe(false);
    }); 
    
    test('TSTC-63: 메뉴 수가 20개를 초과하는 경우 에러 메시지를 출력해야 한다', () => {
        Console.print.mockClear();
        const menuSelection = new MenuSelection();
        menuSelection.menuOrderError();
        expect(Console.print).toHaveBeenCalledWith(MENU_ERROR_MESSAGE);
    });

    test('TSTC-64: 메뉴 입력 에러 발생 시 에러 메시지를 출력해야 한다', () => {
        Console.print.mockClear();
        const menuSelection = new MenuSelection();
        menuSelection.menuOrderError();
        expect(Console.print).toHaveBeenCalledWith(MENU_ERROR_MESSAGE);
    }); 

    test('TSTC-65: 메뉴 입력 에러 발생 후 재입력을 요청해야 한다', async () => {
        Console.readLineAsync.mockResolvedValueOnce("잘못된 입력")
                        .mockResolvedValueOnce("해산물파스타-2, 제로콜라-1");
        const menuSelection = new MenuSelection();
        const result = await menuSelection.inputMenuOrder();
        expect(Console.readLineAsync).toHaveBeenCalledTimes(4);

        expect(result).toBe("해산물파스타-2,제로콜라-1");
    });
});
