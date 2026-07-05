# QR Snap

Type text or a URL, get a scannable QR code instantly. No build step, no backend, no dependencies to install.

![QR Snap screenshot](screenshot.png)
<!-- Replace with an actual screenshot after running locally -->

## Features
- Type any text or URL and generate a QR code on the fly
- Live character counter with a 2900-char safety limit
- Download the generated code as a PNG
- One-click copy of the input text
- Scan-line animation on generate, corner registration marks styled like a technical schematic

## Run locally
No install needed — it's plain HTML/CSS/JS.

```bash
git clone https://github.com/your-username/qr-snap.git
cd qr-snap
open index.html   # or just double-click the file
```

For live-reload while editing, you can optionally serve it:
```bash
npx serve .
```

## Tech stack
- Vanilla HTML, CSS, JavaScript — no framework
- [qrcode.js](https://github.com/davidshimjs/qrcodejs) (vendored locally in `/lib`) for canvas-based QR rendering
- Hosted as a static site on GitHub Pages
