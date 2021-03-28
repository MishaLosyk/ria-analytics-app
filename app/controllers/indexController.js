const 
    clickhouseDb = require('../managers/clickhouseDbManager'),
    mysqlDb = require('../managers/mysqlDbManager'),
    loginManager = require('../managers/loginManager'),
    userObject = {
        user_id: 2,
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
    // mysqlDb.addLog(ctx.request.body);
    // console.log('req is.. ', ctx.request.body);
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
        ctx.set('token', loginManager.signToken(user[0]));
        ctx.status = 200;

    } else {
        ctx.body = 'Логін або пароль не співпадають';
        ctx.status = 401
    }
    await next();
}

async function addQuery (ctx, next) {
    const userToken = loginManager.decodeToken(ctx.request.header.token);
    const user = ctx.request.body;
    if(userToken.role == 'admin' || userToken.role == 'user' && userToken.user_id == user.user_id) {
        const response = mysqlDb.addNewQuery(user);
        ctx.status = response ? 200 : 400;
    } else {
        ctx.status = 400;
    }
    await next();
}


async function queryList (ctx, next) {
    const userToken = loginManager.decodeToken(ctx.request.header.token);
    const user = ctx.request.body;
    if(userToken.role == 'admin' || userToken.role == 'user' && userToken.user_id == user.user_id){
        const response = await mysqlDb.getQueryList(user.user_id);
        ctx.body = response;
        ctx.status = 200;
    } else { ctx.status = 400 }
    await next();

}



async function share (ctx, next) {
    const userToken = loginManager.decodeToken(ctx.request.header.token);
    const body = ctx.request.body;
    isValid = await mysqlDb.validateUser(userToken.user_id, 'query_id', body.query_id, 'queries');
    
    if(userToken.role == 'admin' || isValid) {
        const response = await mysqlDb.shareQuery(body);
        ctx.status = response ? 200 : 400;
    } else { ctx.status = 400 }
    await next();
}


async function removeQuery (ctx, next) {
    const userToken = loginManager.decodeToken(ctx.request.header.token);
    isValid = await mysqlDb.validateUser(userToken.user_id, 'query_id', ctx.params.id, 'queries');
    if(userToken.role == 'admin' || isValid) {
        await mysqlDb.removeQueryId(ctx.params.id);
        ctx.status = 200;
    } else { ctx.status = 400}
    await next();
}

async function addUser(ctx, next) {
    const userToken = loginManager.decodeToken(ctx.request.header.token);
    if(userToken.role == 'admin') {
        const body = ctx.request.body;
        const response = await mysqlDb.addUser(body);
        ctx.body = response;
    } else { ctx.status = 400 }
}

async function removeUser (ctx, next) {
    const userToken = loginManager.decodeToken(ctx.request.header.token);
    if(userToken.role == 'admin') {
        const response = await mysqlDb.removeUser(ctx.params.id);
        ctx.status = response ? 200 : 400;
    } else { ctx.status = 400 }
    await next();
}

async function updateUser (ctx, next) {
    const userToken = loginManager.decodeToken(ctx.request.header.token);
    if(userToken.role == 'admin') {
        const response = await mysqlDb.updateUser(ctx.request.body);
        ctx.body = response;
        ctx.status = 200;
    } else { ctx.status = 400 }
    await next();
}


async function users (ctx, next) {
    const userToken = loginManager.decodeToken(ctx.request.header.token);
    if(userToken.role == 'admin') {
        const body = ctx.request.body;
        const response = await mysqlDb.usersList(body);
        ctx.body = response;
    } else { ctx.status = 400 }
    await next();
}

async function logs (ctx, next) {
    const userToken = loginManager.decodeToken(ctx.request.header.token);
    if(userToken.role == 'admin') {
        const response = await mysqlDb.getLogs(ctx.request.body);
        ctx.body = response;
        ctx.status = 200;
    } else { ctx.status = 400 }
    await next();
}

async function test(ctx, next) {
    let db = await mysqlDb.test();
    // ctx.body = loginManager.signToken(userObject);
    ctx.body = db;
}



module.exports = { mainPage, search, login, addQuery, queryList, share, test, removeQuery, users, addUser, removeUser, updateUser, logs};
