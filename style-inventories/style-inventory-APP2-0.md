#App 2.0 Style Inventory

## Headings

We've consolidated the various header styles around the application and site to these classes. Headers introduce pages and chunks of content. We're extending our use of Bitter from just h1's all the way to h3's and legend tags.

#### Default headings
h1s introduce pages or large sections, h2s and h3s introduce smaller sections or fieldsets. h4s are typically only used to introduce a set of links, or other secondary content.

    <h1>h1 Header 36px</h1>

    <h2>h2 Header 24px</h2>

    <h3>h3 Header 21px</h3>

    <h4>h4 Header 16px</h4>

#### Headings with subtitles
When we're introducing sections we often want a subtitle with the header, so we decrease the margin for these.

    <h1 class="sub">h1 Header</h1>
    <p class="instructions">Subtitle</p>

    <h2 class="sub">h2 Header</h2>
    <p class="instructions">Subtitle</p>

    <h3 class="sub">h3 Header</h3>
    <p class="instructions">Subtitle</p>

    <h4 class="sub">h4 Header</h4>
    <p class="instructions">Subtitle</p>

#### Headings with subtitles
When we want a header to encapsulate a list of links or a series of form fields, we often add a border-bottom.

    <h1 class="rule">h1 Header</h1>
    <h2 class="rule">h2 Header</h2>
    <h3 class="rule">h3 Header</h3>
    <h4 class="rule">h4 Header</h4>

## Common UI Components
Interface components across the site should be clear, consistent, and beautiful.
Here are some common components used to be used in both the Marketplace Lite application and the Learn side of Healthcare.gov.

#### Buttons
These buttons are used as UI throughout the site. Topic links, save/edit, add income, add deductions, etc.

    <button class="btn btn-green btn-sm">Small green</button>
    <button class="btn btn-sm">Small default</button>

    <button class="btn btn-green">Standard green</button>
    <button class="btn">Standard default</button>

    <button class="btn btn-md btn-green">Medium green</button>
    <button class="btn btn-md">Medium default</button>

#### Buttons for radio selects
These buttons are used throughout the site for multiple choice questions.

    <div class="btn-group btn-group-vertical filter-question">
      <label class="btn radio-label active">Active radio select</label>
      <label class="btn radio-label">Default radio select</label>
    </div>

#### Toggle buttons
These buttons are used throughout the site for yes / no, true / false type questions.

    <div class="toggle-buttons">
      <a href="" class="btn radio-label active">True</a>
      <a href="" class="btn radio-label">False</a>
    </div>

#### Main call to action button
This button is used as the main call to action on any page. Generally in the application this is used for "Continue" and on the Learn side for "Apply for Coverage". In the application we center the button on the page to use the button emphasize a threshold, rather than just additional ui.

    <button class="btn btn-lg btn-success">Main Call to Action</button>

#### Questions and answers
Instead of "More Answers" sections with questions hidden behind a dropdown, we'll list out the questions and allow people to click on them to expand the answers. This way the questions are easier to scan, and don't get cut off on mobile.

    <ul class="faq">
      <li class="faq-question">
        <div class="question serif collapsed" data-toggle="collapse" data-target="#answer-1"><span class="glyphicon glyphicon-chevron-right"></span>Question text?</div>
        <div class="answer collapse" id="answer-1">Answer text</div>
      </li>
    </ul>

#### Popovers
We use popovers to define terms or program names that people might not be familiar with. Here's an example of what minimum requirements are. We are also specifying that all popovers are oriented with data-placement="bottom" to avoid covering up sentences above the term and to avoid the popover falling off of the page.

    <a href="javascript:;" class="glossary-term" aria-describedby="glossary-data-tooltip" data-placement="bottom" data-toggle="popover" data-trigger="hover" data-title="Popover title" data-content="Popover content">Example popover</a>.

    <script type="text/javascript">
      $(".glossary-term").popover();
    </script>

#### Link lists
Link lists are used often across the site, and provide links to important actions like appealing a marketplace decision as well as links to pages related to the current page.

    <h4 class="rule">Take Action</h4>
    <ul class="link-list">
      <li><a href="#" title="Link title">Link title</a></li>
      <li><a href="#" title="Link title">Link title</a></li>
    </ul>

#### Button lists
Button lists are used currently only on the Learn side, and provide links to topics that the article is a member of. Wrap inside a .container and .top-content to position it above the page title (as on this page).

    <ul class="button-list">
      <li class="description">Topics</li>
      <li><a href="" class="btn btn-sm">Learn</a></li>
      <li><a href="" class="btn btn-sm">Forms</a></li>
    </ul>

