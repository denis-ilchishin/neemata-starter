# neemata-starter
Neemata starter project

### Guide
1. Clone repo
2. `npm i`
3. `npm run dev` to start the project
4. `npm run playground` to start client playground
5. Open http://localhost:3000/playground, F12 to open console

Now you have access to global object `neemata`, and you should be able to run `await neemata.api.testPublic()` 
which will run `application/api/testPublic.js` api endpoint. 

Run `neemata.setAuth('some token')` to authenticate and `neemata.reconnect()` to reestablish connection with new auth credentials. After `await neemata.api.test()` to access private endpoints

Also, all changed/added/deleted API endpoints will be instantly reloaded, and you will see changes in `neemata.api` object.

