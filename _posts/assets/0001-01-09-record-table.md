---
published: true
layout: detail-page
lang: en
section: assets
title: "Record Table"
nav-title: "Record Table"
"meta-title": "Get an overview of the Record Table pattern used on HealthCare.gov"
"meta-description": "Get an overview of Record Table pattern used on HealthCare.gov"
nav-category: patterns
categories:
  - assets
---

# Record Table

<div class="intro">
Many interactive tools used throughout Healthcare.gov include visual feedback of user entered data. This feedback builds upon itself as the user completes the pertinent steps along the process. In many cases this content is able to be edited after it has been entered. Record table data is similar to the Completed Steps pattern and is ultimately added to the information included within a completed step.
</div>

<div class="hr"></div>

## Household Members Record Table 

Information specific to household members that is entered by a user stacks as the user adds members. These records are numbered and presented in stacking rows with alternating background color. 
<h3 class="label-opensans">Example &amp; Code</h3>

<div class="code-wrapper">
	<div class="preview has-dark-background">

		<div id="currenthousehold" class="form-group no-margin">
		  <table summary="Your household members" id="household-list" class="table record-table">
		    <thead>
		      <tr>
		        <th class="household-number" scope="col"><span class="sr-only">Person Number</span></th>
		        <th scope="col">Age</th>
		        <th scope="col">Tobacco user</th>
		        <th scope="col">Parent</th>
		        <th scope="col">Pregnant</th>
		        <th scope="col">Coverage</th>
		        <th scope="col"><span class="sr-only">Remove person</span></th>
		      </tr>
		    </thead>
		    <tbody aria-relevant="additions removals" aria-atomic="false" aria-live="assertive">
		      <tr>
		        <td class="household-number">
		          <span class="sr-only">Person Number: </span><span id="household-member-number">1</span>
		        </td>
		        <td>
		          <span>23</span>
		          <input type="hidden" name="age" value="23">
		        </td>
		        <td class="yesno" aria-label="not a smoker"></td>
		        <td class="yesno yes" aria-label="is a parent">Yes</td>
		        <td class="yesno yes" aria-label="pregnant">Yes</td>
		        <td class="yesno" aria-label="does not have health coverage from an employer, Medicaid, CHIP, or Medicare">
		          <input type="hidden" name="mec" value="false">
		        </td>
		        <td class="remove-item" aria-flowto="household-list"><a aria-describedby="household-member-number" title="Remove person" href="#" class="btn btn-remove" target="_self"><span aria-flowto="household-list" aria-controls="household-list" aria-label="remove" class="glyphicon glyphicon-remove remove-x"></span><span class="remove-label small"> <span role="button" class="btn-text">Remove <span class="sr-only"> this person from your household</span></span></span></a></td>
		      </tr>
		      <tr>
		        <td class="household-number">
		          <span class="sr-only">Person Number: </span><span id="household-member-number">2</span>
		        </td>
		        <td>
		          <span>24</span>
		          <input type="hidden" name="age" value="24">
		        </td>
		        <td class="yesno" aria-label="not a smoker"></td>
		        <td class="yesno yes" aria-label="is a parent">Yes</td>
		        <td class="yesno" aria-label="not pregnant"></td>
		        <td class="yesno" aria-label="does not have health coverage from an employer, Medicaid, CHIP, or Medicare">
		          <input type="hidden" name="mec" value="false">
		        </td>
		        <td class="remove-item" aria-flowto="household-list"><a aria-describedby="household-member-number" title="Remove person" href="#" class="btn btn-remove" target="_self"><span aria-flowto="household-list" aria-controls="household-list" aria-label="remove" class="glyphicon glyphicon-remove remove-x"></span><span class="remove-label small"> <span role="button" class="btn-text">Remove <span class="sr-only"> this person from your household</span></span></span></a></td>
		      </tr>
		      <tr>
		        <td class="household-number">
		          <span class="sr-only">Person Number: </span><span id="household-member-number">3</span>
		        </td>
		        <td>
		          <span>2</span>
		          <input type="hidden" name="age" value="2">
		        </td>
		        <td class="yesno" aria-label="not a smoker"></td>
		        <td class="yesno" aria-label="not a parent"></td>
		        <td class="yesno" aria-label="not pregnant"></td>
		        <td class="yesno" aria-label="does not have health coverage from an employer, Medicaid, CHIP, or Medicare">
		          <input type="hidden" name="mec" value="false">
		        </td>
		        <td class="remove-item" aria-flowto="household-list"><a aria-describedby="household-member-number" title="Remove person" href="#" class="btn btn-remove" target="_self"><span aria-flowto="household-list" aria-controls="household-list" aria-label="remove" class="glyphicon glyphicon-remove remove-x"></span><span class="remove-label small"> <span role="button" class="btn-text">Remove <span class="sr-only"> this person from your household</span></span></span></a></td>
		      </tr>
		    </tbody>
		  </table>
		</div>


	</div>
	<div id="record-table-code">
		{% highlight text %}
