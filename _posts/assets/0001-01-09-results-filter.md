---
published: true
layout: detail-page
lang: en
section: assets
title: "Results Filter"
nav-title: "Results Filter"
"meta-title": "Get an overview of the Skip to Results Filter pattern used on HealthCare.gov"
"meta-description": "Get an overview of Results Filter pattern used on HealthCare.gov."
nav-category: patterns
categories:
  - assets
---

# Results Filter

<div class="intro">
There are various Results Filters used throughout Healthcare.gov. Results Filters help to narrow the amount of information displayed based on specific parameters chosen by the user.
</div>

<div class="hr"></div>

## See Plans Tool Results Filter 

The See Plans tool can return hundreds of results based on user entered background information. Users can opt to narrow there results by various category types such as costs, plan types, plan categories, etc. which aids the user in selecting the option that best works for them.

<h3 class="label-opensans">Example &amp; Code</h3>

<div class="code-wrapper">
	<div class="preview">
		
		<div class="col-xs-12 col-md-4 sidebar" data-ng-class="{open: showSidebar}" aria-controls="plan-results">
		    <form action="." method="POST" role="form" class="panel-group ng-pristine ng-valid" novalidate="true">
				<div class="hidden-xs hidden-sm">
					<h4>Narrow your results</h4>
					<p>See only plans with these features</p>
				</div>
		    	<a href="#" class="close close-sidebar" data-ng-click="toggleSidebar($event)" target="_self"><span aria-hidden="true">Close <span class="glyphicon glyphicon-remove remove" aria-label="close filter menu and return to results"></span></span><span class="sr-only">Close</span></a>
		    	<div class="panel panel-default">
		            
		            <h5>Premium</h5>
		            <div id="premium" class="panel-collapse in collapse" data-ng-class="{collapse: true}">
		              <div class="panel-body">
		                
		                  <div class="select-filter">
		                    <div class="filter-item">
		                      
		                        <a class="apply" href="#" title="sample title" target="_self">less than $500&nbsp;<span class="count">(33)</span><span class="sr-only"> less than $500 plans available if you add this filter</span></a>
		                      
		                    </div>
		                  </div>
		                
		                  <div class="select-filter">
		                    <div class="filter-item">
		                      
		                        <a class="apply" href="#" title="sample title" target="_self">less than $600&nbsp;<span class="count">(71)</span><span class="sr-only"> less than $600 plans available if you add this filter</span></a>
		                      
		                    </div>
		                  </div>
		                
		                  <div class="select-filter">
		                    <div class="filter-item">
		                      
		                        <a class="apply" href="#" title="sample title" target="_self">less than $700&nbsp;<span class="count">(102)</span><span class="sr-only"> less than $700 plans available if you add this filter</span></a>
		                      
		                    </div>
		                  </div>
		                
		                  <div class="select-filter">
		                    <div class="filter-item">
		                      
		                        <a class="apply" href="#" title="sample title" target="_self">less than $800&nbsp;<span class="count">(120)</span><span class="sr-only"> less than $800 plans available if you add this filter</span></a>
		                      
		                    </div>
		                  </div>
		                
		                  <div class="select-filter">
		                    <div class="filter-item">
		                      
		                        <a class="apply" href="#" title="sample title" target="_self">less than $900&nbsp;<span class="count">(131)</span><span class="sr-only"> less than $900 plans available if you add this filter</span></a>
		                      
		                    </div>
		                  </div>
		                
		                  <div class="select-filter">
		                    <div class="filter-item">
		                      
		                        <a class="apply" href="#" title="sample title" target="_self">less than $1000&nbsp;<span class="count">(139)</span><span class="sr-only"> less than $1000 plans available if you add this filter</span></a>
		                      
		                    </div>
		                  </div>
		                
		                  <div class="select-filter">
		                    <div class="filter-item">
		                      
		                        <a class="apply" href="#" title="sample title" target="_self">less than $1100&nbsp;<span class="count">(143)</span><span class="sr-only"> less than $1100 plans available if you add this filter</span></a>
		                      
		                    </div>
		                  </div>
		                
		                  <div class="select-filter">
		                    <div class="filter-item">
		                      
		                        <a class="apply" href="#" title="sample title" target="_self">less than $1200&nbsp;<span class="count">(145)</span><span class="sr-only"> less than $1200 plans available if you add this filter</span></a>
		                      
		                    </div>
		                  </div>
		                
		                  <div class="select-filter">
		                    <div class="filter-item">
		                      
		                        <a class="apply" href="#" title="sample title" target="_self">less than $1500&nbsp;<span class="count">(146)</span><span class="sr-only"> less than $1500 plans available if you add this filter</span></a>
		                      
		                    </div>
		                  </div>
		                
		                  <div class="select-filter">
		                    <div class="filter-item">
		                      
		                        <a class="apply" href="#" title="sample title" target="_self">less than $1700&nbsp;<span class="count">(147)</span><span class="sr-only"> less than $1700 plans available if you add this filter</span></a>
		                      
		                    </div>
		                  </div>
		                
		              </div>
		            </div>
		        </div>   
		        <p class="information">
		          <a class="help-text" aria-label="opens link in new window" target="_blank" href="#"><span class="glyphicon glyphicon-info-sign" aria-label="information"></span>
		          	Get more details about premiums
		          </a>
		        </p>
		    </form>
		</div>
		<div class="clearfix"></div>
	
	</div>
	<div id="skip-to-results-code">
		{% highlight text %}
