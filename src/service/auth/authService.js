import ENV from "../../env";
import {MailAllreadyExistError, UnauthorizedError} from "../../exceptions/Errors";
import {findUserByMail, insertNewUser, confirmUser} from "../user/userService";
import sha1 from 'sha1';
import jwt from "jsonwebtoken";
import {doMail} from "../mail/mailService";
import {templates} from "../../const/templates";
import {X_ACCESS_TOKEN} from "../../const/headers";

export const startSuscribe = async ({mail}) => {
    try {
        await insertNewUser(mail);
        await sendWelcomeMail(mail);
        return null;
    } catch (e) {
        if (e.code === 11000) {
            throw new MailAllreadyExistError(mail);
        } else {
            throw e;
        }
    }

};

const sendWelcomeMail = mail => doMail({
        to: mail,
        subject: `Confirmer ${mail} pour BlueForest`,
        link: `${ENV.MAIL_CONFIG.confirmLink}${jwt.sign({mail, date: new Date()}, ENV.MAIL_CONFIG.welcomeTokenSecret, {expiresIn: "1d"})}`
    },
    templates.WANT_SUSCRIBE);


export const confirmSuscribe = async ({t, fullname, password}, req, res) => {
    const token = jwt.verify(t, ENV.MAIL_CONFIG.welcomeTokenSecret);
    const mail = token.mail;
    await confirmUser({mail, fullname, password});
    return authenticate({mail, password}, req, res);
};

export const authenticate = async function ({mail, password}, req, res) {
    const user = await findUserByMail(mail);
    if (!user) {
        throw new UnauthorizedError();
    } else if (user.password !== sha1(password)) {
        throw new UnauthorizedError();
    } else {
        delete user.password;
        const token = jwt.sign({user}, ENV.AUTH_TOKEN_SECRET, {expiresIn: "1d"});
        res.header(X_ACCESS_TOKEN, token);
        return null;
    }
};

export const loggedIn = function (req, res, next) {
    const token = req.headers[X_ACCESS_TOKEN];
    if (token) {
        try {
            req.token = jwt.verify(token, ENV.AUTH_TOKEN_SECRET);
            next();
        } catch (e) {
            throw new UnauthorizedError("bad token", e);
        }
    } else {
        throw new UnauthorizedError("missing token");
    }
};