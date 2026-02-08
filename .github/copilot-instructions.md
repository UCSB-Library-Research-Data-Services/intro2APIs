# Copilot Instructions for Intro2APIs

## Project Overview
This is a **Quarto-based educational website** introducing APIs fundamentals (UCSB Library Research Data Services workshop). The site emphasizes interactive, browser-based learning using Observable JS (OJS) for live examples and Jupyter notebooks for hands-on coding exercises.

**Key Tech Stack:**
- **Build System:** Quarto (renders .qmd files to HTML/website)
- **Interactivity:** Observable JS (OJS) for client-side dynamic content
- **Code Exercises:** Jupyter notebooks (Python)
- **CI/CD:** GitHub Actions with Node.js script for API data fetching
- **Deployment:** GitHub Pages (gh-pages branch)

## Critical Architecture Patterns

### 1. Environment Variables & API Keys
- **Source:** `.github/secrets` (GitHub Actions) and `_environment.required` (local development)
- **Current API:** `CAT_API_KEY` for TheCatAPI integration
- **Danger Zone:** OJS code can accidentally expose API keys during local builds—use `_dev/cats-fallback.json` as fallback when real API unavailable
- **Pre-Build Script:** [`.github/scripts/fetch-cats.js`](.github/scripts/fetch-cats.js) fetches data via Node.js (handles auth safely server-side), outputs to `_data/cats.json`

### 2. Quarto File Organization
```
chapters/
├── what-is-an-api.qmd          # Conceptual chapters
├── coding/
│   ├── exercise-DLPA.ipynb     # Student exercise (fill-in-the-blanks)
│   ├── exercise-DLPA-resolved.ipynb  # Solution version
│   └── python-setting-up.qmd   # Setup instructions
├── interactingAPIs/
│   ├── endpoints.qmd           # Uses OJS carousel with cat images
│   └── interact-apis.qmd
├── postman/                    # Postman tutorial chapters
├── curl/                       # cURL tutorial
└── dataAnalysis/               # Data wrangling with APIs
```

**Key Patterns:**
- Most chapters are `.qmd` (Quarto Markdown with embedded code blocks)
- Jupyter notebooks are embedded as exercises with Colab/Binder badges
- OJS blocks marked with ````{ojs} for interactive demos (cat API carousel in endpoints.qmd)

