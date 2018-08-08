import {toBqtG} from "unit-manip"

export const toItemBqtG = ({_id, qt, unit}) => ({_id, ...toBqtG({qt, unit})})
