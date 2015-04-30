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

<div class="code-wrapper">
	<div class="preview">
		
		<div class="col-xs-12 col-md-3 sidebar" data-ng-class="{open: showSidebar}" aria-controls="plan-results">
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
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;premium=500&amp;state=IL" title="33 less than $500 plans available if you add this filter" target="_self">less than $500&nbsp;<span class="count">(33)</span><span class="sr-only"> less than $500 plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;premium=600&amp;state=IL" title="71 less than $600 plans available if you add this filter" target="_self">less than $600&nbsp;<span class="count">(71)</span><span class="sr-only"> less than $600 plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;premium=700&amp;state=IL" title="102 less than $700 plans available if you add this filter" target="_self">less than $700&nbsp;<span class="count">(102)</span><span class="sr-only"> less than $700 plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;premium=800&amp;state=IL" title="120 less than $800 plans available if you add this filter" target="_self">less than $800&nbsp;<span class="count">(120)</span><span class="sr-only"> less than $800 plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;premium=900&amp;state=IL" title="131 less than $900 plans available if you add this filter" target="_self">less than $900&nbsp;<span class="count">(131)</span><span class="sr-only"> less than $900 plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;premium=1000&amp;state=IL" title="139 less than $1000 plans available if you add this filter" target="_self">less than $1000&nbsp;<span class="count">(139)</span><span class="sr-only"> less than $1000 plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;premium=1100&amp;state=IL" title="143 less than $1100 plans available if you add this filter" target="_self">less than $1100&nbsp;<span class="count">(143)</span><span class="sr-only"> less than $1100 plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;premium=1200&amp;state=IL" title="145 less than $1200 plans available if you add this filter" target="_self">less than $1200&nbsp;<span class="count">(145)</span><span class="sr-only"> less than $1200 plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;premium=1500&amp;state=IL" title="146 less than $1500 plans available if you add this filter" target="_self">less than $1500&nbsp;<span class="count">(146)</span><span class="sr-only"> less than $1500 plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;premium=1700&amp;state=IL" title="147 less than $1700 plans available if you add this filter" target="_self">less than $1700&nbsp;<span class="count">(147)</span><span class="sr-only"> less than $1700 plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                  </div>
	                </div>
	              </div>

	              
	                <p class="information">
	                  
	                    
	                      <a class="help-text" aria-label="opens link in new window" target="_blank" href="/choose-a-plan/premiums/"><span class="glyphicon glyphicon-info-sign" aria-label="information"></span>
	                    
	                  
	                    Get more details about premiums
	                  </a>
	                </p>
	              

	              

	              
	            
	          
	            
	              <div class="panel panel-default">
	                
	                <h5>Coverage categories</h5>
	                <div id="coverage-categories" class="panel-collapse in collapse" data-ng-class="{collapse: true}">
	                  <div class="panel-body">
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;metal=1&amp;state=IL" title="43 Bronze plans plans available if you add this filter" target="_self">Bronze plans&nbsp;<span class="count">(43)</span><span class="sr-only"> Bronze plans plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;metal=2&amp;state=IL" title="52 Silver plans plans available if you add this filter" target="_self">Silver plans&nbsp;<span class="count">(52)</span><span class="sr-only"> Silver plans plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;metal=3&amp;state=IL" title="34 Gold plans plans available if you add this filter" target="_self">Gold plans&nbsp;<span class="count">(34)</span><span class="sr-only"> Gold plans plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;metal=4&amp;state=IL" title="14 Platinum plans plans available if you add this filter" target="_self">Platinum plans&nbsp;<span class="count">(14)</span><span class="sr-only"> Platinum plans plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;metal=5&amp;state=IL" title="4 Catastrophic plans plans available if you add this filter" target="_self">Catastrophic plans&nbsp;<span class="count">(4)</span><span class="sr-only"> Catastrophic plans plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                  </div>
	                </div>
	              </div>

	              

	              
	                <p class="information">
	                  
	                    
	                      <a class="help-text" aria-label="opens link in new window" target="_blank" href="/choose-a-plan/plans-categories/"><span class="glyphicon glyphicon-info-sign" aria-label="information"></span>
	                    
	                  
	                    Get more details about categories
	                  </a>
	                </p>
	              

	              
	            
	          
	            
	              <div class="panel panel-default">
	                
	                <h5>Plan Types</h5>
	                <div id="plan-types" class="panel-collapse in collapse" data-ng-class="{collapse: true}">
	                  <div class="panel-body">
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;state=IL&amp;type=2" title="62 PPO plans available if you add this filter" target="_self">PPO&nbsp;<span class="count">(62)</span><span class="sr-only"> PPO plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;state=IL&amp;type=3" title="85 HMO plans available if you add this filter" target="_self">HMO&nbsp;<span class="count">(85)</span><span class="sr-only"> HMO plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                  </div>
	                </div>
	              </div>

	              

	              

	              
	                <p class="information">
	                  
	                    
	                      <a class="help-text" aria-label="opens link in new window" target="_blank" href="/choose-a-plan/plan-types/"><span class="glyphicon glyphicon-info-sign" aria-label="information"></span>
	                    
	                  
	                    Get more details about plan types
	                  </a>
	                </p>
	              
	            
	          
	            
	              <div class="panel panel-default">
	                
	                <h5>Insurance companies</h5>
	                <div id="insurance-companies" class="panel-collapse in collapse" data-ng-class="{collapse: true}">
	                  <div class="panel-body">
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;issuer=Assurant+Health&amp;state=IL" title="6 Assurant Health plans available if you add this filter" target="_self">Assurant Health&nbsp;<span class="count">(6)</span><span class="sr-only"> Assurant Health plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;issuer=Blue+Cross+and+Blue+Shield+of+Illinois&amp;state=IL" title="22 Blue Cross and Blue Shield of Illinois plans available if you add this filter" target="_self">Blue Cross and Blue Shield of Illinois&nbsp;<span class="count">(22)</span><span class="sr-only"> Blue Cross and Blue Shield of Illinois plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;issuer=Coventry+Health+Care&amp;state=IL" title="5 Coventry Health Care plans available if you add this filter" target="_self">Coventry Health Care&nbsp;<span class="count">(5)</span><span class="sr-only"> Coventry Health Care plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;issuer=Humana+Insurance+Company&amp;state=IL" title="12 Humana Insurance Company plans available if you add this filter" target="_self">Humana Insurance Company&nbsp;<span class="count">(12)</span><span class="sr-only"> Humana Insurance Company plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;issuer=IlliniCare+Health&amp;state=IL" title="66 IlliniCare Health plans available if you add this filter" target="_self">IlliniCare Health&nbsp;<span class="count">(66)</span><span class="sr-only"> IlliniCare Health plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;issuer=Land+of+Lincoln+Mutual+Health+Insurance+Company&amp;state=IL" title="26 Land of Lincoln Mutual Health Insurance Company plans available if you add this filter" target="_self">Land of Lincoln Mutual Health Insurance Company&nbsp;<span class="count">(26)</span><span class="sr-only"> Land of Lincoln Mutual Health Insurance Company plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;issuer=UnitedHealthcare&amp;state=IL" title="10 UnitedHealthcare plans available if you add this filter" target="_self">UnitedHealthcare&nbsp;<span class="count">(10)</span><span class="sr-only"> UnitedHealthcare plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                  </div>
	                </div>
	              </div>

	              

	              

	              
	            
	          
	            
	              <div class="panel panel-default">
	                
	                <h5>Medical management programs</h5>
	                <div id="medical-management-programs" class="panel-collapse in collapse" data-ng-class="{collapse: true}">
	                  <div class="panel-body">
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;medProgram=1&amp;state=IL" title="137 Asthma plans available if you add this filter" target="_self">Asthma&nbsp;<span class="count">(137)</span><span class="sr-only"> Asthma plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;medProgram=2&amp;state=IL" title="126 Heart disease plans available if you add this filter" target="_self">Heart disease&nbsp;<span class="count">(126)</span><span class="sr-only"> Heart disease plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;medProgram=3&amp;state=IL" title="126 Depression plans available if you add this filter" target="_self">Depression&nbsp;<span class="count">(126)</span><span class="sr-only"> Depression plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;medProgram=4&amp;state=IL" title="137 Diabetes plans available if you add this filter" target="_self">Diabetes&nbsp;<span class="count">(137)</span><span class="sr-only"> Diabetes plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;medProgram=5&amp;state=IL" title="126 High blood pressure &amp; cholesterol plans available if you add this filter" target="_self">High blood pressure &amp; cholesterol&nbsp;<span class="count">(126)</span><span class="sr-only"> High blood pressure &amp; cholesterol plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;medProgram=6&amp;state=IL" title="66 Low back pain plans available if you add this filter" target="_self">Low back pain&nbsp;<span class="count">(66)</span><span class="sr-only"> Low back pain plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;medProgram=7&amp;state=IL" title="104 Pain management plans available if you add this filter" target="_self">Pain management&nbsp;<span class="count">(104)</span><span class="sr-only"> Pain management plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                      <div class="select-filter">
	                        <div class="filter-item">
	                          
	                            <a class="apply" href="./?county=17031&amp;data=b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb&amp;medProgram=8&amp;state=IL" title="126 Pregnancy plans available if you add this filter" target="_self">Pregnancy&nbsp;<span class="count">(126)</span><span class="sr-only"> Pregnancy plans available if you add this filter</span></a>
	                          
	                        </div>
	                      </div>
	                    
	                  </div>
	                </div>
	              </div>
	        </form>
        	<div class="search-by-plan">
          <div class="panel panel-default plan-id">
            <h6>Search by Plan <abbr title="Identification Number">ID</abbr></h6>
            <div class="panel-body">
              
                <form action="." method="GET" class="ng-pristine ng-valid" novalidate="true">
                  <label for="plan-id">Enter the 14-character plan <abbr title="Identification Number">ID</abbr>:</label>
                  <input class="form-control" id="plan-id" name="plan" placeholder="Example: 12345XX9876543" autocorrect="off" autocapitalize="off">
                  <input type="submit" value="Search" class="btn btn-alternate">
                  
                    
                      
                        <input type="hidden" name="county" value="17031">
                      
                    
                  
                    
                      
                        <input type="hidden" name="data" value="b680933d705faf7aaaba2c5adf2f25239ae03bb9308169231e6f56b64092ab01dd34646b1deb004417cbd5bd9784e4f58b5ef4c5573d5f068fdcbdb35e53284bb30ab1d52f55544bd74991701eb1a39e25cd70061ed2ec28f91cb07593dc46ec0de431296e3a1e7e7354bc1839e6a4de9f78f54da5eb2c3572b21e27fd3dbc740fc963f98a67f2f4e54edbf5b5be1dac360e32111d5475f16c5ab5cf8d8a1aa1a1bd6d7b67ea5808d53a3750ebb33dcb">
                      
                    
                  
                    
                      
                        <input type="hidden" name="state" value="IL">
                      
                    
                  
                </form>
              
            </div>
          </div>
        	</div>
      	</div>
      	<div class="clearfix"></div>

	</div>
	<div id="skip-to-results-code">
		{% highlight text %}
<div class="notification-box">
	<div>
		<p>Based on the information you've given us so far, it looks like an exemption may apply to you</p>
	</div>
	<button id="seeResult" class="btn btn-primary" label="SEE RESULTS NOW">SEE RESULTS NOW</button>
</div>
		{% endhighlight %}
	</div>
	<a href="javascript:;" class="copy-button" title="Click to copy me." data-clipboard-target="skip-to-results-code" role="button">Copy</a>
</div>