#### Inset content
Inset content provides helper information or additional context.

    <blockquote>
      <p>Inset content provides helper information or additional context.</p>
    </blockquote>

#### Header alerts
We place alerts at the top of the page right below the header to communicate current issues with the site, new information, or special calls to action.

    <div class="container">
      <div class="top-content centered row">
        <div class="alert blue-bg col-md-8 col-md-offset-2">
          <p>Alert text.</p>
        </div>
      </div>
    </div>

#### Back to top
On long pages (such as search results), a back to top call to action helps people who don't use a keyboard to scroll up without much effort. We locate this button on the bottom right near the scrollbar for easier discoverability. There's an example on the right side of this page with real HTML.

    <div class="bottom-right fadeable hidden-xs" id="back-to-top">
      <a href="#" class="btn btn-sm">
        <span class="glyphicon glyphicon-chevron-up"></span> Back to top
      </a>
    </div>

    <script type="text/javascript">
      // example affix code to pin the back-to-top button
      $(function() {
        $("#back-to-top").affix({
          offset: {
            top: $(window).height()
          }
        });
      });
    </script>

## Form components

#### Fieldset

    <fieldset>
      <legend>Fieldset</legend>
    </fieldset>

#### Fieldset with instructions

    <fieldset>
      <legend class="has-subtitle">Fieldset with instructions</legend>
      <p class="instructions">Instructions</p>
    </fieldset>

#### Question heading and text entry

    <div class="question">
      <div class="question-label">Is this a question?</div>
      <input class="form-control" type="text" value="Yes!">
    </div>

#### Dropdown

    <div class="form-select ">
      <select class="form-control" name="dropdown-name" aria-label="Dropdown Label" data-type="">
        <option value="option-value-1">Option 1</option>
        <option value="option-value-2">Option 2</option>
        <option value="option-value-3">Option 3</option>
      </select>
      <span class="caret"></span>
    </div>

#### Dropdown with default text

    <div class="form-select ">
      <select class="form-control" name="dropdown-name" aria-label="Dropdown Label" data-type="">
        <option value="" selected="selected">Select Option</option>
        <option value="option-value-1">Option 1</option>
        <option value="option-value-2">Option 2</option>
        <option value="option-value-3">Option 3</option>
      </select>
      <span class="caret"></span>
    </div>

#### Toggle buttons

    <div class="toggle-buttons form-group" data-toggle="buttons">
      <a href="javascript:;" class="btn btn-primary radio-label ">
        <input type="radio" name="toggle-buttons-1" value="a" aria-label="Argon">
        Argon
      </a>
      <a href="javascript:;" class="btn btn-primary radio-label ">
        <input type="radio" name="toggle-buttons-1" value="b" aria-label="Boron">
        Boron
      </a>
      <a href="javascript:;" class="btn btn-primary radio-label ">
        <input type="radio" name="toggle-buttons-1" value="c" aria-label="Carbon">
        Carbon
      </a>
    </div>

#### Toggle buttons with default selection

    <div class="toggle-buttons form-group" data-toggle="buttons">
      <a href="javascript:;" class="btn btn-primary radio-label ">
        <input type="radio" name="toggle-buttons-2" value="a" aria-label="Argon">
        Argon
      </a>
      <a href="javascript:;" class="btn btn-primary radio-label active">
        <input type="radio" name="toggle-buttons-2" value="b" checked="checked" aria-label="Boron">
        Boron
      </a>
      <a href="javascript:;" class="btn btn-primary radio-label ">
        <input type="radio" name="toggle-buttons-2" value="c" aria-label="Carbon">
        Carbon
      </a>
    </div>

#### Toggle buttons as checkboxes

    <div class="toggle-buttons form-group" data-toggle="buttons">
      <a href="javascript:;" class="btn btn-primary radio-label ">
        <input type="checkbox" name="toggle-buttons-3" value="a" aria-label="Argon">
        Argon
      </a>
      <a href="javascript:;" class="btn btn-primary radio-label active">
        <input type="checkbox" name="toggle-buttons-3" value="b" aria-label="Boron" checked="checked">
        Boron
      </a>
      <a href="javascript:;" class="btn btn-primary radio-label active">
        <input type="checkbox" name="toggle-buttons-3" value="c" aria-label="Carbon" checked="checked">
        Carbon
      </a>
    </div>

#### Filter question

    <div class="filter-question form-group">
      <div class="visible-radio-label sm hidden-md hidden-lg">Filter question</div>
      <div class="toggle-buttons " data-toggle="buttons">
        <a href="javascript:;" class="btn btn-primary radio-label ">
          <input type="radio" name="filter-question-name" value="true" aria-label="yes">
          yes
        </a>
        <a href="javascript:;" class="btn btn-primary radio-label ">
          <input type="radio" name="filter-question-name" value="false" aria-label="no">
          no
        </a>
      </div>
      <span class="visible-radio-label col-md-10 hidden-sm hidden-xs">Filter question</span>
      <div class="spacer spacer-bottom25 hidden-md hidden-lg"></div>
    </div>

