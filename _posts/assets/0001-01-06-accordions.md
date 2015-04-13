---
published: true
layout: detail-page
lang: en
section: assets
title: "Accordion assets"
nav-title: "Accordions"
"meta-title": "Get an overview of accordion assets used on HealthCare.gov"
"meta-description": "Get an overview the accordion assets used on HealthCare.gov."
nav-category: patterns
categories:
  - assets
---

# Accordions

<div class="intro">
The accordion patterns used on Healthcare.gov are expandable sets of content intended to consolidate the amount of text displayed on a single page. Accordions are typically found on Explainer and Article pages and are also applied to sets of in-page navigation at various responsive breakpoints.
</div>

<div class="hr"></div>

## Content Page Accordion

Accordion content can be placed at any location within the body of an Explainer or Article page. Typically, the accordion is placed at the end of a block of text, allowing the user to get more detailed information if needed.

> %faq%
> [If you took too much or too little advance payment of your premium tax credit](id:APTCadjustment)
>
> : If you took too much or too little advance payment of your premium tax credit and you had to pay back the difference on your tax return, or you got a big credit:
>
>    * Update your 2015 Marketplace coverage application to make sure it includes your best estimate of your income for the year and see if your tax credit has changed. Also update any household information you haven’t already reported to the Marketplace. See [how to update your account and your 2015 application now](/reporting-changes/).
>    * You can change how much of your premium tax credit you take in advance for 2015 to make sure it’s not too high or too low. 


<div class="code-wrapper">
	<div class="preview row"></div>
	<div id="accordion-code">
		{% highlight text %}
		<div id="faq-container">
			<dl class="faq-question">
				<dt id="faq-1-q-1-1" class="question collapsed"><a class="title" tabindex="0" aria-controls="faq-1-a-1-1" aria-expanded="false"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span id="APTCadjustment">If you took too much or too little advance payment of your premium tax credit</span></a></dt>
				<dd id="faq-1-a-1-1" class="answer" role="definition" style="display: none;"><p>If you took too much or too little advance payment of your premium tax credit and you had to pay back the difference on your tax return, or you got a big credit:</p>
					<ul>
						<li>Update your 2015 Marketplace coverage application to make sure it includes your best estimate of your income for the year and see if your tax credit has changed. Also update any household information you haven’t already reported to the Marketplace. See <a href="/reporting-changes/">how to update your account and your 2015 application now</a>.</li>
						<li>You can change how much of your premium tax credit you take in advance for 2015 to make sure it’s not too high or too low.</li>
					</ul>
				</dd>
			</dl>
		</div>
		{% endhighlight %}
	</div>
	<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="accordion-code" role="button">Copy</a>
</div>