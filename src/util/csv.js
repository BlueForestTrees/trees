import {streamIt} from "./streams"
import readline from 'readline'

const sep = ";"

export const parse = async (buffer, desc) => await new Promise(function (resolve, reject) {
    const rl = readline.createInterface({
        input: streamIt(buffer),
    })

    const impacts = {}
    let head = true
    let ignoreCount = 1
    let headArray = null

    rl.on('line', (line) => {
        if (head) {
            head = false
            headArray = line.split(sep)
            for (let i = 4; i < headArray.length; i++) {
                impacts[headArray[i]] = {}
            }
        } else if (ignoreCount === 0) {
            const lineArray = smartSplit(line, sep)
            for (let i = 4; i < lineArray.length; i++) {
                if (impacts[headArray[i]]) {
                    impacts[headArray[i]][lineArray[0]] = {quantity: {qt: parseFloat(lineArray[i])}}
                } else {
                    console.error(`import ademe impacts, {_id:${headArray[i]}, ${lineArray[0]}} n'existe pas`)
                }
            }
        } else {
            ignoreCount--
        }
    })

    rl.on('close', () => {
        resolve(impacts)
    })

})

export const smartSplit = (line, sep) => {
    return line.split(sep)
}