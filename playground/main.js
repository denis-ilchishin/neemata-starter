///<reference types="vite/client" />

import { Neemata } from '@neemata/client'

const neemata = new Neemata({
  host: 'http://localhost:' + prompt('port', 10000),
})
await neemata.connect()

window.neemata = neemata

document.querySelector('input[type="file"]').onchange = ({
  target: { files },
}) => {
  window.stream = neemata.createStream(files[0])
  window.stream.on('progress', (sent) => console.log(sent / window.stream.size))
}
