const 
    myDb = require('../managers/clickhouseDbManager')

/**
* @example curl -XGET "http://localhost:8081/"
*/
async function mainPage (ctx, next) {
    ctx.body = await myDb.getSearchParams();
    await next();
}

/**
 * @example curl -XPOST "http://localhost:8081/search" -d '{"select": ["user_id"]}' -H 'Content-Type: application/json'
 */
async function search (ctx, next) {
    let response = await myDb.getSearchResults(ctx.request.body);
    ctx.body = response;
    ctx.status = 201;
    await next();

}


module.exports = { mainPage, search };
