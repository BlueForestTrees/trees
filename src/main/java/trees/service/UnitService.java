package trees.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import trees.domain.unit.Unit;

@Service
public class UnitService {

    private Map<String, Unit> units = new HashMap<>();
    {
        addUnit(new Unit("NOMBRE", "", "", 1));
        addUnit(new Unit("VOLUME", "m3", "mètre-cube", 1));
        addUnit(new Unit("VOLUME", "l", "litre", 0.001));
        addUnit(new Unit("VOLUME", "goutte", "goutte", 0.001 * 20000));
        addUnit(new Unit("DUREE", "sec", "seconde", 1));
        addUnit(new Unit("DUREE", "min", "minute", 60));
        addUnit(new Unit("DUREE", "h", "heure", 60 * 60));
        addUnit(new Unit("DUREE", "j", "jour", 60 * 60 * 24));
        addUnit(new Unit("DUREE", "mois", "mois", 60 * 60 * 24 * 30 * 355));
        addUnit(new Unit("DUREE", "an", "année", 60d * 60d * 24d * 30d * 355d * 12d));
        addUnit(new Unit("MASSE", "g", "gramme", 1));
        addUnit(new Unit("MASSE", "mg", "milligramme", 0.001));
        addUnit(new Unit("MASSE", "kg", "kilogramme", 1000));
        addUnit(new Unit("MASSE", "T", "tonne", 1000000));
        addUnit(new Unit("SURFACE", "m2", "mètre-carré", 1));
        addUnit(new Unit("SURFACE", "hec", "hectare", 10000));
        addUnit(new Unit("ELECTRICITE", "W/h", "électricité", 1));
        addUnit(new Unit("LONGUEUR", "mm", "millimètre", 0.001));
        addUnit(new Unit("LONGUEUR", "m", "mètre", 1));
        addUnit(new Unit("LONGUEUR", "km", "kilomètre", 1000));
        addUnit(new Unit("COUT", "€", "euro", 1));
    }

    private void addUnit(final Unit unit) {
        units.put(unit.getShortName(), unit);
    }

    public Map<String, Unit> getAll() {
        return units;
    }

    public Unit lookUp(final String shortName){
        return units.get(shortName);
    }

    public double toReference(final double qt, final String unitShortName) {
        return qt * lookUp(unitShortName).getCoef();
    }
}
