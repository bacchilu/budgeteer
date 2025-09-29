import {Decimal} from 'decimal.js';

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: 'EUR',
    minimumFractionDigits: 2,
    style: 'currency',
});

export const formatCurrency = function (value: Decimal) {
    return CURRENCY_FORMATTER.format(value.toNumber());
};
