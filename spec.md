# Specification

## Summary
**Goal:** Build a Screen Time Health Intelligence app with Internet Identity authentication, a data-rich dashboard displaying simulated health/risk metrics, charts, and risk analysis.

**Planned changes:**
- Create a Motoko backend actor with stable storage and query/update methods for user risk profiles keyed by principal
- Build a Login page with deep blue gradient background (#1e3c72 to #2a5298), app title, subtitle, and Internet Identity login button
- Build an authenticated Dashboard with a navbar (app name, user identity, logout), welcome section showing user principal, and four color-coded metric cards (Burnout Risk, Eye Strain Risk, Sleep Disruption, Overall Health Score) with scores derived deterministically from a hash of the user's principal
- Add a Line Chart ("Screen Time vs Burnout Risk - Last 7 Days") using react-chartjs-2 with Mon–Sun labels and two datasets
- Add a Bar Chart ("Daily App Usage Breakdown") using react-chartjs-2 with five app categories
- Add a two-column Risk Analysis section with red-tinted risk factors (warning icons) and green-tinted recommendations (checkmark icons)
- Apply a professional visual theme: deep blue gradient navbar, white shadow cards, orange accent (#ff7a18), hover transitions, and responsive grid layout

**User-visible outcome:** Users can log in with Internet Identity, view a polished dashboard with personalized (deterministic) health risk scores, interactive charts of simulated screen time data, and actionable recommendations — all without any real data collection or external APIs.
