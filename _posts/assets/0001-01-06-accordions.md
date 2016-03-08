---
published: true
layout: detail-page
lang: en
section: assets
title: "Accordion patterns"
nav-title: "Accordions"
"meta-title": "Get an overview of accordion patterns used on HealthCare.gov"
"meta-description": "Get an overview of accordion pattern used on HealthCare.gov to reduce the amount of text initially delivered on a single page."
nav-category: patterns
categories:
  - assets
---

# Accordions

<div class="intro">
The accordion patterns used on HealthCare.gov are expandable sets of content intended to reduce the amount of text initially delivered on a page. They also allow site visitors to request more text without having to leave a page. We typically use accordions on explainer and article pages as well as on some sets of in-page navigation at various responsive breakpoints.
</div>

<div class="hr"></div>

## Content page accordions

Accordion content can be placed at any location within the body of an [explainer or article page]({{site.baseurl}}/design/page-layouts/). Typically, the accordion is placed at the end of a block of text, allowing the user to get more detailed information if needed.

<h3 class="label-opensans">Example &amp; Code</h3>

> %faq%
> [If you took too much or too little advance payment of your premium tax credit](id:APTCadjustment)
>
> : If you took too much or too little advance payment of your premium tax credit and you had to pay back the difference on your tax return, or you got a big credit:
>
>    * Update your 2015 Marketplace coverage application to make sure it includes your best estimate of your income for the year and see if your tax credit has changed. Also update any household information you haven’t already reported to the Marketplace. See [how to update your account and your 2015 application now](#).
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
						<li>Update your 2015 Marketplace coverage application to make sure it includes your best estimate of your income for the year and see if your tax credit has changed. Also update any household information you haven’t already reported to the Marketplace. See <a href="#">how to update your account and your 2015 application now</a>.</li>
						<li>You can change how much of your premium tax credit you take in advance for 2015 to make sure it’s not too high or too low.</li>
					</ul>
				</dd>
			</dl>
		</div>
		{% endhighlight %}
	</div>
</div>

<hr />

## Navigation accordions

The More Information section on the Get Answers page collapses at tablet breakpoints. The links beneath each topic are hidden from display unless a user opts to reveal them using the accordion caret. 

<h3 class="label-opensans">Example &amp; Code</h3>

<div class="code-wrapper">
	<div class="preview">
		<div id="more-info" class="visible-lg">
		    <ul class="col-sm-4 link-list left">
		      <li class="topic"><h3 class="rule">Change or Update Your Plan</h3></li>
		      <li><a href="#">Change, update or cancel your plan</a></li>
		      <li><a href="#">Reporting changes</a></li>
		      <li class="topic"><h3 class="rule">Get Coverage</h3></li>
		      <li><a href="#">A quick guide to the Health Insurance Marketplace</a></li>
		      <li><a href="#">Apply &amp; enroll</a></li>
		    </ul>
		    <ul class="col-sm-4 link-list left">
		      <li class="topic"><h3 class="rule">Medicaid, CHIP &amp; Medicare</h3></li>
		      <li><a href="#">Medicaid &amp; CHIP</a></li>
		      <li><a href="#">Medicare and the Marketplace</a></li>
		      <li class="topic"><h3 class="rule">Information About Health Coverage</h3></li>
		      <li><a href="#">Using your Marketplace coverage</a></li>
		      <li><a href="#">Why health coverage is important</a></li>
		    </ul>
		    <ul class="col-sm-4 link-list">
		      <li class="topic"><h3 class="rule">Coverage For. . .</h3></li>
		      <li><a href="#">Immigrants</a></li>
		      <li><a href="#">Young adults</a></li>
		    </ul>
		</div>
		<div id="more-info" class="hidden-lg">
		  <ul class="faq col-sm-6 left">
		    <li class="faq-question">
		      <div><a id="question-6" class="question serif collapsed" data-toggle="collapse" data-target="#answer-6" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span><h3 class="rule">Change or Update Your Plan</h3></a></div>
		      <div class="answer collapse" id="answer-6" aria-describedby="question-6" aria-hidden="true">
		        <ul class="link-list">
		          <li><a href="#">Change, update or cancel your plan</a></li>
		          <li><a href="#">Reporting changes</a></li>        
		        </ul>
		      </div>
		    </li>
		    <li class="faq-question">
		      <div><a id="question-8" class="question serif collapsed" data-toggle="collapse" data-target="#answer-8" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span><h3 class="rule">Get Coverage</h3></a></div>
		      <div class="answer collapse" id="answer-8" aria-describedby="question-8" aria-hidden="true">
		        <ul class="link-list"> 
		          <li><a href="#">A quick guide to the Health Insurance Marketplace</a></li>
		          <li><a href="#">Apply &amp; enroll</a></li>
		        </ul>
		      </div>
		    </li>
		    <li class="faq-question">
		      <div><a id="question-5" class="question serif collapsed" data-toggle="collapse" data-target="#answer-5" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span><h3 class="rule">Medicaid, CHIP &amp; Medicare</h3></a></div>
		      <div class="answer collapse" id="answer-5" aria-describedby="question-5" aria-hidden="true">
		        <ul class="link-list">
		          <li><a href="#">Medicaid &amp; CHIP</a></li>
		          <li><a href="#">Medicare and the Marketplace</a></li>
		        </ul>
		      </div>
		    </li>
		  </ul>
		  <ul class="faq col-sm-6 right">
		    <li class="faq-question">
		      <div><a id="question-7" class="question serif collapsed" data-toggle="collapse" data-target="#answer-7" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span><h3 class="rule">Information About Health Coverage</h3></a></div>
		      <div class="answer collapse" id="answer-7" aria-describedby="question-7" aria-hidden="true">
		        <ul class="link-list">
		          <li><a href="#">Using your Marketplace coverage</a></li>
		          <li><a href="#">Why health coverage is important</a></li>
		        </ul>
		      </div>
		    </li>
		    <li class="faq-question">
		      <div><a id="question-9" class="question serif collapsed" data-toggle="collapse" data-target="#answer-9" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span><h3 class="rule">Coverage For. . .</h3></a></div>
		      <div class="answer collapse" id="answer-9" aria-describedby="question-9" aria-hidden="true">
		        <ul class="link-list">
		          <li><a href="#">Immigrants</a></li>
		          <li><a href="#">Young adults</a></li>
		        </ul>
		      </div>
		    </li>
		    <li class="faq-question">
		      <div><a id="question-" class="question serif collapsed" data-toggle="collapse" data-target="#answer-" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span><h3 class="rule">Small Businesses</h3></a></div>
		      <div class="answer collapse" id="answer-" aria-describedby="question-" aria-hidden="true">
		        <ul class="link-list"> 
		          <li><a href="#">For Employers</a></li>
		          <li><a href="#">For Employees</a></li> 
		        </ul>
		      </div>
		    </li>
		  </ul>
		</div>
		<div class="clearfix"></div>
	</div>
	<div id="navigation-accordion-code">
		{% highlight text %}
<div id="more-info" class="visible-lg">
    <ul class="col-sm-4 link-list left">
      <li class="topic"><h3 class="rule">Change or Update Your Plan</h3></li>
      <li><a href="#">Change, update or cancel your plan</a></li>
      <li><a href="#">Reporting changes</a></li>
      <li class="topic"><h3 class="rule">Get Coverage</h3></li>
      <li><a href="#">A quick guide to the Health Insurance Marketplace</a></li>
      <li><a href="#">Apply &amp; enroll</a></li>
    </ul>
    <ul class="col-sm-4 link-list left">
      <li class="topic"><h3 class="rule">Medicaid, CHIP &amp; Medicare</h3></li>
      <li><a href="#">Medicaid &amp; CHIP</a></li>
      <li><a href="#">Medicare and the Marketplace</a></li>
      <li class="topic"><h3 class="rule">Information About Health Coverage</h3></li>
      <li><a href="#">Using your Marketplace coverage</a></li>
      <li><a href="#">Why health coverage is important</a></li>
    </ul>
    <ul class="col-sm-4 link-list">
      <li class="topic"><h3 class="rule">Coverage For. . .</h3></li>
      <li><a href="#">Immigrants</a></li>
      <li><a href="#">Young adults</a></li>
    </ul>
</div>
<div id="more-info" class="hidden-lg">
  <ul class="faq col-sm-6 left">
    <li class="faq-question">
      <div><a id="question-6" class="question serif collapsed" data-toggle="collapse" data-target="#answer-6" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span><h3 class="rule">Change or Update Your Plan</h3></a></div>
      <div class="answer collapse" id="answer-6" aria-describedby="question-6" aria-hidden="true">
        <ul class="link-list">
          <li><a href="#">Change, update or cancel your plan</a></li>
          <li><a href="#">Reporting changes</a></li>        
        </ul>
      </div>
    </li>
    <li class="faq-question">
      <div><a id="question-8" class="question serif collapsed" data-toggle="collapse" data-target="#answer-8" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span><h3 class="rule">Get Coverage</h3></a></div>
      <div class="answer collapse" id="answer-8" aria-describedby="question-8" aria-hidden="true">
        <ul class="link-list"> 
          <li><a href="#">A quick guide to the Health Insurance Marketplace</a></li>
          <li><a href="#">Apply &amp; enroll</a></li>
        </ul>
      </div>
    </li>
    <li class="faq-question">
      <div><a id="question-5" class="question serif collapsed" data-toggle="collapse" data-target="#answer-5" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span><h3 class="rule">Medicaid, CHIP &amp; Medicare</h3></a></div>
      <div class="answer collapse" id="answer-5" aria-describedby="question-5" aria-hidden="true">
        <ul class="link-list">
          <li><a href="#">Medicaid &amp; CHIP</a></li>
          <li><a href="#">Medicare and the Marketplace</a></li>
        </ul>
      </div>
    </li>
  </ul>
  <ul class="faq col-sm-6 right">
    <li class="faq-question">
      <div><a id="question-7" class="question serif collapsed" data-toggle="collapse" data-target="#answer-7" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span><h3 class="rule">Information About Health Coverage</h3></a></div>
      <div class="answer collapse" id="answer-7" aria-describedby="question-7" aria-hidden="true">
        <ul class="link-list">
          <li><a href="#">Using your Marketplace coverage</a></li>
          <li><a href="#">Why health coverage is important</a></li>
        </ul>
      </div>
    </li>
    <li class="faq-question">
      <div><a id="question-9" class="question serif collapsed" data-toggle="collapse" data-target="#answer-9" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span><h3 class="rule">Coverage For. . .</h3></a></div>
      <div class="answer collapse" id="answer-9" aria-describedby="question-9" aria-hidden="true">
        <ul class="link-list">
          <li><a href="#">Immigrants</a></li>
          <li><a href="#">Young adults</a></li>
        </ul>
      </div>
    </li>
    <li class="faq-question">
      <div><a id="question-" class="question serif collapsed" data-toggle="collapse" data-target="#answer-" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span><h3 class="rule">Small Businesses</h3></a></div>
      <div class="answer collapse" id="answer-" aria-describedby="question-" aria-hidden="true">
        <ul class="link-list"> 
          <li><a href="#">For Employers</a></li>
          <li><a href="#">For Employees</a></li> 
        </ul>
      </div>
    </li>
  </ul>
</div>
<div class="clearfix"></div>
		{% endhighlight %}
	</div>
</div>
