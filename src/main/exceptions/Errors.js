import util from 'util';
import NestedError from 'nested-error-stacks';


export const erreurDifferenteGrandeurs = (leftShortname, rightShortname) => {
    throw new GrandeurMismatchError(leftShortname, rightShortname);
};

export class GrandeurMismatchError extends Error {
    constructor(leftShortname,rightShortname, ...params) {
        const message = `Units mismatch: '${leftShortname}' and '${rightShortname}'`;
        super(message, ...params);
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

util.inherits(UnitInvalidError, NestedError);
UnitInvalidError.prototype.name = 'TrunkUnitInvalidError';