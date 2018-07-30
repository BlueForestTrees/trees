import {errors} from "trees-express";

export const ALLREADY_EXISTS = errors.error(1, "allready exists");
export const UNIT_MISMATCH_ERROR = (left, right) => errors.error(3, `Units mismatch: '${left}' and '${right}'`);
