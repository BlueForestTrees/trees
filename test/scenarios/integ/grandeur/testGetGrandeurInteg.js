import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('GET Grandeurs', function () {

    beforeEach(init(api, ENV, cols))

    it('get grandeurs', withTest({
            req: {
                url: "/api/grandeurs"
            },
            res: {
                body: [
                    {
                        "key": "CTUe",
                        "label": "CTUe - Comparative Toxic Unit for ecosystems",
                        "units": [
                            {
                                "coef": 1,
                                "grandeur": "CTUe",
                                "name": "Comparative Toxic Unit for ecosystems (CTUe) * volume * time",
                                "shortname": "CTUe"
                            }
                        ]
                    },
                    {
                        "key": "CTUh",
                        "label": "CTUh - Comparative Toxic Unit for humans",
                        "units": [
                            {
                                "coef": 1,
                                "grandeur": "CTUh",
                                "name": "Comparative Toxic Unit for humans (CTUh) * volume * time",
                                "shortname": "CTUh"
                            }
                        ]
                    },
                    {
                        "key": "DALY",
                        "label": "DALY - Disability Adjusted Life Years - Calculations adapted to USEtox midpoint (Huijbregts et al., 2005).",
                        "units": [
                            {
                                "coef": 1,
                                "grandeur": "DALY",
                                "name": "Disability Adjusted Life Years (DALY)",
                                "shortname": "DALY"
                            }
                        ]
                    },
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
                            },
                            {
                                "coef": 1000,
                                "grandeur": "Dens",
                                "name": "Kilo-Mole (mol)",
                                "shortname": "kmol"
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
                        "key": "Ene1",
                        "label": "Energie (J, kJ, MJ...)",
                        "units": [
                            {
                                "coef": 0.000001,
                                "grandeur": "Ene1",
                                "name": "Joule (J)",
                                "shortname": "J"
                            },
                            {
                                "coef": 0.001,
                                "grandeur": "Ene1",
                                "name": "Kilo-Joule (kJ)",
                                "shortname": "kJ"
                            },
                            {
                                "coef": 1,
                                "grandeur": "Ene1",
                                "name": "Méga-Joule (MJ)",
                                "shortname": "MJ"
                            }
                        ]
                    },
                    {
                        "key": "Ene2",
                        "label": "Energie (Wh, kWh...)",
                        "units": [
                            {
                                "coef": 2.7777777777777776e-7,
                                "grandeur": "Ene2",
                                "name": "Watt-Seconde (Ws)",
                                "shortname": "Ws"
                            },
                            {
                                "coef": 0.000016666666666666667,
                                "grandeur": "Ene2",
                                "name": "Watt-Minute (Wm)",
                                "shortname": "Wm"
                            },
                            {
                                "coef": 0.001,
                                "grandeur": "Ene2",
                                "name": "Watt-Heure (Wh)",
                                "shortname": "Wh"
                            },
                            {
                                "coef": 1,
                                "grandeur": "Ene2",
                                "name": "KiloWatt-Heure (kWh)",
                                "shortname": "kWh"
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
                                "coef": 0.000001,
                                "grandeur": "Mass",
                                "name": "Milligramme (mg)",
                                "shortname": "mg",
                            },
                            {
                                "coef": 0.001,
                                "grandeur": "Mass",
                                "name": "Gramme (g)",
                                "shortname": "g",
                            },
                            {
                                "coef": 1,
                                "grandeur": "Mass",
                                "name": "Kilo-gramme (kg)",
                                "shortname": "kg",
                            },
                            {
                                "coef": 1000,
                                "grandeur": "Mass",
                                "name": "Tonne (t)",
                                "shortname": "t",
                            },
                            {
                                "coef": 1000000,
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
                                "shortname": "Nomb",
                            },
                            {
                                "coef": 1,
                                "grandeur": "Nomb",
                                "name": "items",
                                "shortname": "Item(s)"
                            }
                        ],
                    },
                    {
                        "key": "PDF",
                        "label": "PDF - Potentially Disappeared Number of plant species in terrestrial ecosystems * time",
                        "units": [
                            {
                                "coef": 1,
                                "grandeur": "PDF",
                                "name": "Potentially Disappeared Number of plant species in terrestrial ecosystems * time (PDF)",
                                "shortname": "PDF"
                            }
                        ]
                    },
                    {
                        "key": "PNOF",
                        "label": "PNOF - Potentially Not Occuring Number of plant species in terrestrial ecosystems * time",
                        "units": [
                            {
                                "coef": 1,
                                "grandeur": "PNOF",
                                "name": "Potentially Not Occuring Number of plant species in terrestrial ecosystems * time (PNOF)",
                                "shortname": "PNOF"
                            }
                        ]
                    },
                    {
                        "key": "Pri1",
                        "label": "Prix/Coût (€...)",
                        "units": [
                            {
                                "coef": 1,
                                "grandeur": "Pri1",
                                "name": "euro (€)",
                                "shortname": "€"
                            },
                            {
                                "coef": 1000,
                                "grandeur": "Pri1",
                                "name": "kilo-euro (€)",
                                "shortname": "k€"
                            },
                            {
                                "coef": 1000000,
                                "grandeur": "Pri1",
                                "name": "million-euro (€)",
                                "shortname": "m€"
                            },
                            {
                                "coef": 1000000000,
                                "grandeur": "Pri1",
                                "name": "milliard-euro (€)",
                                "shortname": "M€"
                            }
                        ]
                    },
                    {
                        "key": "Pri2",
                        "label": "Prix/Coût (€...)",
                        "units": [
                            {
                                "coef": 1,
                                "grandeur": "Pri2",
                                "name": "dollar ($)",
                                "shortname": "$"
                            },
                            {
                                "coef": 1000,
                                "grandeur": "Pri2",
                                "name": "kilo-dollar ($)",
                                "shortname": "k$"
                            },
                            {
                                "coef": 1000000,
                                "grandeur": "Pri2",
                                "name": "billion-dollar ($)",
                                "shortname": "M$"
                            },
                            {
                                "coef": 1000000,
                                "grandeur": "Pri2",
                                "name": "million-dollar ($)",
                                "shortname": "m$"
                            }
                        ]
                    },
                    {
                        "key": "Surf",
                        "label": "Surface (m2, hec...)",
                        "units": [
                            {
                                "coef": 0.0001,
                                "grandeur": "Surf",
                                "name": "Centimètre-carré (m2)",
                                "shortname": "cm2",
                            },
                            {
                                "coef": 1,
                                "grandeur": "Surf",
                                "name": "Mètre-carré (m2)",
                                "shortname": "m2",
                            },
                            {
                                "coef": 10000,
                                "grandeur": "Surf",
                                "name": "Hectare (hec)",
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
        }
    ))

})