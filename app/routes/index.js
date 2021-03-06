const Router = require('koa-router'),
      KoaBody = require('koa-body'),
     {mainPage, search} = require('../controllers/indexController');
const request = require('request');

const router = new Router();

    router
        .get('/',            mainPage)
        .post('/search/',    KoaBody(), search)


module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};


