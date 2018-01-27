export const oneResponse = {n: 1, ok: 1};

export const oneModifiedResponse = {nModified: 1, ...oneResponse};

export const oneUpsertedResponse = _id => ({
    "n": 1,
    "nModified": 0,
    "ok": 1,
    "upserted": [
        {
            "_id": _id,
            "index": 0
        }
    ]
});

export const ObjectIDRegex = /^[a-fA-F0-9]{24}$/;