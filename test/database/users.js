import {cols} from "../../src/const/collections"
import {userStatus} from "../../src/const/userStatus"
import {getRandomColor} from "../../src/util/calculations"
import sha1 from 'sha1'
import {X_ACCESS_TOKEN} from "../../src/const/headers"
import ENV from "../../src/env"
import jwt from "jsonwebtoken"

const god = {
    status: userStatus.CONFIRMED,
    mail: "god@test.fr",
    fullname: "God Test",
    wantSuscribeDate: new Date(),
    password: sha1("god_password"),
    confirmDate: new Date(),
    color: getRandomColor(),
    god: true
}

export const authGod = {[X_ACCESS_TOKEN]: jwt.sign({user: god}, ENV.AUTH_TOKEN_SECRET, {expiresIn: "1d"})}

export const database = {
    [cols.USER]: [god],
}