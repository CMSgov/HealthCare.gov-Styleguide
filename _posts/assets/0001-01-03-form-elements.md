---
published: true
layout: detail-page
lang: en
section: assets
title: "Form element assets"
nav-title: "Form Elements"
"meta-title": "Get an overview of form element assets used on HealthCare.gov"
"meta-description": "Get an overview the  form element assets used on HealthCare.gov. Generally, forms are against a white or dark blue background."
nav-category: components
categories:
  - assets
---

# Form elements

<div class="intro">
There are many forms used throughout HealthCare.gov. Generally, forms are against a white or dark blue background. Below are the main elements that make up the forms.
</div>

<div class="hr"></div>

## Table forms

<div class="code-wrapper">
<pre>
<code id="form-code">&ltdiv id="table-form-container"&gt&lt/div&gt
</code>
</pre>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="form-code" role="button">Copy</a>
</div>

<div class="code-wrapper">
<pre>
<code id="view-code">var View = CardView.extend({

	...

	initialize: function(){

		_.bindAll(this,
			'renderTableFormHeaders',
			'renderTableFormItem',
			'renderTableFormItemFields');

		this.tableFormView = new TableFormView({
			id: 'table-form',
			model: this.model,
			collection: new Backbone.Collection();
			addItemText: 'Add item',
			renderHeaders: this.renderTableHeaders,
			renderItem: this.renderTableFormItem,
			renderItemFields: this.renderTableFormsItemFeilds
		});
	};
}),
</code>
</pre>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="view-code" role="button">Copy</a>
</div>

* * *

## Fieldset

<div class="code-wrapper">
<div class="preview">
	<fieldset>
		<legend>Fieldset</legend>
	</fieldset>
</div>
<pre>
<code id="fieldset-code">&ltfieldset&gt
	&ltlegend&gtFieldset&lt/legend&gt
&lt/fieldset&gt
</code>
</pre>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="fieldset-code" role="button">Copy</a>
</div>

* * *

## Fieldset with Instructions

<div class="code-wrapper">
<div class="preview">
	<fieldset>
		<legend>Fieldset with Instructions</legend>
		<p class="instructions">Instructions</p>
	</fieldset>
</div>
<pre>
<code id="fieldset-instructions-code">&ltfieldset&gt
	&ltlegend&gtFieldset with Instructions&lt/legend&gt
	&ltp class="instructions"&gtInstructions&lt/p&gt
&lt/fieldset&gt
</code>
</pre>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="fieldset-instructions-code" role="button">Copy</a>
</div>

* * *

## Blue background with subtitle

<div class="code-wrapper">
<div class="preview has-background">
	<div class="blue-bg">
		<div class="lite-card-inner">
			<h2 id="blue-bg">Blue Background</h2>
			<div class="subtitle">Blue background subtitle.</div>
		</div>
	</div>
</div>
<pre>
<code id="blue-code">&ltdiv class="blue-bg"&gt
	&ltdiv class="lite-card-inner"&gt
		&lth2 id="blue-bg"&gtBlue Background&lt/h2&gt
		&ltdiv class="subtitle"&gtBlue background subtitle.&lt/div&gt
	&lt/div&gt
&lt/div&gt
</code>
</pre>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="blue-code" role="button">Copy</a>
</div>

* * *

## Screener statements blue background

<div class="code-wrapper">
<div class="preview has-background">
	<div class="question-section blue-bg clearfix">
		<div class="filter-question form-group">
			<div class="visible-radio-label sm hidden-md hidden-lg">When we have many screener statements, stack them as filter questions.</div>
			<div class="toggle-buttons" data-toggle="buttons">
				<a href="javascript:;" class="btn btn-primary radio-label active">
					<input type="radio" name="filter-question-name" value="true" aria-label="yes" checked="checked" />
					yes
				</a>
				<a href="javascript:;" class="btn btn-primary radio-label">
					<input type="radio" name="filter-question-name" value="false" aria-label="no" checked="checked" />
					no
				</a>
			</div>
			<span class="visible-radio-label col-md-10 hidden-sm hidden-xs">When we have many screener statements, stack them as filter questions.</span>
			<div class="spacer spacer-bottom25 hidden-md hidden-lg"></div>
		</div>
	</div>
