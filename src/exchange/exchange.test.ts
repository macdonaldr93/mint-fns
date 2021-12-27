import isoCurrencies from '../iso-currencies.json';
import { CAD, USD } from '../currencies';
import Currency from '../currency';
import Money from '../money';
import Exchange from './exchange';

describe('Exchange', () => {
  beforeAll(() => {
    Currency.load(isoCurrencies);
  });

  describe('exchangeWith()', () => {
    it('returns expected money', () => {
      const exchange = new Exchange();

      exchange.addRate(USD, CAD, 0.745);

      const money = exchange.exchangeWith(new Money(100, USD), CAD);

      expect(money).toEqualMoney(new Money(74, CAD));
    });
  });
});