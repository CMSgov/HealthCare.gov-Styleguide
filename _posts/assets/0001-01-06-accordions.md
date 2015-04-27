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
The Accordion patterns used on HealthCare.gov are expandable sets of content intended to reduce the amount of text initially delivered on a page. They also allow site visitors to request more text without having to leave a page. Accordions are typically found on Explainer and Article pages and are also applied to sets of in-page navigation at various responsive breakpoints.
</div>

<div class="hr"></div>

## Content page Accordions

Accordion content can be placed at any location within the body of an [Explainer or Article page](/design/page-layouts/). Typically, the accordion is placed at the end of a block of text, allowing the user to get more detailed information if needed.

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

<hr />

## Navigation Accordions

description text here

<div class="code-wrapper">
	<div class="preview">
		<div id="more-info" class="visible-lg">
		    <ul class="col-sm-4 link-list left">
		      <li class="topic"><h3 class="rule">Change or Update Your Plan</h3></li>
		      <li><a href="/keep-or-change-plan">Change, update or cancel your plan</a></li>
		      <li><a href="/reporting-changes">Reporting changes</a></li>
		      <li class="topic"><h3 class="rule">Get Coverage</h3></li>
		      <li><a href="/quick-guide">A quick guide to the Health Insurance Marketplace</a></li>
		      <li><a href="/apply-and-enroll">Apply &amp; enroll</a></li>
		      <li><a href="/lower-costs">Getting lower costs</a></li>
		      <li><a href="/fees-exemptions">Fees &amp; exemptions</a></li>
		      <li><a href="/coverage">What plans cover</a></li>
		      <li><a href="/choose-a-plan">How to choose a Marketplace plan</a></li>
		      <li><a href="/income-and-household-information">Reporting income and household size</a></li>
		      <li><a href="/coverage-outside-open-enrollment">Coverage outside Open Enrollment</a></li>
		      <li><a href="/marketplace-deadlines">Important Marketplace deadlines</a></li>
		    </ul>
		    <ul class="col-sm-4 link-list left">
		      <li class="topic"><h3 class="rule">Medicaid, CHIP &amp; Medicare</h3></li>
		      <li><a href="/medicaid-chip">Medicaid &amp; CHIP</a></li>
		      <li><a href="/medicare">Medicare and the Marketplace</a></li>
		      <li class="topic"><h3 class="rule">Information About Health Coverage</h3></li>
		      <li><a href="/using-marketplace-coverage">Using your Marketplace coverage</a></li>
		      <li><a href="/why-coverage-is-important">Why health coverage is important</a></li>
		      <li><a href="/taxes">Marketplace coverage &amp; taxes</a></li>
		      <li><a href="/preventive-care-benefits">Preventive care benefits</a></li>
		      <li><a href="/health-care-law-protections">Rights and protections</a></li>
		      <li><a href="/marketplace-appeals">Appeal a Marketplace decision</a></li>
		      <li><a href="/current-plan-changed-or-cancelled">If your grandfathered health plan is changed or cancelled</a></li>
		    </ul>
		    <ul class="col-sm-4 link-list left">
		      <li class="topic"><h3 class="rule">Coverage For. . .</h3></li>
		      <li><a href="/immigrants">Immigrants</a></li>
		      <li><a href="/young-adults">Young adults</a></li>
		      <li><a href="/self-employed">Self-employed people</a></li>
		      <li><a href="/unemployed">Unemployed people</a></li>
		      <li><a href="/people-with-disabilities">People with disabilities</a></li>
		      <li><a href="/have-job-based-coverage">People with job-based coverage</a></li>
		      <li><a href="/veterans">Military veterans</a></li>
		      <li><a href="/american-indians-alaska-natives">American Indians &amp; Alaska Natives</a></li>
		      <li><a href="/what-if-im-pregnant-or-plan-to-get-pregnant">Pregnant women</a></li>
		      <li><a href="/married-same-sex-couples-and-the-marketplace">Same-sex married couples</a></li>
		      <li><a href="/retirees">Retirees</a></li>
		      <li><a href="/incarcerated-people">Incarcerated people</a></li>  
		      <li class="topic"><h3 class="rule">Small Businesses</h3></li>
		      <li><a href="/small-businesses/employers">For Employers</a></li>
		      <li><a href="/small-businesses/employees">For Employees</a></li>
		    </ul>
		</div>
		<div id="more-info" class="hidden-lg">
		  <ul class="faq col-sm-6 left">
		    <li class="faq-question">
		      <div><a id="question-6" class="question serif collapsed" data-toggle="collapse" data-target="#answer-6" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right"></span><h3 class="rule">Change or Update Your Plan</h3></a></div>
		      <div class="answer collapse" id="answer-6" aria-describedby="question-6" aria-hidden="true">
		        <ul class="link-list">
		          <li><a href="/keep-or-change-plan">Change, update or cancel your plan</a></li>
		          <li><a href="/reporting-changes">Reporting changes</a></li>        
		        </ul>
		      </div>
		    </li>
		    <li class="faq-question">
		      <div><a id="question-8" class="question serif collapsed" data-toggle="collapse" data-target="#answer-8" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right"></span><h3 class="rule">Get Coverage</h3></a></div>
		      <div class="answer collapse" id="answer-8" aria-describedby="question-8" aria-hidden="true">
		        <ul class="link-list"> 
		          <li><a href="/quick-guide">A quick guide to the Health Insurance Marketplace</a></li>
		          <li><a href="/apply-and-enroll">Apply &amp; enroll</a></li>
		          <li><a href="/lower-costs">Getting lower costs</a></li>
		          <li><a href="/fees-exemptions">Fees &amp; exemptions</a></li>
		          <li><a href="/coverage">What plans cover</a></li>
		          <li><a href="/choose-a-plan">How to choose a Marketplace plan</a></li>
		          <li><a href="/income-and-household-information">Reporting income and household size</a></li>
		          <li><a href="/coverage-outside-open-enrollment">Coverage outside Open Enrollment</a></li>
		          <li><a href="/marketplace-deadlines">Important Marketplace deadlines</a></li>
		        </ul>
		      </div>
		    </li>
		    <li class="faq-question">
		      <div><a id="question-5" class="question serif collapsed" data-toggle="collapse" data-target="#answer-5" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right"></span><h3 class="rule">Medicaid, CHIP &amp; Medicare</h3></a></div>
		      <div class="answer collapse" id="answer-5" aria-describedby="question-5" aria-hidden="true">
		        <ul class="link-list">
		          <li><a href="/medicaid-chip">Medicaid &amp; CHIP</a></li>
		          <li><a href="/medicare">Medicare and the Marketplace</a></li>
		        </ul>
		      </div>
		    </li>
		  </ul>
		  <ul class="faq col-sm-6 right">
		    <li class="faq-question">
		      <div><a id="question-7" class="question serif collapsed" data-toggle="collapse" data-target="#answer-7" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right"></span><h3 class="rule">Information About Health Coverage</h3></a></div>
		      <div class="answer collapse" id="answer-7" aria-describedby="question-7" aria-hidden="true">
		        <ul class="link-list">
		          <li><a href="/using-marketplace-coverage">Using your Marketplace coverage</a></li>
		          <li><a href="/why-coverage-is-important">Why health coverage is important</a></li>
		          <li><a href="/taxes">Marketplace coverage &amp; taxes</a></li>
		          <li><a href="/preventive-care-benefits">Preventive care benefits</a></li>
		          <li><a href="/health-care-law-protections">Rights and protections</a></li>
		          <li><a href="/marketplace-appeals">Appeal a Marketplace decision</a></li>
		          <li><a href="/current-plan-changed-or-cancelled">If your grandfathered health plan is changed or cancelled</a></li>
		        </ul>
		      </div>
		    </li>
		    <li class="faq-question">
		      <div><a id="question-9" class="question serif collapsed" data-toggle="collapse" data-target="#answer-9" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right"></span><h3 class="rule">Coverage For. . .</h3></a></div>
		      <div class="answer collapse" id="answer-9" aria-describedby="question-9" aria-hidden="true">
		        <ul class="link-list">
		          <li><a href="/immigrants">Immigrants</a></li>
		          <li><a href="/young-adults">Young adults</a></li>
		          <li><a href="/self-employed">Self-employed people</a></li>
		          <li><a href="/unemployed">Unemployed people</a></li>
		          <li><a href="/people-with-disabilities">People with disabilities</a></li>
		          <li><a href="/have-job-based-coverage">People with job-based coverage</a></li>
		          <li><a href="/veterans">Military veterans</a></li>
		          <li><a href="/american-indians-alaska-natives">American Indians &amp; Alaska Natives</a></li>
		          <li><a href="/what-if-im-pregnant-or-plan-to-get-pregnant">Pregnant women</a></li>
		          <li><a href="/married-same-sex-couples-and-the-marketplace">Same-sex married couples</a></li>
		          <li><a href="/retirees">Retirees</a></li>
		          <li><a href="/incarcerated-people">Incarcerated people</a></li>
		        </ul>
		      </div>
		    </li>
		    <li class="faq-question">
		      <div><a id="question-" class="question serif collapsed" data-toggle="collapse" data-target="#answer-" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right"></span><h3 class="rule">Small Businesses</h3></a></div>
		      <div class="answer collapse" id="answer-" aria-describedby="question-" aria-hidden="true">
		        <ul class="link-list"> 
		          <li><a href="/small-businesses/employers">For Employers</a></li>
		          <li><a href="/small-businesses/employees">For Employees</a></li> 
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
		      <li><a href="/keep-or-change-plan">Change, update or cancel your plan</a></li>
		      <li><a href="/reporting-changes">Reporting changes</a></li>
		      <li class="topic"><h3 class="rule">Get Coverage</h3></li>
		      <li><a href="/quick-guide">A quick guide to the Health Insurance Marketplace</a></li>
		      <li><a href="/apply-and-enroll">Apply &amp; enroll</a></li>
		      <li><a href="/lower-costs">Getting lower costs</a></li>
		      <li><a href="/fees-exemptions">Fees &amp; exemptions</a></li>
		      <li><a href="/coverage">What plans cover</a></li>
		      <li><a href="/choose-a-plan">How to choose a Marketplace plan</a></li>
		      <li><a href="/income-and-household-information">Reporting income and household size</a></li>
		      <li><a href="/coverage-outside-open-enrollment">Coverage outside Open Enrollment</a></li>
		      <li><a href="/marketplace-deadlines">Important Marketplace deadlines</a></li>
		    </ul>
		    <ul class="col-sm-4 link-list left">
		      <li class="topic"><h3 class="rule">Medicaid, CHIP &amp; Medicare</h3></li>
		      <li><a href="/medicaid-chip">Medicaid &amp; CHIP</a></li>
		      <li><a href="/medicare">Medicare and the Marketplace</a></li>
		      <li class="topic"><h3 class="rule">Information About Health Coverage</h3></li>
		      <li><a href="/using-marketplace-coverage">Using your Marketplace coverage</a></li>
		      <li><a href="/why-coverage-is-important">Why health coverage is important</a></li>
		      <li><a href="/taxes">Marketplace coverage &amp; taxes</a></li>
		      <li><a href="/preventive-care-benefits">Preventive care benefits</a></li>
		      <li><a href="/health-care-law-protections">Rights and protections</a></li>
		      <li><a href="/marketplace-appeals">Appeal a Marketplace decision</a></li>
		      <li><a href="/current-plan-changed-or-cancelled">If your grandfathered health plan is changed or cancelled</a></li>
		    </ul>
		    <ul class="col-sm-4 link-list left">
		      <li class="topic"><h3 class="rule">Coverage For. . .</h3></li>
		      <li><a href="/immigrants">Immigrants</a></li>
		      <li><a href="/young-adults">Young adults</a></li>
		      <li><a href="/self-employed">Self-employed people</a></li>
		      <li><a href="/unemployed">Unemployed people</a></li>
		      <li><a href="/people-with-disabilities">People with disabilities</a></li>
		      <li><a href="/have-job-based-coverage">People with job-based coverage</a></li>
		      <li><a href="/veterans">Military veterans</a></li>
		      <li><a href="/american-indians-alaska-natives">American Indians &amp; Alaska Natives</a></li>
		      <li><a href="/what-if-im-pregnant-or-plan-to-get-pregnant">Pregnant women</a></li>
		      <li><a href="/married-same-sex-couples-and-the-marketplace">Same-sex married couples</a></li>
		      <li><a href="/retirees">Retirees</a></li>
		      <li><a href="/incarcerated-people">Incarcerated people</a></li>  
		      <li class="topic"><h3 class="rule">Small Businesses</h3></li>
		      <li><a href="/small-businesses/employers">For Employers</a></li>
		      <li><a href="/small-businesses/employees">For Employees</a></li>
		    </ul>
		</div>
		<div id="more-info" class="hidden-lg">
		  <ul class="faq col-sm-6 left">
		    <li class="faq-question">
		      <div><a id="question-6" class="question serif collapsed" data-toggle="collapse" data-target="#answer-6" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right"></span><h3 class="rule">Change or Update Your Plan</h3></a></div>
		      <div class="answer collapse" id="answer-6" aria-describedby="question-6" aria-hidden="true">
		        <ul class="link-list">
		          <li><a href="/keep-or-change-plan">Change, update or cancel your plan</a></li>
		          <li><a href="/reporting-changes">Reporting changes</a></li>        
		        </ul>
		      </div>
		    </li>
		    <li class="faq-question">
		      <div><a id="question-8" class="question serif collapsed" data-toggle="collapse" data-target="#answer-8" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right"></span><h3 class="rule">Get Coverage</h3></a></div>
		      <div class="answer collapse" id="answer-8" aria-describedby="question-8" aria-hidden="true">
		        <ul class="link-list"> 
		          <li><a href="/quick-guide">A quick guide to the Health Insurance Marketplace</a></li>
		          <li><a href="/apply-and-enroll">Apply &amp; enroll</a></li>
		          <li><a href="/lower-costs">Getting lower costs</a></li>
		          <li><a href="/fees-exemptions">Fees &amp; exemptions</a></li>
		          <li><a href="/coverage">What plans cover</a></li>
		          <li><a href="/choose-a-plan">How to choose a Marketplace plan</a></li>
		          <li><a href="/income-and-household-information">Reporting income and household size</a></li>
		          <li><a href="/coverage-outside-open-enrollment">Coverage outside Open Enrollment</a></li>
		          <li><a href="/marketplace-deadlines">Important Marketplace deadlines</a></li>
		        </ul>
		      </div>
		    </li>
		    <li class="faq-question">
		      <div><a id="question-5" class="question serif collapsed" data-toggle="collapse" data-target="#answer-5" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right"></span><h3 class="rule">Medicaid, CHIP &amp; Medicare</h3></a></div>
		      <div class="answer collapse" id="answer-5" aria-describedby="question-5" aria-hidden="true">
		        <ul class="link-list">
		          <li><a href="/medicaid-chip">Medicaid &amp; CHIP</a></li>
		          <li><a href="/medicare">Medicare and the Marketplace</a></li>
		        </ul>
		      </div>
		    </li>
		  </ul>
		  <ul class="faq col-sm-6 right">
		    <li class="faq-question">
		      <div><a id="question-7" class="question serif collapsed" data-toggle="collapse" data-target="#answer-7" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right"></span><h3 class="rule">Information About Health Coverage</h3></a></div>
		      <div class="answer collapse" id="answer-7" aria-describedby="question-7" aria-hidden="true">
		        <ul class="link-list">
		          <li><a href="/using-marketplace-coverage">Using your Marketplace coverage</a></li>
		          <li><a href="/why-coverage-is-important">Why health coverage is important</a></li>
		          <li><a href="/taxes">Marketplace coverage &amp; taxes</a></li>
		          <li><a href="/preventive-care-benefits">Preventive care benefits</a></li>
		          <li><a href="/health-care-law-protections">Rights and protections</a></li>
		          <li><a href="/marketplace-appeals">Appeal a Marketplace decision</a></li>
		          <li><a href="/current-plan-changed-or-cancelled">If your grandfathered health plan is changed or cancelled</a></li>
		        </ul>
		      </div>
		    </li>
		    <li class="faq-question">
		      <div><a id="question-9" class="question serif collapsed" data-toggle="collapse" data-target="#answer-9" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right"></span><h3 class="rule">Coverage For. . .</h3></a></div>
		      <div class="answer collapse" id="answer-9" aria-describedby="question-9" aria-hidden="true">
		        <ul class="link-list">
		          <li><a href="/immigrants">Immigrants</a></li>
		          <li><a href="/young-adults">Young adults</a></li>
		          <li><a href="/self-employed">Self-employed people</a></li>
		          <li><a href="/unemployed">Unemployed people</a></li>
		          <li><a href="/people-with-disabilities">People with disabilities</a></li>
		          <li><a href="/have-job-based-coverage">People with job-based coverage</a></li>
		          <li><a href="/veterans">Military veterans</a></li>
		          <li><a href="/american-indians-alaska-natives">American Indians &amp; Alaska Natives</a></li>
		          <li><a href="/what-if-im-pregnant-or-plan-to-get-pregnant">Pregnant women</a></li>
		          <li><a href="/married-same-sex-couples-and-the-marketplace">Same-sex married couples</a></li>
		          <li><a href="/retirees">Retirees</a></li>
		          <li><a href="/incarcerated-people">Incarcerated people</a></li>
		        </ul>
		      </div>
		    </li>
		    <li class="faq-question">
		      <div><a id="question-" class="question serif collapsed" data-toggle="collapse" data-target="#answer-" aria-expanded="false" tabindex="0" role="tab" aria-selected="false"><span class="glyphicon glyphicon-chevron-right pull-right"></span><h3 class="rule">Small Businesses</h3></a></div>
		      <div class="answer collapse" id="answer-" aria-describedby="question-" aria-hidden="true">
		        <ul class="link-list"> 
		          <li><a href="/small-businesses/employers">For Employers</a></li>
		          <li><a href="/small-businesses/employees">For Employees</a></li> 
		        </ul>
		      </div>
		    </li>
		  </ul>
		</div>
		<div class="clearfix"></div>
		{% endhighlight %}
	</div>
	<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="navigation-accordion-code" role="button">Copy</a>
