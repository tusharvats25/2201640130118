# AffordMed URL Shortener (Frontend)

React app to shorten URLs, manage expiry, redirect, and view analytics. Integrates mandatory logging middleware via AffordMed Log API.

## Run
1. `npm install`
2. Create `.env` from `.env.example` and set `REACT_APP_ACCESS_TOKEN`.
3. `npm start` → http://localhost:3000

## Notes
- Accepts up to 5 URLs per batch.
- Default validity 30 minutes when left blank.
- Custom shortcode must be lowercase alphanumeric and unique.
- All significant actions go through `src/lib/logger.js`.
