export const newTrunk = {
    "name" : "trunkName"
};

export const trunk = _id => ({
    _id,
    ...newTrunk
});