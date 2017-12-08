let unitService = {};
let unit = (grandeur, shortname, name, coef) => {
    return {
        grandeur: grandeur,
        shortName: shortname,
        name: name,
        coef: coef
    };
};

let units = [
    unit("NOMBRE", "", "", 1),
    unit("VOLUME", "m3", "mètre-cube", 1),
    unit("VOLUME", "l", "litre", 0.001),
    unit("VOLUME", "goutte", "goutte", 0.001 * 20000),
    unit("DUREE", "sec", "seconde", 1),
    unit("DUREE", "min", "minute", 60),
    unit("DUREE", "h", "heure", 60 * 60),
    unit("DUREE", "j", "jour", 60 * 60 * 24),
    unit("DUREE", "mois", "mois", 60 * 60 * 24 * 30 * 355),
    unit("DUREE", "an", "année", 60 * 60 * 24 * 30 * 355 * 12),
    unit("MASSE", "g", "gramme", 1),
    unit("MASSE", "mg", "milligramme", 0.001),
    unit("MASSE", "kg", "kilogramme", 1000),
    unit("MASSE", "T", "tonne", 1000000),
    unit("SURFACE", "m2", "mètre-carré", 1),
    unit("SURFACE", "hec", "hectare", 10000),
    unit("ELECTRICITE", "W/h", "électricité", 1),
    unit("LONGUEUR", "mm", "millimètre", 0.001),
    unit("LONGUEUR", "m", "mètre", 1),
    unit("LONGUEUR", "km", "kilomètre", 1000),
    unit("COUT", "€", "euro", 1),
].reduce(function(acc, cur, i) {
    acc[cur.shortName] = cur;
    return acc;
}, {});

const shortNames = Object.keys(units);

const lookup = (unit) => {
    return units[unit];
};

unitService.all = () => {
    return units;
};

unitService.shortNames = () => {
    return shortNames;
};

unitService.toReference = (qt, unit) => {
    return qt * lookup(unit||"").coef;
};

module.exports = unitService;