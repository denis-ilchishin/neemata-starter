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

Run `neemata.setAuth('some-token'); neemata.reconnect()` to authenticate and reestablish connection with new auth credentials.

After `await neemata.api.test` to access private endpoint at `application/api/test.js` or `await neemata.api.test.v2({ some:'login' })` for `application/api/test.2.js`

Versioning could be nested, e.g `application/api/nested.1` example results in `/nested/test (VER 1)` and `/nested/test (VER 1.2)`
Run `await neemata.api.nested.test({ some: ['data'] })` to access endpoint `application/api/nested.1/test.js`, or `await neemata.api.nested.test.v1_2({ some: ['data'] })` to access endpoint `application/api/nested.1/test.2.js`
