export const debug = (...obj) => {
    console.log(JSON.stringify(obj, null, 4))
}