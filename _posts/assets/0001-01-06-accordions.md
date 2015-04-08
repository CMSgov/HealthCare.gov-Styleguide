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

<div class="code-wrapper">
	<div class="preview row">
		<div id="faq-container">
		  	<ul class="faq">
		        <li class="faq-question">
		          <a role="tab" tabindex="0" aria-expanded="false" data-target="#answer-1" data-toggle="collapse" class="question serif collapsed" id="question-1" aria-selected="false"><span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>What if I’m uncovered for just part of the year?</a>
		          <div aria-describedby="question-1" id="answer-1" class="answer collapse">
		            <div class="qcontent"><p>If you’re uninsured for just part of the year, 1/12 of the yearly penalty applies to each month you’re uninsured.</p>
						<p>If you’re <a href="/exemptions-tool/#/results/details/short-gap">uninsured for no more than 2 months of the year</a>, you don’t have to make a payment.</p>
					</div>
		          </div>
		        </li>
		        <li class="faq-question">
		          <a role="tab" tabindex="0" aria-expanded="false" data-target="#answer-2" data-toggle="collapse" class="question serif collapsed" id="question-2" aria-selected="false"><span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>If I'm unemployed, do I have to pay the fee?</a>
		          <div aria-describedby="question-2" id="answer-2" class="answer collapse">
		            <div class="qcontent"><p>It depends on your household income. If insurance is <a href="/exemptions-tool/#/results/details/marketplace-affordability">unaffordable to you based on your income</a>, you may qualify for an exemption from the fee. Other exemptions are based on low income too. <a href="/fees-exemptions/exemptions-from-the-fee/">Learn more about exemptions and how to claim them</a>.</p>
					</div>
		          </div>
		        </li>
		        <li class="faq-question">
		          <a role="tab" tabindex="0" aria-expanded="false" data-target="#answer-3" data-toggle="collapse" class="question serif collapsed" id="question-3" aria-selected="false"><span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>How is the penalty collected?</a>
		          <div aria-describedby="question-3" id="answer-3" class="answer collapse">
		            <div class="qcontent"><p>You’ll pay the penalty when you file the federal income tax return for the year for which you’re seeking coverage. Most people fill out their 2014 tax returns early in 2015 and their 2015 tax returns early in 2016.</p>
					</div>
		          </div>
		        </li>
		        <li class="faq-question">
		          <a role="tab" tabindex="0" aria-expanded="false" data-target="#answer-4" data-toggle="collapse" class="question serif collapsed" id="question-4" aria-selected="false"><span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>What happens if I don't pay the fee?</a>
		          <div aria-describedby="question-4" id="answer-4" class="answer collapse">
		            <div class="qcontent"><p>The IRS will hold back the amount of the fee from any future tax refunds. There are no liens, levies, or criminal penalties for failing to pay the fee.</p>
					</div>
		          </div>
		        </li>
		        <li class="faq-question">
		          <a role="tab" tabindex="0" aria-expanded="false" data-target="#answer-5" data-toggle="collapse" class="question serif collapsed" id="question-5" aria-selected="false"><span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>Are the rules the same in each state?</a>
		          <div aria-describedby="question-5" id="answer-5" class="answer collapse">
		            <div class="qcontent"><p>Yes. The rules about paying penalties are the same whether the Marketplace is run by your state or the federal government.</p>
					</div>
		          </div>
		        </li>
			</ul>
		</div>	
	</div>
	<div id="accordion-code">
		{% highlight text %}
<div id="faq-container">
	<ul class="faq">
		<li class="faq-question">
			<a role="tab" tabindex="0" aria-expanded="false" data-target="#answer-1" data-toggle="collapse" class="question serif collapsed" id="question-1" aria-selected="false"><span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>Question text</a>
			<div aria-describedby="question-1" id="answer-1" class="answer collapse">
				<div class="qcontent"><p>Exandable answer content here.</p></div>
			</div>
		</li>
		....additional <li> items here
	</ul>
</div>
		{% endhighlight %}
	</div>
	<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="secondary-alert-code" role="button">Copy</a>
</div>