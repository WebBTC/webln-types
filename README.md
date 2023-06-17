# webln-types

Type definitions for [WebLN](https://webbtc.dev/webln)

WebLN may be implemented by a lightning browser extension (e.g. [Alby](https://getalby.com/)) therefore WebLN can already be called directly from the browser if the user has the extension installed. This package simply adds type definitions to make it easier to integrate WebLN into web applications that are written in Typescript.

## Quick Start

1. Install package

   ```bash
   npm install @webbtc/webln-types --save-dev # or yarn add @webbtc/webln-types --dev
   ```

2. Create `webln-types.d.ts` in your `src` directory with the following contents to ensure the types are picked up by the Typescript compiler:

```javascript
/// <reference types="@webbtc/webln-types" />
```

3.  Import types from `"@webbtc/webln-types"`

   ```typescript
   import type { GetInfoResponse } from "@webbtc/webln-types";

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

## Adding WebLN to your application

Read the [WebLN Guide](https://www.webln.guide/introduction/readme)
