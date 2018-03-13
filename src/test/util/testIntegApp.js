import {appPromise} from "../../main/index";
import chai from 'chai';
import {initDatabase} from "./testIntegDatabase";

let app = null;

export const request = () => chai.request(app);

export const init = async () => {
    await initDatabase();
    app = await appPromise;
};