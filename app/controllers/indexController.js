const 
    clickhouseDb = require('../managers/clickhouseDbManager'),
    mysqlDb = require('../managers/mysqlDbManager'),
    loginManager = require('../managers/loginManager'),
    userObject = {
        user_id: 6,
        role: 'admin'
    };


/**
* @example curl -XGET "http://localhost:8081/"
*/
async function mainPage (ctx, next) {
    const userToken = loginManager.decodeToken(ctx.request.header.token);
    if (userToken.role == 'admin'){
        ctx.body = await clickhouseDb.getSearchParams({role: 'admin'});
        ctx.status = 200;
    } else { ctx.status = 400 }
    await next();
}

// app.use(allowedMethods());
/**
 * @example curl -XPOST "http://localhost:8081/search" -d '[{}]' -H 'Content-Type: application/json'
 */
async function search (ctx, next) {
    const userToken = loginManager.decodeToken(ctx.request.header.token);
    if (userToken.role == 'admin' || userToken.role == 'user') {
        let response = await clickhouseDb.getSearchResults(ctx.request.body);
        const stringQuery = await clickhouseDb.queryUnion(ctx.request.body);
        mysqlDb.addLog(userToken.user_id, stringQuery);
        ctx.body = response;
        ctx.status = 200;
    } else { ctx.status = 400 }

    await next();

}

/**
 * @example curl -XPOST "http://localhost:8081/login" -d 'header{auth: basic}' -H 'Content-Type: application/json'
 */

async function login (ctx, next) {
    const auth = loginManager.authDecode(ctx.request.header.authorization);
    const user = await mysqlDb.checkLogin(auth);
    if(user) {
        const userSearchParams = await clickhouseDb.getSearchParams(user[1]);
        const response = user[1];
        response.tables = userSearchParams;
        const token = {token: loginManager.signToken(user[0])}
        ctx.body = Object.assign(response, token)
        //ctx.body = response;
        //ctx.set('token', loginManager.signToken(user[0]));
        ctx.status = 200;
    } else {
        ctx.body = 'Логін або пароль не співпадають';
        ctx.status = 401
    }
    await next();
}

/**
 * @example curl -XPOST "http://localhost:8081/add_q" -d '{}' -H 'Content-Type: application/json'
 */
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
    console.log(ctx.request.body);
    const userToken = loginManager.decodeToken(ctx.request.header.token);
    const user = ctx.request.body;
    console.log(userToken);
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

async function createApi (ctx, next) {
    const userToken = loginManager.decodeToken(ctx.request.header.token);
    if(userToken) {
        const response = await mysqlDb.createApi(userToken.user_id, ctx.request.body.api_key);
        if(response.length){
            ctx.status = 200;
        } else {ctx.status = 400}
        
    } else { ctx.status = 400 }
    await next();
}

async function removeApi (ctx, next) {
    const userToken = loginManager.decodeToken(ctx.request.header.token);
    if(userToken) {
        const response = await mysqlDb.removeApi(ctx.params.id);
        ctx.status = response ? 200 : 400;
    } else { ctx.status = 400 }
    await next();
}

async function getApi(ctx, next) {
    const url = ctx.request.query;
    if(url.api_key && url.query_id){
        
        const checkApiKey = await mysqlDb.checkApiKey(url.api_key)
        if(checkApiKey) {
            const response = await mysqlDb.getQueryById(url.query_id);
            if(response.length){
                ctx.body = await clickhouseDb.getSearchResults(JSON.parse(response[0].query));
            } else ctx.status = 400;
        } else ctx.status = 400;


    } else { ctx.status = 400 }
    
    
}

async function test(ctx, next) {
    let db = await mysqlDb.test();
    ctx.body = loginManager.signToken(userObject);
    ctx.body = db[0];
}



module.exports = { mainPage, search, login, addQuery, queryList, share, test, removeQuery, users, addUser, removeUser, updateUser, logs, createApi, removeApi, getApi};
