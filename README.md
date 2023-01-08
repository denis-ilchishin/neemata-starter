# neemata-starter

Neemata starter project

### Guide

1. Clone repo
2. `npm i`
3. `npm run dev` to start the project in dev mode.
4. `npm run playground` to start client playground
5. Open http://localhost:3000/, specify port (by default in ./neemata.config.js defined two API threads on ports: 10000 and 10001), F12 to open console

Now you have access to global object `neemata`, and you should be able to execute `await neemata.api.testPublic()`
which will run `application/api/testPublic.js` api endpoint.

To authenticate and reestablish connection with new auth credentials

```javascript
neemata.setAuth('some-token')
await neemata.reconnect()
```

Now you will be able to access private endpoints like `application/api/testPrivate.js`

```javascript
await neemata.api.testPrivate()
```

Versioning could be nested, e.g `application/api/nested.1` example results in `/nested/endpoint (VER 1)` and `/nested/endpoint (VER 1.2)`

```javascript
await neemata.api.nested.endpoint({ some: ['data'] })
// Or
await neemata.api.nested.endpoint['v1.2']({ some: ['data'] })
```
