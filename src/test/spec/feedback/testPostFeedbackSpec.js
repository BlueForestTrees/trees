import {oneResponse} from "../testCommonSpec";
import {cols} from "../../../main/const/collections";

export const postFeedbackOkSpec = {
    req: {
        method: "POST",
        url: "/api/feedback",
        body: {
            mail: "slimane.medini@glueforest.org",
            message: "Best test I've ever seen! postFeedbackOkSpec"
        }
    },
    res: {
        body: oneResponse
    },
    db: {
        expected: {
            colname: cols.FEEDBACK,
            doc: {
                mail: "slimane.medini@glueforest.org",
                message: "Best test I've ever seen! postFeedbackOkSpec"
            }
        }
    }
};

export const postFeedbadBadMailSpec = {
    req: {
        method: "POST",
        url: "/api/feedback",
        body: {
            mail: "slimane.mediniglueforest.org",
            message: "Best test I've ever seen!"
        }
    },
    res: {
        code: 400,
        body: {
            "mail": {
                "location": "body",
                "param": "mail",
                "value": "slimane.mediniglueforest.org",
                "msg": "mail invalid"
            }
        }
    },
    db: {
        expected: {
            colname: cols.FEEDBACK,
            missingDoc: {
                mail: "slimane.medini@glueforest.org",
                message: "Best test I've ever seen! postFeedbackOkSpec"
            }
        }
    }
};