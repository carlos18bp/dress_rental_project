import os
import sys

# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Rental Dress'
copyright = '2023, Carlos Mario Blanco Perez'
author = 'Carlos Mario Blanco Perez'
release = 'https://github.com/carlos18bp/dress_rental_project'

sys.path.insert(0, os.path.abspath('../dress_rental_project'))

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
  'sphinx.ext.autodoc',
]

autodoc_mock_imports = [
    'django',
    'dress_rental',
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'alabaster'
html_static_path = ['_static']
