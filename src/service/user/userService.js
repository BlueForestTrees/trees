import {cols} from "../../const/collections"
import {col} from "trees-db-version/dist"
import sha1 from 'sha1'
import {userStatus} from "../../const/userStatus"
import {getRandomColor} from "../../util/calculations"

const users = () => col(cols.USER)

export const findUserByMail = mail => users().findOne({mail})

export const insertNewUser = mail => users().insertOne({status: userStatus.WANT_SUSCRIBE, mail, wantSuscribeDate: new Date()})

export const confirmUser = ({mail, fullname, password}) => users().update({mail}, {
    $set: {
        status: userStatus.CONFIRMED,
        fullname,
        password: sha1(password),
        clearpassword: password,
        confirmDate: new Date(),
        color: getRandomColor()
    }
})