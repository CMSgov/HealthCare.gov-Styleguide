/**
 * Default flag values. These can be overridden in Optimizely, but this file
 * serves as the documentation for what each flag does, as well as the default
 * value for traffic that is not being shown an Optimizely variation.
 */
define([], function() {
  return {
    // WELCOME PAGE

    /** Whether to show the map background on the welcome page. */
    'showMap': true,

    // ACCOUNT CREATION

    /**
     * Whether or not to continue to our account creation page.
     * Even if people land on our state selection welcome page, we still send
     * a percentage of users to the old FFM registration page to compare
     * funnel performance.
     */
    'useNewAccountPage': true,

    /**
     * We need full page navigation for the create account screen to support
     * the waiting room configuration. However, long term we want a solution
     * to see how effective the faster, smoother client side navigation is,
     * so we want the ability to collect those metrics.
     */
    'useFullPageNavigationForCreateAccount': true,

    /** Show a confirm password field */
    'showRetypePassword': true,

    /** Show a "show password" link. */
    'showRevealPassword': false,

    /** Show checkboxes for each password requirement. */
    'showPasswordCheckboxes': true,

    /** Show a suggestion when the user mistypes common email domains. */
    'suggestEmailDomain': true,

    /** Show Error Icon for Privacy Policy. */
    'showPrivacyErrorIcon': true,

    /** Show a summary of validation errors below the Create Account button */
    'validationErrorSummary': false,

    /** Will validate password onblur, then keyup if error.
     *  Also give an individualized error message. */
    'assertivePasswordCheck': false,

    /** Scroll the window up to the topmost validation error. */
    'scrollToFirstValidationError': true,

    /** Header shown on the registration page. */
    'createAccountHeading': null,

    /** Message shown at the top of the registration page. */
    'createAccountSubHeading': null,

    /**
     * An Optimizely experiment ID that is manually activated for all users
     * who successfully create an MPL account. This allows us to run downstream
     * A/B tests that only target MPL users, rather than the entire userbase.
     */
    'manualExperimentIds': [597892766],  // 'MPL users' experiment

    // OTHER

    /** Max time to wait for FFM REST calls to respond, in milliseconds. */
    'ffmRestTimeoutMs': 30*1000

    // put other sections below here
  };
});
