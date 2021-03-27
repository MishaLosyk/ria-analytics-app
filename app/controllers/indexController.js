const 
    clickhouseDb = require('../managers/clickhouseDbManager'),
    mysqlDb = require('../managers/mysqlDbManager'),
    loginManager = require('../managers/loginManager'),
    userObject = {
        email: 'example@email.com',
        role: 'user'
    };


/**
* @example curl -XGET "http://localhost:8081/"
*/
async function mainPage (ctx, next) {
    ctx.body = await clickhouseDb.getSearchParams({role: 'admin'});
    await next();
}

/**
 * @example curl -XPOST "http://localhost:8081/search" -d '[{}]' -H 'Content-Type: application/json'
 */
async function search (ctx, next) {
    let response = await clickhouseDb.getSearchResults(ctx.request.body);
    ctx.body = response;
    ctx.status = 200;
    await next();

}

async function login (ctx, next) {
    const auth = loginManager.authDecode(ctx.request.header.authorization);
    const user = await mysqlDb.checkLogin(auth);

    if(user) {
        const userSearchParams = user[1].tables.length > 0 ? await clickhouseDb.getSearchParams(user[1]) : '';
        const response = user[1];
        response.tables = userSearchParams;
        ctx.body = response;
        ctx.status = 200;

    } else {
        ctx.body = 'Логін або пароль не співпадають';
        ctx.status = 401
    }
    
    // let response = user ? loginManager.signToken(user[0]) : 'Логін або пароль не співпадають';
    await next();
}

async function queryList (params) {
    
}





module.exports = { mainPage, search, login };
