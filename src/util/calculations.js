import _, {cloneDeep, find, forEach, groupBy, isNil, map, omit, some} from 'lodash'

export const treeToList = tree => {
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

export const mergeItemList = items => {
    const collector = []
    let i = 0
    for (i; i < items.length; i++) {
        const item = items[i]
        if (item.items) {
            collector.push(...item.items)
        }
    }
    return collector
}

export const quantified = items => some(items, item => !isNil(item.quantity))

export const extraireFeuilles = tree => {
    const tank = []
    const browser = tree.items.slice()
    let i = 0
    for (i; i < browser.length; i++) {
        const item = browser[i]
        if (item.quantity && item.items && quantified(item.items)) {
            browser.push(...item.items)
        } else {
            tank.push(omit(item, "items"))
        }
    }
    return tank
}

export const mergeList = items =>
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

export const show = title => o => {
    console.log("SHOW", title, JSON.stringify(o, null, 3))
    return o
}