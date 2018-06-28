import {cols} from "../../const/collections";
import {col} from "../../db";
import sha1 from 'sha1';

const users = () => col(cols.USER);

export const findUserByName = name => users().findOne({name});

export const insertUser = ({name, password, admin}) => users().insertOne({name, password: sha1(password), admin});