<div class="col-xs-12 col-md-4 sidebar" data-ng-class="{open: showSidebar}" aria-controls="plan-results">
    <form action="." method="POST" role="form" class="panel-group ng-pristine ng-valid" novalidate="true">
		<div class="hidden-xs hidden-sm">
			<h4>Narrow your results</h4>
			<p>See only plans with these features</p>
		</div>
    	<a href="#" class="close close-sidebar" data-ng-click="toggleSidebar($event)" target="_self"><span aria-hidden="true">Close <span class="glyphicon glyphicon-remove remove" aria-label="close filter menu and return to results"></span></span><span class="sr-only">Close</span></a>
    	<div class="panel panel-default">
            
            <h5>Premium</h5>
            <div id="premium" class="panel-collapse in collapse" data-ng-class="{collapse: true}">
              <div class="panel-body">
                
                  <div class="select-filter">
                    <div class="filter-item">
                      
                        <a class="apply" href="#" title="sample title" target="_self">less than $500&nbsp;<span class="count">(33)</span><span class="sr-only"> less than $500 plans available if you add this filter</span></a>
                      
                    </div>
                  </div>
                
                  <div class="select-filter">
                    <div class="filter-item">
                      
                        <a class="apply" href="#" title="sample title" target="_self">less than $600&nbsp;<span class="count">(71)</span><span class="sr-only"> less than $600 plans available if you add this filter</span></a>
                      
                    </div>
                  </div>
                
                  <div class="select-filter">
                    <div class="filter-item">
                      
                        <a class="apply" href="#" title="sample title" target="_self">less than $700&nbsp;<span class="count">(102)</span><span class="sr-only"> less than $700 plans available if you add this filter</span></a>
                      
                    </div>
                  </div>
                
                  <div class="select-filter">
                    <div class="filter-item">
                      
                        <a class="apply" href="#" title="sample title" target="_self">less than $800&nbsp;<span class="count">(120)</span><span class="sr-only"> less than $800 plans available if you add this filter</span></a>
                      
                    </div>
                  </div>
                
                  <div class="select-filter">
                    <div class="filter-item">
                      
                        <a class="apply" href="#" title="sample title" target="_self">less than $900&nbsp;<span class="count">(131)</span><span class="sr-only"> less than $900 plans available if you add this filter</span></a>
                      
                    </div>
                  </div>
                
                  <div class="select-filter">
                    <div class="filter-item">
                      
                        <a class="apply" href="#" title="sample title" target="_self">less than $1000&nbsp;<span class="count">(139)</span><span class="sr-only"> less than $1000 plans available if you add this filter</span></a>
                      
                    </div>
                  </div>
                
                  <div class="select-filter">
                    <div class="filter-item">
                      
                        <a class="apply" href="#" title="sample title" target="_self">less than $1100&nbsp;<span class="count">(143)</span><span class="sr-only"> less than $1100 plans available if you add this filter</span></a>
                      
                    </div>
                  </div>
                
                  <div class="select-filter">
                    <div class="filter-item">
                      
                        <a class="apply" href="#" title="sample title" target="_self">less than $1200&nbsp;<span class="count">(145)</span><span class="sr-only"> less than $1200 plans available if you add this filter</span></a>
                      
                    </div>
                  </div>
                
                  <div class="select-filter">
                    <div class="filter-item">
                      
                        <a class="apply" href="#" title="sample title" target="_self">less than $1500&nbsp;<span class="count">(146)</span><span class="sr-only"> less than $1500 plans available if you add this filter</span></a>
                      
                    </div>
                  </div>
                
                  <div class="select-filter">
                    <div class="filter-item">
                      
                        <a class="apply" href="#" title="sample title" target="_self">less than $1700&nbsp;<span class="count">(147)</span><span class="sr-only"> less than $1700 plans available if you add this filter</span></a>
                      
                    </div>
                  </div>
                
              </div>
            </div>
        </div>   
        <p class="information">
          <a class="help-text" aria-label="opens link in new window" target="_blank" href="#"><span class="glyphicon glyphicon-info-sign" aria-label="information"></span>
          	Get more details about premiums
          </a>
        </p>
    </form>
</div>
<div class="clearfix"></div>
	{% endhighlight %}
	</div>
	<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="skip-to-results-code" role="button">Copy</a>
</div>
