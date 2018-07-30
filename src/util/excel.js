import Excel from "exceljs"

export const parse = (filename, desc) => {
    const docs = []
    const workbook = new Excel.Workbook()
    return workbook.xlsx.readFile(filename).then(() => {
        const startAt = desc.firstDocAt
        const endAt = workbook.getWorksheet(1).getRow(1).values.length
        const map = mapFromDescription(workbook, desc.fields)
        for (let i = startAt; i < endAt; i++) {
            docs.push(parseDocument(workbook, map, i))
        }
    }).then(() => docs)
}

export const parseDocument = (workbook, map, idx) => {
    const obj = {}
    const values = workbook.getWorksheet(1).getColumn(idx).values
    for (let i = 0; i < map.length; i++) {
        let value = values[map[i].idx]
        value = value ? value.trim() : null
        if (map[i].type === "array") {
            obj[map[i].fieldName] = value ? value.split(map[i].sep) : []
        } else {
            obj[map[i].fieldName] = value
        }
    }
    return obj
}

export const mapFromDescription = (workbook, desc) => {
    const values = workbook.getWorksheet(1).getColumn(1).values
    for (let i = 0; i < desc.length; i++) {
        desc[i].idx = values.indexOf(desc[i].xlsName)
    }
    return desc
}