</div>
<pre>
<code id="blue-screener-code">&ltdiv class="question-section blue-bg clearfix"&gt
	&ltdiv class="filter-question form-group"&gt
		&ltdiv class="visible-radio-label sm hidden-md hidden-lg"&gtWhen we have many screener statements, stack them as filter questions.&lt/div&gt
		&ltdiv class="toggle-buttons" data-toggle="buttons"&gt
			&lta href="javascript:;" class="btn btn-primary radio-label active"&gt
				&ltinput type="radio" name="filter-question-name" value="true" aria-label="yes" checked="checked" /&gt
				yes
			&lt/a&gt
			&lta href="javascript:;" class="btn btn-primary radio-label"&gt
				&ltinput type="radio" name="filter-question-name" value="false" aria-label="no" checked="checked" /&gt
				no
			&lt/a&gt
		&lt/div&gt
		&ltspan class="visible-radio-label col-md-10 hidden-sm hidden-xs"&gtWhen we have many screener statements, stack them as filter questions.&lt/span&gt
		&ltdiv class="spacer spacer-bottom25 hidden-md hidden-lg"&gt&lt/div&gt
	&lt/div&gt
&lt/div&gt</code>
</pre>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="blue-screener-code" role="button">Copy</a>
</div>

* * *

## Multiple choice questions blue background

<div class="code-wrapper">
<div class="preview has-background">
	<div class="question blue-bg">
		<div class="question-label">When we have a multiple choice question here, display the choices vertically.</div>
		<div class="btn-group btn-group-vertical" data-toggle="buttons">
			<label class="btn radio-label">
				<input type="radio" name="multipleChoice" values="one" aria-label="Multiple Choice" />
				First Option
			</label>
			<label class="btn radio-label">
				<input type="radio" name="multipleChoice" values="two" aria-label="Multiple Choice" />
				Second Option
			</label>
			<label class="btn radio-label active">
				<input type="radio" name="multipleChoice" values="three" aria-label="Multiple Choice" />
				Third Option
			</label>
		</div>
	</div>
</div>
<pre>
<code id="blue-multiple-code">&ltdiv class="question blue-bg"&gt
	&ltdiv class="question-label"&gtWhen we have a multiple choice question here, display the choices vertically.&lt/div&gt
	&ltdiv class="btn-group btn-group-vertical" data-toggle="buttons"&gt
		&ltlabel class="btn radio-label"&gt
			&ltinput type="radio" name="multipleChoice" values="one" aria-label="Multiple Choice" /&gt
			First Option
		&lt/label&gt
		&ltlabel class="btn radio-label"&gt
			&ltinput type="radio" name="multipleChoice" values="two" aria-label="Multiple Choice" /&gt
			Second Option
		&lt/label&gt
		&ltlabel class="btn radio-label active"&gt
			&ltinput type="radio" name="multipleChoice" values="three" aria-label="Multiple Choice" /&gt
			Third Option
		&lt/label&gt
	&lt/div&gt
&lt/div&gt</code>
</pre>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="blue-multiple-code" role="button">Copy</a>
</div>

* * *

## Dropdown questions blue background

<div class="code-wrapper">
<div class="preview has-background">
	<div class="question blue-bg">
		<form class="form-inline">
			<div class="question-label">A blue background screener select question.</div>
			<div class="row">
				<div class="col-sm-4">
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
		</form>
	</div>
</div>
<pre>
<code id="blue-dropdown-code">&lt;div class="question  blue-bg"&gt;
&lt;form class="form-inline"&gt;
    &lt;div class="question-label"&gt;A blue background screener select question.&lt;/div&gt;
    &lt;div class="row"&gt;
      &lt;div class="col-sm-3"&gt;
        &lt;div class="form-select "&gt;
          &lt;select class="form-control" name="dropdown-name" aria-label="Dropdown Label" data-type=""&gt;
            &lt;option value="option-value-1"&gt;Option 1&lt;/option&gt;
            &lt;option value="option-value-2"&gt;Option 2&lt;/option&gt;
            &lt;option value="option-value-3"&gt;Option 3&lt;/option&gt;
          &lt;/select&gt;
          &lt;span class="caret"&gt;&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;/form&gt;
  &lt;/div&gt;</code>
