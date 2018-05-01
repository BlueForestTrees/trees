import {bleToFarineAddSpec, existingRootPostSpec, newRootSpec} from "../root/testPostRootSpec";
import {existingBranchPostSpec, farineToBleBranchAddSpec, newBranchSpec} from "../branch/testPostBranchSpec";

export const newLinkSpec = {};
newLinkSpec.req = {body: newRootSpec.req.body};
newLinkSpec.res = {body: [newRootSpec.res.body, newBranchSpec.res.body]};
newLinkSpec.db = {expected: {list: [newRootSpec.db.expected, newBranchSpec.db.expected]}};

export const existingLinkPostSpec = {};
existingLinkPostSpec.req = {body: existingRootPostSpec.req.body};
existingLinkPostSpec.res = {body: [existingRootPostSpec.res.body, existingBranchPostSpec.res.body]};
existingLinkPostSpec.db = {expected: {list: [existingRootPostSpec.db.expected, existingBranchPostSpec.db.expected]}};

export const bleToFarineLinkAddSpec = {};
bleToFarineLinkAddSpec.req = {body: bleToFarineAddSpec.req.body};
bleToFarineLinkAddSpec.res = {body: [bleToFarineAddSpec.res.body, farineToBleBranchAddSpec.res.body]};
bleToFarineLinkAddSpec.db = {expected: {list: [bleToFarineAddSpec.db.expected, farineToBleBranchAddSpec.db.expected]}};
