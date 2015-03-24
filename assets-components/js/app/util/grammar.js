define(['underscore'], function(_) {

function buildConjunction(list, conjunction, emptyWord) {
  emptyWord = emptyWord || 'nothing';
  if (list.length === 0) {
    return emptyWord;
  }
  if (list.length === 1) {
    return list[0];
  }
  if (list.length === 2) {
    return list[0] + ' ' + conjunction + ' ' + list[1];
  }
  var oxfordComma = ', ';
  return list.slice(0, -1).join(', ') + oxfordComma + conjunction + ' ' + _.last(list);
}

function pluralize(singleWord, count, pluralWord) {
  pluralWord = pluralWord || singleWord + 's';
  if (count === 1) {
    return singleWord;
  }
  return pluralWord;
}

/**
 * Copied from underscore.string
 */
function capitalize(str){
  str = str == null ? '' : String(str);
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Copied from underscore.string
 */
function titleize(str){
  if (str == null) {
    return '';
  }
  str  = String(str).toLowerCase();
  return str.replace(/(?:^|\s|-)\S/g, function(c){ return c.toUpperCase(); });
}

/**
 * Copied from underscore.string
 */
function numberFormat(number, dec, dsep, tsep) {
  number = Number(number);
  if (isNaN(number) || number === null) {
    return '';
  }

  number = number.toFixed(~~dec);
  tsep = typeof tsep === 'string' ? tsep : ',';

  var parts = number.split('.'), fnums = parts[0],
    decimals = parts[1] ? (dsep || '.') + parts[1] : '';

  return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
}

function currencyFormat(number, round) {
  return '$' + numberFormat(number, round ? 0 : 2);
}

// Use for input placeholders to show two decimal places but no commas
// Example: From 2940.2 to 2940.20
function currencyInputFormat(number) {
  return numberFormat(number, 2, '.', '');
}

return {
  buildConjunction: buildConjunction,
  pluralize: pluralize,
  titleize: titleize,
  capitalize: capitalize,
  numberFormat: numberFormat,
  currencyFormat: currencyFormat,
  currencyInputFormat: currencyInputFormat
};

});
