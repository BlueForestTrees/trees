const grandeur = (key, label, units) => ({
    key,
    label,
    units
})

const unit = (shortname, name, coef) =>
    ({
        shortname: shortname,
        name: name,
        coef: coef
    })

export const loadUnitsData = () => Promise.resolve(
    [
        grandeur("Ener", "Energie (wh, J, cal...)", [
            unit("J", "Joule (J)", 0.23923445),
            unit("ws", "Watt-Seconde (ws)", 0.23923445),
            unit("cal", "calorie (cal)", 1),
            unit("wh", "Watt-Heure (wh)", 0.23923445 * 3600),
            unit("kwh", "KiloWatt-Heure (kwh)", 0.23923445 * 3600 * 1000),
            unit("kcal", "Kilo-Calorie (kcal)", 1000),
            unit("Mcal", "Mega-calorie (Mcal)", 1000 * 1000)
        ]),
        grandeur("Dens", "Densité (mol, mmol...)", [
            unit("μmol", "Micro-mole (umol)", 0.000001),
            unit("mmol", "Milli-mole (mmol)", 0.001),
            unit("mol", "Mole (mol)", 1)
        ]),
        grandeur("Nomb", "Nombre (pas d'unité)", [
            unit("count", "pas d'unité", 1)
        ]),
        grandeur("Volu", "Volume (L, m3...)", [
            unit("goutte", "Goutte", 0.001 * 20000),
            unit("L", "Litre (L)", 0.001),
            unit("dL", "Déci-litre (dL)", 0.001 * 0.1),
            unit("cL", "Centi-litre (cL)", 0.001 * 0.01),
            unit("mL", "Milli-litre (mL)", 0.001 * 0.001),
            unit("m3", "Mètre-cube (m3)", 1),
        ]),
        grandeur("Duré", "Durée (sec, min, h...)", [
            unit("sec", "Seconde (sec)", 1),
            unit("min", "Minute (min)", 60),
            unit("h", "Heure (h)", 60 * 60),
            unit("j", "Jour (j)", 60 * 60 * 24),
            unit("mois", "Mois (mois)", 60 * 60 * 24 * 30 * 355),
            unit("an", "Année (an)", 60 * 60 * 24 * 30 * 355 * 12)
        ]),
        grandeur("Mass", "Masse (g, kg...)", [
            unit("mg", "Milligramme (mg)", 0.001),
            unit("g", "Gramme (g)", 1),
            unit("kg", "Kilo-gramme (kg)", 1000),
            unit("t", "Tonne (t)", 1000000),
            unit("Mt", "Mega-tonne (Mt)", 1000000000)
        ]),
        grandeur("Surf", "Surface (m2, hec...)", [
            unit("m2", "Mètre-carré (m2)", 1),
            unit("hec", "hectare (hec)", 10000)
        ]),
        grandeur("Long", "Longueur (mm, m, km...)", [
            unit("mm", "Millimètre (mm)", 0.001),
            unit("cm", "Centimètre (cm)", 0.01),
            unit("m", "Mètre (m)", 1),
            unit("km", "Kilo-mètre (km)", 1000)
        ]),
        grandeur("Prix", "Prix/Coût (€...)", [
            unit("€", "euro (€)", 1)
        ]),
        grandeur("Tran", "Transport (t*km...)", [
            unit("t*km", "Tonne Kilomètre (t*km)", 1),
            unit("kg*km", "Kilogramme Kilomètre (kg*km)", 0.001)
        ])
    ])