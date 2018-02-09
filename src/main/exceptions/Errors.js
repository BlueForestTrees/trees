import util from 'util';
import NestedError from 'nested-error-stacks';
import {debug} from "../../test/scenario/integ/testIntegPlumbing";


export const erreurDifferenteGrandeurs = (leftShortname, rightShortname) => {

    debug("erreurDifferenteGrandeurs", leftShortname, rightShortname);

    throw new GrandeurMismatchError(leftShortname, rightShortname);
};

export class GrandeurMismatchError extends Error {
    constructor(leftShortname,rightShortname, ...params) {

        debug("GrandeurMismatchError", leftShortname, rightShortname);

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
export const unitNotFound = shortname => {

    debug("unitNotFound", shortname);

    throw new NoUnitError(shortname);
};

export function UnitInvalidError(message, nested) {
    NestedError.call(this, message, nested);
}

util.inherits(UnitInvalidError, NestedError);
UnitInvalidError.prototype.name = 'TrunkUnitInvalidError';