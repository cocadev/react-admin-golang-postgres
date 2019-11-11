
//auth
export const TOKEN = 'token';

//user
export const USER_INFO = 'user';
export const USER_CURRCOM = 'currCom';

const localStoreSet = function (key, data) {

    let dataStr = data;

    if (typeof (data) === 'object') {
        dataStr = JSON.stringify(data);
    }

    localStorage.setItem(key, dataStr);
}

const localStoreGet = function (key) {

    let data = localStorage[key];

    if (!data) {
        return undefined;
    }

    try {
        return JSON.parse(data);
    }
    catch(e){
        return data;
    }
}

const localStoreDel = function (key) {
    localStorage.removeItem(key);
}

export default {
    set(key, data) {
        localStoreSet(key, data);
    },
    get(key) {
        return localStoreGet(key);
    },
    del(key) {
        localStoreDel(key);
    }
}
