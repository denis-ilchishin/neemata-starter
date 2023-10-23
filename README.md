# neemata-starter

Neemata starter project

### Guide

```Bash
git clone https://github.com/denis-ilchishin/neemata-starter.git
npm i
npx prisma generate && npx prisma migrate deploy && npx prisma db seed
npm run server
npm run client # small dem
```

There's quick benchmark that you can run using Bun, or install polyfil for Web API Websocket to run using Node

```Bash
bun simple-bench.mjs
```
