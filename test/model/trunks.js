export const newTrunk = {
    "name" : "trunkName"
};

export const renamedTrunk = {
    "name" : "trunkNewName"
};

export const trunk = _id => ({
    _id,
    ...newTrunk
});