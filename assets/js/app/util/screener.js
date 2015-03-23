define([
  'underscore',
  'util/strings',
  'common/data/states'
], function(
  _,
  Strings,
  States
) {

var getSectionedScreenerQuestions = function(appModel) {
  var questions = [];
  var isFA = appModel.get('requireFinancialInfo');
  var isMarried = appModel.get('isMarried');
  var hasDependents = appModel.hasDependents();

  var applicant = appModel.get('people')[0];
  var soloApplicant = appModel.get('people').length === 1;
  var age = applicant.getAge();

  // The "main" section are all "positive" basic questions most people
  // should pass.
  var mainSection = [];

  // The next set filters out special cases that we don't support and
  // are "negative" (in that we need to send them to FFM to handle).
  var specialsSection = [];

  // A special, single item section to determine the "child" section
  var hasChildSection = [];

  // The next set are special cases for households with people under 26.
  // Note that households may include people not included on a tax return!
  // It's assumed that this is the last section (see updateVisibleSections).
  var childSection = [];


  // Now build up the questions dynamically based on information we have so
  // far. Note at this point, they have passed RIDP and a basic info
  // screener so we know a little bit about them.
  if (isFA || !soloApplicant) {
    mainSection.push('homeAddress');
  }

  mainSection.push('citizen');
  mainSection.push('ssn');

  if (isFA) {
    mainSection.push('filingTax');
  }

  if (hasDependents) {
    mainSection.push('nuclear');
    specialsSection.push('stepchild');
  }

  specialsSection.push('incarcerated');
  specialsSection.push('native');
  specialsSection.push('citizen2');
  specialsSection.push('ssnDifferentName');
  specialsSection.push('pregnant');

  if (isFA) {
    specialsSection.push('eligibleViaEmployer');

    // Unlike all the other screener questions, this one's only purpose
    // is to determine if user should be shown remaining 4 "only if someone
    // in my household is under 26" questions.
    //
    // We only display it for users who are married without dependents
    // (25% of US) and 26 or over themselves, since:
    // a) if they're under 26 or have dependents, someone in their household is
    // under 26.
    // b) if they're single, most SA's will only see one of the 4 under-26
    // questions anyway (unless they are between 18-25). Just go ahead and
    // show the the one remaining question.
    //
    // Those who don't get this filter question *do* see the under-26 questions.
    // It's only people who get this question and say no one's under 26 who don't.
    if (isMarried && !hasDependents && age >= 26) {
      hasChildSection.push('under26');
    }

    if (!soloApplicant || age >= 18 && age <= 22) {
      childSection.push('hasStudent');
    }

    if (!soloApplicant || age >= 18 && age <= 25) {
      childSection.push('hasFosterChild');
    }

    childSection.push('nonDependentChild');

    if (hasDependents) {
      childSection.push('dependentOfUnmarried');
    }
  }

  var sections = [
    {name: 'main', questions: mainSection},
    {name: 'specials', questions: specialsSection}
  ];

  if (!_.isEmpty(hasChildSection)) {
    sections.push({name: 'is-everyone-26-or-older', questions: hasChildSection});
  }

  sections.push({name: 'child', questions: childSection});

  return sections;
};

/**
 * Get the keys to test for a given application and question.
 */
var getScreenerQuestionKeys = function(appModel, question) {
  var isMulti = appModel.isMultiplePersonHousehold();
  var isMarried = appModel.get('isMarried');
  var isFA = appModel.get('requireFinancialInfo');
  var multiSuffix = isMulti ? 'Multi' : '';

  var key = question + 'Question' + multiSuffix;
  var marriedKey = question + 'QuestionMarried' + multiSuffix;
  var FAKey = question + 'QuestionFA' + multiSuffix;

  var keys = [];
  if(isMarried) {keys.push(marriedKey); }
  if(isFA) { keys.push(FAKey); }
  keys.push(key);

  return keys;
};

// Map if obj is an array, else apply function to the object directly.
function maybeMap(obj, func) {
  return _.isArray(obj) ? _.map(obj, func) : func.call(null, obj);
}

// Create a format function that adds coverageYear and coverageState
// to the keywords that are replaced in the string.
function createAppModelFormatter(appModel) {
  var keywords = {
    coverageYear: appModel.get('coverageYear'),
    coverageState: States.getNameFromCode(appModel.get('coverageState'))
  };
  return function(template) {
    return Strings.format(template, keywords);
  };
}

/**
 * Given the question we want to ask, return the right version
 * depending on whether it's a multi-person household or single,
 * and on whether the user is married or in the FA flow.
 *
 * NOTE: we assume no future question text will vary based on more than one
 * dimension out of two (married and FA), because we assume no additional
 * screener questions will be added, only removed.
 */
var getScreenerQuestionText = function(appModel, content, question) {
  var format = createAppModelFormatter(appModel);
  var keys = getScreenerQuestionKeys(appModel, question);

  for(var i = 0, l = keys.length; i < l; i++) {
    if(!_.isUndefined(content[keys[i]])) {
      return maybeMap(content[keys[i]], format);
    }
  }
  return 'ERROR: content not found.';
};

/**
 * We need to grab the help content for screener questions. If we ever
 * update help text to be sensitive to household size, make this use
 * getScreenerQuestionKeys or something similar.
 */
var getScreenerQuestionHelp = function(appModel, content, question) {
  var format = createAppModelFormatter(appModel);
  var key = question + 'QuestionHelp';

  if (!_.isUndefined(content[key])) {
    content[key].content = format(content[key].content);
    return content[key];
  }

  return null;
};

return {
  getScreenerQuestionKeys: getScreenerQuestionKeys,
  getSectionedScreenerQuestions: getSectionedScreenerQuestions,
  getScreenerQuestionText: getScreenerQuestionText,
  getScreenerQuestionHelp: getScreenerQuestionHelp
};

});
