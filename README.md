# Block Request Patterns

A Chrome extension that blocks unwanted web requests and provides smart CDN redirects for better performance and privacy.

## Features

- Block unwanted requests using URL patterns
- Smart CDN redirects for common services:
  - Cloudflare CDN → Staticfile CDN
  - Google reCAPTCHA → Recaptcha.net
  - jQuery → Microsoft AspNet CDN
- Simple configuration through extension popup
- Default patterns for blocking common analytics trackers
- Uses Chrome's modern declarativeNetRequest API for efficient request blocking

## Installation

1. Download the extension
2. Go to Chrome's extension page (chrome://extensions/)
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

1. Click the extension icon in your browser toolbar
2. Edit the patterns in JSON array format
3. Click "Save" to apply changes

### Pattern Examples

```json
[
    "*://google-analytics.com/*",
    "*://*.google-analytics.com/*",
    "*://*.g.doubleclick.net/*"
]
```

### Pattern Syntax

- Use `*` as a wildcard to match any number of characters
- Use `?` to match a single character
- Patterns must follow the URL filter format: `[scheme:]//[host]/[path]`
- Leading wildcard before scheme must include `://` (e.g. `*://example.com/*`)

## Built-in Redirects

The extension automatically redirects certain services to privacy-friendly alternatives:

1. **Cloudflare CDN → Staticfile CDN**
   - From: `cdnjs.cloudflare.com/ajax/libs/*`
   - To: `cdn.staticfile.org/ajax/libs/*`

2. **Google reCAPTCHA → Recaptcha.net**
   - From: `www.google.com/recaptcha/*`
   - To: `www.recaptcha.net/*`

3. **jQuery → Microsoft AspNet CDN**
   - Automatically redirects jQuery requests to Microsoft's CDN

## Privacy

This extension helps protect your privacy by:
- Blocking common analytics and tracking scripts
- Redirecting to privacy-friendly CDN alternatives
- Operating entirely locally (no data sent to external servers)
