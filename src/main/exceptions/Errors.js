import {inherits} from 'util';
import NestedError from 'nested-error-stacks';

export class GrandeurMismatchError extends Error {
    constructor(leftShortname, rightShortname, ...params) {
        const message = `Units mismatch: '${leftShortname}' and '${rightShortname}'`;
        super(message, ...params);
        this.status = 400;
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


export function ValidationError(errors, nested) {
    NestedError.call(this, "Validation Error", nested);
    this.status = 400;
    this.body = errors;
}
inherits(ValidationError, NestedError);
ValidationError.prototype.name = 'ValidationError';

export function UnauthorizedError(message, nested) {
    NestedError.call(this, message, nested);
    this.status = 401;
}
inherits(UnauthorizedError, NestedError);
UnauthorizedError.prototype.name = 'UnauthorizedError';