<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/66c0016c-f8fa-48c6-aeff-61d566a977b3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Audit implementation

Run `npm run lint`, `npm run build`, then `npm test`. The build produces public HTML summaries, canonical/description/Open Graph metadata, a sitemap and robots.txt in `dist`. Deploy the complete `dist` directory; the existing Netlify fallback continues to handle application routes. HTML summaries use the repository’s reviewed content snapshot. Rebuild when published copy changes; Firestore edits alone do not refresh those non-JavaScript summaries.

Content editors can configure event end dates (`YYYY-MM-DD`), registration and separate recap links, document URLs, Board photos, chapter URLs, footer details and the privacy notice. Leave unconfirmed links blank. Past events never reuse registration links. Public enquiries are saved in `contact_messages` and appear in Admin → Messages, with their enquiry type. Newsletter forms collect interest; they do not send mailing campaigns. Sponsorship enquiries are labelled in that inbox; automatic committee email delivery is not configured.

Admin → Content includes the reviewed audit replacements. Applying them updates the connected Firestore database atomically and retains the original content in each section’s `auditPreviousContent`. Existing vision and mission wording is preserved. The migration is intended for this audit, not routine content editing: use section editors afterwards. `scripts/generate-audit-content.mjs` regenerates the reviewed snapshot from local defaults; review its diff before applying it to a database. Initial seeding now fills only missing documents.

Outstanding editorial inputs are confirmed fees and appointments, permission to list partners, approved governance and privacy wording, speaker guidelines, a sponsorship prospectus, genuine articles, and webinar recording/slides URLs. Unconfirmed lists are hidden or replaced with neutral enquiry copy. Form submission permissions and hosting deployment must be verified in the target environment; browser smoke checks should avoid sending real enquiries inadvertently.
