import {cols} from "../../../main/const/collections";
import {withError} from "../../util/testUtil";

export const validPostMailSpec = {
    req: {
        method: "POST",
        url: "/api/mail",
        body: {
            mail: "smedini@gmail.com"
        }
    },
    res: {
        body: null
    }
};

export const existingPostMailSpec = {
    db: {
        preChange: {
            colname: cols.USER,
            doc: {
                mail: "smedini@gmail.com"
            }
        }
    },
    req: {
        method: "POST",
        url: "/api/mail",
        body: {
            mail: "smedini@gmail.com"
        }
    },
    res: {
        code: 400,
        body: withError(1,"mail allready exists")
    }
};

export const invalidPostMailSpec = {
    req: {
        method: "POST",
        url: "/api/mail",
        body: {
            mail: "smedini@gmail."
        }
    },
    res: {
        code: 400,
        bodypath: {path: "$.errors.mail.msg", value: "mail invalid"}
    }
};