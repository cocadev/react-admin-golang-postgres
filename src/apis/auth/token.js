import LocalStore, { TOKEN } from "../../common/localStore"

const tickToMs = function (tick) {
    return (tick - 621355968000000000) / 10000;
}

class Token {
    //token

    get() {
        return LocalStore.get(TOKEN);
    }

    del() {
        LocalStore.del(TOKEN);
    }

    set(token) {
        LocalStore.set(TOKEN, token);
    }

    //getStatus
    //0:undefine
    //1:active
    //2:required refresh
    //3:token expried
    getStatus() {

        let token = this.token_Serialize();

        if (token == null) {
            return 0;
        }

        let expried = new Date(tickToMs(token.payload.exp));
        let now = new Date();
        let expriedDiff = (expried - now) / 1000 / 60;

        if (expriedDiff <= 0) {
            return 2;
        }

        return 1;
    }

  token_Serialize() {
        try {
            var tokenRaw = this.get();
            var tokenArr = tokenRaw.split('.');

            if (tokenArr.length < 3) {
                return null;
            }

            var token = {};
            token.header = JSON.parse(window.atob(tokenArr[0]));
            token.payload = JSON.parse(window.atob(tokenArr[1]));
            //token.signature = window.atob(tokenArr[2]);
            return token;
        } catch (e) {
          console.log('e', e)
            return null;
        }
    }
}

export default (new Token)
