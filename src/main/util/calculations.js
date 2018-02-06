import _ from 'lodash'

export const applyCoef = (items,coef) => _.forEach(items, item => item.quantity.qt *= coef);