define([
  'util/strings',
  'util/grammar',
  'models/income-source'
], function(
  Strings,
  Grammar,
  IncomeSource
) {

function getContent() {
  return _.extend({},
    Strings.getGroup('common'),
    Strings.getGroup('income-source-model')
  );
}

function formatType(incomeSource) {
  var content = getContent();
  var result = content.incomeTypes[incomeSource.get('type')];
  var incomeType = IncomeSource.TYPE[incomeSource.get('type')];

  if (incomeType && incomeType.description) {
    result += ' / ' + incomeSource.get('description');
  }

  if (incomeType && incomeType.employerPhoneNumber) {
    result += ' (' + incomeSource.get('employerPhoneNumber') + ')';
  }

  return result;
}

function formatAmount(incomeSource) {
  var content = getContent();

  var result = Strings.format('${0} {1}',
    Grammar.numberFormat(incomeSource.get('amount'), 2),
    content.frequencyInlineText[incomeSource.get('frequency')]
  );

  if (incomeSource.get('frequencyMultiplier') &&
      content.frequencyMultiplier[incomeSource.get('frequency')]) {
    result += Strings.format(' {0} {1} {2}',
        content.and,
        incomeSource.get('frequencyMultiplier'),
        content.frequencyMultiplier[incomeSource.get('frequency')]
    );
  }

  return result;
}


return {
  formatType: formatType,
  formatAmount: formatAmount
};

});
