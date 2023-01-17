# webln-types

Type definitions for [WebLN](https://webbtc.dev/webln)

## Quick Start

1. Install package

```bash
 npm install @webbtc/webln-types --save-dev # or yarn add @webbtc/webln-types --dev
```

2. Type definitions are now available through `window.webln` and importing from `"@webbtc/webln-types"`

```javascript
import { GetInfoResponse } from "@webbtc/webln-types";
if (window.webln) {
  (async () => {
    await window.webln.enable();
    const info: GetInfoResponse = await window.webln.getInfo();
    console.log(info);
  })();
} else {
  console.warn("WebLN not enabled");
}
```

_If you do not import any types from "@webbtc/webln-types" and just want to use window.webln, add the following line somewhere in your codebase (e.g. the main/index.tsx file) to ensure the types still get consumed:_

```javascript
/// <reference types="@webbtc/webln-types" />
```

## Adding WebLN to your application

Read the [WebLN Guide](https://www.webln.guide/introduction/readme)
