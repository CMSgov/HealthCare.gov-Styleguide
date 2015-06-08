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
We use several forms throughout HealthCare.gov. Generally forms are presented against a white or dark blue background. Below are the main elements that make up the forms.
</div>

<div class="hr"></div>

## Table forms

<h3 class="label-opensans">Example &amp; Code</h3>

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

<h3 class="label-opensans">Example &amp; Code</h3>

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

## Fieldset with instructions

<h3 class="label-opensans">Example &amp; Code</h3>

<div class="code-wrapper">
<div class="preview">
	<fieldset>
		<legend aria-describedby="fieldset01">Fieldset with Instructions</legend>
		<p id="fieldset01" class="instructions">Instructions</p>
	</fieldset>
</div>
<div id="fieldset-instructions-code">
{% highlight text %}
<fieldset>
	<legend aria-describedby="fieldset01">Fieldset with Instructions</legend>
	<p id="fieldset01" class="instructions">Instructions</p>
</fieldset>
{% endhighlight %}
</div>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="fieldset-instructions-code" role="button">Copy</a>
</div>

* * *

## Blue background with subtitle

<h3 class="label-opensans">Example &amp; Code</h3>

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

<h3 class="label-opensans">Example &amp; Code</h3>

<div class="code-wrapper">
<div class="preview has-background">
	<div class="question-section blue-bg clearfix">
		<div class="filter-question form-group">
			<div class="visible-radio-label sm hidden-md hidden-lg">When we have many screener statements, stack them as filter questions.</div>
			<div class="toggle-buttons">
				<label class="btn radio-label">
					<input type="radio" name="filter-question-name" value="true"/>
					yes
				</label>
				<label class="btn radio-label">
					<input type="radio" name="filter-question-name" value="false"/>
					no
				</label>
			</div>
			<span class="visible-radio-label col-md-10 hidden-sm hidden-xs">When we have many screener statements, stack them as filter questions.</span>
			<div class="spacer spacer-bottom25 hidden-md hidden-lg"></div>
		</div>
	</div>
</div>
<div id="blue-screener-code">
{% highlight text %}
<div class="question-section blue-bg clearfix">
	<div class="filter-question form-group">
		<div class="visible-radio-label sm hidden-md hidden-lg">When we have many screener statements, stack them as filter questions.</div>
		<div class="toggle-buttons">
			<label class="btn radio-label">
				<input type="radio" name="filter-question-name" value="true"/>
				yes
			</label>
			<label class="btn radio-label">
				<input type="radio" name="filter-question-name" value="false"/>
				no
			</label>
		</div>
		<span class="visible-radio-label col-md-10 hidden-sm hidden-xs">When we have many screener statements, stack them as filter questions.</span>
		<div class="spacer spacer-bottom25 hidden-md hidden-lg"></div>
	</div>
</div>
{% endhighlight %}
</div>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="blue-screener-code" role="button">Copy</a>
</div>

* * *

## Screener statements white background

These buttons are used throughout the site for yes/no and true/false type questions.

<h3 class="label-opensans">Example &amp; Code</h3>

<div class="code-wrapper">
<div class="preview clearfix">
	<div class="toggle-buttons">
		<label class="btn radio-label">
			<input type="radio" name="filter-question-name-white-example" value="true"/>
			yes
		</label>
		<label class="btn radio-label">
			<input type="radio" name="filter-question-name-white-example" value="false"/>
			no
		</label>
	</div>
</div>
<div id="toggle-code">
{%  highlight text %}
<div class="toggle-buttons">
	<label class="btn radio-label">
		<input type="radio" name="filter-question-name-white-example" value="true"/>
		yes
	</label>
	<label class="btn radio-label">
		<input type="radio" name="filter-question-name-white-example" value="false"/>
		no
	</label>
</div>
{% endhighlight %}
</div>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="toggle-code" role="button">Copy</a>
</div>

* * *

## Multiple choice questions blue background

<h3 class="label-opensans">Example &amp; Code</h3>

<div class="code-wrapper">
	<div class="preview has-background">
		<div class="question blue-bg">
			<div class="question-label">When we have a multiple choice question here, display the choices vertically.</div>
			<div class="btn-group btn-group-vertical">
				<label tabindex="0" class="btn radio-label">
					<input type="radio" name="multipleChoice" values="one"/>
					First Option
				</label>
				<label tabindex="0" class="btn radio-label">
					<input type="radio" name="multipleChoice" values="two"/>
					Second Option
				</label>
				<label tabindex="0" class="btn radio-label">
					<input type="radio" name="multipleChoice" values="three"/>
					Third Option
				</label>
			</div>
		</div>
	</div>