</pre>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="blue-dropdown-code" role="button">Copy</a>
</div>

* * *

## Dropdowns

<div class="code-wrapper">
<div class="preview">
	<div class="row">
		<div class="col-sm-4">
			<div class="lite-card">
				<div class="header-label">Dropdown</div>
				<div class="form-select">
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
</div>
<pre>
<code id="white-dropdown-code">&lt;div class="form-select "&gt;
  &lt;select class="form-control" name="dropdown-name" aria-label="Dropdown Label" data-type=""&gt;
    &lt;option value="option-value-1"&gt;Option 1&lt;/option&gt;
    &lt;option value="option-value-2"&gt;Option 2&lt;/option&gt;
    &lt;option value="option-value-3"&gt;Option 3&lt;/option&gt;
  &lt;/select&gt;
  &lt;span class="caret"&gt;&lt;/span&gt;
&lt;/div&gt;</code>
</pre>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="white-dropdown-code" role="button">Copy</a>
</div>

<div class="code-wrapper">
<div class="preview">
	<div class="row">
		<div class="col-sm-4">
			<div class="lite-card">
				<div class="header-label">Dropdown with default text</div>
				<div class="form-select ">
				  <select class="form-control" name="dropdown-name" aria-label="Dropdown Label" data-type="">
				    
				    <option value="" selected="selected">Select Option</option>
				    
				    <option value="option-value-1">Option 1</option>
				    <option value="option-value-2">Option 2</option>
				    <option value="option-value-3">Option 3</option>
				  </select>
				  <span class="caret"></span>
				</div>
			</div>
		</div>
	</div>
</div>
<pre>
<code id="white-dropdown-code">&ltdiv class="form-select"&gt
	&ltdiv class="row"&gt
		&ltdiv class="col-sm-4"&gt
			&ltspan&gtDropdown with default text&lt/span&gt
			&ltselect class="form-control" name="dropdown-name" aria-label="Dropdown Label" data-type=""&gt
				&ltoption value="" selected="selected"&gtSelect Option&lt/option&gt
				&ltoption value="option-value-1"&gtOption 1&lt/option&gt
				&ltoption value="option-value-2"&gtOption 2&lt/option&gt
				&ltoption value="option-value-3"&gtOption 3&lt/option&gt
			&lt/select&gt
		&lt/div&gt
	&lt/div&gt
&lt/div&gt</code>
</pre>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="white-dropdown-code" role="button">Copy</a>
</div>

* * *

## Questions

<div class="code-wrapper">
<div class="preview">
	<div class="lite-card">
		<div class="question">
	        <div class="question-label">Is this a question?</div>
	        <input class="form-control" type="text" value="Yes!">
	    </div>
	</div>
</div>
<pre>
<code id="questions-code">&ltdiv class="question"&gt
	&ltdiv class="question-label"&gtIs this a question?&lt/div&gt
	&ltinput class="form-control" type="text" value="Yes!"&gt
&lt/div&gt</code>
</pre>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="questions-code" role="button">Copy</a>
</div>

* * *

## Radio selects

<div class="code-wrapper">
<div class="preview">
	<div class="btn-group-vertical filter-question">
		<label class="btn radio-label active">Active radio select</label>
		<label class="btn radio-label">Default radio select</label>
	</div>
</div>
<pre>
<code id="radio-code">&ltdiv class="btn-group-vertical filter-question"&gt
	&ltlabel class="btn radio-label active"&gtActive radio select&lt/label&gt
	&ltlabel class="btn radio-label"&gtDefault radio select&lt/label&gt
&lt/div&gt</code>
</pre>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="radio-code" role="button">Copy</a>
</div>