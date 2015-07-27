---
published: true
layout: landing-page
lang: en
section: governance
title: "Governance of the HealthCare.gov Styleguide"
"meta-title": "Purpose and governance of the HealthCare.gov Styleguide"
"meta-description": "The purpose of the HealthCare.gov Styleguide is to centralize design, development, and editorial features used for HealthCare.gov.  It also serves to make assets publicly available in keeping with digital government strategy objectives as defined by the Federal Government."
---

# Styleguide governance

<div class="intro">
Styleguide.HealthCare.gov provides the major styles, page layouts, and assets for HealthCare.gov. It’s geared primarily towards HealthCare.gov team designers and developers to ensure that the design of all future styles, interfaces, and page layouts adhere to the same guidelines. </div>


<div class="hr"></div>

As a collaborative and open source project, both federal employees and members of the public are strongly encouraged to improve the Styleguide through their [contributions](https://github.com/CMSgov/cmsgov.github.io/blob/master/CONTRIBUTING.md). 

Styleguide.HealthCare.gov 1.0 was initially launched on May 15, 2015. Future updates to the Styleguide will be communicated through release notes. 

## Roles and responsibilities

There are two primary roles in the governance of the Styleguide: The governance workgroup and the GitHub monitor.

### Governance workgroup

The HealthCare.gov Styleguide governance workgroup is made up of Centers for Medicaid and Medicare Services (CMS) staff and contractor teams. They are responsible for:

* Managing assets available through the Styleguide by continuously analyzing industry-wide best practices and standards for consideration.
* Ensuring that Styleguide.HealthCare.gov contains relevant, up-to-date information, assets, and other resources for Styleguide users and stakeholders.
* Managing workflow for proposed contribution to the Styleguide.
* Establishing communication with users about updates and changes to the Styleguide.

### GitHub issues monitor

The GitHub issues monitor is responsible for:

* Monitoring and evaluating feedback submitted via GitHub.
* Bringing issues to the governance workgroup for consideration.

## Procedures

### Usage

The Styleguide is available for public use. Currently, the Styleguide is used by all parts of HealthCare.gov.

The Styleguide usage requirements are:

* All new HealthCare.gov development is expected to reference the Styleguide.
* The Styleguide resources and UI components will be available for download by developers at http://Styleguide.HealthCare.gov. The download package will allow developers to rapidly kick-start responsive, accessible websites and applications.

### Feedback

We appreciate any contribution. Before contributing, we encourage you to read our [contribution policy](https://github.com/CMSgov/cmsgov.github.io/blob/master/CONTRIBUTING.md), our [license](https://github.com/CMSgov/cmsgov.github.io/blob/master/LICENSE.md), and our [README](https://github.com/CMSgov/cmsgov.github.io/blob/master/README.md), all of which can be found in the Styleguide’s GitHub repository.

Your changes will appear once they are approved. Ultimately, the goal is for users to contribute to the project by suggesting changes to the code or content. You can start a new discussion within GitHub's [issues](https://github.com/CMSgov/cmsgov.github.io/issues) or [submit a pull request](https://help.github.com/articles/creating-a-pull-request/).  There are two acceptable branches to submit pull requests against:

* If your change or suggestion is on the code of  http://styleguide.healthcare.gov, then submit pull requests to the gh-pages branch.

* If your change or suggestion is on the code that can be downloaded on the assets [landing page](http://styleguide.healthcare.gov/assets/), then submit pull requests to the master branch.  If the change is accepted, we will ensure this update is also available on the http://styleguide.healthcare.gov website as well.

### Notifications

Internal teams will be notified of updates and new deployments by the HealthCare.gov Styleguide governance workgroup. Teams will have the opportunity to vet any changes in advance.
External consumers of the Styleguide will be notified via release notes. In the release notes we detail the purpose of all updates made in each new version of the Styleguide. New resources are listed by filename, and include a description and its version number.

### Support

All approved issues will get logged and tracked in JIRA by CMS and its contractors, and managed in a product backlog. The governance workgroup will review the active backlog during regularly scheduled governance meetings to determine priority and assign release dates.

## Versioning

The Styleguide will employ a sequence-based versioning system to differentiate releases. A typical release of the Styleguide will be identified by a version number constructed in the following format: major.minor.revision

Determination of what constitutes a new revision, minor change, or major change is at the discretion of the governance workgroup based on  the following guidelines:

* Revision: Minor bug has been fixed or an ancillary library has been updated to a newer version.
* Minor: Minor features have been added or a significant bug fix has been made.
* Major: Major new features have been added or an important library has been upgraded (such as jQuery) within the package.

Typically, when a minor release has been made, the revision number should be reset to 0 (e.g., the minor release following version 12.1.10 would be 12.2.0). When the major release number is incremented, both the minor and revision numbers should be reset to 0 (in the preceding example the major release would be version 13.0.0).

## Policies

Policies for the HealthCare.gov Styleguide are developed in accordance with federal requirements and guidance from CMS, HHS, and the HealthCare.gov Styleguide governance workgroup.

## Copyright

All content on the site is in the public domain. Some materials may have been contributed by private individuals or government organizations with the understanding that the material is now in the public domain.

## Language

Content for the Styleguide is currently produced in English. Some UI components are also available in Spanish.

## Standards

The Styleguide follows best practices and standards to give developers the tools needed to create websites and web applications that are accessible to all visitors, regardless of browser, device, operating system, or disability. The HealthCare.gov Styleguide website is tested on a regular basis for conformance with Section 508 requirements.

### Responsive design

Responsive design is a web standard for cross-platform compatibility. It uses the latest web development markup, HTML5, and CSS3. Its purpose is to allow the same web page to render a unique view depending on the device’s viewport. By basing the layout of the page on the viewport and not the device itself, it allows the code to be device agnostic and adaptable to future generations of devices.

### Progressive enhancement

Progressive enhancement provides an accessible alternative to HTML content served by the UI. It should be seen as an alternative to graceful degradation, where older browsers with less features simply omit content that they are unable to render. With progressive enhancement, a basic presentable view of the content is always available, then any additions that may not be fully supported for all end users are added to it.

In developing scripts and style sheets for the Styleguide, the first implementation should be one that works across all browsers and with as few technical dependencies as possible. Once features are added, it ensures each of them is a progressive enhancement to the basic version available to all users.

### Graceful degradation

Graceful degradation is the process of deciding how a site should fit smaller screens or less feature-rich browsers. The Styleguide uses CSS and JavaScript to enable older browsers to best render the website and UI components. The Styleguide provides styling and assistive code for disabled visitors viewing the site or UI components with specific solutions for screen readers, enabled high-contrast mode, and other assistive technology.

