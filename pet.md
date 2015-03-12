# PET Pattern Audit
Last update: 2/10/2015

## Headings
- h1 page (title version)
  <h1 class="title">Page title</h1>

- h2 page (title version)
  <h2 class="title">Section title</h2>

- h3 page (title version)
  <h3 class="title">Section title</h3>

- h4 page (title version)
  <h4 class="title">Element title</h4>

- h5 page (title version)
  <h5 class="title">Element title</h5>

- h6 page (title version)
  <h6 class="title">Element title</h6>

- h2 standard title
  <h2>Standard title</h2>

- h3 page
  <h3>Standard title</h3>

- h4 page
  <h4>Standard title</h4>

- h5 page
  <h5>Standard title</h5>

- h6 page
  <h6>Standard title</h6>


## Form Elements - Text inputs (standard size)
- Text input (standard size)
  <input type ="text" placeholder="placeholder text">

- Email input (standard size)
  <input type ="email" placeholder="placeholder text">

- Password input (standard size)
  <input type ="password" placeholder="placeholder text">

- Tel input (standard size)
  <input type ="tel" placeholder="placeholder text">

- Textarea input (standard size)
  <input type ="textarea" placeholder="placeholder text">

## Text input (large size)

- Text input (large size)
  <div class="row feature">
    <input type ="text" placeholder="placeholder text">
  </div>

- Tel input (large size)
  <div class="row feature">
    <input type ="tel" placeholder="placeholder text">
  </div>

## Error messages
- Error message
  <p class="help-block help-error" role="alert">Please enter a valid <abbr>ZIP</abbr> Code.</p>

- Error icon
  <div class="glyphicon icon-error" aria-hidden="true" aria-label="error">
    <span class="glyphicon-remove" aria-label="Remove"></span>
  </div>

## Buttons

- Button (Standard HC.gov Success, large normal width)
  <button class="btn col-xs-12 btn-lg btn-success btn-add-person" title="Button Title" role="button">
    Standard Success button
  </button>

- Button (Standard HC.gov Success, large full width)
  <button class="btn col-xs-12 btn-lg btn-full btn-success btn-add-person" title="Button Title" role="button">
    Standard Success button
  </button>

- Button (Standard HC.gov Success, normal width)
  <button class="btn col-xs-12 btn-success btn-add-person" title="Button Title" role="button">
    Standard Success button
  </button>

- Button (Standard HC.gov Success, full width)
  <button class="btn col-xs-12 btn-full btn-success btn-add-person" title="Button Title" role="button">
    Standard Success button
  </button>

- Button (Standard HC.gov Secondary Button, normal width)
  <button class="btn col-xs-12 btn-lg btn-secondary" title="Button Title" role="button">
    Standard Secondary Button
  </button>

- Button (Standard HC.gov Secondary Button, full width)
  <button class="btn btn-full col-xs-12 btn-lg btn-secondary" title="Button Title" role="button">
    Standard Secondary Button
  </button>

- Standard HC.gov mini buttons, pulled right (with screen reader text sample)
  <button class="btn btn-xs btn-edit pull-right" role="button">
    <span>Edit
      <span class="sr-only">your income</span>
    </span>
  </button>

- Minimal button
  <a class="btn btn-minimal btn-full" href="#">Back to results</a>

## Step summary
<ol class="summary">
  <li class="row">
    <div class="col-sm-1 hidden-xs glyphicon glyphicon-ok" aria-label="step complete"></div>
    <div class="col-xs-10 col-sm-9" id="zip-code" aria-live="assertive" aria-relevant="additions removals">
      <h3><abbr>ZIP</abbr> Code </h3><span>60647</span> <span>(Cook County, IL)</span>
    </div>
    <div class="col-xs-2">
      <a href="#" class="btn btn-xs btn-edit pull-right" role="button">
        <span>Edit <span class="sr-only">your <abbr>ZIP</abbr> Code</span></span>
      </a>
    </div>
  </li>
</ol>

## Step Summary Table
<table class="table" summary="your entered household members" aria-live="assertive" aria-relevant="additions removals" id="househould-entered">
  <caption>Your currently entered household</caption>
  <tbody>
    <tr>
      <td>Age <span>22</span></td>
      <td><span>Tobacco user</span></td>
      <td><span>Parent</span></td>
      <td><span>Pregnant</span></td>
      <td><span>Has Coverage</span></td>
    </tr>
  </tbody>
