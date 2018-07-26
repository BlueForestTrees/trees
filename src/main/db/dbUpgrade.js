import compareVersions from 'compare-versions';
import {filter, forEach} from 'lodash';
import {addVersion, getLastVersion, setLastVersion} from "../service/version/versionService";
import ENV from "../../env";
import {registry} from "./dbRegistry";
import {debug} from "../util/debug";

export const upgradeMode = {
    LAST: "LAST", NONE: "NONE"
};

export const upgradeDb = async () => {
    if (upgradeMode.NONE === ENV.DB_UPGRADE) {
        debug("upgrade db - none");
    } else if (upgradeMode.LAST === ENV.DB_UPGRADE) {
        return upgradeToLast();
    } else {
        debug(`upgrade db - unknown ${ENV.DB_UPGRADE}`);
    }
};

const upgradeToLast = async () => {
    const currentDbVersion = await getLastVersion();
    const currentAppVersion = ENV.VERSION;
    const comparison = compareVersions(currentAppVersion, currentDbVersion);

    if (comparison > 0) {
        debug(`upgrade db ${currentDbVersion} => ${currentAppVersion}`);
        dbUpgrade(
            filter(registry, update =>
                compareVersions(update.version, currentDbVersion) > 0
            ).sort((u1, u2) => compareVersions(u1.version, u2.version))
        );
        setLastVersion(currentAppVersion);
    } else if (comparison === 0) {
        debug(`db up to date (${currentDbVersion})`);
    } else {
        debug(`db is forward (${currentDbVersion})`);
    }

};

const dbUpgrade = updates => forEach(updates, doUpdate);
const doUpdate = async update => {
    console.log(`${update.version}-${update.log}...`);
    await update.script();
};