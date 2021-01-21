# Nako client-side SDK for JavaScript

## Nako Overview

Nako is a developer first platform that you can grab as a building block to power activity feeds, operation history and application level audit trails.

Learn all about it on our [website](https://nako.co). If you prefer the technical side of things, we recommend that you take a look at our whole [GitHub](https://nako.co) and at the [live demo](https://nako.co/demo).

## Requirement

We are building on Node 12, you safely use this SDK with Node 12 and up.

## Getting started

This SDK is distributed publicly over on [npm](https://www.npmjs.com/package/nako-client-sdk). You can simply pull on it.

Then you can simply init the SDK with your API key like so.

```javascript
const { NakoApi } = require('nako-client-sdk')

const sdk = NakoApi.init("api_key")
```

Soon, you'll also be able to init the client-side SDK with a token that will enforce the identity of a user or some other filtering options.

## Learn more

The client SDK only exposes methods to retrieve activities. Ingesting activities should be done from your backend to prevent your users from logging invalid activities. Examples are available over in the [API documentation](https://nako.co/demo).

## Contributing

We welcome all contribution! You can always open an issue in this repo and we'll respond as soon as possible. But if you feel like sharing some of your precious time with us, be our guest and open a PR.
