---
published: true
layout: detail-page
lang: en
section: assets
title: "Skip to Results"
nav-title: "Skip to Results"
"meta-title": "Get an overview of the Skip to Results pattern used on HealthCare.gov"
"meta-description": "Get an overview of Skip to Results pattern used on HealthCare.gov to allow site visitors to select specific time frames."
nav-category: patterns
categories:
  - assets
---

# Skip to Results

<div class="intro">
Many of the HealthCare.gov tools that require user-entered information, such as the See Plans and Prices tool and the Special Enrollment Period Screener, display a module that allows site visitors to skip directly to results without completing every step.
</div>

<div class="hr"></div>

## Skip to Results module 

The Skip to Results module featured in various tools throughout HealthCare.gov is affixed to the right side of the browser window and appears after the user has entered their first set of background information. It allows them to skip directly to their results without completing every step along the path. 

<h3 class="label-opensans">Example &amp; Code</h3>

<div class="code-wrapper">
	<div class="preview">
		<div class="control-group">

			<div class="notification-box">
				<div><p>Based on the information you've given us so far, it looks like an exemption may apply to you</p></div>
				<button id="seeResult" class="btn btn-primary" value="SEE RESULTS NOW">SEE RESULTS NOW</button>
			</div>
		</div>
	</div>
	<div id="skip-to-results-code">
		{% highlight text %}
<div class="notification-box">
	<div>
		<p>Based on the information you've given us so far, it looks like an exemption may apply to you</p>
	</div>
	<button id="seeResult" class="btn btn-primary" value="SEE RESULTS NOW">SEE RESULTS NOW</button>
</div>
		{% endhighlight %}
	</div>
	<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="skip-to-results-code" role="button">Copy</a>
</div>

* * *

## Skip to Results Module (with progress indicator)

The Skip to Results module featured in various tools throughout Healthcare.gov is affixed to the right side of the browser window and appears after the user has entered their first set of background information. It allows users to skip directly to their results without completing every step along the path. This version of the Skip to Results Module also has a progress indicator to show the user how far along the process they are before opting to skip to results.

<h3 class="label-opensans">Example &amp; Code</h3>

<div class="code-wrapper">
	<div class="preview">
		<div class="control-group">

			<div class="notification-box">
				<div>

					<p><strong><a tabindex="0" role="button" class="tip" aria-hidden="true" href="#" data-toggle="tooltip" data-placement="left" data-trigger="hover focus" title="" target="_self" data-original-title="If you go to plan results without answering these questions the cost estimates for the plans you’ll see won’t include the cost savings you might qualify for like a premium tax credit. Also the plan results won’t be specific to you and your household. You’ll see plans for a single person age 35 and a non-parent."><span class="glyphicon glyphicon-info-sign" aria-label="information"></span> <span data-ng-bind="progress" class="ng-binding">50</span>% of questions answered</a></strong></p>

					<p>Select See plans now to view plans in your area.</p>

				</div>
				<button id="seeResult" class="btn btn-primary" value="SEE PLANS NOW">SEE PLANS NOW</button>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		$(".tip").tooltip();
	</script>
	<div id="skip-to-results-progress-code">
		{% highlight text %}
		<div class="notification-box">
			<div>

				<p><strong><a tabindex="0" role="button" class="tip" aria-hidden="true" href="#" data-toggle="tooltip" data-placement="left" data-trigger="hover focus" title="" target="_self" data-original-title="If you go to plan results without answering these questions the cost estimates for the plans you’ll see won’t include the cost savings you might qualify for like a premium tax credit. Also the plan results won’t be specific to you and your household. You’ll see plans for a single person age 35 and a non-parent."><span class="glyphicon glyphicon-info-sign" aria-label="information"></span> <span data-ng-bind="progress" class="ng-binding">50</span>% of questions answered</a></strong></p>

				<p>Select See plans now to view plans in your area.</p>

			</div>
			<button id="seeResult" class="btn btn-primary" value="SEE PLANS NOW">SEE PLANS NOW</button>
		</div>
		{% endhighlight %}
	</div>
	<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="skip-to-results-progress-code" role="button">Copy</a>
</div>

<div class="code-wrapper">
	<div id="tooltip-js-code">
{% highlight text %}
<script type="text/javascript">
	$(".tip").tooltip();
</script>
{% endhighlight %}
	</div>
	<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="tooltip-js-code" role="button">Copy</a>
</div>