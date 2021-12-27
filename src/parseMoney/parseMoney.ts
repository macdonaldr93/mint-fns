import Currency, { ICurrency, CurrencyCodeISO4217 } from '../currency';
import Money, { MoneyOptions } from '../money';

export default function parseMoney(
  amount: string | number,
  currency?: Currency | ICurrency | CurrencyCodeISO4217 | string | null,
  options: MoneyOptions = {}
) {
  const wrappedCurrency = currency
    ? Currency.wrap(currency)
    : Money.defaultCurrency;
  const amountAsFloat =
    typeof amount === 'number'
      ? amount
      : parseFloat(amount.replace(wrappedCurrency.thousandsSeparator, ''));
  const value = amountAsFloat * wrappedCurrency.subunitToUnit;

  return new Money(value, wrappedCurrency, options);
}