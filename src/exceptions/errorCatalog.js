

export const ALLREADY_EXISTS = error(1, "allready exists");
export const UNIT_MISMATCH_ERROR = (left, right) => error(3, `Units mismatch: '${left}' and '${right}'`);
