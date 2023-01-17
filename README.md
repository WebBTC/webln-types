# webln-types

Type definitions for [WebLN](https://webbtc.dev/webln)

## Quick Start

1. Install package

```bash
 npm install @webbtc/webln-types --save-dev # or yarn add @webbtc/webln-types --dev
```

2. Add the following line somewhere in your codebase (e.g. the main/index.tsx file)

```javascript
/// <reference types="@webbtc/webln-types" />
```

3. Type definitions are now available for `window.webln`

```javascript
if (window.webln) {
  (async () => {
    await window.webln.enable();
    console.log(await window.webln.getInfo());
  })();
} else {
  console.warn("WebLN not enabled");
}
```

## Adding WebLN to your application

Read the [WebLN Guide](https://www.webln.guide/introduction/readme)
