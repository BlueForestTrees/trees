import {erreurDifferenteGrandeurs, NoUnitError} from "../exceptions/Errors";

const _ = require('lodash');

const _unit = (shortname, name, coef) =>
    ({
        shortname: shortname,
        name: name,
        coef: coef
    });

const _grandeurs = {
    "Energie": [
        _unit("kwh", "Watt-Heure", 0.23923445 * 3600 * 1000),
        _unit("wh", "Watt-Heure", 0.23923445 * 3600),
        _unit("ws", "Watt-Seconde", 0.23923445),
        _unit("J", "joule", 0.23923445),
        _unit("cal", "calorie", 1),
        _unit("kcal", "kilo-calorie", 1000)
    ],
    "Densité": [
        _unit("μmol", "micro-mole", 0.000001),
        _unit("mmol", "milli-mole", 0.001),
        _unit("mol", "mole", 1)
    ],
    "Nombre": [
        _unit("", "", 1)
    ],
    "Volume": [
        _unit("m3", "mètre-cube", 1),
        _unit("L", "litre", 0.001),
        _unit("goutte", "goutte", 0.001 * 20000)
    ],
    "Durée": [
        _unit("sec", "seconde", 1),
        _unit("min", "minute", 60),
        _unit("h", "heure", 60 * 60),
        _unit("j", "jour", 60 * 60 * 24),
        _unit("mois", "mois", 60 * 60 * 24 * 30 * 355),
        _unit("an", "année", 60 * 60 * 24 * 30 * 355 * 12)
    ],
    "Masse": [
        _unit("g", "gramme", 1),
        _unit("mg", "milligramme", 0.001),
        _unit("kg", "kilogramme", 1000),
        _unit("t", "tonne", 1000000)
    ],
    "Surface": [
        _unit("m2", "mètre-carré", 1),
        _unit("hec", "hectare", 10000)
    ],
    "Longueur": [
        _unit("mm", "millimètre", 0.001),
        _unit("cm", "centimètre", 0.01),
        _unit("m", "mètre", 1),
        _unit("km", "kilomètre", 1000)
    ],
    "Coût": [
        _unit("€", "euro", 1)
    ]
};

//apply grandeur field on all units.
_.forEach(_grandeurs, (units, grandeurName) => {
    _.forEach(units, unit => unit.grandeur = grandeurName);
});

const unitNotFound = shortname => {
    throw new NoUnitError(shortname);
};

export const units = _.chain(_grandeurs).values().flatten().keyBy('shortname').value();
export const grandeurs = _grandeurs;
export const grandeursKeys = Object.keys(_grandeurs);
export const shortnames = Object.keys(units);
export const unit = shortname => _.find(units, {shortname}) || unitNotFound(shortname);
export const grandeur = shortname => unit(shortname).grandeur;
export const checkGrandeur = (leftShortname,rightShortname) => unit(leftShortname).grandeur === unit(rightShortname).grandeur || erreurDifferenteGrandeurs(leftShortname, rightShortname);

export const unitCoef = (leftShortname, rightShortname) => checkGrandeur(leftShortname, rightShortname) && unit(leftShortname).coef / unit(rightShortname).coef;

//TODO ici il faut exprimer les deux trunk qt dans la même unité puis faire la division
export const qtUnitCoef = ({qt:leftQt, unit:leftUnit}, {qt:rightQt, unit:rightUnit}) => leftQt / rightQt * unitCoef(leftUnit, rightUnit);