const 
    myDb = require('../managers/clickhouseDbManager'),
    Joi = require('joi'),
    // Simple schema, more info: https://github.com/hapijs/joi
    schema = Joi.object({
        table:  Joi.array().required(),
        select: Joi.array().required(),
        where:  Joi.array(),
        //push period params to 'where'
        group:  Joi.array(),
        sort:   Joi.array(),   
    });

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
    let body = await Joi.validate(ctx.request.body, schema, {allowUnknown: true});
    let response = await myDb.getSearchResults(body);
    ctx.body = response;
    ctx.status = 201;
    await next();

}


module.exports = { mainPage, search };
