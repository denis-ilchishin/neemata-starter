# Neemata quick example

### Guide

```shell
git clone https://github.com/denis-ilchishin/neemata-starter.git
cd neemata-starter
npm i
npx prisma generate && npx prisma migrate deploy && npm run execute task core:seed
npm run execute registry # to print resolved task, procedures and events
npm run server

# or to start the app in dev mode (does not support server mode yet)
npm run server-dev
```

Start client demo

```shell
# (in another terminal)
npm run client
```

Run the `core/test` task from terminal, instead of programmatic use

```shell
npm run execute task core/test -- --iterations=100
```
