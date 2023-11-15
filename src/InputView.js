import { Console } from "@woowacourse/mission-utils";
import { DATE_PROMPT, DATE_INPUT_PROMPT, DATE_ERROR_MESSAGE, DATE_INPUT_TRIM } from './constants.js';
import { MINIMUM_DATE, MAXIMUM_DATE, EMPTY } from './constants.js';

export const InputView = {
    async inputDate() {
        let isValid = false;
        let input;
        while (!isValid) {
            input = await this.promptDate();
        }
        return input;
    },

    async promptDate() {
        Console.print(DATE_PROMPT);
        const input = await Console.readLineAsync(DATE_INPUT_PROMPT);
        return input
    }    
}
