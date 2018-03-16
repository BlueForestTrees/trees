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