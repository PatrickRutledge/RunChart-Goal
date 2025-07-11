# Legal Document Templates

This directory contains reusable templates for common legal documents required for web and mobile applications. These templates are designed to be easily customized for your specific application needs.

## Available Templates

1. `privacy-template.html` - Privacy Policy template
2. `terms-template.html` - Terms of Service template
3. `eula-template.html` - End User License Agreement template
4. `cookies-template.html` - Cookie Policy template

## How to Use

1. Copy the desired template(s) to your project's `public` directory
2. Replace all placeholder text (marked with [BRACKETS])
3. Update the "Last Updated" date
4. Ensure your legal counsel reviews the final documents

## Netlify Configuration

Add these settings to your `netlify.toml`:

```toml
[[headers]]
  for = "/privacy.html"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; style-src 'self' 'unsafe-inline'"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/terms.html"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; style-src 'self' 'unsafe-inline'"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/eula.html"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; style-src 'self' 'unsafe-inline'"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/cookies.html"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; style-src 'self' 'unsafe-inline'"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

## Vite Configuration

Add this custom plugin to your `vite.config.js`:

```javascript
const copyLegalDocs = {
  name: 'copy-legal-docs',
  enforce: 'post',
  generateBundle(_, bundle) {
    const legalDocs = ['privacy.html', 'terms.html', 'eula.html', 'cookies.html'];
    legalDocs.forEach(doc => {
      if (bundle[doc]) {
        bundle[doc].fileName = doc;
      }
    });
  }
};
```

## Placeholder Guide

Replace the following placeholders in the templates:

- [DATE] - Current date (e.g., "January 1, 2024")
- [COMPANY_NAME] - Your company's legal name
- [APP_NAME] - Your application name
- [CONTACT_EMAIL] - Contact email for legal inquiries
- [DESCRIBE_*] - Detailed descriptions specific to your application

## Important Notes

1. These templates are starting points and should be reviewed by legal counsel
2. Update documents whenever significant changes are made to your application
3. Keep a version history of all legal documents
4. Ensure documents are easily accessible to users
5. Consider translations for international applications

## Best Practices

1. Keep URLs consistent (/privacy.html, /terms.html, etc.)
2. Include links to legal documents in your app's footer
3. Notify users of significant policy changes
4. Maintain proper security headers
5. Keep documents mobile-friendly
