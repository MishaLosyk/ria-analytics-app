const Router = require('koa-router'),
      KoaBody = require('koa-body'),
     {mainPage, search, login, addQuery} = require('../controllers/indexController');
const request = require('request');

const router = new Router();

    router
        .get('/',            mainPage)
        .post('/search/',    KoaBody(), search)
        .post('/login/',    KoaBody(), login)
        .post('/add_q/',    KoaBody(), addQuery)


module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};


