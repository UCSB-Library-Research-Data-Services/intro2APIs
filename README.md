# Unlocking Data. A Gentle Introduction to APIs

This repository contains the source code for the workbook *Unlocking Data: A Gentle Introduction to APIs*, presented at the [UC Love Data Week 2025](https://uc-love-data-week.github.io/2025/). You can access the workbook published version here: [https://ucsb-library-research-data-services.github.io/intro2APIs/chapters/](https://ucsb-library-research-data-services.github.io/intro2APIs/chapters/).

The workbook introduces the fundamentals of working with APIs through explanations, interactive examples, and practical use cases.

## Some technicalities

The book is built with [Quarto](https://quarto.org/) and relies heavily on [Observable JS](https://quarto.org/docs/interactive/ojs/) to provide live, interactive content.

## How to publish the book

Because we require API keys to run the examples, the book is build using [Github Actions](https://quarto.org/docs/publishing/github-pages.html#github-action). If the repository is fork, be sure to set the API keys in the Github Actions secrets. See `_environment.required` file to know which API keys are required to make the examples work.

Publications are done using the `.github/workflows/publish.yml` file, which is triggered by a push to the `main` branch, and deploy the book to the `gh-pages` branch. The `gh-pages` branch must exist before the first publication and be set as the branch to build and deploy your Github Pages site.

We opt for execute the code as part of a Github Action, because it allows us to fetch the data from external sources. Updated computations are still stored in `_freeze` folder, and it's recommended using a Python virtual environment to run Quarto and install the required packages using `requirements.txt` file.

## Known issues

- Some Observable JS (OJS) code may not execute correctly during local builds. This issue arises because accessing environment variables in Quarto with OJS is not straightforward. As a result, there is a risk that API keys could inadvertently be exposed in the build output.
