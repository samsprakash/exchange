import { FORM_TYPES} from './constants/forms';
import {currencyJson} from './data/currency';


const defaultState = {
  app: {
    [FORM_TYPES.EXCHANGE]: {
      ['baseCurrency'] : {id:1, text:'USD'},
      ['exchangeCurrency'] : {id:2, text:'BTC'},
      ['exchangeRate'] : null,
      ['defaultCurrency']:currencyJson
    }
   
  }
};


export default defaultState;
