import _, {reduce, cloneDeep, find, forEach, groupBy, isNil, map, omit, some} from 'lodash'

export const cleanNull = field => item => {
    if (!item[field]) {
        delete item[field]
    }
    return item
}

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

export const extraireFeuilles = tree => {
    const tank = []
    const browser = tree.items.slice()
    let i = 0
    for (i; i < browser.length; i++) {
        const item = browser[i]
        if (item.items && item.bqt) {
            browser.push(...item.items)
        } else {
            tank.push(omit(item, "items"))
        }
    }
    return tank
}


export const mergeListBy = field => items =>
    _(items)
        .groupBy(field)
        .map(sum)
        .value()

export const mergeList = mergeListBy("_id")

export const sum = items => reduce(items, mergeTwoItems)

export const mergeTwoItems = (left, right) =>
    left.bqt && right.bqt ?
        (left.bqt += right.bqt) && left
        :
        left.bqt ? left : right