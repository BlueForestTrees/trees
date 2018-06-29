import {cols} from "../../../main/const/collections";
import sha1 from "sha1";

export const validSuscribeSpec = {
    req: {
        method: "POST",
        url: "/api/suscribe",
        body: {
            login: "slim",
            password: "tirlititi"
        }
    },
    db: {
        expected: {
            colname: cols.USER,
            doc: {
                login: "slim",
                password: sha1("tirlititi")
            }
        }
    }
};

export const existingSuscribeSpec = {
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
        url: "/api/suscribe",
        body: {
            login: "authentLoginTest",
            password: "verySecretPasswordLoginTest"
        }
    },
    res: {
        code: 400,
        body: {
            errorCode: 1,
            message: "login exists"
        }
    }
};

export const loginNewUserSpec = {
    req: {
        method: "POST",
        url: "/api/auth",
        body: {
            login: "slim",
            password: "tirlititi"
        }
    },
    res: {
        headers: [{key: "x-access-token"}],
        body: null
    }
};