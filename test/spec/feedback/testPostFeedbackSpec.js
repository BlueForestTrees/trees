import {oneResponse} from "api-test/dist/domain"
import {cols} from "../../../src/const/collections"
import {withValidationError} from "api-test/dist/domain"

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
}

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
        body: withValidationError("mail", "body", "mail invalid", "slimane.mediniglueforest.org")
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
}