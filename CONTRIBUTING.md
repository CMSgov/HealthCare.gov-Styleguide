# Contributing to the HealthCare.gov Styleguide

Before contributing, please  read through this document to ensure the process is easy and effective for everyone involved. You should use [the GitHub Workflow](http://guides.github.com/overviews/flow/) (either on your computer, or [in the browser](https://github.com/blog/1557-github-flow-in-the-browser)) to make any changes to the repository. In other words:

* Never commit directly to the master branch unless you're fixing a very obvious typo or mistake that does not warrant any discussion.
* Open [a new pull request](github.com/government/best-practices/compare) to propose changes to any file in this repository. Depending on the changes proposed, the pull request should either be against the [master or gh-pages branch](#do-i-submit-a-pull-request-against-master-or-gh-pages-branch).  

New to GitHub? The [GitHub Guides](http://guides.github.com) are a great place to start.

## Table of contents

- [Starting a new discussion](#starting-a-new-discussion)
- [Submitting a pull request](#submitting-a-pull-request)
- [Do I submit a pull request against master or gh-pages branch?](#do-i-submit-a-pull-request-against-master-or-gh-pages-branch)

## Starting a new discussion

To start a new discussion, simply create a new issue and ask away. Think of it like a traditional list serve. Everyone else in the community will receive an email notification that you've posted a question, and will have the opportunity to reply.

## Submitting a pull request

If your discussion's a bit more substantive, such as a document you want others to contribute to or be able to more easily access going forward, or if you want to modify a file already in the repository, consider [submitting a pull request](https://help.github.com/articles/creating-a-pull-request). It's super easy:

### Overview

1. Create a new, descriptively named branch. For example, if you want to add a file that describes licensing best practices, a great branch name would be `licensing-best-practices`.
2. Make your changes on that new branch
3. Create a pull request against the [master or gh-pages branch](#do-i-submit-a-pull-request-against-master-or-gh-pages-branch), asking the community to merge that new branch into the project.

**Note**: Because filenames are used to generate linkable URLs, all filenames should be lowercase, separating words by hyphens where appropriate.

### The web-flow approach

1. Navigate to https://github.com/CMSgov/HealthCare.gov-Styleguide in your favorite browser and select the fork button in the top-right corner.
2. In your fork, select the branch drop down to create a new, descriptively named branch. 
3. If you want to edit an existing file, simply select the file name, then select the pencil icon (edit) in the top-right corner of the resulting page. If you want to create a new file, select the new file button and name your file `[awesome-file-name].md`. 
4. Make your changes in the online editor. If you're new to [Markdown](https://help.github.com/articles/github-flavored-markdown/), click any white space on the page (to move your cursor out of the editor), then press the `m` key for a handy cheat sheet.
5. Add a short description of your change, and select the  green "Commit changes" button.
6. In your fork and in your newly created branch, select the "Compare & pull request" button to create a new pull request. ![compare button](https://f.cloud.github.com/assets/282759/1035855/764a0bf0-0f31-11e3-8c05-ddbe0b56e227.png) Select either the [master or gh-pages branch](#do-i-submit-a-pull-request-against-master-or-gh-pages-branch)
7. Enter a title and description, and hit submit.
8. That's it! Your issue has been submitted, others can comments, and the issue will go through the [Styleguide governance process](http://styleguide.healthcare.gov/governance/).

### The command-line approach

Got Git already set up on your computer? Great. Here are the commands needed to submit a pull request:

1. `git clone https://github.com/CMSgov/HealthCare.gov-Styleguide`
2. `cd HealthCare.gov-Styleguide`
3. `git checkout -b [a-descriptive-branch-name]`
4. (make your changes)
5. `git add .`
6. `git commit -m '[a short description of your change]'`
7. `git push <forked remote> <a-descriptive-branch-name>`
8. Head over to your forked repository and change to your descriptive branch name.
9. Select the "Compare & pull request" button and select either the [master or gh-pages branch](#do-i-submit-a-pull-request-against-master-or-gh-pages-branch).

## Do I submit a pull request against master or gh-pages branch?

There are two acceptable branches to submit pull requests against.

* If your change or suggestion is on the code of  http://styleguide.healthcare.gov, then submit pull requests to the gh-pages branch.

* If your change or suggestion is on the code that can be downloaded on the assets [landing page](http://styleguide.healthcare.gov/assets/), then submit pull requests to the master branch.  If the change is accepted, we will ensure this update is also available on the http://styleguide.healthcare.gov website as well.