### 3. Interactive Content with OJS
- **Location:** Code blocks marked ````{ojs}` within .qmd files
- **Data Source Pattern:** Try real API first, fallback to static JSON
  ```javascript
  cats = {
    try {
      return await FileAttachment("../../_data/cats.json").json();
    } catch (e) {
      return await FileAttachment("../../_dev/cats-fallback.json").json();
    }
  }
  ```
- **Client-Side Fetches:** Use `window.getRandomCat()` ([`_static/js/catapi.js`](_static/js/catapi.js)) for browser-based API calls (no key needed publicly)

### 4. Static Assets
- **Styles:** `_static/css/*.scss` (compiled to site_libs during build)
- **Images:** `_static/imgs/` (referenced as `/_static/imgs/...` in .qmd)
- **Scripts:** `_static/js/catapi.js` (loaded globally, defines `window.getRandomCat()`)
- **Frozen Output:** `_freeze/` stores pre-rendered computation results (avoids re-running expensive API calls locally)

## Developer Workflows

### Build & Preview Locally
```bash
# Activate Python environment (required for Quarto)
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Preview (watches for changes)
quarto preview
# Renders to _site/, opens live preview

# Full render (same as CI/CD)
quarto render
```

**Known Issue:** OJS environment variable access unreliable locally. Always test data loading with fallback files.

### Publishing Pipeline
1. **Trigger:** Push to `main` branch
2. **GitHub Actions** ([`.github/workflows/publish.yml`](.github/workflows/publish.yml)):
   - Fetch cat images via Node.js script (uses `CAT_API_KEY` secret)
   - Run `quarto render` (generates HTML in `_site/`)
   - Deploy to `gh-pages` branch (GitHub Pages auto-deploys)

**Important:** `gh-pages` branch must exist and be configured in repo settings as the Pages source.

### Making Changes

#### Content & Notebooks
- **Content edits:** Modify .qmd files, commit to main, auto-deploys
- **Python dependencies:** Update `requirements.txt`, commit, GitHub Actions will use new env
- **Notebooks:** Use `exercise-DLPA.ipynb` for student version, mirror edits to `exercise-DLPA-resolved.ipynb`

#### Editing Interactive OJS Blocks
When modifying OJS code blocks in .qmd files:

**1. Locate the OJS block** (marked with ````{ojs}`)
```quarto
```{ojs}
// Your interactive code here
```
```

**2. Test locally with fallback data pattern**
```javascript
// Good pattern - handles local dev without API key
myData = {
  try {
    return await FileAttachment("../../_data/cats.json").json();
  } catch (e) {
    console.warn("Using fallback data (local dev mode)");
    return await FileAttachment("../../_dev/cats-fallback.json").json();
  }
}
```

**3. Example: Modifying the cat carousel in `chapters/interactingAPIs/endpoints.qmd`**
- Edit OJS block that displays `cats` array
- Run `quarto preview` to test locally
- Carousel uses fallback JSON from `_dev/cats-fallback.json` if `_data/cats.json` unavailable
- Verify visual changes before committing

**4. Reload in preview**
```bash
# In one terminal, keep running:
quarto preview

# After editing .qmd with OJS blocks:
# - Save file → preview auto-detects change
# - Browser reloads automatically
# - Check browser console (F12) for OJS errors
```

**5. Common OJS editing tasks**
| Task | Example | Location |
|------|---------|----------|
| Add interactivity to chart | Use `viewof` to create reactive inputs | Within ````{ojs}` block |
| Fetch external data | Use `FileAttachment()` for JSON, CSV | `chapters/interactingAPIs/endpoints.qmd` |
| Call client-side API | Use `window.getRandomCat()` (no auth needed) | `_static/js/catapi.js` defines this |
| Display dynamic HTML | Use `html` template for DOM elements | Any ````{ojs}` block |

**6. After committing OJS changes**
- GitHub Actions runs `quarto render` which freezes OJS outputs in `_freeze/`
- If outputs look wrong, check browser console during `quarto preview` for errors
- OJS errors won't block the build—pages still deploy with static fallback data

## Project-Specific Conventions

### Notebook Design for Workshops
- **Starter notebooks** (`exercise-DLPA.ipynb`) come pre-filled with scaffolding code
- Students edit small sections, not write from scratch (lowers barrier for beginners)
- Separate resolved version (`exercise-DLPA-resolved.ipynb`) for instructors
- Include Colab & Binder badges in setup pages for zero-install access

### Error Handling & Fallbacks
- Always provide `_dev/cats-fallback.json` for OJS blocks (network failures common in workshop settings)
- Use try-catch in OJS with meaningful console errors
- Test data fetching both with and without API keys

### Quarto YAML Conventions
```yaml
---
title: "Chapter Title"
execute:
  echo: true  # Show code in output
format:
  html:
    code-fold: true  # Hide long code blocks behind expand button
lightbox: true  # Enable image lightbox
---
```

## Common Pitfalls & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `quarto preview` fails with "module not found" | Missing Python deps | `pip install -r requirements.txt` |
| OJS sees undefined CAT_API_KEY | Local builds don't inherit GitHub secrets | Use `_dev/cats-fallback.json` fallback |
| Stale images in carousel | `_data/cats.json` not updated | Run fetch script: `node .github/scripts/fetch-cats.js` |
| HTML doesn't update after editing .qmd | Frozen render cache | Delete `_freeze/chapters/your-chapter/` and re-render |

## Key Files Reference
- **Config:** [`_quarto.yml`](_quarto.yml) – site structure, sidebar nav, styling
- **Entry point:** [`index.qmd`](index.qmd)
- **CI/CD:** [`.github/workflows/publish.yml`](.github/workflows/publish.yml)
- **Data fetch:** [`.github/scripts/fetch-cats.js`](.github/scripts/fetch-cats.js)
- **Fallback data:** [`_dev/cats-fallback.json`](_dev/cats-fallback.json)
- **Client JS:** [`_static/js/catapi.js`](_static/js/catapi.js)
