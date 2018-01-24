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


export function TrunkUnitInvalidError(message, nested) {
    NestedError.call(this, message, nested);
}

util.inherits(TrunkUnitInvalidError, NestedError);
TrunkUnitInvalidError.prototype.name = 'TrunkUnitInvalidError';