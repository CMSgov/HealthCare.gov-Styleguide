define([
  'jquery-showhide',
  'mailcheck',
  'common/constants',
  'models/account',
  'util/ab-util',
  'util/app-context',
  'views/card-view',
  'views/security-questions-view',
  'util/analytics',
  'text!templates/lite-account-creation.html'
], function(
  ShowHideUnused,  // jQuery plugin
  Kicksend,
  Constants,
  Account,
  ABUtil,
  AppContext,
  CardView,
  SecurityQuestionsView,
  Analytics,
  liteScreenerTemplate
) {

  var TOP_DOMAINS = {
    'aol.com': {
      'url': 'https://mail.aol.com/',
      'icon': 'img/mail-icons/aol-icon.png',
      'name': 'AOL Mail'
    },
    'gmail.com': {
      'url': 'https://mail.google.com/mail/',
      'icon': 'img/mail-icons/gmail-icon.ico',
      'name': 'Gmail'
    },
    'googlemail.com': {
      'url': 'https://mail.google.com/mail/',
      'icon': 'img/mail-icons/gmail-icon.ico',
      'name': 'Google Mail'
    },
    'hotmail.com': {
      'url': 'https://www.hotmail.com/',
      'icon': 'img/mail-icons/hotmail-icon.png',
      'name': 'Hotmail'
    },
    'live.com': {
      'url': 'https://mail.live.com/',
      'icon': 'img/mail-icons/hotmail-icon.png',
      'name': 'Live mail'
    },
    'yahoo.com': {
      'url': 'https://mail.yahoo.com/',
      'icon': 'img/mail-icons/yahoo-icon.png',
      'name': 'Yahoo Mail'
    },
    'ymail.com': {
      'url': 'https://ymail.com',
      'icon': 'img/mail-icons/yahoo-icon.png',
      'name': 'Yahoo Mail'
    }
  };

  /**
   * A card to create the user's account.
   */
  var LiteAccountView = CardView.extend({
    templateText: liteScreenerTemplate,
    className: 'lite-account-creation',
    cardName: 'lite-account-creation',

    events: {
      'click .btn-create-account': '_onSubmitClick',
      'keyup .account-contact-fields input[name="tendon:password"]': '_passwordKeyup',
      'change .account-contact-fields .form-control': '_fieldChanged'
    },

    initialize: function(options) {
      CardView.prototype.initialize.call(this, _.extend({
        assertivePasswordCheck: ABUtil.flag('assertivePasswordCheck')
      }, options));
      this.bindValidationEvents(this.model);
      Analytics.track('MPL Registration Load');

      this.model.on('change', this._onAccountChanged, this);

      /**
       * The data from the screener which is required to sign up.
       * @type {ScreenerModel}
       */
      this.screenerModel = options.screenerModel;

      /**
       * In "standalone mode" creation goes straight to FFM, and we need to
       * do a bit more work to gather security questions.
       */
      this.standaloneMode = !!options.standaloneMode;
      this.backend = options.backend;

      // A/B flags. For flag definitions, see ABDefaults.
      this.showRetypePassword = ABUtil.flag('showRetypePassword');
      this.showRevealPassword = ABUtil.flag('showRevealPassword');

      // Now, both standalone and serverful require security questions
      // TODO(LDC): remove all the code for security question on or off
      this.model.securityQuestionsRequired = true;
    },

    getRenderData: function() {
      var result = CardView.prototype.getRenderData.call(this);
      result.showRetypePassword = this.showRetypePassword;
      result.showPasswordCheckboxes = ABUtil.flag('showPasswordCheckboxes');
      result.showPrivacyErrorIcon = ABUtil.flag('showPrivacyErrorIcon');
      result.loginLink = AppContext.getLocale() === 'es' ?
          '/marketplace/global/es_MX/registration' :
          '/marketplace/global/en_US/registration';

      result.createAccountHeading = ABUtil.flag('createAccountHeading');
      result.createAccountSubHeading = ABUtil.flag('createAccountSubHeading');

      return result;
    },

    render: function() {
      CardView.prototype.render.call(this);

      this.questionsView = new SecurityQuestionsView({
        model: this.model
      });
      this.questionsView.render().$el.insertAfter(
          this.$('.account-contact-fields'));

      return this;
    },

    /** @override */
    postRenderHooks: function() {
      CardView.prototype.postRenderHooks.call(this);

      if (this.showRevealPassword) {
        // Need to asynchronously do this because the plugin does size
        // measurements to position the show/hide button and it needs to wait
        // for the layout to settle.
        var self = this;
        _.defer(function() {
          self.$('input[type=password]').hideShowPassword({
            show: false,
            innerToggle: true,
            wrapperWidth: false,
            hideToggleUntil: 'focus',
            // Override the default text anchors in the hideShowPassword
            // jQuery plugin so that it can be localized.
            states: {
              shown: {
                toggleText: self.getContent().hide
              },
              hidden: {
                toggleText: self.getContent().show
              }
            }
          });
        });
      }

      Analytics.trackLinks('.btn-login', 'MPL Registration Existing Account');
    },

    _validateMatchingPasswords: function() {
      var passwordVal = this.$('[name="tendon:password"]').val();
      var confirmPasswordVal = this.$('[name="confirmPassword"]').val();

      if (!confirmPasswordVal) {
        this.clearInvalidMarker('confirmPassword', false);
        return false;
      } else if (passwordVal === confirmPasswordVal) {
        this.clearInvalidMarker('confirmPassword');
        return true;
      } else {
        var strings = this.getContent(this.cardName);
        this.renderInvalidMarker('confirmPassword', strings.passwordsMismatch);
        return false;
      }
    },

    _passwordKeyup: function(e){
      var val = e.target.value;
      var results = this.model.validatePasswordRules(val);
      $('#req_length').toggleClass('ok', results['length']);
      $('#req_case').toggleClass('ok', results['case']);
      $('#req_number').toggleClass('ok', results['number']);

      if (ABUtil.flag('assertivePasswordCheck')) {
        var $input = $(e.target);
        if ($input.data('assertive-validation') === 'true') {
          this.preValidate('tendon:password');
        }
      }
    },

    _fieldChanged: function(e) {
      var name = e.target.name;

      if (name === 'confirmPassword' || name === 'tendon:password') {
        // Run validatation on matching passwords. The model doesn't handle it
        // because of course confirm password is a purely UI concept - there's
        // no value in the model backing it.
        this._validateMatchingPasswords();
      }
      if (name === 'confirmPassword') {
        // Since it isn't in the model, you shouldn't run preValidate on it
        return;
      }

      if (this.preValidate(name)) {
        // No validation errors (i.e. it's well formed). If it's the e-mail,
        // though, do an additional check to see if it's a typo.
        if (name === 'tendon:email' && ABUtil.flag('suggestEmailDomain')) {
          var self = this;
          var $input = $(e.target);

          Kicksend.mailcheck.run({
            email: $input.val(),
            suggested: function(suggestion) {
              // Removed by gabesmed -- does not seem necessary
              // Analytics.track('MPL Registration Email Typo Suggest', {
              //   domain: suggestion.domain
              // });
              self._suggestedEmailDomain = suggestion.domain;
              var html = self.getContent(this.cardName).suggestEmailCorrection;
              var $target = self.renderAnnotation($input.closest('.form-group'));
              $target
                  .html(html)
                  .find('.email-id-suggestion')
                    .text(suggestion.address)
                  .end()
                  .find('.email-domain-suggestion')
                    .text(suggestion.domain)
                  .end();
            },
            empty: function(suggestions) {
              self.clearInvalidMarker('tendon:email');

              // if (self._suggestedEmailDomain) {
                // Note - this doesn't mean they took our suggestion straight
                // up, but is a good approximation of something being fixed.
                // Analytics.track('MPL Registration Email Typo Fix');
              // }
            }
          });
        }
      } else {
        // If the validation is malformed, be more assertive about password checking
        if (name === 'tendon:password' && ABUtil.flag('assertivePasswordCheck')) {
          var $input = $(e.target);
          $input.data('assertive-validation', 'true');
        }
      }
    },

    _onSubmitClick: function(e) {
      if (this.$('.btn-create-account').hasClass('disabled')) {
        return;
      }

      var valid = this.saveToModel();
      if (this.questionsView) {
        valid = this.questionsView.saveToModel() && valid;
      }

      if (this.showRetypePassword && !this._validateMatchingPasswords()) {
        valid = false;
      }

      // If invalid, flash all error icons and scroll to the first invalid
      // field so that the user notices the problem.
      // TODO(brandon): do we want scrolling behavior for all cards?
      if (!valid) {
        $('.icon-error').hide().fadeIn(400);
        if (ABUtil.flag('scrollToFirstValidationError')) {
          var $firstError = this.$('.has-error');
          if ($firstError.length) {
            $('html, body').animate({
              scrollTop: $firstError.offset().top - 100
            }, 400);
            $firstError.find('input').first().focus();
          }
        }

        Analytics.track('MPL Registration Invalid', {
          invalidFields: this.$('.has-error input').map(
            function() { return $(this).attr('name');})
        });

        if (ABUtil.flag('validationErrorSummary')) {
          this.$('.account-validation-error-message').removeClass('hidden');
          var errors = $('.has-error .error-message').map(
            function(x, y) {return $(y).text();});
          errors = _.uniq(errors);
          errors = _.map(errors, function(e) {return $('<li />').text(e);});
          $('.invalid-fields').html('');
          $('.invalid-fields').append(errors);
        }

        return;
      }

      Analytics.track('MPL Registration Submit', {});

      this.disableForm();
      this.$('.create-account').addClass('hidden');
      this.$('.creating-account').removeClass('hidden');
      this.$('.account-validation-error-message').addClass('hidden');
      this.$('.account-generic-error-message').addClass('hidden');
      this.$('.account-exists-error-message').addClass('hidden');
      this.$('.account-server-error-message').addClass('hidden');
      this.$('.account-creation-error-icon').addClass('hidden');

      // Submit both the screener data and the account info in a registration
      // attempt to see if we can create a Marketplace Lite account.
      // TODO(brandon): refactor to use Backbone.save
      var self = this;
      var reqStart = new Date();
      this.backend.createAccount({
        screener: this.screenerModel,
        account: this.model,
        locale: AppContext.getLocale(),
        success: function(accountAttrs) {
          // Poor man's sync - just update the local values after the POST.
          // On a successful registration, this will trigger the right flows
          // depending on the model results.
          self.model.set(accountAttrs);
          self.$('.create-account').removeClass('hidden');
          self.$('.creating-account').addClass('hidden');
          self.onSuccess();
          Analytics.track('MPL Registration Success', {});
        },
        error: function(err) {
          self.enableForm();
          self.$('.account-creation-error-icon').removeClass('hidden').fadeIn(400);
          self.$('.create-account').removeClass('hidden');
          self.$('.creating-account').addClass('hidden');

          Analytics.track('MPL Registration Error', {
            state: self.screenerModel.get('coverageState'),
            emailDomain: (self.model.get('email') || '').split('@')[1] || '',
            reqLength: (new Date() - reqStart)
          });

          // In standalone mode, we only get a generic error message from FFM.
          if (self.standaloneMode) {
            self.$('.account-generic-error-message').removeClass('hidden');
          } else {
            if (err.status === 400) {
              self.$('.account-exists-error-message').removeClass('hidden');
            } else {
              self.$('.account-server-error-message').removeClass('hidden');
            }
          }
        }
      });
    },

    _onAccountChanged: function() {
      // WARNING: tricky! Since BaseModel.parse creates a new account object
      // every time we read from the middleware, we need to reset this.model
      // every time account changes. This is a side effect of using submodels.
      var status = this.model.get('status');
      this.$('#creating-account-message').addClass('hidden');

      // TODO(brandon): once EIDM starts reporting finer-grained user errors
      // (expected 1/17), show specific errors to the user.
      switch(status) {
        case Account.STATUS.CREATED:
          this.$('#account-creation-message').removeClass('hidden');
          break;
        case Account.STATUS.QUEUED:
          this.$('#account-queued-message').removeClass('hidden');
          break;
        case Account.STATUS.ERROR:
          this.$('#account-error-message').removeClass('hidden');
          this.$('.btn-create-account').prop('disabled', false);
          break;
      }
    },

    disableForm: function() {
      this.$('.click-cover').removeClass('hidden');
      this.$('.account-form').css({opacity: 0.5});
    },

    enableForm: function() {
      this.$('.click-cover').addClass('hidden');
      this.$('.account-form').css({opacity: 1.0});
    },

    onSuccess: function() {
      var $success = this.$('.success-container');
      var strings = this.getContent(this.cardName);

      var email = this.model.get('email');
      var line1 = strings.successInstructions;
      var line2 = strings.successInstructions2;
      $success
          .find('.instructions.line1').text(line1).end()
          .find('.instructions.line2')
            .html(line2)
            .find('.email-text')
              .text(email)
            .end()
          .end();

      if (email && email.split('@').length > 0) {
        var domain = email.split('@')[1];
        var domainInfo = TOP_DOMAINS[domain];
        if (domainInfo) {
          var checkEmailText = strings.checkEmailText.replace(
              '{0}', domainInfo.name);
          $success
              .find('.email-link')
                .find('.email-icon')
                  .attr('src', Constants.STATIC_ROOT + domainInfo.icon)
                  .removeClass('hidden')
                .end()
                .append(checkEmailText)
                .attr('href', domainInfo.url)
                .removeClass('hidden')
              .end();
        }
      }

      $success.addClass('visible');

      // Scroll so that the success message is visible by just making sure
      // the bottom of the page just goes below the success message.
      // Unfortunately, scrolling behavior is done in terms of scrollTop,
      // so we have to do a bit of math.
      var currentTop = $(window).scrollTop();
      var bottom = $success.offset().top + $success.height() + 50;
      var targetTop = bottom - $(window).height();
      if (targetTop > currentTop) {
        $('html, body').animate({scrollTop: targetTop}, 400);
      }

      if (window.optimizely) {
        // Track a custom event in Optimizely to distinguish users who created
        // an account via MPL
        window.optimizely.push(['trackEvent', 'mplAccountCreation']);

        // Manually activate Optimizely experiments for each user that goes
        // through MPL.
        var experimentIds = ABUtil.flag('manualExperimentIds');
        for (var i = 0; i < experimentIds.length; i++) {
          window.optimizely.push(['activate', experimentIds[i]]);
        }
      }
    }
  });

return LiteAccountView;

});
