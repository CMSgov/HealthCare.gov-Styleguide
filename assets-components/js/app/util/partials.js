/**
 * File that loads common partials, so that each view does not need to load
 * them manually. In production all the partials are bundled into the js bundle
 * anyways so it's not a performance concern. In development this could make
 * things slower if the number of partials becomes large, at which point we
 * might need a more involved system to manage partials.
 */
define([
  // Keep everything in alphabetical order for maintainability
  'text!templates/forms/_address.html',
  'text!templates/forms/_applicant.html',
  'text!templates/forms/_dropdown.html',
  'text!templates/forms/_dropdown-menuitem.html',
  'text!templates/forms/_ethnicity.html',
  'text!templates/forms/_existing-applications-check.html',
  'text!templates/forms/_filter-question.html',
  'text!templates/forms/_full-name.html',
  'text!templates/forms/_input-group-dropdown.html',
  'text!templates/forms/_name-suffix.html',
  'text!templates/forms/_sex.html',
  'text!templates/forms/_toggle-buttons.html',
  'text!templates/help/_popover-highlight.html',
  'text!templates/help/_popover-label.html'
], function(
  addressTemplate,
  applicationTemplate,
  dropdownTemplate,
  dropdownMenuItemTemplate,
  ethnicityTemplate,
  existingApplicationsCheckTemplate,
  filterQuestionTemplate,
  fullNameTemplate,
  inputGroupDropdownTemplate,
  nameSuffixTemplate,
  sexTemplate,
  toggleButtonsTemplate,
  helpPopoverHighlightTemplate,
  helpPopoverLabelTemplate
) {
  return {
    'forms/_address': addressTemplate,
    'forms/_applicant': applicationTemplate,
    'forms/_dropdown': dropdownTemplate,
    'forms/_dropdown-menuitem': dropdownMenuItemTemplate,
    'forms/_ethnicity': ethnicityTemplate,
    'forms/_existing-applications-check': existingApplicationsCheckTemplate,
    'forms/_filter-question': filterQuestionTemplate,
    'forms/_full-name': fullNameTemplate,
    'forms/_input-group-dropdown': inputGroupDropdownTemplate,
    'forms/_name-suffix': nameSuffixTemplate,
    'forms/_sex': sexTemplate,
    'forms/_toggle-buttons': toggleButtonsTemplate,
    'help/_popover-highlight': helpPopoverHighlightTemplate,
    'help/_popover-label': helpPopoverLabelTemplate
  };
});
