import {inherits} from 'util';
import NestedError from 'nested-error-stacks';
import {UNIT_MISMATCH_ERROR} from "./errorCatalog";

export class GrandeurMismatchError extends Error {
    constructor(leftShortname, rightShortname) {
        super();
        this.status = 400;
        this.body = UNIT_MISMATCH_ERROR(leftShortname, rightShortname)
    }
}

export class NoUnitError extends Error {
    constructor(shortname, ...params) {
        super(`no unit with this shortname: '${shortname}'`, ...params);
    }
}

export function UnitInvalidError(message, nested) {
    NestedError.call(this, message, nested);
}
inherits(UnitInvalidError, NestedError);
UnitInvalidError.prototype.name = 'UnitInvalidError';


export function UnauthorizedError(nested) {
    NestedError.call(this, "", nested);
    this.status = 401;
}
inherits(UnauthorizedError, NestedError);
UnauthorizedError.prototype.name = 'UnauthorizedError';