</table>


## Step summary status icons
- inline checkboxes, current entry box (Checkmark - Step complete)
  <div class="hidden-xs glyphicon glyphicon-ok" aria-label="step complete"></div>

- inline checkboxes, current entry box (X icon - Step incomplete)
  <div class="col-sm-1 hidden-xs glyphicon glyphicon-remove" aria-label="step incomplete"></div>

## Fixed sidebar widget
<div class="see-plans small">
  <p><strong><a class="tip" aria-hidden="true" href="#" data-toggle="tooltip" data-placement="left" title="If you go to plan results without answering these questions the cost estimates for the plans you’ll see won’t include the cost savings you might qualify for like a premium tax credit. Also the plan results won’t be specific to you and your household. You’ll see plans for a single person age 35 and a non-parent."><span class="glyphicon glyphicon-info-sign" aria-label="information"></span> <span>50</span>% of questions answered</a></strong></p>
  <p>Select <em>See plans now</em> to view plans in your area. Continue answering questions to get premium estimates based on your income and household.</p>
  <a role="button" aria-flowto="modal-skip" href="#" class="btn btn-sm btn-block plans">See plans now</a>
</div>

## Modal
- Modal heading
  <h5 class="title" id="dialog-title-ID">Are you sure you want to skip this step?</h5>

- Modal close button
  <a class="close-modal btn" href="#"><span class="glyphicon glyphicon-remove" aria-label="Close"></span> Close</a>


## Current Entry box

  <div id="step-builder" class="current-entry row">
    <div class="col-sm-10 col-sm-offset-1">
      <h3>Household Members</h3>
      <p>Content goes here.</p>
    </div>
  </div>

## Checkboxes

- inline, used in current entry box, with tooltip
  <label class="label-inline">
    <input type="checkbox" value="1">
    Tobacco user <span class="sr-only">Suplemental description for screen readers</span>&nbsp;
      <a class="tip" href="#" title="Tell us if this person is a tobacco user by selecting this checkbox. Health insurance companies may be allowed to charge a higher premium for tobacco users.">
        <span class="glyphicon glyphicon-info-sign" aria-label="information"></span>
      </a>
  </label>

## Links
- Info icon + link
- Plain link

## Application progress meter

- Application progress meter (75% complete in example)
  <div class="progress fixedsticky hidden-xs hidden-sm fixedsticky-off" aria-hidden="true">
    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"   style="width: 75%;"></div>
  </div>

### Dependencies:
- fixedsticky plugin (link)

## Alert Bar Message
  <div class="alert" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close this alert message"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
    <p>
      <strong>Important:</strong>
      The premiums below are only estimates. You’ll need to fill out a Marketplace application to get actual plan prices. Some plans and details you see here may change.
    </p>
  </div>


## Filter toggle
<div class="sort-label">Viewing:</div>
  <span class="toggle" id="plan-toggle" aria-flowto="plan-results">
    <span class="current">Health Plans</span><span class="unselected"><a href="#">Dental Plans</a></span>
  </span>
</div>

## Filter bar

<div class="filters" role="toolbar" aria-activedescendant="plan-toggle" aria-controls="plan-results">
  <div class="row">
    <div class="col-xs-4 col-sm-4">
      <div class="sort-label">Viewing:</div>
        <span class="toggle" id="plan-toggle" aria-flowto="plan-results">
          <span class="current">Health Plans</span><span class="unselected"><a href="#">Dental Plans</a></span>
        </span>
      </div>

      <div class="col-xs-4 col-sm-5">
        <div class="sort-label">Sort:</div>
          <span class="toggle">
            <span class="current">by monthly premium</span>
            <span class="unselected"><a href="#">by deductible</a></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>


## Sidebar Controls
<div class="col-xs-12 col-md-3 sidebar" aria-controls="plan-results">
  <div class="panel panel-default">
    <h5>Premium</h5>
    <div id="premium" class="panel-collapse in collapse">
      <div class="panel-body">
        <div class="select-filter">
          <div class="filter-item">
            <a class="apply" href="#" title="16 less than $200 plans available if you add this filter">less than $200&nbsp;<span class="count">(16)</span><span class="sr-only"> less than $200 plans available if you add this filter</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

