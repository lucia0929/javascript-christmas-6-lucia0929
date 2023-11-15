import { Console } from "@woowacourse/mission-utils";
import { DATE_PROMPT, DATE_INPUT_PROMPT, DATE_ERROR_MESSAGE, DATE_INPUT_TRIM } from './constants.js';
import { MINIMUM_DATE, MAXIMUM_DATE, EMPTY } from './constants.js';

export const InputView = {
    async inputDate() {
        let isValid = false;
        let input;
        while (!isValid) {
            input = await this.promptDate();
            isValid = DateValidator.isValidDate(input); // IMPC-43, IMPC-44, IMPC-45, IMPC-46
            if (!isValid)
                await DateValidator.dateError(); // IMPC-47, IMPC-48, IMPC-49
        }
        return input;
    },

    async promptDate() {
        Console.print(DATE_PROMPT); // IMPC-41
        const input = await Console.readLineAsync(DATE_INPUT_PROMPT); // IMPC-41
        return input.replace(DATE_INPUT_TRIM, EMPTY); // IMPC-42
    }    
}

export class DateValidator {
    // IMPC-13
    static isValidDate(date) {
        if (this.isEmpty(date)) return false; // IMPC-44
        if (this.containsNonNumeric(date)) return false; // IMPC-45, IMPC-46
        if (!this.isInRange(date, MINIMUM_DATE, MAXIMUM_DATE)) return false; // IMPC-43
        return true;
    }

    static isEmpty(date) {
        return date.trim() === EMPTY; //EMPTY_DATE
    }

    static containsNonNumeric(date) {
        return !/^\d+$/.test(date);
    }

    static isInRange(date, min, max) {
        const numericDate = Number(date);
        return numericDate >= min && numericDate <= max;
    }

    // IMPC-14
    static async dateError() {
        Console.print(DATE_ERROR_MESSAGE); // IMPC-48
    }
}
