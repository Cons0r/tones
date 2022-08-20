// Runs after svelte is built and copied to electron directory.
import fs from 'node:fs/promises'

const assetRegex = /(?<!\.)\/assets/gm // complicated regex tbat prevents writing to the same line

const htmlContent = (await fs.readFile('./electron/dist/index.html')).toString()
const fixedContent = htmlContent.replace(assetRegex, "./assets")
await fs.writeFile("./electron/dist/index.html", fixedContent)