///<reference types="vite/client" />

import { Neemata } from '@neemata/client'

const neemata = new Neemata({
  host: 'http://localhost:' + prompt('port', 10000),
  // scaffold: true,
})
await neemata.connect()

window.neemata = neemata

document.querySelector('input[type="file"]').onchange = ({
  target: { files },
}) => {
  window.stream = neemata.createStream(files[0])
  console.log(
    'A stream was created for the selected file and was saved to the window.stream. Now can directly be send to the server, \nf.e ` await neemata.api.example.binary({info: "some info", file: window.stream}).catch(err => console.log(err.message, err.code, err.data))'
  )
}
