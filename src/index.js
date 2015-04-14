"use strict";

/**
 * Formats monetary `value` using provided options.
 *
 * The options are:
 *
 *   * `currencyDecimalPlaces` (default 0) — mandatory floating digits
 *   * `currencyGroupingSeparator (default '.')` — thousands separator
 *   * `currencySymbol` (default '') — locale-dependent symbol
 *   * `currencyFormat` (default '%v %s') — template string where `%s` stands
 *     for currency symbol and `%v` stands for formatted numeric value
 */
module.exports = exports = function(value, options) {
  options = options || {};
  var decimalPlaces = options.currencyDecimalPlaces || 0
    , groupingSeparator = options.currencyGroupingSeparator || ''
    , decimalSeparator = options.currencyDecimalSeparator || '.'
    , symbol = options.currencySymbol || ''
    , format = options.currencyFormat || '%v %s';
  var precision = Math.pow(10, decimalPlaces);
  var expanded = Math.abs(Math.round(parseFloat(value) * precision));
  // Deal with floating parts
  var decimalPart = (expanded % precision) / precision;
  var result = '';
  if (decimalPart > 0)
    result = decimalSeparator + decimalPart.toFixed(decimalPlaces).substring(2);
  // Apply grouping separators
  var intPart = Math.floor(expanded / precision).toString();
  while (intPart.length > 3) {
    result = groupingSeparator +
      intPart.substring(intPart.length - 3, intPart.length) +
      result;
    intPart = intPart.substring(0, intPart.length - 3);
  }
  if (intPart.length > 0)
    result = intPart + result;
  // Add minus
  if (value < 0)
    result = '–' + result;
  // Compose padded version with mandatory decimal places
  var padded = result;
  if (decimalPart == 0)
    padded += decimalSeparator + decimalPart.toFixed(decimalPlaces).substring(2);
  return {
    val: format.replace('%v', result).replace('%s', symbol),
    pval: format.replace('%v', padded).replace('%s', symbol),
    num: result,
    pnum: padded,
    dec: decimalPart
  }
};