#### Filter question with values pre-selected

    <div class="filter-question form-group">
      <div class="visible-radio-label sm hidden-md hidden-lg">Filter question with value pre-selected</div>
      <div class="toggle-buttons " data-toggle="buttons">
        <a href="javascript:;" class="btn btn-primary radio-label active">
          <input type="radio" name="filter-question-name" value="true" aria-label="yes" checked="checked">
          yes
        </a>
        <a href="javascript:;" class="btn btn-primary radio-label ">
          <input type="radio" name="filter-question-name" value="false" aria-label="no">
          no
        </a>
      </div>
      <span class="visible-radio-label col-md-10 hidden-sm hidden-xs">Filter question with value pre-selected</span>
      <div class="spacer spacer-bottom25 hidden-md hidden-lg"></div>
    </div>

#### Table forms

    <div id="table-form-container"></div>

    var View = CardView.extend({

      ...

      initialize: function() {

        _.bindAll(this,
          'renderTableFormHeaders',
          'renderTableFormItem',
          'renderTableFormItemFields');

        this.tableFormView = new TableFormView({
          id: 'table-form',
          model: this.model,
          collection: new Backbone.Collection(),
          addItemText: 'Add item',
          renderHeaders: this.renderTableFormHeaders,
          renderItem: this.renderTableFormItem,
          renderItemFields: this.renderTableFormItemFields
        });
      },

      render: function() {
        CardView.prototype.render.apply(this, arguments);

        this.$('#table-form-container')
          .append(this.tableFormView.render().el);

        return this;
      },

      renderTableFormHeaders: function() {
        return '<div class="th col-sm-9 col-xs-12">Item headers</div>';
      },

      renderTableFormItem: function(item, i) {
        return '<div class="col-sm-9 col-xs-12">Item ' + i + '</div>';
      },

      renderTableFormItemFields: function(item, i) {
        return '<div class="form-group col-sm-12 col-xs-12"><input class="form-control" type="text" value="Item fields ' + i + '"></div>';
      }

      ...

    });

## Blue background forms

#### Heading with subtitle

    <div class="blue-bg">
      <div class="lite-card-inner">
        <h2 id="blue-bg">Blue Background</h2>
        <div class="subtitle">Blue background subtitle.</div>
      </div>
    </div>

#### Filter questions

    <div class="question-section">
      <div class="filter-question form-group">
        <div class="visible-radio-label sm hidden-md hidden-lg">When we have many screener statements, stack them as filter questions.</div>
        <div class="toggle-buttons " data-toggle="buttons">
          <a href="javascript:;" class="btn btn-primary radio-label active">
            <input type="radio" name="filter-question-name" value="true" aria-label="yes" checked="checked">
            yes
          </a>
          <a href="javascript:;" class="btn btn-primary radio-label ">
            <input type="radio" name="filter-question-name" value="false" aria-label="no">
            no
          </a>
        </div>
        <span class="visible-radio-label col-md-10 hidden-sm hidden-xs">When we have many screener statements, stack them as filter questions.</span>
        <div class="spacer spacer-bottom25 hidden-md hidden-lg"></div>
      </div>
    </div>

#### Multiple choice questions

    <div class="question">
      <div class="question-label">When we have a multiple choice question here, display the choices vertically.</div>
      <div class="btn-group btn-group-vertical" data-toggle="buttons">
        <label class="btn radio-label">
          <input type="radio" name="multipleChoice" value="one" aria-label="Multiple Choice">
          First Option
        </label>
        <label class="btn radio-label">
          <input type="radio" name="multipleChoice" value="two" aria-label="Multiple Choice">
          Second Option
        </label>
        <label class="btn radio-label active">
          <input type="radio" name="multipleChoice" value="three" aria-label="Multiple Choice" checked>
          Third Option
        </label>
      </div>
    </div>

#### Screener questions

    <div class="question">
      <div class="question-label">A blue background screener select question.</div>
      <div class="row">
        <div class="col-sm-3">
          <div class="form-select ">
            <select class="form-control" name="dropdown-name" aria-label="Dropdown Label" data-type="">
              <option value="option-value-1">Option 1</option>
              <option value="option-value-2">Option 2</option>
              <option value="option-value-3">Option 3</option>
            </select>
            <span class="caret"></span>
          </div>
        </div>
      </div>
    </div>