</div>

<hr />

## Footer Accordion

description text here

<div class="code-wrapper">
	<div class="preview grey-bg">
		<footer class="footer-small" role="complementary">
			<div class="hidden-xs">
		      <div class="row">
		        <div class="col-sm-7">
		          <a href="/" class="icon marketplace">Health Insurance Marketplace</a>
		        </div>
		      </div>
		      <hr>
		      <div class="row spacer-bottom20" style="overflow: hidden;">
		        <div class="col-resources col-sm-6">
		          <div>
		            <h3>Resources</h3>
		              <div class="col-sm-5">
		                <ul class="list-unstyled default">
		                  <li>
		                    <a href="http://www.hhs.gov/healthcare/">About the Affordable Care Act</a>
		                  </li>
		                  <li>
		                    <a href="http://www.cms.gov/cciio/index.html">Regulatory and Policy Information</a>
		                  </li>
		                  <li>
		                    <a href="http://marketplace.cms.gov/">For Partners</a>
		                  </li>
		                  <li>
		                    <a href="http://www.cms.gov/Newsroom/Newsroom-Center.html">For the Media</a>
		                  </li>
		                </ul>      
		              </div>
		              <div class="col-sm-5 col-sm-offset-2">
		                <ul class="list-unstyled default">
		                    <li>
		                      <a href="https://www.healthcare.gov/health-and-dental-plan-datasets-for-researchers-and-issuers/">For Researchers</a>
		                    </li>
		                    <li>
		                      <a href="http://www.cms.gov/CCIIO/Programs-and-Initiatives/Health-Insurance-Marketplaces/State-Marketplace-Resources.html">For States</a>
		                    </li>
		                    <li>
		                      <a href="/language-resource/">Information in other languages</a>
		                    </li>
		                  </ul>
		                </div>
		              </div>
		            </div>
		            <div class="col-connect-with-us col-sm-5 col-sm-offset-1">
		              <div>
		                <h3>
		                  <a href="/connect/">Connect With Us</a>
		                </h3>
		                <ul class="list-unstyled default bottom20">
		                  <li>
		                    <a href="/contact-us/" class="row-link" data-remote="false">
		                    <div class="row">
		                      <div class="col-sm-1">
		                      <span class="glyphicons phone_alt"></span>
		                      </div>
		                      <div class="col-sm-10 nudge-right">
		                      <span class="text">Questions? Give us a call</span>
		                      </div>
		                    </div>
		                    </a>
		                  </li>       
		                  <li>
		                    <a href="/subscribe" class="row-link" data-toggle="modal" data-target="#subscribe-modal" data-remote="false">
		                    <div class="row">
		                      <div class="col-sm-1">
		                      <span class="glyphicons envelope"></span>
		                      </div>
		                      <div class="col-sm-10 nudge-right">
		                      <span class="text">Get text or email updates</span>
		                      </div>
		                    </div>
		                    </a>
		                  </li>
		                  <li>
		                    <a href="/blog" class="row-link" data-remote="false">
		                    <div class="row">
		                      <div class="col-sm-1">
		                      <span class="glyphicons comments"></span>
		                      </div>
		                      <div class="col-sm-10 nudge-right">
		                      <span class="text">Visit the HealthCare.gov blog</span>
		                      </div>
		                    </div>
		                    </a>   
		                  </li>
		                </ul>
		                <ul class="list-unstyled default bottom20">
		                  <li class="social-icon">          
		                      <a class="icon facebook" href="//www.facebook.com/Healthcare.gov" target="_blank">Facebook</a>
		                      <a class="icon twitter" href="//twitter.com/HealthCareGov" target="_blank">Twitter</a>
		                      <a class="icon youtube" href="//www.youtube.com/HealthCareGov" target="_blank">YouTube</a>
		                      <a class="icon google-plus" href="//plus.google.com/+healthcaregov" target="_blank">Google+</a>
		                  </li>
		              </ul>
		            </div>
		          </div>
		        </div>
		        <div class="row row-links">
		          <div class="col-sm-5">
		            <small class="up-case">
		                  <a href="/sitemap">Sitemap</a>
		                 |
		                  <a href="/glossary">Glossary</a>
		                 |
		                  <a href="/contact-us">Contact Us</a>  
		                 |
		                  <a href="/archive">Archive</a>
		            </small>
		          </div>
		          <div class="col-sm-7 text-right">
		            <small class="up-case">    
		                  <a target="_blank" href="http://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/CMSNondiscriminationNotice.html">Nondiscrimination / Accessibility</a>
		                 |
		                  <a href="/privacy">Privacy</a>
		                 |
		                  <a href="/privacy//#thirdparty">Linking Policy</a>
		                 |
		                  <a href="/using-this-site">Using This Site</a>
		                 |
		                  <a target="_blank" href="http://www.hhs.gov/open/plain-writing/index.html">Plain Writing</a>
		            </small>
		          </div>
		        </div>
		        <div class="row">
		          <div class="col-sm-5 col-lg-3" style="font-size: 10px; line-height: 14px;">
		            <a title="HHS.gov" class="icon eagle" href="http://www.hhs.gov/">
		              HHS.gov
		            </a>
		            <span>A federal government website managed by the U.S. Centers for Medicare &amp; Medicaid Services. 7500 Security Boulevard, Baltimore, MD 21244</span>
		          </div> 
		          <div class="col-sm-5 pull-right">
		            <ul class="list-inline pull-right">
		              <li><a title="Whitehouse.gov" class="icon whitehouse" href="http://www.whitehouse.gov/">
		                Whitehouse.gov
		              </a></li>
		              <li><a title="USA.gov" class="icon usagov" href="http://www.usa.gov/">
		                USA.gov
		              </a></li>
		            </ul>
		          </div>
		        </div>
			</div>
			<div class="visible-xs">
		      <a href="/" class="icon marketplace-mobile">Health Insurance Marketplace</a>
		      <hr>
		      <div class="panel-group spacer-bottom20" id="accordion">
		        <div class="panel">
		          <div class="panel-heading">
		            <h3 class="panel-title">
		              <a data-toggle="collapse" data-target="#collapseOne" href="#collapseOne" role="tab" aria-selected="false" aria-expanded="false" id="ui-collapse-193">
		                Resources
		                <span class="glyphicon glyphicon-chevron-down pull-right"></span>
		              </a>
		            </h3>
		          </div>    
		          <div id="collapseOne" class="panel-collapse collapse in">
		            <div class="panel-body">
		              <ul class="list-unstyled default">     
		                  <li>
		                    <a href="http://www.hhs.gov/healthcare/">About the Affordable Care Act</a>
		                  </li>
		                  <li>
		                    <a href="http://www.cms.gov/cciio/index.html">Regulatory and Policy Information</a>
		                  </li>
		                  <li>
		                    <a href="http://marketplace.cms.gov/">For Partners</a>
		                  </li>
		                  <li>
		                    <a href="http://www.cms.gov/Newsroom/Newsroom-Center.html">For the Media</a>
		                  </li>
		                  <li>
		                    <a href="https://www.healthcare.gov/health-and-dental-plan-datasets-for-researchers-and-issuers/">For Researchers</a>
		                  </li>
		                  <li>
		                    <a href="http://www.cms.gov/CCIIO/Programs-and-Initiatives/Health-Insurance-Marketplaces/State-Marketplace-Resources.html">For States</a>
		                  </li>
		                  <li>
		                    <a href="/language-resource/">Information in other languages</a>
		                  </li>
		              </ul>
		            </div>
		          </div>
		        </div>
		        <div class="panel no-border">
		          <div class="panel-heading">
		            <h3 class="panel-title">
		              <a data-toggle="collapse" data-target="#collapseTwo" href="#collapseTwo" role="tab" aria-selected="false" aria-expanded="false" id="ui-collapse-544">
		                Connect With Us
		                <span class="glyphicon glyphicon-chevron-down pull-right"></span>
		              </a>
		            </h3>
		          </div>
		          <div id="collapseTwo" class="panel-collapse collapse">
		            <div class="panel-body">
		              <ul class="list-unstyled default">
		                  <li>
		                  <div class="row">
		                    <div class="col-sm-1 pull-left">              
		                      <a class="glyphicons phone_alt" href="/contact-us/" aria-hidden="true"></a>
		                    </div>
		                    <div class="col-sm-11 nudge-right">
		                      <a href="/contact-us/">Questions? Give us a call</a>
		                    </div>
		                  </div>
		                </li>
		                <li>
		                  <div class="row">
		                    <div class="col-sm-1 pull-left">              
		                      <a class="glyphicons envelope" href="/subscribe" data-toggle="modal" data-target="#subscribe-modal" aria-hidden="true"></a>
		                    </div>         
		                    <div class="col-sm-11 nudge-right">
		                      <a href="/subscribe">Get text or email updates</a>
		                    </div>
		                  </div>
		                </li>
		                <li>
		                  <div class="row">
		                    <div class="col-sm-1 pull-left">              
		                      <a class="glyphicons comments" href="/blog" aria-hidden="true"></a>
		                    </div>
		                    <div class="col-sm-11 nudge-right">
		                      <a href="/blog">Visit the HealthCare.gov blog</a>
		                    </div>
		                  </div>
		                  </li>
		                </ul>
		            </div>
		          </div>
		        	<ul class="list-unstyled default bottom20">
		        		<li class="social-icon clearfix">    		  
		        			<a class="icon facebook" href="//www.facebook.com/Healthcare.gov" target="_blank">Facebook</a>
		        			<a class="icon twitter" href="//twitter.com/HealthCareGov" target="_blank">Twitter</a>
		        			<a class="icon youtube" href="//www.youtube.com/HealthCareGov" target="_blank">YouTube</a>
		        			<a class="icon google-plus" href="//plus.google.com/+healthcaregov" target="_blank">Google+</a>        		  
		        		</li>
		        	</ul>  
		        </div>
		        <hr class="last-row">
		      </div>
		      <div class="row spacer-bottom20">
		        <div class="col-xs-12 text-center">
		          <small class="up-case">
		            <a href="/sitemap">Sitemap</a>
		               |
		            <a href="/glossary">Glossary</a>
		               |
		            <a href="/contact-us">Contact Us</a>
		               |
		            <a href="/archive">Archive</a>
		          </small>
		        </div>
		      </div>
		      <div class="row spacer-bottom20">
		        <div class="col-xs-12 text-center">
		          <small class="up-case">
		            <a target="_blank" href="http://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/CMSNondiscriminationNotice.html">Nondiscrimination / Accessibility</a>
		               |
		            <a href="/privacy">Privacy</a>
		               |             
		            <a href="/privacy//#thirdparty">Linking Policy</a>
		               |              
		            <a href="/using-this-site">Using This Site</a>
		               |              
		            <a target="_blank" href="http://www.hhs.gov/open/plain-writing/index.html">Plain Writing</a>
		          </small>
		        </div>  
		      </div>
		      <div class="row tiny-text">
		        <div class="col-xs-12 text-center">
		          <a title="HHS.gov" class="icon eagle gov-icons-center" href="http://www.hhs.gov/">
		            HHS.gov
		          </a>
		          A federal government website managed by the U.S. Centers for Medicare &amp; Medicaid Services. 7500 Security Boulevard, Baltimore, MD 21244
		        </div>
		      </div>
		      <div class="row">
		        <div class="col-xs-12">
		          <ul class="list-inline gov-icons-center">
		            <li><a title="Whitehouse.gov" class="icon whitehouse" href="http://www.whitehouse.gov/">
		              Whitehouse.gov
		            </a></li>
		            <li><a title="USA.gov" class="icon usagov" href="http://www.usa.gov/">
		              USA.gov
		            </a></li>
		          </ul>
		        </div>
		      </div>
			</div>
		</footer>
	</div>
	<div id="footer-accordion-code">
		{% highlight text %}
		<footer class="footer-small" role="complementary">
			<div class="hidden-xs">
		      <div class="row">
		        <div class="col-sm-7">
		          <a href="/" class="icon marketplace">Health Insurance Marketplace</a>
		        </div>
		      </div>
		      <hr>
		      <div class="row spacer-bottom20" style="overflow: hidden;">
		        <div class="col-resources col-sm-6">
		          <div>
		            <h3>Resources</h3>
		              <div class="col-sm-5">
		                <ul class="list-unstyled default">
		                  <li>
		                    <a href="http://www.hhs.gov/healthcare/">About the Affordable Care Act</a>
		                  </li>
		                  <li>
		                    <a href="http://www.cms.gov/cciio/index.html">Regulatory and Policy Information</a>
		                  </li>
		                  <li>
		                    <a href="http://marketplace.cms.gov/">For Partners</a>
		                  </li>
		                  <li>
		                    <a href="http://www.cms.gov/Newsroom/Newsroom-Center.html">For the Media</a>
		                  </li>
		                </ul>      
		              </div>
		              <div class="col-sm-5 col-sm-offset-2">
		                <ul class="list-unstyled default">
		                    <li>
		                      <a href="https://www.healthcare.gov/health-and-dental-plan-datasets-for-researchers-and-issuers/">For Researchers</a>
		                    </li>
		                    <li>
		                      <a href="http://www.cms.gov/CCIIO/Programs-and-Initiatives/Health-Insurance-Marketplaces/State-Marketplace-Resources.html">For States</a>
		                    </li>
		                    <li>
		                      <a href="/language-resource/">Information in other languages</a>
		                    </li>
		                  </ul>
		                </div>
		              </div>
		            </div>
		            <div class="col-connect-with-us col-sm-5 col-sm-offset-1">
		              <div>
		                <h3>
		                  <a href="/connect/">Connect With Us</a>
		                </h3>
		                <ul class="list-unstyled default bottom20">
		                  <li>
		                    <a href="/contact-us/" class="row-link" data-remote="false">
		                    <div class="row">
		                      <div class="col-sm-1">
		                      <span class="glyphicons phone_alt"></span>
		                      </div>
		                      <div class="col-sm-10 nudge-right">
		                      <span class="text">Questions? Give us a call</span>
		                      </div>
		                    </div>
		                    </a>
		                  </li>       
		                  <li>
		                    <a href="/subscribe" class="row-link" data-toggle="modal" data-target="#subscribe-modal" data-remote="false">
		                    <div class="row">
		                      <div class="col-sm-1">
		                      <span class="glyphicons envelope"></span>
		                      </div>
		                      <div class="col-sm-10 nudge-right">
		                      <span class="text">Get text or email updates</span>
		                      </div>
		                    </div>
		                    </a>
		                  </li>
		                  <li>
		                    <a href="/blog" class="row-link" data-remote="false">
		                    <div class="row">
		                      <div class="col-sm-1">
		                      <span class="glyphicons comments"></span>
		                      </div>
		                      <div class="col-sm-10 nudge-right">
		                      <span class="text">Visit the HealthCare.gov blog</span>
		                      </div>
		                    </div>
		                    </a>   
		                  </li>
		                </ul>
		                <ul class="list-unstyled default bottom20">
		                  <li class="social-icon">          
		                      <a class="icon facebook" href="//www.facebook.com/Healthcare.gov" target="_blank">Facebook</a>
		                      <a class="icon twitter" href="//twitter.com/HealthCareGov" target="_blank">Twitter</a>
		                      <a class="icon youtube" href="//www.youtube.com/HealthCareGov" target="_blank">YouTube</a>
		                      <a class="icon google-plus" href="//plus.google.com/+healthcaregov" target="_blank">Google+</a>
		                  </li>
		              </ul>
		            </div>
		          </div>
		        </div>
		        <div class="row row-links">
		          <div class="col-sm-5">
		            <small class="up-case">
		                  <a href="/sitemap">Sitemap</a>
		                 |
		                  <a href="/glossary">Glossary</a>
		                 |
		                  <a href="/contact-us">Contact Us</a>  
		                 |
		                  <a href="/archive">Archive</a>
		            </small>
		          </div>
		          <div class="col-sm-7 text-right">
		            <small class="up-case">    
		                  <a target="_blank" href="http://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/CMSNondiscriminationNotice.html">Nondiscrimination / Accessibility</a>
		                 |
		                  <a href="/privacy">Privacy</a>
		                 |
		                  <a href="/privacy//#thirdparty">Linking Policy</a>
		                 |
		                  <a href="/using-this-site">Using This Site</a>
		                 |
		                  <a target="_blank" href="http://www.hhs.gov/open/plain-writing/index.html">Plain Writing</a>
		            </small>
		          </div>
		        </div>
		        <div class="row">
		          <div class="col-sm-5 col-lg-3" style="font-size: 10px; line-height: 14px;">
		            <a title="HHS.gov" class="icon eagle" href="http://www.hhs.gov/">
		              HHS.gov
		            </a>
		            <span>A federal government website managed by the U.S. Centers for Medicare &amp; Medicaid Services. 7500 Security Boulevard, Baltimore, MD 21244</span>
		          </div> 
		          <div class="col-sm-5 pull-right">
		            <ul class="list-inline pull-right">
		              <li><a title="Whitehouse.gov" class="icon whitehouse" href="http://www.whitehouse.gov/">
		                Whitehouse.gov
		              </a></li>
		              <li><a title="USA.gov" class="icon usagov" href="http://www.usa.gov/">
		                USA.gov
		              </a></li>
		            </ul>
		          </div>
		        </div>
			</div>
			<div class="visible-xs">
		      <a href="/" class="icon marketplace-mobile">Health Insurance Marketplace</a>
		      <hr>
		      <div class="panel-group spacer-bottom20" id="accordion">
		        <div class="panel">
		          <div class="panel-heading">
		            <h3 class="panel-title">
		              <a data-toggle="collapse" data-target="#collapseOne" href="#collapseOne" role="tab" aria-selected="false" aria-expanded="false" id="ui-collapse-193">
		                Resources
		                <span class="glyphicon glyphicon-chevron-down pull-right"></span>
		              </a>
		            </h3>
		          </div>    
		          <div id="collapseOne" class="panel-collapse collapse in">
		            <div class="panel-body">
		              <ul class="list-unstyled default">     
		                  <li>
		                    <a href="http://www.hhs.gov/healthcare/">About the Affordable Care Act</a>
		                  </li>
		                  <li>
		                    <a href="http://www.cms.gov/cciio/index.html">Regulatory and Policy Information</a>
		                  </li>
		                  <li>
		                    <a href="http://marketplace.cms.gov/">For Partners</a>
		                  </li>
		                  <li>
		                    <a href="http://www.cms.gov/Newsroom/Newsroom-Center.html">For the Media</a>
		                  </li>
		                  <li>
		                    <a href="https://www.healthcare.gov/health-and-dental-plan-datasets-for-researchers-and-issuers/">For Researchers</a>
		                  </li>
		                  <li>
		                    <a href="http://www.cms.gov/CCIIO/Programs-and-Initiatives/Health-Insurance-Marketplaces/State-Marketplace-Resources.html">For States</a>
		                  </li>
		                  <li>
		                    <a href="/language-resource/">Information in other languages</a>
		                  </li>
		              </ul>
		            </div>
		          </div>
		        </div>
		        <div class="panel no-border">
		          <div class="panel-heading">
		            <h3 class="panel-title">
		              <a data-toggle="collapse" data-target="#collapseTwo" href="#collapseTwo" role="tab" aria-selected="false" aria-expanded="false" id="ui-collapse-544">
		                Connect With Us
		                <span class="glyphicon glyphicon-chevron-down pull-right"></span>
		              </a>
		            </h3>
		          </div>
		          <div id="collapseTwo" class="panel-collapse collapse">
		            <div class="panel-body">
		              <ul class="list-unstyled default">
		                  <li>
		                  <div class="row">
		                    <div class="col-sm-1 pull-left">              
		                      <a class="glyphicons phone_alt" href="/contact-us/" aria-hidden="true"></a>
		                    </div>
		                    <div class="col-sm-11 nudge-right">
		                      <a href="/contact-us/">Questions? Give us a call</a>
		                    </div>
		                  </div>
		                </li>
		                <li>
		                  <div class="row">
		                    <div class="col-sm-1 pull-left">              
		                      <a class="glyphicons envelope" href="/subscribe" data-toggle="modal" data-target="#subscribe-modal" aria-hidden="true"></a>
		                    </div>         
		                    <div class="col-sm-11 nudge-right">
		                      <a href="/subscribe">Get text or email updates</a>
		                    </div>
		                  </div>
		                </li>
		                <li>
		                  <div class="row">
		                    <div class="col-sm-1 pull-left">              
		                      <a class="glyphicons comments" href="/blog" aria-hidden="true"></a>
		                    </div>
		                    <div class="col-sm-11 nudge-right">
		                      <a href="/blog">Visit the HealthCare.gov blog</a>
		                    </div>
		                  </div>
		                  </li>
		                </ul>
		            </div>
		          </div>
		        	<ul class="list-unstyled default bottom20">
		        		<li class="social-icon clearfix">    		  
		        			<a class="icon facebook" href="//www.facebook.com/Healthcare.gov" target="_blank">Facebook</a>
		        			<a class="icon twitter" href="//twitter.com/HealthCareGov" target="_blank">Twitter</a>
		        			<a class="icon youtube" href="//www.youtube.com/HealthCareGov" target="_blank">YouTube</a>
		        			<a class="icon google-plus" href="//plus.google.com/+healthcaregov" target="_blank">Google+</a>        		  
		        		</li>
		        	</ul>  
		        </div>
		        <hr class="last-row">
		      </div>
		      <div class="row spacer-bottom20">
		        <div class="col-xs-12 text-center">
		          <small class="up-case">
		            <a href="/sitemap">Sitemap</a>
		               |
		            <a href="/glossary">Glossary</a>
		               |
		            <a href="/contact-us">Contact Us</a>
		               |
		            <a href="/archive">Archive</a>
		          </small>
		        </div>
		      </div>
		      <div class="row spacer-bottom20">
		        <div class="col-xs-12 text-center">
		          <small class="up-case">
		            <a target="_blank" href="http://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/CMSNondiscriminationNotice.html">Nondiscrimination / Accessibility</a>
		               |
		            <a href="/privacy">Privacy</a>
		               |             
		            <a href="/privacy//#thirdparty">Linking Policy</a>
		               |              
		            <a href="/using-this-site">Using This Site</a>
		               |              
		            <a target="_blank" href="http://www.hhs.gov/open/plain-writing/index.html">Plain Writing</a>
		          </small>
		        </div>  
		      </div>
		      <div class="row tiny-text">
		        <div class="col-xs-12 text-center">
		          <a title="HHS.gov" class="icon eagle gov-icons-center" href="http://www.hhs.gov/">
		            HHS.gov
		          </a>
		          A federal government website managed by the U.S. Centers for Medicare &amp; Medicaid Services. 7500 Security Boulevard, Baltimore, MD 21244
		        </div>
		      </div>
		      <div class="row">
		        <div class="col-xs-12">
		          <ul class="list-inline gov-icons-center">
		            <li><a title="Whitehouse.gov" class="icon whitehouse" href="http://www.whitehouse.gov/">
		              Whitehouse.gov
		            </a></li>
		            <li><a title="USA.gov" class="icon usagov" href="http://www.usa.gov/">
		              USA.gov
		            </a></li>
		          </ul>
		        </div>
		      </div>
			</div>
		</footer>
		{% endhighlight %}
	</div>
	<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="footer-accordion-code" role="button">Copy</a>
</div>