<div id="blue-multiple-code">
{% highlight text %}
<div class="question blue-bg">
	<div class="question-label">When we have a multiple choice question here, display the choices vertically.</div>
	<div class="btn-group btn-group-vertical">
		<label tabindex="0" class="btn radio-label">
			<input type="radio" name="multipleChoice" values="one"/>
			First Option
		</label>
		<label tabindex="0" class="btn radio-label">
			<input type="radio" name="multipleChoice" values="two"/>
			Second Option
		</label>
		<label tabindex="0" class="btn radio-label">
			<input type="radio" name="multipleChoice" values="three"/>
			Third Option
		</label>
	</div>
</div>
{% endhighlight %}
</div>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="blue-multiple-code" role="button">Copy</a>
</div>

* * *

## Dropdown questions blue background

<h3 class="label-opensans">Example &amp; Code</h3>

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
<div id="blue-dropdown-code">
{% highlight text %}
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
{% endhighlight %}
</div>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="blue-dropdown-code" role="button">Copy</a>
</div>

* * *

## Dropdowns

<h3 class="label-opensans">Example &amp; Code</h3>

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
<div id="white-dropdown-code">
{% highlight text %}
<div class="header-label">Dropdown</div>
<div class="form-select">
	<select class="form-control" name="dropdown-name" aria-label="Dropdown Label" data-type="">
	    <option value="option-value-1">Option 1</option>
	    <option value="option-value-2">Option 2</option>
	    <option value="option-value-3">Option 3</option>
 	</select>
 	<span class="caret"></span>
</div>
{% endhighlight %}
</div>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="white-dropdown-code" role="button">Copy</a>
</div>

<div class="code-wrapper">
<div class="preview">
	<div class="row">
		<div class="col-sm-4">
			<div class="lite-card">
				<div class="header-label">Dropdown with default text</div>
				<div class="form-select">
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
<div id="white-dropdown-code">
{% highlight text %}
<div class="header-label">Dropdown with default text</div>
<div class="form-select">
  <select class="form-control" name="dropdown-name" aria-label="Dropdown Label" data-type="">
    
    <option value="" selected="selected">Select Option</option>
    
    <option value="option-value-1">Option 1</option>
    <option value="option-value-2">Option 2</option>
    <option value="option-value-3">Option 3</option>
  </select>
  <span class="caret"></span>
</div>
{% endhighlight %}
</div>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="white-dropdown-code" role="button">Copy</a>
</div>

* * *

## Questions

<h3 class="label-opensans">Example &amp; Code</h3>

<div class="code-wrapper">
<div class="preview">
	<div class="lite-card">
		<div class="question">
	        <div class="question-label">Is this a question?</div>
	        <input class="form-control" type="text" value="Yes!">
	    </div>
	</div>
</div>
<div id="questions-code">
{% highlight text %}
<div class="question">
    <div class="question-label">Is this a question?</div>
    <input class="form-control" type="text" value="Yes!">
</div>
{% endhighlight %}
</div>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="questions-code" role="button">Copy</a>
</div>

* * *

## Radio selects

<h3 class="label-opensans">Example &amp; Code</h3>

<div class="code-wrapper">
<div class="preview">
	<div class="btn-group-vertical filter-question">
		<label tabindex="0" class="btn radio-label">
			<input type="radio" name="radio-selects-example" values="option-a"/>
			Option A
		</label>
		<label tabindex="0" class="btn radio-label">
			<input type="radio" name="radio-selects-example" values="option-b"/>
			Option B
		</label>
	</div>
</div>
<div id="radio-code">
{% highlight text %}
<div class="btn-group-vertical filter-question">
	<label tabindex="0" class="btn radio-label">
		<input type="radio" name="radio-selects-example" values="option-a"/>
		Option A
	</label>
	<label tabindex="0" class="btn radio-label">
		<input type="radio" name="radio-selects-example" values="option-b"/>
		Option B
	</label>
</div>
{% endhighlight %}
</div>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="radio-code" role="button">Copy</a>
</div>
