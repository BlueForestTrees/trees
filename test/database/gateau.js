import {cols} from "../../src/collections"
import {vitBFacetEntry, vitCFacetEntry} from "./facetEntries"
import {withIdBqt, withDbTrunk} from "test-api-express-mongo"
import {vitBImpactEntry, vitCImpactEntry} from "./impactEntries"
import {object} from "test-api-express-mongo"
import {god} from "./users"

export const gateauTrunk = withDbTrunk("Gateau au chocolat", "5a6a03c03e77667641d2d2c3", 200, "Mass")
gateauTrunk.oid = god._id
export const farineTrunk = withDbTrunk("Farine", "5a6a03c03e77667641d2d2c1", 100, "Mass")
farineTrunk.oid = god._id
export const laitTrunk = withDbTrunk("Lait", "5a6a03c03e77667641d2d2c2", 0.001, "Volu")
export const bleTrunk = withDbTrunk("blé", "5a6a03c03e77667641d2d2c0", 1000, "Mass")
export const pizzaTrunk = withDbTrunk("pizza", "5a6a03c03e77667641d2d2c4", 2, "Nomb")
export const cremeTrunk = withDbTrunk("creme", "5a6a03c03e77667641d2d2c5", 0.0001, "Volu")

export const gateauItem = withIdBqt(gateauTrunk._id, 500)
export const pizzaItem = withIdBqt(pizzaTrunk._id, 500)
export const farineItem = withIdBqt(farineTrunk._id, 200)
export const laitItem = withIdBqt(laitTrunk._id, 0.02)

export const gateauRoots = [
    {_id: object("aaaaaaa03e77667641d2d2c2"), oid: god._id, trunkId: gateauItem._id, rootId: farineItem._id, bqt: 200},
    {_id: object("aaaaaaa03e77667641d2d2c3"), trunkId: gateauItem._id, rootId: laitItem._id, bqt: 0.02}
]
export const pizzaRoots = [{_id: "aaaaaab03e77667641d2d2c8", trunkId: pizzaItem._id, rootId: farineItem._id}]
export const farineRoots = [{_id: "aaaaaaa03e77667641d2d2c8", trunkId: farineItem._id, rootId: bleTrunk._id}]

const gateauFacets = [
    {_id: "aaaaaac03e77667641d2d2c8", trunkId: gateauTrunk._id, facetId: vitCFacetEntry._id, bqt: 10},
    {_id: "aaaaaad03e77667641d2d2c8", trunkId: gateauTrunk._id, facetId: vitBFacetEntry._id, bqt: 0.1},
]
export const bleFacets = [
    {_id: object("aaaaaaa03e77667641d2d2c4"), oid: god._id, trunkId: bleTrunk._id, facetId: vitCFacetEntry._id, bqt: 6},
    {_id: object("aaaaaaa03e77667641d2d2c5"), trunkId: bleTrunk._id, facetId: vitBFacetEntry._id, bqt: 0.15}
]

const gateauImpact = [
    {_id: object("aaaaaaa03e77667641d2d210"), trunkId: gateauTrunk._id, impactId: vitCImpactEntry._id, bqt: 10},
    {_id: object("aaaaaaa03e77667641d2d211"), trunkId: gateauTrunk._id, impactId: vitBImpactEntry._id, bqt: 0.1},
]


export const bleImpacts = [
    {_id: object("aaaaaaa03e77667641d2d2c0"), oid:god._id, trunkId: bleTrunk._id, impactId: vitCImpactEntry._id, bqt: 6},
    {_id: object("aaaaaaa03e77667641d2d2c1"), trunkId: bleTrunk._id, impactId: vitBImpactEntry._id, bqt: 0.15}
]

export const database = {
    [cols.TRUNK]: [gateauTrunk, laitTrunk, farineTrunk, bleTrunk, pizzaTrunk, cremeTrunk],
    [cols.ROOT]: [...gateauRoots, ...farineRoots, ...pizzaRoots],
    [cols.FACET]: [...gateauFacets, ...bleFacets],
    [cols.IMPACT]: [...gateauImpact, ...bleImpacts]
}