## Number widget

- Grey
<h3 class="title plans" aria-live="assertive" aria-relevant="additions removals">
  <em>71</em> Health Plans
</h3>

- Blue compare widget
<div class="widget" aria-hidden="true">
  <span class="compare-count">2</span>
  <a class="compare-link" href="#">
    <span>Plans</span> to compare
  </a>
</div>


## Information card
- Sample card
  <ol class="results">
    <li>
      <div class="row">
        <div class="col-xs-7 col-sm-9">
          <h2 id="plan-name-id-number" class="plan-name"><a href="#">Blue Cross and Blue Shield of Illinois · Blue Choice Bronze PPO 005</a></h2>
        </div>
        <div class="col-xs-5 col-sm-3">
          <div class="compare-this">
            <label class="compare-checkbox small" aria-flowto="compare-plans">
              <input type="checkbox" name="compare">
              Compare
            </label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <ul class="list-unstyled small">
            <li><b><span class="metal">Bronze</span> PPO</b></li>
            <li>National Provider Network</li>
            <li>Plan ID: 36096IL0790005</li>
          </ul>

          <div class="row equal">
            <div class="col-sm-4 summary first">
              <h3>Estimated <span>monthly premium</span></h3>
              <p class="amount dollars">$119</p>
              <ul class="small text-muted list-unstyled">
                <li>Number of people covered: 1</li>
              </ul>
            </div>

            <div class="col-sm-4 summary">
              <h3>Estimated <span>deductible</span></h3>
                <p class="amount">
                  <span class="dollars">$5,000</span>
                  <small>Estimated individual total</small>
                </p>
            </div>

            <div class="col-sm-4 summary">
              <h3>Estimated <span>out-of-pocket maximum</span></h3>
                <p class="amount">
                  <span class="dollars">$6,250</span>
                  <small>Estimated individual total</small>
                </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-8">
            <h4>Copayments / Coinsurance</h4>
            <ul class="list-unstyled small">
              <li>Primary doctor: <b>20% Coinsurance after deductible</b></li>
              <li>Specialist doctor: <b>20% Coinsurance after deductible</b></li>
              <li>Emergency room care: <b>20% Coinsurance after deductible</b></li>
              <li>Generic drugs: <b>10% Coinsurance after deductible</b></li>
            </ul>
        </div>

        <div class="col-sm-4">
          <ul class="list-unstyled small plan-files">
            <li><a class="docs" href="#" aria-describedby="plan-name-id-number"><span class="glyphicon glyphicon-file" aria-label="document"></span> Summary of Benefits</a></li>
            <li><a class="docs" href="#" aria-describedby="plan-name-id-number"><span class="glyphicon glyphicon-file" aria-label="document"></span> Plan brochure</a></li>
            <li><a class="docs" href="#"  aria-describedby="plan-name-id-number"><span class="glyphicon glyphicon-file" aria-label="document"></span> Provider directory</a></li>
            <li><a class="docs" href="#" aria-describedby="plan-name-id-number"><span class="glyphicon glyphicon-file" aria-label="document"></span> List of covered drugs</a></li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="actions">
          <div class="col-sm-12">
            <a class="btn btn-lg btn-block btn-alternate learn-more" href="#" aria-describedby="plan-name-id-number" >Learn More about this plan</a>
          </div>
        </div>
      </div>
    </li>
  </ol>

- Information Card Definition List
  <div class="section">
    <dl class="list">
    <dt>Costs for Medical Care</dt>

    <dd>
      <strong>Primary Care Visit to Treat an Injury or Illness</strong>
      <span class="label">20% Coinsurance after deductible</span>
    </dd>

    <dd>
      <strong>Specialist Visit</strong>
      <span class="label">20% Coinsurance after deductible</span>
    </dd>

    <dd>
      <strong>Routine Eye Exam for Children</strong>
      <span class="label">No charge</span>
    </dd>

    </dl>

  </div>

### Summary boxes

<div class="row equal">

  <div class="col-sm-4 summary first">
    <h3>Estimated <span>monthly premium</span></h3>
    <p class="amount dollars">$119</p>
    <ul class="small text-muted list-unstyled">
      <li>Number of people covered: 1</li>
    </ul>
  </div>

  <div class="col-sm-4 summary">
    <h3>Estimated <span>deductible</span></h3>
    <p class="amount">
      <span class="dollars">$5,000</span>
      <small>Estimated individual total</small>
    </p>
  </div>

  <div class="col-sm-4 summary">
    <h3>Estimated <span>out-of-pocket maximum</span></h3>
    <p class="amount">
    <span class="dollars">$6,250</span>
    <small>Estimated individual total</small>
    </p>
  </div>

