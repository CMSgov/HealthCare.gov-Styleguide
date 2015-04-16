var gov = gov || {};
gov.hc = gov.hc || {};
gov.hc.content = gov.hc.content || {};

gov.hc.content.faq = {
    answerClass: 'answer',
    collapsedClass: 'collapsed',
    questionClass: 'question',
    questionListClass: 'faq-question',
    definitionSelector: 'dd',
    termSelector: 'dt',

    init: function (context, options) {
        if (!context) {
            context = $(document);
        } else {
            context = $(context);
        }

        // iterate over question lists and process them
        var questionLists = context.find('.faq > dl');

        for (var i = 0; i < questionLists.length; i++) {
            var questionList = $(questionLists.get(i));
            var setupOptions = $.extend({
                idPrefix: 'faq-'
            }, options);

            setupOptions.idPrefix += (i + 1) + '-';

            questionList.addClass(gov.hc.content.faq.questionListClass);
            gov.hc.content.faq.setup(questionList, setupOptions);

            $(questionList).appendTo(".preview");
        }
    },

    setup: function (definitionList, options) {
        var current, numQuestions;

        if (!definitionList) {
            return;
        }

        definitionList = $(definitionList);
        options = $.extend({
            hash: null,
            idPrefix: 'faq-',
            questionIdPrefix: 'q-',
            answerIdPrefix: 'a-',
        }, options);
        current = definitionList.children(gov.hc.content.faq.termSelector)
            .filter(':first');
        numQuestions = 0;

        while (current.length > 0) {
            if (gov.hc.content.faq.isTerm(current)) {
                // is a term
                var terms,
                    definitions,
                    question;

                numQuestions += 1;

                // get terms and definitions that belong together
                terms = gov.hc.content.faq.getTermGroup(current);
                definitions = gov.hc.content.faq.getDefinitionGroup(terms[terms.length - 1]);

                // create question object
                question = new gov.hc.content.faq.Question(terms, definitions);
                
                // set unique IDs
                question.setQuestionIds(options.idPrefix + options.questionIdPrefix + numQuestions);
                question.setAnswerIds(options.idPrefix + options.answerIdPrefix + numQuestions);

                // format the list
                gov.hc.content.faq.formatQuestions(question);
                gov.hc.content.faq.formatAnswers(question);

                // set the onclick action
                question.questions.find('a.title').click(_.bind(question.toggle, question));

                // show if hash matches, otherwise hide
                if (question.matchesId(options.hash)) {
                    question.show();
                    question.focus();
                } else {
                    question.hide();
                }

                // iterate to the next term
                current = $(definitions[definitions.length - 1]).next();
            }
            // if not a term, ignore (should not happen)
        }
    },

    generateToggleIcon: function () {
        return $('<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>');
    },

    getTermGroup: function (startingWith) {
        if (!startingWith) {
            return;
        }

        startingWith = $(startingWith);

        if (gov.hc.content.faq.isTerm(startingWith.next())) {
            return startingWith.nextUntil(gov.hc.content.faq.definitionSelector)
                .addBack().toArray();
        }

        return startingWith.toArray();
    },

    getDefinitionGroup: function (afterThis) {
        if (!afterThis) {
            return;
        }

        return $(afterThis).nextUntil(gov.hc.content.faq.termSelector)
            .toArray();
    },

    handleKeypress: function (element, event) {
        var key = event.which || event.keyCode;

        if (!/(32|13)/.test(key)) return;
        
        if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) return;

        if (key == 32||key == 13) element.click();

        event.preventDefault();
        event.stopPropagation();
    },

    formatQuestions: function (question) {
        var anchorWrapper = $('<a class="title" tabindex="0"></a>')
          .click(function (event) { event.preventDefault(); });
        var questions = question.questions;
        var answerIds = '';

        questions.addClass(gov.hc.content.faq.questionClass);

        for (var i = 0; i < question.answers.length; i++) {
            var id = $(question.answers[i]).attr('id');
            if (id) {
                if (answerIds.length > 0) {
                    answerIds += ' ';
                }

                answerIds += id;
            }
        }

        anchorWrapper.attr('aria-controls', answerIds);
        questions.wrapInner(anchorWrapper);
        questions.children().prepend(gov.hc.content.faq.generateToggleIcon());
    },

    formatAnswers: function (question) {
        var answers = question.answers;

        answers.addClass(gov.hc.content.faq.answerClass);
        answers.attr('role', 'definition');
    },

    isTerm: function (node) {
        return node && $(node).is(gov.hc.content.faq.termSelector);
    },

    isDefinition: function (node) {
        return node && $(node).is(gov.hc.content.faq.definitionSelector);
    }
};

gov.hc.content.faq.Question = function (questions, answers) {
    this.questions = $(questions);
    this.answers = $(answers);

    this.collapse = function () {
        // update questions 
        this.questions.addClass(gov.hc.content.faq.collapsedClass);
        this.questions.find('a.title').attr('aria-expanded', false);
        // hide answers
        this.answers.slideUp('fast');
    };

    this.expand = function () {
        // update questions
        this.questions.removeClass(gov.hc.content.faq.collapsedClass);
        this.questions.find('a.title').attr('aria-expanded', true);
        // show answers
        this.answers.slideDown('fast');
    };

    this.hide = function () {
        // update questions 
        this.questions.addClass(gov.hc.content.faq.collapsedClass);
        this.questions.find('a.title').attr('aria-expanded', false);
        // hide answers
        this.answers.hide();
    };

    this.show = function () {
        // update questions
        this.questions.removeClass(gov.hc.content.faq.collapsedClass);
        this.questions.find('a.title').attr('aria-expanded', true);
        // show answers
        this.answers.show('fast');
    };

    this.focus = function () {
        var anchor = this.questions.find('a.title');
        if (anchor.length > 0) {
            anchor.get(0).focus();
        } else {
            this.questions.filter(':first').get(0).focus();
        }
    };

    this.getIds = function () {
        var idElements = this.questions.find('*[id]').addBack();
        var ids = [];

        for (var i = 0; i < idElements.length; i++) {
            var id = $(idElements.get(i)).attr('id');
            if (id) {
                ids.push(id);
            }
        }

        return ids;
    };

    this.isCollapsed = function () {
        return this.questions.hasClass(gov.hc.content.faq.collapsedClass);
    };

    this.matchesId = function (toMatch) {
        if (!toMatch) {
            return false;
        }

        return this.getIds().indexOf(toMatch) >= 0;
    };

    this.setQuestionIds = function (prefix) {
        if (!prefix) {
            return;
        } else {
            prefix += '-';
        }

        for (var i = 0; i < this.questions.length; i++) {
            var element = $(this.questions.get(i));
            element.attr('id', prefix + (i + 1));
        }
    };

    this.setAnswerIds = function (prefix) {
        if (!prefix) {
            return;
        } else {
            prefix += '-';
        }

        for (var i = 0; i < this.answers.length; i++) {
            var element = $(this.answers.get(i));
            element.attr('id', prefix + (i + 1));
        }
    };

    this.toggle = function () {
        if (this.isCollapsed()) {
            this.expand();
        } else {
            this.collapse();
        }
    };
};


$(document).ready(function () {
  // initialize the FAQ lists
  gov.hc.content.faq.init($(document), {
      hash: window.location.hash.slice(1)
  });

  // handle keypresses on questions
  $(document).on('keydown.collapse','.question a.title', function(e) {
      gov.hc.content.faq.handleKeypress($(this), e);
  });
});