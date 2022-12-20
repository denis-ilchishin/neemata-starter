///<reference types="vite/client" />

import { Neemata } from '@neemata/client'

const neemata = new Neemata({
  host: 'http://localhost:' + prompt('port', 10000),
})
await neemata.connect()

window.neemata = neemata
