# Neemata quick example

### Guide

```Bash
git clone https://github.com/denis-ilchishin/neemata-starter.git
cd neemata-starter
npm i
npx prisma generate && npx prisma migrate deploy && npx prisma db seed
npm run server

# small demo (in another terminal)
npm run client
```

Run the `test` task

```Bash
npm run execute task test -- --iterations=100
```
