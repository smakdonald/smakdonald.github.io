#!/bin/sh

set -ev

# Rscript -e "install.packages('reticulate', repos='http://cran.us.r-project.org')"

Rscript -e "bookdown::render_book('index.Rmd', 'bookdown::gitbook')"
Rscript -e "bookdown::render_book('index.Rmd', 'bookdown::pdf_book')"
Rscript -e "bookdown::render_book('index.Rmd', 'bookdown::epub_book')"

# Rscript -e "bookdown::render_book('index.Rmd', 'bookdown::tufte_html2')"
# Rscript -e "bookdown::render_book('index.Rmd', 'bookdown::tufte_html_book')"
Rscript -e "bookdown::render_book('index.Rmd', 'bookdown::word_document2')"
