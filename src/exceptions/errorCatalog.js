const error = (errorCode, message) => ({errorCode, message});

export const MAIL_EXISTS = error(1, "mail allready exists");
export const VALIDATION_ERROR = errors => ({...error(2, "validation error(s)"), errors});
export const UNIT_MISMATCH_ERROR = (left, right) => error(3, `Units mismatch: '${left}' and '${right}'`);
