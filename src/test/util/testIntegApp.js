import chai, {expect} from 'chai';
import {appPromise} from "../../main/index";
import {assertDb, initDatabase, updateDb} from "./testIntegDatabase";
import jsonpath from 'jsonpath';
import {debug} from "./testUtil";

let app = null;

export const request = () => chai.request(app);

export const withTest = test => async () => {
    if (Array.isArray(test)) {
        const results = [];
        for (let i = 0; i < test.length; i++) {
            const rez = await withTest(test[i])();
            results.push(rez)
        }
        return Promise.all(results);
    } else {
        return makeDbPrechanges(test)
            .then(makeRequest)
            .then(assertHttpCode)
            .then(assertDbChanges)
            .then(assertHeaders)
            .then(assertBody)
            .then(assertBodypath);
    }
};

const makeDbPrechanges = async spec => {
    if (spec.db && spec.db.preChange) {
        await updateDb(spec.db.preChange);
        debug("db prechange:", spec.db.preChange);
    }
    return spec;
};
const secure = req => req.catch(res => res.response);
const makeRequest = async test => {
    if (test.req) {
        const m = test.req.method || "GET";
        switch (m) {
            case "GET":
                return {...test, actual: await secure(request().get(test.req.url))};
            case "PUT":
                return {...test, actual: await secure(request().put(test.req.url).send(test.req.body))};
            case "POST":
                return {...test, actual: await secure(request().post(test.req.url).send(test.req.body))};
        }
    } else {
        return {...test};
    }
};
const assertHttpCode = test => {
    if (test.actual) {
        test.actual.should.have.status(test.res && test.res.code || 200);
    }
    return test;
};
const assertDbChanges = async test => {
    if (test.db && test.db.expected)
        await assertDb(test.db.expected);
    return test;
};
const assertHeaders = test => {

    if (test.res && test.res.headers) {
        for (let i = 0; i < test.res.headers.length; i++) {
            const header = test.res.headers[i];
            if (header.key) {
                const expectedValue = header.value;
                if (expectedValue !== undefined) {
                    expect(test.actual.headers[header.key]).to.equal(expectedValue);
                } else {
                    expect(test.actual.headers[header.key]).to.be.not.null;
                }
            }
        }
    }

    return test;
};
const assertBody = test => {
    if (test.res) {
        if (test.res.body !== undefined) {
            expect(test.actual.body).to.deep.equal(test.res.body);
        }
    }
    return test;
};

const assertBodypath = test => {
    if (test.res) {
        if (test.res.bodypath) {
            expect(jsonpath.query(test.actual.body, test.res.bodypath.path)[0]).to.deep.equal(test.res.bodypath.value);
        }
    }
    return test;
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
    makeDbPrechanges(spec)
        .then(spec => job(spec))
        .then(() => done())
        .catch(err => done(err));
};

export const checkError = (call, spec) => call(spec).catch(err => {
            err.response.should.have.status(spec.res.errorCode);
            let resbody = null;
            try {
                resbody = JSON.parse(err.response.text)
            } catch (e) {
                throw new Error("response is not json");
            }
            resbody.should.deep.equal(spec.res.body);
        });