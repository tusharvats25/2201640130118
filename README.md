# URL Shortner
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

# AffordMed URL Shortener – Frontend

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![React](https://img.shields.io/badge/react-18-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

This project is a production-grade frontend implementation of a URL Shortening service developed as part of the AffordMed technical assessment.  
It ensures scalable URL management, logging compliance, and a user-centric interface aligned with enterprise software standards.

---

## Key Capabilities

- Secure URL shortening with validation
- Configurable expiration handling
- Custom shortcode generation
- Bulk URL processing (up to 5 URLs)
- URL redirection with analytics
- Centralized logging using AffordMed Log API

---

## Technology Stack

| Layer       | Technology              |
|------------|--------------------------|
Frontend     | React.js                 |
Styling      | CSS / Material UI        |
Networking   | Axios / Fetch API        |
Logging      | AffordMed Logging API    |

---

## Application Structure

src/
├── components/ # Reusable UI components
├── lib/logger.js # Centralized logging middleware
├── pages/ # Page-level components
├── theme.js # UI theming
└── App.js # Application entry point

yaml
Copy code

---

## Deployment & Execution

### Prerequisites

- Node.js >= 16.x  
- npm >= 8.x  

### Installation

```bash
git clone https://github.com/your-username/URL Shortner.git
cd URL Shortner-main
npm install
Environment Configuration
Create a .env file based on .env.example:

env
Copy code
REACT_APP_ACCESS_TOKEN=your_affordmed_access_token_here
Run Locally
bash
Copy code
npm start
Access the application at:
👉 http://localhost:3000

Compliance & Logging
All application-level events are logged using AffordMed’s prescribed logging API to ensure:

End-to-end traceability

Observability and monitoring

Audit and compliance readiness

Logging is implemented via:

bash
Copy code
src/lib/logger.js
Security & Validation
Input validation on URLs and shortcodes

Lowercase alphanumeric constraints for shortcodes

Controlled expiration defaults (30 minutes)

Prevents duplicate and invalid entries

License
This project is licensed under the MIT License.

Author
Tushar Kumar
B.Tech Undergraduate
GitHub: https://github.com/tusharvats25
