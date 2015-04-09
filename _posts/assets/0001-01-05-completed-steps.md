---
published: true
layout: detail-page
lang: en
section: assets
title: "Alert assets"
nav-title: "Completed Steps"
"meta-title": "Get an overview of alert assets used on HealthCare.gov"
"meta-description": "Get an overview the alert assets used on HealthCare.gov. Alerts are typically used to provide site visitors with timely information about issues that will impact their HealthCare.gov experience"
nav-category: patterns
categories:
  - assets
---

# Completed Steps

<div class="intro">
Many interactive tools used throughout Healthcare.gov include visual feedback of user-entered data. This feedback builds upon itself as the user completes the pertinent steps along the process. In many cases this content can be edited after it has been entered.
</div>

<div class="hr"></div>

## Completed Steps: Tools 

Demographic information entered by a user stacks as the user completes steps. A glyphicon checkmark is displayed to indicate that a step has been successfully completed.

<div class="code-wrapper">
<div class="preview has-background">
	<div class="light-blue-bg">
		<ol class="summary">
            <li class="row">
              <div class="col-sm-1 hidden-xs glyphicon glyphicon-ok" aria-label="step complete"></div>
              <div class="col-xs-9 col-sm-9" id="zip-code" aria-live="assertive" aria-relevant="additions removals">
                <h2 class="h3-style"><abbr>ZIP</abbr> Code </h2><span class="zip done">60001</span> <span class="county done">(McHenry County, IL)</span>
              </div>
              <div class="col-xs-3 col-sm-2">
                <a class="btn btn-xs btn-edit pull-right zip-edit" role="button" target="_self">
                  <span>Edit <span class="sr-only">your <abbr>ZIP</abbr> Code</span></span>
                </a>
              </div>
            </li>
            <li class="row income" style="display: list-item;">
              <div class="col-sm-1 hidden-xs glyphicon glyphicon-ok" aria-label="step complete"></div>
              <div class="col-xs-9 col-sm-9" id="income" aria-live="assertive" aria-relevant="additions removals">
                <h2 class="h3-style">Monthly Household Income</h2><span class="income done" style="display: inline;">$50,000</span>
              </div>
              <div class="col-xs-3 col-sm-2">
                <a href="#" class="btn btn-xs btn-edit pull-right income-edit" role="button" target="_self">
                  <span>Edit <span class="sr-only">your estimated monthly household income</span></span>
                </a>
              </div>
            </li>
            <li class="row household" style="display: list-item;">
              <div class="col-sm-1 hidden-xs glyphicon glyphicon-ok" aria-label="step complete"></div>
              <div class="col-xs-9 col-sm-9" id="zip-code" aria-live="assertive" aria-relevant="additions removals">
                <h2 class="h3-style">Household Members</h2>
                <table class="household-members table" summary="Household Members"><tr><th scope="col" class="col-xs-3 col-sm-3">
                                    <strong>Age</strong>
                                </th><th scope="col" class="col-xs-4 col-sm-3">
                                    <strong>Parent</strong>
                                </th><th scope="col" class="col-xs-4 col-sm-3">
                                    <strong>Pregnant</strong>
                                </th></tr><tr><td class="col-xs-3 col-sm-3">
                                    <span class="summary-age">29</span>
                                </td><td class="col-xs-4 col-sm-3">
                                    <span class="summary-parent">yes</span>
                                </td><td class="col-xs-4 col-sm-3">
                                    <span class="summary-pregnant"></span>
                                </td></tr><tr><td class="col-xs-3 col-sm-3">
                                    <span class="summary-age">34</span>
                                </td><td class="col-xs-4 col-sm-3">
                                    <span class="summary-parent">yes</span>
                                </td><td class="col-xs-4 col-sm-3">
                                    <span class="summary-pregnant">yes</span>
                                </td></tr></table>
              </div>
              <div class="col-xs-3 col-sm-2">
                <a href="#" class="btn btn-xs btn-edit pull-right household-edit" role="button" target="_self">
                  <span>Edit <span class="sr-only">household members</span></span>
                </a>
              </div>
            </li>
          </ol>
	</div>
</div>
<div id="blue-alert-code">
	{% highlight text %}
	<ol class="summary">
            <li class="row">
              <div class="col-sm-1 hidden-xs glyphicon glyphicon-ok" aria-label="step complete"></div>
              <div class="col-xs-9 col-sm-9" id="zip-code" aria-live="assertive" aria-relevant="additions removals">
                <h2 class="h3-style"><abbr>ZIP</abbr> Code </h2><span class="zip done">60001</span> <span class="county done">(McHenry County, IL)</span>
              </div>
              <div class="col-xs-3 col-sm-2">
                <a class="btn btn-xs btn-edit pull-right zip-edit" role="button" target="_self">
                  <span>Edit <span class="sr-only">your <abbr>ZIP</abbr> Code</span></span>
                </a>
              </div>
            </li>
            <li class="row income" style="display: list-item;">
              <div class="col-sm-1 hidden-xs glyphicon glyphicon-ok" aria-label="step complete"></div>
              <div class="col-xs-9 col-sm-9" id="income" aria-live="assertive" aria-relevant="additions removals">
                <h2 class="h3-style">Monthly Household Income</h2><span class="income done" style="display: inline;">$50,000</span>
              </div>
              <div class="col-xs-3 col-sm-2">
                <a href="#" class="btn btn-xs btn-edit pull-right income-edit" role="button" target="_self">
                  <span>Edit <span class="sr-only">your estimated monthly household income</span></span>
                </a>
              </div>
            </li>
            <li class="row household" style="display: list-item;">
              <div class="col-sm-1 hidden-xs glyphicon glyphicon-ok" aria-label="step complete"></div>
              <div class="col-xs-9 col-sm-9" id="zip-code" aria-live="assertive" aria-relevant="additions removals">
                <h2 class="h3-style">Household Members</h2>
                <table class="household-members table" summary="Household Members"><tr><th scope="col" class="col-xs-3 col-sm-3">
                                    <strong>Age</strong>
                                </th><th scope="col" class="col-xs-4 col-sm-3">
                                    <strong>Parent</strong>
                                </th><th scope="col" class="col-xs-4 col-sm-3">
                                    <strong>Pregnant</strong>
                                </th></tr><tr><td class="col-xs-3 col-sm-3">
                                    <span class="summary-age">29</span>
                                </td><td class="col-xs-4 col-sm-3">
                                    <span class="summary-parent">yes</span>
                                </td><td class="col-xs-4 col-sm-3">
                                    <span class="summary-pregnant"></span>
                                </td></tr><tr><td class="col-xs-3 col-sm-3">
                                    <span class="summary-age">34</span>
                                </td><td class="col-xs-4 col-sm-3">
                                    <span class="summary-parent">yes</span>
                                </td><td class="col-xs-4 col-sm-3">
                                    <span class="summary-pregnant">yes</span>
                                </td></tr></table>
              </div>
              <div class="col-xs-3 col-sm-2">
                <a href="#" class="btn btn-xs btn-edit pull-right household-edit" role="button" target="_self">
                  <span>Edit <span class="sr-only">household members</span></span>
                </a>
              </div>
            </li>
          </ol>
	{% endhighlight %}
</div>
<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="blue-alert-code" role="button">Copy</a>
</div>
