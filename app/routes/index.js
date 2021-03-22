const Router = require('koa-router'),
      KoaBody = require('koa-body'),
     {mainPage, search, importDb, createDb} = require('../controllers/indexController');
const request = require('request');

const router = new Router();

    router
        .get('/',            mainPage)
        .get('/import/',     importDb)
        .get('/create/',      createDb)
        .post('/search/',    KoaBody(), search)


module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};