<table summary="Your household members" id="household-list" class="table record-table">
	<thead>
	  <tr>
	    <th class="household-number" scope="col"><span class="sr-only">Person Number</span></th>
	    <th scope="col">Age</th>
	    <th scope="col">Tobacco user</th>
	    <th scope="col">Parent</th>
	    <th scope="col">Pregnant</th>
	    <th scope="col">Coverage</th>
	    <th scope="col"><span class="sr-only">Remove person</span></th>
	  </tr>
	</thead>
	<tbody aria-relevant="additions removals" aria-atomic="false" aria-live="assertive">
	  <tr>
	    <td class="household-number">
	      <span class="sr-only">Person Number: </span><span id="household-member-number">1</span>
	    </td>
	    <td>
	      <span>23</span>
	      <input type="hidden" name="age" value="23">
	    </td>
	    <td class="yesno" aria-label="not a smoker"></td>
	    <td class="yesno yes" aria-label="is a parent">Yes</td>
	    <td class="yesno yes" aria-label="pregnant">Yes</td>
	    <td class="yesno" aria-label="does not have health coverage from an employer, Medicaid, CHIP, or Medicare">
	      <input type="hidden" name="mec" value="false">
	    </td>
	    <td class="remove-item" aria-flowto="household-list"><a aria-describedby="household-member-number" title="Remove person" href="#" class="btn btn-remove" target="_self"><span aria-flowto="household-list" aria-controls="household-list" aria-label="remove" class="glyphicon glyphicon-remove remove-x"></span><span class="remove-label small"> <span role="button" class="btn-text">Remove <span class="sr-only"> this person from your household</span></span></span></a></td>
	  </tr>
	  <tr>
	    <td class="household-number">
	      <span class="sr-only">Person Number: </span><span id="household-member-number">2</span>
	    </td>
	    <td>
	      <span>24</span>
	      <input type="hidden" name="age" value="24">
	    </td>
	    <td class="yesno" aria-label="not a smoker"></td>
	    <td class="yesno yes" aria-label="is a parent">Yes</td>
	    <td class="yesno" aria-label="not pregnant"></td>
	    <td class="yesno" aria-label="does not have health coverage from an employer, Medicaid, CHIP, or Medicare">
	      <input type="hidden" name="mec" value="false">
	    </td>
	    <td class="remove-item" aria-flowto="household-list"><a aria-describedby="household-member-number" title="Remove person" href="#" class="btn btn-remove" target="_self"><span aria-flowto="household-list" aria-controls="household-list" aria-label="remove" class="glyphicon glyphicon-remove remove-x"></span><span class="remove-label small"> <span role="button" class="btn-text">Remove <span class="sr-only"> this person from your household</span></span></span></a></td>
	  </tr>
	  <tr>
	    <td class="household-number">
	      <span class="sr-only">Person Number: </span><span id="household-member-number">3</span>
	    </td>
	    <td>
	      <span>2</span>
	      <input type="hidden" name="age" value="2">
	    </td>
	    <td class="yesno" aria-label="not a smoker"></td>
	    <td class="yesno" aria-label="not a parent"></td>
	    <td class="yesno" aria-label="not pregnant"></td>
	    <td class="yesno" aria-label="does not have health coverage from an employer, Medicaid, CHIP, or Medicare">
	      <input type="hidden" name="mec" value="false">
	    </td>
	    <td class="remove-item" aria-flowto="household-list"><a aria-describedby="household-member-number" title="Remove person" href="#" class="btn btn-remove" target="_self"><span aria-flowto="household-list" aria-controls="household-list" aria-label="remove" class="glyphicon glyphicon-remove remove-x"></span><span class="remove-label small"> <span role="button" class="btn-text">Remove <span class="sr-only"> this person from your household</span></span></span></a></td>
	  </tr>
	</tbody>
</table>
		{% endhighlight %}
	</div>
	<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="record-table-code" role="button">Copy</a>
</div>
