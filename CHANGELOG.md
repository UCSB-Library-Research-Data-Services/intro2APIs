# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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