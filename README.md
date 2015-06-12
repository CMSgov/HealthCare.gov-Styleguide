# [styleguide.healthcare.gov](https://styleguide.healthcare.gov)

To get started with the HealthCare.gov assets library, you’ll need to use the required HTML, grid system framework, JavaScript, and CSS.

More detail info can be found at [styleguide.healthcare.gov](https://styleguide.healthcare.gov)

## Table of contents

- [Quick start](#quick-start)
- [What's included](#whats-included)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Documentation](#documentation)
- [Running documentation locally](#running-documentation-locally)
- [Contributing](#contributing)
- [Copyright and license](#copyright-and-license)

## Quick start

A couple of quick start options are available:

- [Download the latest release](https://github.com/CMSgov/HealthCare.gov-Styleguide/archive/master.zip).
- Clone the repo: `git clone https://github.com/CMSgov/HealthCare.gov-Styleguide.git`.

Read the [Assets landing page](https://styleguide.healthcare.gov/assets/) for information on the framework contents, templates and examples, and more.

### What's included

Within the download you'll find the following directories and files, logically grouping common assets. You'll see something like this:

```
assets-components/
├── css/
│   ├── bootstrap/
│   ├── cards/
│   ├── components/
│   ├── forms/
│   ├── layouts/
│   ├── all.less
│   └── style.css
└── fonts/
    ├── Bitter-Bold.eot
    ├── Bitter-Italic.eot
    ├── Bitter-Regular.eot
    ├── glyphicons-halflings-regular.eot
    ├── OpenSans-Bold-webfont.eot
    ├── OpenSans-Italic-webfont.eot
    ├── OpenSans-Regular-webfont.eot
    └── OpenSans-Semibold-webfont.eot
```

We provide compiled CSS (`style.css`), as well as the CSS Less source. Glyphicon fonts are also included. Since this styleguide's functionality is built directly on top of Bootstrap, you will need to include references to our jQuery and Bootstrap code bases in your html file:

- `https://assets.healthcare.gov/resources/libs/jquery/1.11/js/jquery.min.js`
- `https://assets.healthcare.gov/resources/libs/bootstrap/3.1.1/js/bootstrap.min.js`

**Note**: [Assets.healthcare.gov](https://assets.healthcare.gov) gives you Section 508 compliant, cross-browser compatible UI components that you can use in your accessible web site or web application. Assets is an accessible, responsive, and modern framework.

## Bugs and feature requests

Have a bug to report or a feature to request? Please  read our [contribution policy](https://github.com/CMSgov/HealthCare.gov-Styleguide/blob/master/CONTRIBUTING.md) and search for existing and closed issues. If your problem or idea is not addressed yet, you can [open a new issue](https://github.com/CMSgov/HealthCare.gov-Styleguide/issues/new).


## Documentation

HealthCare.gov's Styleguide documentation, included in this repo in the gh-pages branch root directory, is built with [Jekyll](http://jekyllrb.com) and publicly hosted on GitHub Pages at <https://styleguide.healthcare.gov/>. The docs may also be run locally.

### Running documentation locally

1. If necessary, [install Jekyll](http://jekyllrb.com/docs/installation) (requires version 2.5.x).
  - **Windows users:** Read [this unofficial guide](http://jekyll-windows.juthilo.com/) to get Jekyll up and running without problems.
2. From the gh-pages branch root directory, run `jekyll serve` in the command line.
3. Open <http://localhost:9001> in your browser, and you should see the entire Styleguide documentation run locally.

## Contributing

Please read through our [contribution guidelines](https://github.com/CMSgov/HealthCare.gov-Styleguide/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

## Copyright and license

As a work of the United States Government, this project is in the public domain within the United States.

[Full license can be found here](https://github.com/CMSgov/HealthCare.gov-Styleguide/blob/master/LICENSE.md).
