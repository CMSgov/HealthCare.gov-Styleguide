# [styleguide.healthcare.gov](https://styleguide.healthcare.gov)

To get started with the HealthCare.gov assets library, you’ll need to use the required HTML, grid system framework, JavaScript, and CSS.

More detail info can be found at [styleguide.healthcare.gov](https://styleguide.healthcare.gov)

## Quick start

A couple of quick start options are available:

- [Download the latest release](https://github.com/CMSgov/cmsgov.github.io/archive/master.zip).
- Clone the repo: `git clone https://github.com/CMSgov/cmsgov.github.io.git`.

Read the [Assets landing page](https://[styleguide.healthcare.gov/assets/) for information on the framework contents, templates and examples, and more.

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

We provide compiled CSS (`style.css`), as well as the CSS Less source. Fonts from Glyphicons are also included. Since the this styleguide's functionality is built directly on top of Bootstrap, you will need to include references to our jQuery and Bootstrap code bases into your html file:

- `https://assets.healthcare.gov/resources/libs/jquery/1.11/js/jquery.min.js`
- `https://assets.healthcare.gov/resources/libs/bootstrap/3.1.1/js/bootstrap.min.js`

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://github.com/twbs/bootstrap/blob/master/CONTRIBUTING.md#using-the-issue-tracker) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/twbs/bootstrap/issues/new).


## Documentation

Healthcare.gov's Style Guide documentation, included in this repo in the gh-pages branch root directory, is built with [Jekyll](http://jekyllrb.com) and publicly hosted on GitHub Pages at <https://styleguide.healthcare.gov/>. The docs may also be run locally.

### Running documentation locally

1. If necessary, [install Jekyll](http://jekyllrb.com/docs/installation) (requires v2.5.x).
  - **Windows users:** Read [this unofficial guide](http://jekyll-windows.juthilo.com/) to get Jekyll up and running without problems.
2. Install the Ruby-based syntax highlighter, [Rouge](https://github.com/jneen/rouge), with `gem install rouge`.
3. From the gh-pages branch root directory, run `jekyll serve` in the command line.
4. Open <http://localhost:9001> in your browser, and you should see the entire Style Guide documentation run locally.

## Contributing

Please read through our [contributing guidelines](https://github.com/CMSgov/cmsgov.github.io/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

## Copyright and license

As a work of the United States Government, this project is in the public domain within the United States.

[Full license can be found here](https://github.com/CMSgov/cmsgov.github.io/blob/master/LICENSE.md).