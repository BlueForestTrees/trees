export const getGrandeurSpec = {
    req: {
        url: "/api/grandeurs"
    },
    res: {
        body: [
            {
                "key": "Dens",
                "label": "Densité (mol, mmol...)",
                "units": [
                    {
                        "coef": 0.000001,
                        "grandeur": "Dens",
                        "name": "Micro-mole (umol)",
                        "shortname": "μmol"
                    },
                    {
                        "coef": 0.001,
                        "grandeur": "Dens",
                        "name": "Milli-mole (mmol)",
                        "shortname": "mmol"
                    },
                    {
                        "coef": 1,
                        "grandeur": "Dens",
                        "name": "Mole (mol)",
                        "shortname": "mol"
                    }
                ]
            },
            {
                "key": "Duré",
                "label": "Durée (sec, min, h...)",
                "units": [
                    {
                        "coef": 1,
                        "grandeur": "Duré",
                        "name": "Seconde (sec)",
                        "shortname": "sec"
                    },
                    {
                        "coef": 60,
                        "grandeur": "Duré",
                        "name": "Minute (min)",
                        "shortname": "min"
                    },
                    {
                        "coef": 3600,
                        "grandeur": "Duré",
                        "name": "Heure (h)",
                        "shortname": "h"
                    },
                    {
                        "coef": 86400,
                        "grandeur": "Duré",
                        "name": "Jour (j)",
                        "shortname": "j"
                    },
                    {
                        "coef": 920160000,
                        "grandeur": "Duré",
                        "name": "Mois (mois)",
                        "shortname": "mois"
                    },
                    {
                        "coef": 11041920000,
                        "grandeur": "Duré",
                        "name": "Année (an)",
                        "shortname": "an"
                    }
                ]
            },
            {
                "key": "Ener",
                "label": "Energie (wh, J, cal...)",
                "units": [
                    {
                        "coef": 0.23923445,
                        "grandeur": "Ener",
                        "name": "Joule (J)",
                        "shortname": "J"
                    },
                    {
                        "coef": 0.23923445,
                        "grandeur": "Ener",
                        "name": "Watt-Seconde (ws)",
                        "shortname": "ws"
                    },
                    {
                        "coef": 1,
                        "grandeur": "Ener",
                        "name": "calorie (cal)",
                        "shortname": "cal"
                    },
                    {
                        "coef": 861.24402,
                        "grandeur": "Ener",
                        "name": "Watt-Heure (wh)",
                        "shortname": "wh"
                    },
                    {
                        "coef": 1000,
                        "grandeur": "Ener",
                        "name": "Kilo-Calorie (kcal)",
                        "shortname": "kcal"
                    },
                    {
                        "coef": 861244.02,
                        "grandeur": "Ener",
                        "name": "KiloWatt-Heure (kwh)",
                        "shortname": "kwh"
                    },
                    {
                        "coef": 1000000,
                        "grandeur": "Ener",
                        "name": "Mega-calorie (Mcal)",
                        "shortname": "Mcal"
                    }
                ]
            },
            {
                "key": "Long",
                "label": "Longueur (mm, m, km...)",
                "units": [
                    {
                        "coef": 0.001,
                        "grandeur": "Long",
                        "name": "Millimètre (mm)",
                        "shortname": "mm"
                    },
                    {
                        "coef": 0.01,
                        "grandeur": "Long",
                        "name": "Centimètre (cm)",
                        "shortname": "cm"
                    },
                    {
                        "coef": 1,
                        "grandeur": "Long",
                        "name": "Mètre (m)",
                        "shortname": "m"
                    },
                    {
                        "coef": 1000,
                        "grandeur": "Long",
                        "name": "Kilo-mètre (km)",
                        "shortname": "km"
                    }
                ]
            },
            {
                "key": "Mass",
                "label": "Masse (g, kg...)",
                "units": [
                    {
                        "coef": 0.001,
                        "grandeur": "Mass",
                        "name": "Milligramme (mg)",
                        "shortname": "mg",
                    },
                    {
                        "coef": 1,
                        "grandeur": "Mass",
                        "name": "Gramme (g)",
                        "shortname": "g",
                    },
                    {
                        "coef": 1000,
                        "grandeur": "Mass",
                        "name": "Kilo-gramme (kg)",
                        "shortname": "kg",
                    },
                    {
                        "coef": 1000000,
                        "grandeur": "Mass",
                        "name": "Tonne (t)",
                        "shortname": "t",
                    },
                    {
                        "coef": 1000000000,
                        "grandeur": "Mass",
                        "name": "Mega-tonne (Mt)",
                        "shortname": "Mt"
                    }
                ]
            },
            {
                "key": "Nomb",
                "label": "Nombre (pas d'unité)",
                "units": [
                    {
                        "coef": 1,
                        "grandeur": "Nomb",
                        "name": "pas d'unité",
                        "shortname": "count",
                    },
                ],
            },
            {
                "key": "Prix",
                "label": "Prix/Coût (€...)",
                "units": [
                    {
                        "coef": 1,
                        "grandeur": "Prix",
                        "name": "euro (€)",
                        "shortname": "€"
                    }
                ]
            },
            {
                "key": "Surf",
                "label": "Surface (m2, hec...)",
                "units": [
                    {
                        "coef": 1,
                        "grandeur": "Surf",
                        "name": "Mètre-carré (m2)",
                        "shortname": "m2",
                    },
                    {
                        "coef": 10000,
                        "grandeur": "Surf",
                        "name": "hectare (hec)",
                        "shortname": "hec",
                    }
                ]
            },
            {
                "key": "Tran",
                "label": "Transport (t*km...)",
                "units": [
                    {
                        "coef": 0.001,
                        "grandeur": "Tran",
                        "name": "Kilogramme Kilomètre (kg*km)",
                        "shortname": "kg*km"
                    },
                    {
                        "coef": 1,
                        "grandeur": "Tran",
                        "name": "Tonne Kilomètre (t*km)",
                        "shortname": "t*km",
                    }
                ]
            },
            {
                "key": "Volu",
                "label": "Volume (L, m3...)",
                "units": [
                    {
                        "coef": 0.000001,
                        "grandeur": "Volu",
                        "name": "Milli-litre (mL)",
                        "shortname": "mL"
                    },
                    {
                        "coef": 0.00001,
                        "grandeur": "Volu",
                        "name": "Centi-litre (cL)",
                        "shortname": "cL"
                    },
                    {
                        "coef": 0.0001,
                        "grandeur": "Volu",
                        "name": "Déci-litre (dL)",
                        "shortname": "dL"
                    },
                    {
                        "coef": 0.001,
                        "grandeur": "Volu",
                        "name": "Litre (L)",
                        "shortname": "L"
                    },
                    {
                        "coef": 1,
                        "grandeur": "Volu",
                        "name": "Mètre-cube (m3)",
                        "shortname": "m3",
                    },
                    {
                        "coef": 20,
                        "grandeur": "Volu",
                        "name": "Goutte",
                        "shortname": "goutte"
                    }
                ]
            }
        ]
    }
};


