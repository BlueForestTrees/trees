import {cols} from "../../../main/const/collections";
import sha1 from "sha1";

export const validAuthentSpec = {
    db: {
        preChange: {
            colname: cols.USER,
            doc: {
                login: "authentLoginTest",
                password: sha1("verySecretPasswordLoginTest")
            }
        }
    },
    req: {
        method: "POST",
        url: "/api/auth",
        body: {
            login: "authentLoginTest",
            password: "verySecretPasswordLoginTest"
        }
    },
    res: {
        headers: [{key: "x-access-token"}],
        body: null
    }
};

export const badPasswordAuthentSpec = {
    db: {
        preChange: {
            colname: cols.USER,
            doc: {
                login: "authentLoginTest",
                password: sha1("verySecretPasswordLoginTest")
            }
        }
    },
    req: {
        method: "POST",
        url: "/api/auth",
        body: {
            login: "authentLoginTest",
            password: "BAD_PASSWORD"
        }
    },
    res: {
        code: 401,
        body: null
    }
};
export const badLoginAuthentSpec = {
    db: {
        preChange: {
            colname: cols.USER,
            doc: {
                login: "authentLoginTest",
                password: sha1("verySecretPasswordLoginTest")
            }
        }
    },
    req: {
        method: "POST",
        url: "/api/auth",
        body: {
            login: "BAD_LOGIN",
            password: "verySecretPasswordLoginTest"
        }
    },
    res: {
        code: 401,
        body: null
    }
};