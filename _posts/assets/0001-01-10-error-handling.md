---
published: true
layout: detail-page
lang: en
section: assets
title: "Error Handling"
nav-title: "Error Handling"
"meta-title": "Get an overview of the Error Handling pattern used on HealthCare.gov"
"meta-description": "Get an overview of Error Handling pattern used on HealthCare.gov"
nav-category: patterns
categories:
  - assets
---

# Error handling

<div class="intro">
When a user enters information into a form field that doesn't conform to accepted values for that field, an error message is displayed. We strive to write instructive, clear errors messages so the person interacting with the form knows exactly what type of information should be entered into the field, and in  what format. 
</div>

<div class="hr"></div>

## Error handling and messaging 

The error message display is made up of multiple parts for maximum visibility and accessibility. A message above the form, in white text on a red (#B01827) background, describes the number and type of errors on the form. Beneath each form field instructions, in red text, describe what kind of information should be entered into that specific form field. Additionally, each form field with an error is surrounded by a red border.

<h3 class="label-opensans">Example &amp; Code</h3>

<div class="code-wrapper">
	<div class="preview">
		<form class="error-styling">
			<div class="group">
				<div class="error-msg row" aria-hidden="false">
					<div class="col-md-12">
						<h2 tabindex="0" role="alert" id="error-title">Your information contains <span class="errorNumber">3</span> error(s):</h2>

						<a href="#" onclick="return document.getElementById(&quot;page-state-dropdown&quot;).focus(),!1" role="alert" aria-hidden="false" class="invalid-state error-text-box">You need to tell us your state.</a>

						<a href="#" onclick="return document.getElementById(&quot;address&quot;).focus(),!1" role="alert" aria-hidden="false" class="blank-email error-text-box">You need to at least fill in your email address or phone number.</a>

						<a href="#" onclick="return document.getElementById(&quot;number&quot;).focus(),!1" role="alert" aria-hidden="false" class="blank-number error-text-box">You need to at least fill in your email address or phone number.</a>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12 no-padding-left no-padding-right">
						<label for="page-state-dropdown">Pick your state</label>
						<div class="form-select">
							<select class="form-control state subscribe-state errorBorder shadow_select" id="page-state-dropdown" name="q_23536" required="" aria-describedby="invalid-state-id">
							<option selected="selected" value="state">Select a state</option><option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>Delaware</option><option>District of Columbia</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option><option>American Samoa</option><option>Guam</option><option>Northern Mariana Islands</option><option>Puerto Rico</option><option>Virgin Islands</option>        
							</select>
							<span class="caret"></span>
							<p id="invalid-state-id" class="error-text" aria-hidden="false">You need to tell us your state.</p>

						</div>
					</div>
				</div>
				<div class="row">
					<div class="question col-md-6 no-padding-left">
						<label for="address" class="question-label">Get email updates</label>
						<input class="form-control subscribe-email errorBorder shadow_select" placeholder="Enter email address" id="address" name="e" type="email" optional="" value="" aria-describedby="blank-email-id">
						<p id="invalid-email-id" class="invalid-email hide error-text" aria-hidden="true">Enter a valid email address.</p>
						<p id="blank-email-id" class="error-text" aria-hidden="false">You need to at least fill in your email address or phone number.</p>
					</div>
					<div class="question col-md-6 no-padding-right">
						<label class="question-label" for="number">Get text message updates</label>
						<input class="form-control subscribe-number errorBorder shadow_select" title="Phone Number" placeholder="Enter mobile phone number" id="number" name="w" type="tel" aria-describedby="blank-number-id">
						<p id="invalid-number-id" class="invalid-number hide error-text" aria-hidden="true">Mobile phone number is invalid.</p>
						<p id="blank-number-id" class="error-text" aria-hidden="false">You need to at least fill in your email address or phone number</p>
					</div>
				</div>
			</div>
		</form>
	</div>
	<div id="error-handling-code">
		{% highlight text %}
<form class="error-styling">
	<div class="group">
		<div class="error-msg row" aria-hidden="false">
			<div class="col-md-12">
				<h2 tabindex="0" role="alert" id="error-title">Your information contains <span class="errorNumber">3</span> error(s):</h2>
				<a href="#" onclick="return document.getElementById(&quot;page-state-dropdown&quot;).focus(),!1" role="alert" aria-hidden="false" class="invalid-state error-text-box">You need to tell us your state.</a>
				<a href="#" onclick="return document.getElementById(&quot;address&quot;).focus(),!1" role="alert" aria-hidden="false" class="blank-email error-text-box">You need to at least fill in your email address or phone number.</a>
				<a href="#" onclick="return document.getElementById(&quot;number&quot;).focus(),!1" role="alert" aria-hidden="false" class="blank-number error-text-box">You need to at least fill in your email address or phone number.</a>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12 no-padding-left no-padding-right">
				<label for="page-state-dropdown">Pick your state</label>
				<div class="form-select">
					<select class="form-control state subscribe-state errorBorder shadow_select" id="page-state-dropdown" name="q_23536" required="" aria-describedby="invalid-state-id">
					<option selected="selected" value="state">Select a state</option><option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>Delaware</option><option>District of Columbia</option><option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option><option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option><option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option><option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option><option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option><option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option><option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option><option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option><option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option><option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option><option>Wisconsin</option><option>Wyoming</option><option>American Samoa</option><option>Guam</option><option>Northern Mariana Islands</option><option>Puerto Rico</option><option>Virgin Islands</option>        
					</select>
					<span class="caret"></span>
					<p id="invalid-state-id" class="error-text" aria-hidden="false">You need to tell us your state.</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="question col-md-6 no-padding-left">
				<label for="address" class="question-label">Get email updates</label>
				<input class="form-control subscribe-email errorBorder shadow_select" placeholder="Enter email address" id="address" name="e" type="email" optional="" value="" aria-describedby="blank-email-id">
				<p id="invalid-email-id" class="invalid-email hide error-text" aria-hidden="true">Enter a valid email address.</p>
				<p id="blank-email-id" class="error-text" aria-hidden="false">You need to at least fill in your email address or phone number.</p>
			</div>
			<div class="question col-md-6 no-padding-right">
				<label class="question-label" for="number">Get text message updates</label>
				<input class="form-control subscribe-number errorBorder shadow_select" title="Phone Number" placeholder="Enter mobile phone number" id="number" name="w" type="tel" aria-describedby="blank-number-id">
				<p id="invalid-number-id" class="invalid-number hide error-text" aria-hidden="true">Mobile phone number is invalid.</p>
				<p id="blank-number-id" class="error-text" aria-hidden="false">You need to at least fill in your email address or phone number</p>
			</div>
		</div>
	</div>
</form>
		{% endhighlight %}
	</div>
</div>
