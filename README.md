# Форматирование валютных значений

```
var currency = require('prostore.currency');

currency(15000.447, {
  currencySymbol: 'руб.',
  currencyDecimalSeparator: ',',
  currencyGroupingSeparator: ' ',
  currencyDecimalPlaces: 2
}).val     // '15 000,45 руб.'
```
