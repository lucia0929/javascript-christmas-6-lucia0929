export const COMMA = ',';
export const DASH = '-';
export const EMPTY = '';

export const DATE_PROMPT = "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.";
export const DATE_INPUT_PROMPT = "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n";
export const DATE_ERROR_MESSAGE = "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.";
export const DATE_INPUT_TRIM = /\s/g;
export const MINIMUM_DATE = 1;
export const MAXIMUM_DATE = 31;

export const APPETIZERS = {
    "양송이수프": 6000, 
    "타파스": 5500, 
    "시저샐러드": 8000
};

export const MAINS = {
    "티본스테이크": 55000, 
    "바비큐립": 54000, 
    "해산물파스타": 35000, 
    "크리스마스파스타": 25000
};

export const DESSERTS = {
    "초코케이크": 15000, 
    "아이스크림": 5000
};

export const DRINKS = {
    "제로콜라": 3000, 
    "레드와인": 60000, 
    "샴페인": 25000
};

export const MENU_ORDER_PROMPT = "주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2, 레드와인-1, 초코케이크-1)\n";
export const MENU_INPUT_TRIM = /\s/g;
export const MENU_ERROR_MESSAGE = "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.";

export const YEAR = 2023;
export const MONTH = 11;

export const MENU_MINIMUM_QUANTITY = 1;
export const MENU_MAXIMUM_QUANTITY = 20;
export const IS_MENU_DUPLICATE = 1;
export const MENU_FORMAT = /^[a-zA-Z가-힣]+-\d+$/;

export const IS_OVER_TEN_THOUSAND = 10000;

export const DISCOUNT_MULTIPLIER = 2023;
export const SPECIAL_DAYS = [3, 10, 17, 24, 31, 25];
export const CHIRSTMAS_DISCOUNT_START_AMOUNT = 1000;
export const CHIRSTMAS_DISCOUNT_PER_AMOUNT = 100;
export const ChRISTMAS_FINAL_DISCOUNT_DAY = 25;
export const CHAMPAGNE_PRICE = 25000;
export const CHAMPAGNE_DISCOUNT_MINIMUM_PRICE = 120000;
export const SPECIAL_DISCOUNT_AMOUNT = 1000;

export const CHIRSTMAS_DISCOUNT = "크리스마스 디데이 할인";
export const WEEKDAY_DISCOUNT = "평일 할인";
export const WEEKEND_DISCOUNT = "주말 할인";
export const SPECIAL_DISCOUNT = "특별 할인";
export const CHAMPAGNE_DISCOUNT = "증정 이벤트";

export const SANTA_BADGE = "산타";
export const SANTA_AMOUNT = 20000;
export const TREE_BADGE = "트리";
export const TREE_AMOUNT = 10000;
export const STAR_BADGE = "별";
export const STAR_AMOUNT = 5000;

export const ORDER_HEADER = "12월 {date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!";
export const ORDER_DETAILS_HEADER = "\n<주문 메뉴>";
export const TOTAL_BEFORE_DISCOUNT_HEADER = "\n<할인 전 총주문 금액>";
export const CHAMPAGNE_HEADER = "\n<증정 메뉴>";
export const BENEFIT_DETAILS_HEADER = "\n<혜택 내역>";
export const TOTAL_BENEFITS_HEADER = "\n<총혜택 금액>";
export const TOTAL_AFTER_DISCOUNT_HEADER = "\n<할인 후 예상 결제 금액>";
export const NO_ITEM = "없음";
export const EVENT_BADGE_HEADER = "\n<12월 이벤트 배지>";
