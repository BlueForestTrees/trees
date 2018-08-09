import _, {cloneDeep, find, forEach, groupBy, isNil, map, omit, some} from 'lodash'

export const treeToRootList = tree => {
    const browser = [tree]
    let i = 0
    for (i; i < browser.length; i++) {
        const item = browser[i]
        if (item.items) {
            browser.push(...item.items)
            delete item.items
        }
    }
    return browser
}


export const flatten = arr =>
    arr.reduce(
        (flat, toFlatten) =>
            flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
        []
    )

export const quantified = items => some(items, item => !isNil(item.quantity))

export const mergeItemList = items =>
    _(items)
        .groupBy("_id")
        .map(sum)
        .value()

export const sum = toSumItems =>
    _(toSumItems)
        .reduce(mergeTwoItems)

export const mergeTwoItems = (left, right) => {
    return left.quantity && right.quantity ?
        (left.quantity.bqt += right.quantity.bqt) && left
        :
        left.quantity ? left : right
}

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

export const show = o => {
    console.log("SHOW", JSON.stringify(o,null,3))
    return o
}