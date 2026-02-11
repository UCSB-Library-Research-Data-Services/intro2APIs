# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] – 2026-02-11

### Added
- New **"Getting Data Programmatically"** section with Python coding tutorials:
  - Python Setup chapter with environment configuration and API key handling
  - Helping Functions chapter with URL manipulation and DPLA API helper functions
  - Queries and Analysis chapter demonstrating data retrieval and keyword visualization
- New interactive Jupyter notebook exercises:
  - `exercise-DLPA.ipynb` (student starter version)
  - `exercise-DLPA-resolved.ipynb` (solution version with challenges for pagination and date filtering)
- New cURL chapter for command-line API interactions
- Font Awesome extension for enhanced iconography
- Copilot instructions for AI-assisted development
- Scrollable output styles for improved code execution results display
- Feature box styles for workshop introduction page
- Additional Python dependencies (updated requirements.txt)

### Changed
- Reorganized landing page to avoid instructions on first view
- Improved navigation structure with clearer section titles
- Updated navigation to include "Queries and Analysis" section
- Enhanced API interaction section with updated key request process
- Refactored search functions to include resource type and timeout parameters
- Updated figure dimensions for keyword visualization
- Increased max_items to 400 and page_size to 100 for improved data retrieval
- Increased max-page-size limit to 500 for API requests
- Increased max-height for cell output display for better visibility
- Improved variable naming and code structure for clarity and maintainability

### Fixed
- Corrected curl command for requesting DPLA API key to include POST method
- Fixed link to "What is an API" chapter
- Updated image paths for loading cats data in endpoints
- Fixed image paths for request methods in API interaction chapter
- Added warning about printing API key and environment variable confirmation
- Corrected SCSS file loading and variable settings
- Updated navigation links for consistency across the site

---

## [1.1.0] – 2025-05-12

### Added
- Request Methods episode to Interacting with APIs chapter.
- Introduction to APIs using Postman and The Cat API
- Hands-on chapters with GET, POST, PATCH, DELETE requests
- Environment variable setup with secrets
- New section on working with the **GitHub REST API**, including:
  - Environment variable setup (`gh_token`, `gh_URL`, `owner`, `repo`)
  - Token-based authentication via headers
  - Interactive exercises for:
    - Retrieving user info (`GET /user`)
    - Searching repositories (`GET /search/repositories`)
    - Creating, updating, listing, and unlocking issues (`POST`, `PATCH`, `GET`, `DELETE`)
- New instructional content on reading and translating **GitHub API documentation** into Postman requests
- Example visuals for Postman interface, GitHub responses, and Octocat endpoint

### Changed
- Clarified explanations and formatting in earlier chapters (e.g. Cat API section)
- Improved consistency in variable usage (`url`, `gh_URL`, `api_token`, etc.)

### Fixed
- Minor typos and grammatical improvements throughout
- Corrected outdated references in Postman version and screenshots

---

## [1.0.1] – 2025-02-14
### Fixed
- Minor typo corrections and formatting tweaks for clarity

## [1.0.0] – 2025-02-10
### Added
- Initial public release
- What are APIs and why do they exists
- Interacting with APIs (GET requests) using the Web interface.
- APIs for Data Analysis
- A Catalog of APIs