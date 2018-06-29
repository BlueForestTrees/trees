import {cols} from "../../const/collections";
import {col} from "../../db";
import sha1 from 'sha1';

const users = () => col(cols.USER);

export const findUserByLogin = login => users().findOne({login});

export const insertUser = (login, password, admin) => users().insertOne({login, password: sha1(password), admin});

