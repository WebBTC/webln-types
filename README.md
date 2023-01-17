# webln-types

Type definitions for [WebLN](https://webbtc.dev/webln)

WebLN may be implemented by a lightning browser extension (e.g. [Alby](https://getalby.com/)) therefore WebLN can already be called directly from the browser if the user has the extension installed. This package simply adds type definitions to make it easier to integrate WebLN into web applications that are written in Typescript.

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
    console.log("Your node pubkey is", info.node.pubkey);
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
