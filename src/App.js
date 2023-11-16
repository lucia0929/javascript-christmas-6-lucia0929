import { InputView } from './InputView.js';
import MenuSelection from './MenuSelection.js';
import OutputView from './OutputView.js';
import { COMMA } from './constants.js';
import { APPETIZERS, MAINS, DESSERTS, DRINKS, YEAR, MONTH } from './constants.js';

class App {
  async run() {
    const dateInput = await InputView.inputDate(); 
    const date = new Date(YEAR, MONTH, dateInput); 

    const menuSelection = new MenuSelection();
    let ordersString = await menuSelection.inputMenuOrder();
    const orders = ordersString.split(COMMA).map(order => order.trim());
    
    const menuList = {...APPETIZERS, ...MAINS, ...DESSERTS, ...DRINKS};
    
    OutputView.initialize(orders, date, menuList);
    OutputView.printHeader(date);
    OutputView.printOrderDetails(orders);
    OutputView.printTotalBeforeDiscount();
    OutputView.printChampagne();
    OutputView.printBenefitDetails();
    OutputView.printTotalBenefits();
    OutputView.printTotalAfterDiscount();
    OutputView.printBadge();
  }
}

export default App;
