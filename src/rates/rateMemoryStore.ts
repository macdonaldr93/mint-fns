import { CurrencyCodeISO4217 } from '../currency';
import { IRateStore } from './types';

export interface StoreOptions {}

export default class RateMemoryStore implements IRateStore {
  private static INDEX_KEY_SEPARATOR = '_TO_';

  options: StoreOptions;
  rates: { [key: string]: number };

  constructor(options: StoreOptions = {}, rates = {}) {
    this.options = options;
    this.rates = rates;
  }

  addRate(
    from: CurrencyCodeISO4217 | string,
    to: CurrencyCodeISO4217 | string,
    rate: number
  ) {
    this.rates[this.rateKeyFor(from, to)] = rate;

    return rate;
  }

  getRate(
    from: CurrencyCodeISO4217 | string,
    to: CurrencyCodeISO4217 | string
  ) {
    return this.rates[this.rateKeyFor(from, to)];
  }

  eachRate(
    callback: (
      from: CurrencyCodeISO4217 | string,
      to: CurrencyCodeISO4217 | string,
      rate: number
    ) => any
  ) {
    Object.entries(this.rates).forEach(([key, rate]) => {
      const [from, to] = key.split(RateMemoryStore.INDEX_KEY_SEPARATOR);

      callback(from, to, rate);
    });
  }

  rateKeyFor(
    from: CurrencyCodeISO4217 | string,
    to: CurrencyCodeISO4217 | string
  ) {
    return [from.toUpperCase(), to.toUpperCase()].join(
      RateMemoryStore.INDEX_KEY_SEPARATOR
    );
  }
}