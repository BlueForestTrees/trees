import ENV from "../../../env";
import {LoginExistError, UnauthorizedError} from "../../exceptions/Errors";
import {findUserByLogin, insertUser} from "../user/userService";
import sha1 from 'sha1';
import jwt from "jsonwebtoken";

export const suscribe = async function ({login, password}) {
    const user = await findUserByLogin(login);
    if (user) {
        throw new LoginExistError();
    } else {
        return {_id: (await insertUser(login, password, false)).insertedId};
    }
};

export const authenticate = async function ({login, password}, req, res) {
    const user = await findUserByLogin(login);
    if (!user) {
        throw new UnauthorizedError();
    } else if (user.password !== sha1(password)) {
        throw new UnauthorizedError();
    } else {
        delete user.password;
        const token = jwt.sign({user}, ENV.TOKEN_SECRET, {expiresIn: "1d"});
        res.header("x-access-token", token);
        return null;
    }
};

export const loggedIn = function (req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
        try {
            req.token = jwt.verify(token, ENV.TOKEN_SECRET);
            next();
        } catch (e) {
            throw new UnauthorizedError("bad token", e);
        }
    } else {
        throw new UnauthorizedError("missing token");
    }
};