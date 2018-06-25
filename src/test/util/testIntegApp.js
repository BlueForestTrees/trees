import chai, {expect} from 'chai';
import {appPromise} from "../../main/index";
import {assertDb, initDatabase, updateDb} from "./testIntegDatabase";

let app = null;

export const request = () => chai.request(app);

export const withTest = spec => async () => {
    if (Array.isArray(spec)) {
        const results = [];
        for (let i = 0; i < spec.length; i++) {
            const rez = await withTest(spec[i])();
            results.push(rez)
        }
        return Promise.all(results);
    } else {
        return before(spec)
            .then(spec => {
                const m = spec.req.method || "GET";
                switch (m) {
                    case "GET":
                        return request().get(spec.req.url);
                    case "PUT":
                        return request().put(spec.req.url).send(spec.req.body);
                    case "POST":
                        return request().post(spec.req.url).send(spec.req.body);
                }
            })
            .then(res => res.should.have.status(spec.res && spec.res.code || 200) && res)
            .then(async res => {
                if (spec.db && spec.db.expected)
                    await assertDb(spec.db.expected);
                return res;
            })
            .then(res => {
                if (spec.res && spec.res.body) {
                    res.body.should.deep.equal(spec.res.body);
                }
            });
    }
};

export const init = async () => {
    await initDatabase();
    app = await appPromise;
};
export const run = job => done => {
    job()
        .then(() => done())
        .catch(err => done(err));
};
export const run2 = (job, spec) => done => {
    before(spec)
        .then(spec => job(spec))
        .then(() => done())
        .catch(err => done(err));
};

const before = async spec => {
    if (spec.db && spec.db.preChange) {
        await updateDb(spec.db.preChange);
    }
    return spec;
};

export const checkError = (call, spec) =>
    call(spec)
        .catch(err => {
            err.response.should.have.status(spec.res.errorCode);
            let resbody = null;
            try {
                resbody = JSON.parse(err.response.text)
            } catch (e) {
                throw new Error("response is not json");
            }
            resbody.should.deep.equal(spec.res.body);
        });