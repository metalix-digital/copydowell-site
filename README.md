# CopydoWell — Website

The marketing and information site for **CopydoWell**, a Google Sheets add-on and Chrome
extension that copies, sorts, filters, and syncs data between spreadsheets.

🌐 Live: **https://copydowell.metalix.in**

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Homepage — features, screenshots, "Add to Chrome", full product docs |
| `donate.html` | Support / donate page (Razorpay) |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of service |
| `style.css` | Shared styles |

## Extension integration

- **`config.json`** — remote **free/paid mode switch** read by the Chrome extension
  (`{"mode":"free"}` or `{"mode":"paid"}`). Editing and pushing this file toggles the
  extension's monetization with no re-upload; it's served with `Access-Control-Allow-Origin: *`.

## Analytics & privacy

- **`consent.js`** — cookie-consent banner using **Google Consent Mode v2**. Analytics is
  denied by default and only enabled after the visitor clicks *Accept*; a "Manage cookies"
  footer link re-opens the choice.
- Pages load **Google Analytics 4** (`gtag.js`) in `<head>`, gated by the consent above.

### Custom events

One delegated click handler per page reads `data-ga-event` / `data-ga-label` off any
element and sends it as a GA4 event, with the label as `cta_location` and the element's
`href` as `link_url`. To track something new, add those two attributes — no JS needed.

| Event | Fired by | Labels (`cta_location`) |
|-------|----------|-------------------------|
| `add_to_chrome` | every Web Store link | `nav`, `hero`, `install_section`, `blog_index`, `donate_page`, `importrange_post`, `sync_post` |
| `donate_click` | every donate link | `nav`, `pricing`, `razorpay_button` |
| `demo_click` | hero "Watch the demo" jump link | `hero` |
| `video_play` | the demo video facade, on the click that loads the player | `homepage_demo` |
| `share` | blog post share buttons | `x`, `whatsapp`, `linkedin`, `facebook`, `email`, `copy_link` |
| `cookie_consent` | `consent.js`, on Accept or Decline | — (choice is in `consent_choice`) |

`cookie_consent` is sent by Consent Mode as a cookieless ping when the visitor declines, so
the accept/decline split is measurable. Read it first: it's the denominator for everything
else, since declined sessions don't report the other events.

## SEO / verification

- `sitemap.xml` and `robots.txt` for search indexing.
- `googlecfc92098877ba2b1.html` and a `<meta name="google-site-verification">` tag on the
  homepage — Google Search Console ownership verification. **Don't delete these.**

## Deployment

Hosted on **GitHub Pages** from the `main` branch. The `CNAME` file points the custom domain
`copydowell.metalix.in` at the Pages site. Every push to `main` redeploys automatically
(usually live within a minute or two).

## Local development

It's a static site — no build step. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Related

- Extension + add-on source: separate repository.
- Chrome Web Store: https://chromewebstore.google.com/detail/copydowell/fgkggcanaogpklaloeeofbmgglbmghhf
