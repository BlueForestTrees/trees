import {cols} from "../../const/collections";
import {col} from "../../db/db";
import sha1 from 'sha1';
import {status} from "../../const/userStatus";

const users = () => col(cols.USER);

export const findUserByLogin = login => users().findOne({login});

export const insertUser = (login, password, admin) => users().insertOne({login, password: sha1(password), admin});

export const insertNewUser = mail => users().insertOne({status: status.NEW, mail, date: new Date()});