</div>

## Information card checkbox
<div class="compare-this">
  <label class="compare-checkbox small" aria-flowto="compare-plans">
    <input type="checkbox" name="compare">
      Compare
  </label>
</div>

## Pagination
<div class="pagination">
  <ul>
      <li class="disabled"><a href="#">back</a></li>
      <li class="active">
        1
      </li>

      <li>
        <a href="#">2</a>
      </li>

      <li>
        <a href=#">3</a>
      </li>
  </ul>
</div>

## Sidebar tool widget
<div class="col-xs-12 col-md-3 sidebar details col-md-pull-9">
  <div class="row">
    <div class="col-sm-12">
      <h4 class="first">Options</h4>

      <ul class="list-unstyled options">

        <li>
        <a href="javascript:window.print()" aria-describedby="plan-name">
          <span class="glyphicon glyphicon-print" aria-hidden="true" aria-label="Print this plan"></span>
            Print
          </a>
        </li>

        <li>
          <a href="#" id="shorten-url" aria-describedby="plan-name" aria-controls="short-url" aria-flowto="short-url">
            <span id="share-link"><span class="glyphicon glyphicon-link" aria-hidden="true"></span> Link</span>
          </a>
          <input type="text" id="short-url" class="short-url text-muted input-sm" aria-live="assertive" aria-relevant="additions removals" aria-describedby="plan-name">
        </li>

        <li>
          <a aria-describedby="plan-name" href="#">
            <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> Email
          </a>
        </li>
      </ul>

    </div>
  </div>

  <div class="row">
    <div class="col-sm-12">
      <div class="small">
        <b>Important</b>: Emailing or sharing plan details can expose information about your income, household members, smoking status, and other sensitive matters. Share this information only with people you trust.
      </div>
    </div>
  </div>

</div>

## Sidebar Navigation widget - Navtabs

<div class="col-xs-12 col-md-3 sidebar">
  <div class="row">
    <a href="#" class="close close-sidebar compare hidden-md><span aria-hidden="true">Close <span class="glyphicon glyphicon-remove remove" aria-label="close this menu and return to plan details"></span></span><span class="sr-only">Close</span></a>

    <div class="col-sm-12">

      <h4 class="first">Compare</h4>

      <ul class="nav-tabs list-unstyled options clearfix" role="tablist">

        <li class="active" role="presentation"><a href="#" role="tab" id="ui-tab-72" tabindex="0" aria-selected="true" aria-controls="#">Blue Cross and Blue Shield of Illinois · Blue Choice Bronze PPO 005</a></li>

        <li role="presentation"><a href="#" role="tab" id="ui-tab-547" tabindex="-1" aria-selected="false" aria-controls="#">Blue Cross and Blue Shield of Illinois · Blue Choice Bronze PPO 006</a></li>

      </ul>

      <p>
      <a class="small btn btn-full btn-minimal" href="#" >Remove All Plans <span class="glyphicon glyphicon-remove remove" aria-label="remove all plans"></span></a>
      </p>

    </div>
  </div>
</div>

### Lists

- Simple List
  <ul class="simple-list">
    <li>The health plan premiums shown here are estimates based on some basic information.</li>
    <li>After you find a plan you like, you can start a Marketplace application. You’ll provide more detailed information.</li>
    <li>After you submit your completed application, we’ll tell you exactly how much you’ll pay for any plan you choose.</li>
    <li>Some plans and details you see here may change.</li>
  </ul>

- Unstyled list
  <ul class="list-unstyled">
    <li>
      <strong>Person #1 (age 22)</strong>
      <span>may be eligible for <a href="#">Medicaid</a> and/or <abbr><a href="#">CHIP</a></abbr> in their state.</span>
    </li>

    <li>
      <strong>Person #2 (age 4)</strong>
      <span class="household-member">may be eligible for <a href="#">Medicaid</a> and/or <abbr><a href="#">CHIP</a></abbr> in their state.</span>
    </li>
  </ul>
